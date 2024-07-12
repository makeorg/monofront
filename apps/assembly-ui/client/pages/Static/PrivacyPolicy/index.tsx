import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFlexibleParagraphs from 'remark-flexible-paragraphs';
import i18n from 'i18next';
import { useAssemblyContext } from '../../../../store/context';
import { ROUTE_ASSEMBLY_COOKIES } from '../../../../utils/routes';
import { MetaTags } from '../../../../components/Meta';
import { LegalPagesContainerStyle, LegalPagesContentStyle } from '../style';
import {
  markdownComponents,
  getContactMailByLanguage,
} from '../markdownComponent';
import { env } from '../../../../utils/env';

const PrivacyPolicyPage: FC = () => {
  const { state } = useAssemblyContext();
  const { language } = state;

  const contactMailByLanguage = getContactMailByLanguage(language);
  const FRONT_URL = env.frontUrl() || window.FRONT_URL || '';

  const replacements: Record<string, string> = {
    frontUrl: FRONT_URL,
    contact: contactMailByLanguage,
    contactBe: 'contact-be@make.org',
    assembly: ROUTE_ASSEMBLY_COOKIES,
  };

  return (
    <>
      <MetaTags
        title={i18n.t('meta.confidentiality.title')}
        description={i18n.t('meta.confidentiality.description')}
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
            {i18n.t('static:privacy.content', replacements)}
          </ReactMarkdown>
        </LegalPagesContentStyle>
      </LegalPagesContainerStyle>
    </>
  );
};

// default export needed for loadable component
export default PrivacyPolicyPage; // eslint-disable-line import/no-default-export
