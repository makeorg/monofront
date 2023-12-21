import React, { FC } from 'react';
import i18n from 'i18next';
import { ChunkTranscriptType } from '../../types';
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
import { DOCUMENT } from '.';

export const Sources: FC<{
  chunks: ChunkTranscriptType[]; // | ChunkDocumentType[];
}> = ({ chunks }) => {
  // Structure is needed, I simplified it for now, but document won't have transcript title, speaker ect, all variables will be different
  // And possibly styles will be update as well
  const chunkDocument = (chunk: ChunkTranscriptType) => (
    // will need to be updated to ChunkcDocumentType
    <SourcesMediaContentStyle key={chunk.transcriptTitle}>
      <SourcesMediaTextContainerStyle>
        <SourcesMediaTitleStyle>
          <DocumentLogo aria-hidden focusable="false" />
          <SourcesTruncatedTextStyle>
            {chunk.transcriptTitle}
          </SourcesTruncatedTextStyle>
        </SourcesMediaTitleStyle>
        <SourcesMediaTextStyle>{chunk.speaker}</SourcesMediaTextStyle>
      </SourcesMediaTextContainerStyle>
    </SourcesMediaContentStyle>
  );

  const chunkTranscript = (chunk: ChunkTranscriptType) => (
    <SourcesMediaContentStyle key={chunk.transcriptTitle}>
      <YoutubePlayer url={chunk.youtubeId} small />
      <SourcesMediaTextContainerStyle>
        <SourcesMediaTitleStyle>
          <VideoLogo aria-hidden focusable="false" />
          <SourcesTruncatedTextStyle>
            {chunk.transcriptTitle}
          </SourcesTruncatedTextStyle>
        </SourcesMediaTitleStyle>
        <SourcesMediaTextStyle>{chunk.speaker}</SourcesMediaTextStyle>
      </SourcesMediaTextContainerStyle>
    </SourcesMediaContentStyle>
  );

  return (
    <SourcesContainerStyle>
      <SourcesTitleStyle>{i18n.t('feed.sources')}</SourcesTitleStyle>
      <SourcesContentStyle>
        {chunks.map(chunk =>
          chunk.sourceType === DOCUMENT
            ? chunkTranscript(chunk)
            : chunkDocument(chunk)
        )}
      </SourcesContentStyle>
    </SourcesContainerStyle>
  );
};
