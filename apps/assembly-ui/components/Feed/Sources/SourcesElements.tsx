import React, { FC } from 'react';
import i18n from 'i18next';
import { ChunkType } from '../../../types';
import {
  SourcesDocumentStyle,
  SourcesVideoStyle,
  SourcesContentVideoStyle,
  SourcesTitleContainerStyle,
  SourcesTitleStyle,
  SourcesSubStyle,
  SourcesContentDocumentStyle,
} from './style';
import { useTracking } from '../../Tracking/useTracking';
import { useAssemblyContext } from '../../../store/context';
import { useUtms } from '../../Tracking/useUtms';
import { SOURCE_TYPE_DOCUMENT } from '..';

export const SourcesElements: FC<{ chunk: ChunkType }> = ({ chunk }) => {
  const {
    document_source_title,
    document_source_url,
    document_source_type,
    speaker_name,
    page_number,
  } = chunk;
  const { state } = useAssemblyContext();
  const { event, sessionId, visitorId } = state;
  const { slug: eventSlug, language: eventLanguage, id: eventId } = event;
  const utms = useUtms();
  const tracker = useTracking();

  const onClick = () =>
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

  if (chunk.document_source_type === SOURCE_TYPE_DOCUMENT) {
    return (
      <SourcesContentDocumentStyle
        href={`${document_source_url}#page=${page_number}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        <SourcesDocumentStyle aria-hidden focusable="false" />
        <SourcesTitleContainerStyle>
          <SourcesTitleStyle>{document_source_title}</SourcesTitleStyle>
          <SourcesSubStyle>{`${i18n.t(
            'feed.page'
          )} ${page_number}`}</SourcesSubStyle>
        </SourcesTitleContainerStyle>
      </SourcesContentDocumentStyle>
    );
  }

  return (
    <SourcesContentVideoStyle>
      <SourcesVideoStyle aria-hidden focusable="false" />
      <SourcesTitleContainerStyle>
        <SourcesTitleStyle>{document_source_title}</SourcesTitleStyle>
        <SourcesSubStyle>{speaker_name}</SourcesSubStyle>
      </SourcesTitleContainerStyle>
    </SourcesContentVideoStyle>
  );
};
