import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAssemblyContext } from '../../store/context';
import { env } from '../../utils/env';
import {
  enableFeedStreaming,
  disableFeedStreaming,
  addFeedItem,
  updateItemChunks,
  updateItemText,
} from '../../store/feed/actions';
import { ChunkType } from '../../types';
import { LLM_PATH } from '../../utils/routes';

const parseValue = (content: string) => {
  try {
    return JSON.parse(content);
  } catch (e) {
    return undefined;
  }
};

const getResults = (objs: string[]): { chunks: []; text: string } => {
  let partial = '';
  return objs.reduce(
    // eslint-disable-next-line no-loop-func
    (prev, current) => {
      partial = `${partial}${current}`;
      const obj = parseValue(partial);
      if (obj === undefined) {
        return prev;
      }
      partial = '';

      return {
        chunks: obj.chunks || prev.chunks,
        text: `${prev.text}${obj.text || ''}`,
      };
    },
    { chunks: [], text: '' }
  );
};

export const StreamLLM = (
  question: string,
  mode: string
): { setStartStream: Dispatch<SetStateAction<boolean>> } => {
  const { state, dispatch } = useAssemblyContext();
  const { event } = state;
  const { isStreaming } = state.feed;
  const [startStream, setStartStream] = useState<boolean>(false);
  const [abortController, setNewAbortController] = useState(
    new AbortController()
  );

  const FRONT_URL = env.frontUrl() || window.FRONT_URL || '';
  const uuid = uuidv4();

  const addResponseToFeed = () => {
    dispatch(
      addFeedItem({
        id: uuid,
        mode,
        question,
        text: '',
        language: event.language,
      })
    );
  };

  const fetchLLM = async () => {
    dispatch(enableFeedStreaming());

    const params = new URLSearchParams({
      eventId: event.id,
      question,
      mode,
      language: event.language,
    });

    try {
      const transcriptResponse: Response = await fetch(
        `${FRONT_URL}${LLM_PATH}?${params}`,
        {
          method: 'GET',
          signal: abortController.signal,
        }
      );
      const reader = transcriptResponse.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        return;
      }

      addResponseToFeed();

      let newAnswer = '';
      let chunks;
      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const { value, done } = await reader.read();
        if (done) {
          dispatch(updateItemChunks(uuid, chunks as ChunkType[]));
          dispatch(disableFeedStreaming());
          setStartStream(false);
          break;
        }

        const decodedChunk = decoder.decode(value, { stream: true });
        const objs = decodedChunk.trim().split('\r\n');

        const result = getResults(objs);

        if (result.chunks && result.chunks.length) {
          chunks = result.chunks;
        }

        if (result.text) {
          const newText = `${newAnswer}${result.text}`;
          newAnswer = newText;
          dispatch(updateItemText(uuid, newText));
        }
      }
    } catch (error: unknown) {
      // handle error message that will be displayed to the user
      dispatch(disableFeedStreaming());
      setStartStream(false);
    }
  };

  useEffect(() => {
    if (startStream) {
      fetchLLM();
    }
  }, [startStream]);

  useEffect(() => {
    if (!isStreaming) {
      abortController.abort();
      setNewAbortController(new AbortController());
      dispatch(disableFeedStreaming());
    }
  }, [isStreaming]);

  return { setStartStream };
};