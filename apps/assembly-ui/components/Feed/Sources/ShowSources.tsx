import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { ChunkType } from '../../../types';
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
  const [showSources, setShowSources] = useState(false);

  if (!showSources) {
    return (
      <SourcesContainerButtonStyle
        onClick={() => setShowSources(!showSources)}
        aria-expanded={showSources}
      >
        <SourcesTextIconBlockStyle>
          <p>{i18n.t('feed.sources')}</p>
          <SourcesIconsContainerStyle>
            {chunks.map((chunk, index) =>
              chunk.document_source_type === SOURCE_TYPE_DOCUMENT ? (
                <SourcesDocumentStyle aria-hidden focusable="false" />
              ) : (
                <SourcesVideoStyle aria-hidden focusable="false" />
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
        onClick={() => setShowSources(!showSources)}
        aria-expanded={showSources}
      >
        <p>{i18n.t('feed.sources_answer')}</p>
        <ArrowLeftStyle />
      </SourcesTextButtonStyle>
      <SourcesContentContainerStyle>
        {chunks.map((chunk, index) => (
          <SourcesElements chunk={chunk} />
        ))}
      </SourcesContentContainerStyle>
    </SourcesContainerStyle>
  );
};
