import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFlexibleParagraphs from 'remark-flexible-paragraphs';
import i18n from 'i18next';
import { useAssemblyContext } from '../../../../store/context';
import { LegalPagesContainerStyle, LegalPagesContentStyle } from '../style';
import {
  markdownComponents,
  getContactMailByLanguage,
} from '../markdownComponent';

const LegalPage: FC = () => {
  const { state } = useAssemblyContext();
  const { language } = state;

  const contactMailByLanguage = getContactMailByLanguage(language);

  const replacements: Record<string, string> = {
    contact: contactMailByLanguage,
    linkEU: 'https://ec.europa.eu/consumers/odr',
  };

  return (
    <LegalPagesContainerStyle>
      <LegalPagesContentStyle>
        <ReactMarkdown
          components={markdownComponents()}
          remarkPlugins={[
            remarkGfm,
            [
              remarkFlexibleParagraphs,
              {
                paragraphClassName: 'custom',
                paragraphClassificationPrefix: 'custom',
              },
            ],
          ]}
        >
          {i18n.t('static:legal.content', replacements)}
        </ReactMarkdown>
      </LegalPagesContentStyle>
    </LegalPagesContainerStyle>
  );
};

// default export needed for loadable component
export default LegalPage; // eslint-disable-line import/no-default-export
