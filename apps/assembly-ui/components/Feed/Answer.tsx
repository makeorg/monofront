import React, { FC, useState, useEffect } from 'react';
import { env } from '@make.org/assets/env';
import i18n from 'i18next';
import ReactMarkdown from 'react-markdown';
import {
  ContentStyle,
  ContentIconStyle,
  AnswerContainerStyle,
  HyperlinksContainerStyle,
  HyperlinksTitleStyle,
  HyperlinksButtonsContainerStyle,
  HyperlinksButtonStyle,
} from './style';
import { useAssemblyContext } from '../../store/context';
import { TRANSCRIPT, TRANSCRIPT_EXPERT, DOCUMENT } from '.';
import { setStopStreaming } from '../../store/stream/actions';
import { StreamTranscript } from '../Prompt/Stream';
import { SourcesMobile } from './SourcesMobile';
import { Sources } from './Sources';
import { FeedItemType, ChunkType } from '../../types';
import pano from '../../assets/IconPano.png';

export const Answer: FC<{ content: FeedItemType }> = ({ content }) => {
  const [isTablet, setIsTablet] = useState(false);
  const [mode, setMode] = useState(TRANSCRIPT);
  const { state, dispatch } = useAssemblyContext();
  const { isSubmitted } = state.stream;

  const { setStartStream } = StreamTranscript(content.question, mode);

  useEffect(() => {
    if (env.isClientSide() && Math.min(window.innerWidth) < 969) {
      setIsTablet(true);
    }
  }, []);

  const sources = (chunks: ChunkType[]) => {
    if (isTablet) {
      return <SourcesMobile chunks={chunks} />;
    }
    return <Sources chunks={chunks} />;
  };

  const handleAdvancedQuestion = () => {
    setMode(TRANSCRIPT_EXPERT);
    dispatch(setStopStreaming(false));
    setStartStream(true);
  };

  const handleDocumentQuestion = () => {
    setMode(DOCUMENT);
    dispatch(setStopStreaming(false));
    setStartStream(true);
  };

  return (
    <ContentStyle>
      <ContentIconStyle src={pano} alt="Logo" />
      <AnswerContainerStyle>
        <ReactMarkdown>{content.text}</ReactMarkdown>
        <HyperlinksContainerStyle>
          <HyperlinksTitleStyle>
            {i18n.t('feed.hyperlinks_title')}
          </HyperlinksTitleStyle>
          <HyperlinksButtonsContainerStyle>
            <HyperlinksButtonStyle
              type="button"
              disabled={isSubmitted}
              onClick={() => handleAdvancedQuestion()}
            >
              {i18n.t('feed.detailed_response')}
            </HyperlinksButtonStyle>
            <HyperlinksButtonStyle
              type="button"
              disabled={isSubmitted}
              onClick={() => handleDocumentQuestion()}
            >
              {i18n.t('feed.document_sources')}
            </HyperlinksButtonStyle>
          </HyperlinksButtonsContainerStyle>
        </HyperlinksContainerStyle>
        {content.chunks && content.chunks.length > 0 && sources(content.chunks)}
      </AnswerContainerStyle>
    </ContentStyle>
  );
};
