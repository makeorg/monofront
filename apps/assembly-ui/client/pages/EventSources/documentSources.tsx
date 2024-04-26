import React, { FC, useEffect } from 'react';
import i18n from 'i18next';
import { useAssemblyContext } from '../../../store/context';
import { getRouteAssemblyEventNoOnboarding } from '../../../utils/routes';
import { getEventSources } from '../../../utils/services/DocumentSources';
import { setEventSources } from '../../../store/eventSources/action';
import {
  DocumentSourcesPageContainerStyle,
  DocumentSourcesPageMainTitleStyle,
  DocumentSourcesPageSubTitleStyle,
  DocumentSourcesPageUlStyle,
  DocumentSourcesPageButtonStyle,
  SvgArrowLeftStyle,
} from './style';

const EventDocumentSourcesPage: FC = () => {
  const { state, dispatch } = useAssemblyContext();
  const { documentSources, event, customer } = state;

  const getDocuments = async () => {
    const documents = await getEventSources(event.id);
    if (documents) {
      dispatch(setEventSources(documents));
    }
  };

  useEffect(() => {
    if (documentSources.length === 0) {
      getDocuments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const videoDocument = documentSources?.filter(
    document => document.type === 'VIDEO'
  );
  const pdfDocument = documentSources?.filter(
    document => document.type === 'PDF'
  );

  return (
    <DocumentSourcesPageContainerStyle>
      <DocumentSourcesPageButtonStyle
        href={getRouteAssemblyEventNoOnboarding(customer.slug, event.slug, {
          displayonboarding: false,
        })}
      >
        <SvgArrowLeftStyle />
        {i18n.t('sources_page.see')}
      </DocumentSourcesPageButtonStyle>
      <DocumentSourcesPageMainTitleStyle>
        {i18n.t('sources_page.consult')} {event.name}
      </DocumentSourcesPageMainTitleStyle>
      <>
        <DocumentSourcesPageSubTitleStyle>
          {i18n.t('sources_page.videos')}
        </DocumentSourcesPageSubTitleStyle>
        <DocumentSourcesPageUlStyle>
          {videoDocument?.map(document => (
            <li key={document.name}>
              <a href={document.url} target="_blank" rel="noreferrer">
                {document.name}
              </a>
            </li>
          ))}
        </DocumentSourcesPageUlStyle>
      </>
      <>
        <DocumentSourcesPageSubTitleStyle>
          {i18n.t('sources_page.docs')}
        </DocumentSourcesPageSubTitleStyle>
        <DocumentSourcesPageUlStyle>
          {pdfDocument?.map(document => (
            <li key={document.name}>
              <a href={document.url} target="_blank" rel="noreferrer">
                {document.name}
              </a>
            </li>
          ))}
        </DocumentSourcesPageUlStyle>
      </>
    </DocumentSourcesPageContainerStyle>
  );
};

// default export needed for loadable component
export default EventDocumentSourcesPage; // eslint-disable-line import/no-default-export
