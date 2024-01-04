import React, { FC } from 'react';
import i18n from 'i18next';
import { ChunkType } from '../../types';
import { YoutubePlayer } from '../ReactPlayer/YoutubePlayer';
import {
  SourcesContainerStyle,
  SourcesMediaContentStyle,
  SourcesMediaTextContainerStyle,
  SourcesMediaDocumentLinkStyle,
  SourcesMediaTitleStyle,
  SourcesMediaTextStyle,
  SourcesContentStyle,
  SourcesTitleStyle,
  SourcesTruncatedTextStyle,
  DocumentLogo,
  VideoLogo,
} from './style';
import { SOURCE_TYPE_VIDEO } from '.';

const DocumentMeta: FC<{ chunk: ChunkType }> = ({ chunk }) => {
  const { document_source_title, page_number } = chunk;

  return (
    <SourcesMediaContentStyle key={document_source_title}>
      <SourcesMediaDocumentLinkStyle
        href={`${chunk.document_source_url}#page=${chunk.page_number}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SourcesMediaTitleStyle>
          <DocumentLogo aria-hidden focusable="false" />
          <SourcesTruncatedTextStyle>
            {document_source_title}
          </SourcesTruncatedTextStyle>
        </SourcesMediaTitleStyle>
        <SourcesMediaTextStyle>
          {i18n.t('feed.page')}
          {page_number}
        </SourcesMediaTextStyle>
      </SourcesMediaDocumentLinkStyle>
    </SourcesMediaContentStyle>
  );
};

const TranscriptMeta: FC<{ chunk: ChunkType }> = ({ chunk }) => {
  const {
    document_source_title,
    document_source_url,
    speaker_name,
    speech_time,
  } = chunk;
  return (
    <SourcesMediaContentStyle key={document_source_title}>
      <YoutubePlayer url={document_source_url} seek={speech_time} small />
      <SourcesMediaTextContainerStyle>
        <SourcesMediaTitleStyle>
          <VideoLogo aria-hidden focusable="false" />
          <SourcesTruncatedTextStyle>
            {document_source_title}
          </SourcesTruncatedTextStyle>
        </SourcesMediaTitleStyle>
        <SourcesMediaTextStyle>{speaker_name}</SourcesMediaTextStyle>
      </SourcesMediaTextContainerStyle>
    </SourcesMediaContentStyle>
  );
};

const setChunkKey = (index: number) => `chunk-${index}`;

export const Sources: FC<{
  chunks: ChunkType[];
}> = ({ chunks }) => (
  <SourcesContainerStyle>
    <SourcesTitleStyle>{i18n.t('feed.sources')}</SourcesTitleStyle>
    <SourcesContentStyle>
      {chunks.map((chunk, index) =>
        chunk.document_source_type === SOURCE_TYPE_VIDEO ? (
          <TranscriptMeta key={setChunkKey(index)} chunk={chunk} />
        ) : (
          <DocumentMeta key={setChunkKey(index)} chunk={chunk} />
        )
      )}
    </SourcesContentStyle>
  </SourcesContainerStyle>
);
