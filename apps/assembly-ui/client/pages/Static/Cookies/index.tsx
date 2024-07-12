import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFlexibleParagraphs from 'remark-flexible-paragraphs';
import i18n from 'i18next';
import { MetaTags } from '../../../../components/Meta';
import {
  CookieButtonStyle,
  LegalPagesContainerStyle,
  LegalPagesContentStyle,
  LegalPagesTextStyle,
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
    <>
      <MetaTags
        title={i18n.t('meta.cookies.title')}
        description={i18n.t('meta.cookies.description')}
      />
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
          <LegalPagesTextStyle>
            {i18n.t('static:cookies.modify')}
            <CookieButtonStyle
              onClick={() => {
                // useCookieFirst hooks from react-cookiefirt package doesn't work so we have to use another method
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                cookiefirst_show_settings();
              }}
            >
              {i18n.t('static:cookies.button')}
            </CookieButtonStyle>
          </LegalPagesTextStyle>
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
    </>
  );
};

// default export needed for loadable component
export default CookiesPage; // eslint-disable-line import/no-default-export
