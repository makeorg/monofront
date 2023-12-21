import React, { FC } from 'react';
import i18n from 'i18next';
import {
  ChunkType,
  DocumentMetadataType,
  TranscriptMetadataType,
} from '../../types';
import { YoutubePlayer } from '../ReactPlayer/YoutubePlayer';
import {
  SourcesContainerStyle,
  SourcesMediaContentStyle,
  SourcesMediaTextContainerStyle,
  SourcesMediaTitleStyle,
  SourcesMediaTextStyle,
  SourcesContentStyle,
  SourcesTitleStyle,
  SourcesTruncatedTextStyle,
  DocumentLogo,
  VideoLogo,
} from './style';
import { TRANSCRIPT } from '.';

const DocumentMeta: FC<{ metadata: DocumentMetadataType }> = ({ metadata }) => {
  const { documentTitle, page } = metadata;

  return (
    <SourcesMediaContentStyle key={documentTitle}>
      <SourcesMediaTextContainerStyle>
        <SourcesMediaTitleStyle>
          <DocumentLogo aria-hidden focusable="false" />
          <SourcesTruncatedTextStyle>{documentTitle}</SourcesTruncatedTextStyle>
        </SourcesMediaTitleStyle>
        <SourcesMediaTextStyle>{page}</SourcesMediaTextStyle>
      </SourcesMediaTextContainerStyle>
    </SourcesMediaContentStyle>
  );
};

const TranscriptMeta: FC<{ metadata: TranscriptMetadataType }> = ({
  metadata,
}) => {
  const { transcriptTitle, youtubeId, speaker } = metadata;
  return (
    <SourcesMediaContentStyle key={transcriptTitle}>
      <YoutubePlayer url={`https://www.youtube.com/embed/${youtubeId}`} small />
      <SourcesMediaTextContainerStyle>
        <SourcesMediaTitleStyle>
          <VideoLogo aria-hidden focusable="false" />
          <SourcesTruncatedTextStyle>
            {transcriptTitle}
          </SourcesTruncatedTextStyle>
        </SourcesMediaTitleStyle>
        <SourcesMediaTextStyle>{speaker}</SourcesMediaTextStyle>
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
        chunk.metadata.sourceType === TRANSCRIPT ? (
          <TranscriptMeta
            key={setChunkKey(index)}
            metadata={chunk.metadata as TranscriptMetadataType}
          />
        ) : (
          <DocumentMeta
            key={setChunkKey(index)}
            metadata={chunk.metadata as DocumentMetadataType}
          />
        )
      )}
    </SourcesContentStyle>
  </SourcesContainerStyle>
);
