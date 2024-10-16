import React, { FC, useEffect } from 'react';
import i18n from 'i18next';
import { useAssemblyContext } from '../../../store/context';
import { getRouteAssemblyEvent } from '../../../utils/routes';
import { getEventSources } from '../../../utils/services/DocumentSources';
import { setEventSources } from '../../../store/eventSources/action';
import { MetaTags } from '../../../components/Meta';
import {
  DocumentSourcesPageContainerStyle,
  DocumentSourcesPageMainTitleStyle,
  DocumentSourcesPageSubTitleStyle,
  DocumentSourcesPageUlStyle,
  DocumentSourcesPageButtonStyle,
  SvgArrowLeftStyle,
} from './style';
import { DocumentSourceType } from '../../../types';

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

  const sortDocumentsByType = (documents: DocumentSourceType[], type: string) =>
    documents
      ?.filter(document => document.type === type)
      .sort((a, b) => a.name.localeCompare(b.name));

  const videoDocument = sortDocumentsByType(documentSources, 'VIDEO');
  const pdfDocument = sortDocumentsByType(documentSources, 'PDF');

  return (
    <>
      <MetaTags
        title={i18n.t('meta.eventSources.title')}
        description={i18n.t('meta.eventSources.description')}
      />
      <DocumentSourcesPageContainerStyle>
        <DocumentSourcesPageButtonStyle
          href={getRouteAssemblyEvent(customer.slug, event.slug)}
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
            {videoDocument?.map((document: DocumentSourceType) => (
              <li key={document.title}>
                <a href={document.url} target="_blank" rel="noreferrer">
                  {document.title}
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
            {pdfDocument?.map((document: DocumentSourceType) => (
              <li key={document.title}>
                <a href={document.url} target="_blank" rel="noreferrer">
                  {document.title}
                </a>
              </li>
            ))}
          </DocumentSourcesPageUlStyle>
        </>
      </DocumentSourcesPageContainerStyle>
    </>
  );
};

// default export needed for loadable component
export default EventDocumentSourcesPage; // eslint-disable-line import/no-default-export
