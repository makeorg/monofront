import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { ChunkType } from '../../../types';
import { useTracking } from '../../Tracking/useTracking';
import { useAssemblyContext } from '../../../store/context';
import {
  SourcesDocumentStyle,
  SourcesVideoStyle,
  ArrowBottomStyle,
  ArrowLeftStyle,
  SourcesContainerStyle,
  SourcesIconsContainerStyle,
  SourcesTextIconBlockStyle,
  SourcesTextButtonStyle,
  SourcesContentContainerStyle,
  SourcesContainerButtonStyle,
} from './style';
import { SourcesElements } from './SourcesElements';
import { SOURCE_TYPE_DOCUMENT } from '..';

export const ShowSources: FC<{
  chunks: ChunkType[];
}> = ({ chunks }) => {
  const { state } = useAssemblyContext();
  const { event, visitorId } = state;
  const { slug: eventSlug } = event;
  const [showSources, setShowSources] = useState<boolean>(true);
  const tracker = useTracking();

  const handleClick = (displaySources: boolean) => {
    setShowSources(displaySources);
    tracker.track('ACTION-TOGGLE-SOURCE', {
      visitor_id: visitorId,
      event_slug: eventSlug,
      expand: displaySources ? 'true' : 'false',
    });
  };

  const generateChunckId = (chunk: ChunkType, index: number) =>
    `${chunk.document_source_title} ${index}`;

  if (!showSources) {
    return (
      <SourcesContainerButtonStyle
        onClick={() => handleClick(!showSources)}
        aria-expanded={showSources}
      >
        <SourcesTextIconBlockStyle>
          <p>{i18n.t('feed.sources')}</p>
          <SourcesIconsContainerStyle>
            {chunks.map((chunk, index) =>
              chunk.document_source_type === SOURCE_TYPE_DOCUMENT ? (
                <SourcesDocumentStyle
                  aria-hidden
                  focusable="false"
                  key={generateChunckId(chunk, index)}
                />
              ) : (
                <SourcesVideoStyle
                  aria-hidden
                  focusable="false"
                  key={generateChunckId(chunk, index)}
                />
              )
            )}
          </SourcesIconsContainerStyle>
        </SourcesTextIconBlockStyle>
        <ArrowBottomStyle />
      </SourcesContainerButtonStyle>
    );
  }

  return (
    <SourcesContainerStyle>
      <SourcesTextButtonStyle
        onClick={() => handleClick(!showSources)}
        aria-expanded={showSources}
      >
        <p>{i18n.t('feed.sources_answer')}</p>
        <ArrowLeftStyle />
      </SourcesTextButtonStyle>
      <SourcesContentContainerStyle>
        {chunks.map((chunk, index) => (
          <SourcesElements chunk={chunk} key={generateChunckId(chunk, index)} />
        ))}
      </SourcesContentContainerStyle>
    </SourcesContainerStyle>
  );
};
