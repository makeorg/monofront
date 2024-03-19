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
  SourcesTruncatedTextStyle,
  DocumentLogo,
  VideoLogo,
} from './style';
import { SOURCE_TYPE_VIDEO } from '.';
import { useTracking } from '../Tracking/useTracking';
import { useAssemblyContext } from '../../store/context';
import { useUtms } from '../Tracking/useUtms';

const DocumentMeta: FC<{ chunk: ChunkType }> = ({ chunk }) => {
  const { document_source_title, page_number } = chunk;
  const { state } = useAssemblyContext();
  const { event, sessionId, visitorId } = state;
  const { slug: eventSlug, language: eventLanguage, id: eventId } = event;
  const utms = useUtms();
  const tracker = useTracking();

  const onClick = () =>
    tracker.track('ACTION-SOURCE-LINK', {
      visitor_id: visitorId,
      source_document_link: chunk.document_source_url,
      language: eventLanguage,
      event_slug: eventSlug,
      document_type: chunk.document_source_type,
      session_id: sessionId,
      assembly_event_id: eventId,
      ...utms,
    });

  return (
    <SourcesMediaContentStyle>
      <SourcesMediaDocumentLinkStyle
        href={`${chunk.document_source_url}#page=${chunk.page_number}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        <SourcesMediaTitleStyle>
          <DocumentLogo aria-hidden focusable="false" />
          <SourcesTruncatedTextStyle>
            {document_source_title}
          </SourcesTruncatedTextStyle>
        </SourcesMediaTitleStyle>
        <SourcesMediaTextStyle>
          {`${i18n.t('feed.page')} ${page_number}`}
        </SourcesMediaTextStyle>
      </SourcesMediaDocumentLinkStyle>
    </SourcesMediaContentStyle>
  );
};

const TranscriptMeta: FC<{ chunk: ChunkType }> = ({ chunk }) => {
  const {
    document_source_title,
    document_source_url,
    document_source_type,
    speaker_name,
    speech_time,
  } = chunk;
  const { state } = useAssemblyContext();
  const { event, sessionId, visitorId } = state;
  const { slug: eventSlug, language: eventLanguage, id: eventId } = event;
  const utms = useUtms();
  const tracker = useTracking();

  const onClickPreview = () =>
    tracker.track('ACTION-SOURCE-LINK', {
      visitor_id: visitorId,
      source_document_link: document_source_url,
      language: eventLanguage,
      event_slug: eventSlug,
      document_type: document_source_type,
      session_id: sessionId,
      assembly_event_id: eventId,
      ...utms,
    });

  return (
    <SourcesMediaContentStyle>
      <YoutubePlayer
        url={document_source_url}
        seek={speech_time}
        small
        onClickPreview={onClickPreview}
      />
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
