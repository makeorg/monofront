import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFlexibleParagraphs from 'remark-flexible-paragraphs';
import i18n from 'i18next';
import {
  LegalPagesContainerStyle,
  LegalPagesContentStyle,
  LegalTableStyle,
} from '../style';
import {
  markdownComponents,
  getContactMailByLanguage,
} from '../markdownComponent';
import { useAssemblyContext } from '../../../../store/context';
import { env } from '../../../../utils/env';

const CookiesPage: FC = () => {
  const { state } = useAssemblyContext();
  const { language } = state;

  const contactMailByLanguage = getContactMailByLanguage(language);
  const FRONT_URL = env.frontUrl() || window.FRONT_URL || '';

  const replacements: Record<string, string> = {
    frontUrl: FRONT_URL,
    contact: contactMailByLanguage,
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
          {i18n.t('static:cookies.before_table', replacements)}
        </ReactMarkdown>

        <LegalTableStyle id="cookiefirst-cookies-table" />
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
          {i18n.t('static:cookies.after_table')}
        </ReactMarkdown>
      </LegalPagesContentStyle>
    </LegalPagesContainerStyle>
  );
};

// default export needed for loadable component
export default CookiesPage; // eslint-disable-line import/no-default-export
