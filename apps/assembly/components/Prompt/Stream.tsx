import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAssemblyContext } from '../../store/context';
import { env } from '../../utils/env';
import { TRANSCRIPT } from '../Feed';
import {
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

export const StreamTranscript = (
  question: string,
  isSubmitted: boolean,
  stopStreaming: boolean
): {
  isWaiting: boolean;
} => {
  const { state, dispatch } = useAssemblyContext();
  const { event } = state;
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [abortController, setNewAbortController] = useState(
    new AbortController()
  );

  const FRONT_URL = env.frontUrl() || window.FRONT_URL || '';
  const uuid = uuidv4();

  const addResponseToFeed = () => {
    dispatch(
      addFeedItem({
        id: uuid,
        mode: TRANSCRIPT,
        question,
        text: '',
      })
    );
  };

  const fetchTranscript = async () => {
    const params = new URLSearchParams({
      eventId: event.id,
      question,
      source: TRANSCRIPT,
      language: event.language,
    });

    setIsWaiting(true);

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
      setIsWaiting(false);
    } catch (error: unknown) {
      // handle error message that will be displayed to the user
      setIsWaiting(false);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      fetchTranscript();
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (stopStreaming) {
      abortController.abort();
      setNewAbortController(new AbortController());
    }
  }, [stopStreaming]);

  return { isWaiting };
};
