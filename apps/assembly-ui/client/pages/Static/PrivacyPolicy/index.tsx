import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFlexibleParagraphs from 'remark-flexible-paragraphs';
import i18n from 'i18next';
import { useAssemblyContext } from '../../../../store/context';
import { ROUTE_ASSEMBLY_COOKIES } from '../../../../utils/routes';
import { LegalPagesContainerStyle, LegalPagesContentStyle } from '../style';
import {
  markdownComponents,
  getContactMailByLanguage,
} from '../markdownComponent';

const PrivacyPolicyPage: FC = () => {
  const { state } = useAssemblyContext();
  const { language } = state;

  const contactMailByLanguage = getContactMailByLanguage(language);

  const replacements: Record<string, string> = {
    contact: contactMailByLanguage,
    contactBe: 'contact-be@make.org',
    assembly: ROUTE_ASSEMBLY_COOKIES,
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
          {i18n.t('static:privacy.content', replacements)}
        </ReactMarkdown>
      </LegalPagesContentStyle>
    </LegalPagesContainerStyle>
  );
};

// default export needed for loadable component
export default PrivacyPolicyPage; // eslint-disable-line import/no-default-export
