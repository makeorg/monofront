import React, { FC, ReactNode } from 'react';
import {
  MAKE_ADDRESS,
  ACCESSIBILITY_EMAIL,
} from '@make.org/utils/constants/config';
import { useAppContext } from '@make.org/store';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  getA11YPageLink,
  getBrowseConsultationsLink,
  getBrowseResultsLink,
  getParticipateLink,
  getContactPageLink,
  getDataPageLink,
  getGTUPageLink,
  getHomeLink,
  getLegalPageLink,
  getPasswordRecoveryLink,
  getPersonalityProfileLink,
  getProposalLink,
  getResultsLink,
  getSequenceLink,
  getTopIdeaDetailsLink,
  getTopIdeasLink,
} from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFlexibleParagraphs from 'remark-flexible-paragraphs';
import { env } from '@make.org/assets/env';
import { summary } from '@make.org/utils/constants/accessibilitySummary';
import {
  getRouteOrganisationProposals,
  getRouteOrganisationVotes,
  getRouteProfile,
  getRouteProfileEdit,
  getRouteProfileFavourites,
  getRouteProfileOpinions,
  getRouteProfileProposals,
  getRouteSearch,
  getRouteSearchConsultations,
  getRouteSearchOrganisations,
  getRouteSearchProposals,
} from '@make.org/utils/routes';
import {
  StaticPageWrapperStyle,
  StaticFourthLevelBisTitleStyle,
  FocusBlockWrapperStyle,
  FocusBlockCheckIconStyle,
  FocusBlockParagraphStyle,
  FocusBlockTitleStyle,
} from '../style';

import { markdownComponents } from '../markdownComponent';

export const A11y: FC = () => {
  const { state } = useAppContext();
  const { country, language } = state.appConfig;

  const FRONT_URL = env.frontUrl() || window.FRONT_URL || '.';
  const replacements: Record<string, string> = {
    frontUrl: FRONT_URL,
    address: MAKE_ADDRESS,
    pourcentOk: `${summary.criteria.pourcentOk}`,
    testOk: `${summary.test.successOk}`,
    testKo: `${summary.test.successKo}`,
    testNa: `${summary.test.successNa}`,
    criteriaOk: `${summary.criteria.successOk}`,
    criteriaKo: `${summary.criteria.successKo}`,
    criteriaNa: `${summary.criteria.successNa}`,
    accessibilityEmail: ACCESSIBILITY_EMAIL,
    linkHomeFR: FRONT_URL + getHomeLink('FR'),
    linkHomeGB: FRONT_URL + getHomeLink('GB'),
    linkBrowseConsultations: FRONT_URL + getBrowseConsultationsLink(country),
    linkBrowseResults: FRONT_URL + getBrowseResultsLink(country),
    linkParticipate: FRONT_URL + getParticipateLink(country, 'dynamicslug'),
    linkSequence: FRONT_URL + getSequenceLink(country, 'dynamicslug'),
    linkResults: FRONT_URL + getResultsLink(country, 'dynamicslug'),
    linkTopIdea: FRONT_URL + getTopIdeasLink(country, 'dynamicslug'),
    linkTopIdeaDetail:
      FRONT_URL + getTopIdeaDetailsLink(country, 'dynamicslug', 'ideaId'),
    linkProposal:
      FRONT_URL +
      getProposalLink(country, 'dynamicslug', 'proposalSlug', 'proposalId'),
    linkPasswordRecovery:
      FRONT_URL + getPasswordRecoveryLink(country, 'userId', 'resetToken'),
    linkProfile: FRONT_URL + getRouteProfile(country),
    linkEditProfile: FRONT_URL + getRouteProfileEdit(country),
    linkProposalsProfile: FRONT_URL + getRouteProfileProposals(country),
    linkFavouritesProfile: FRONT_URL + getRouteProfileFavourites(country),
    linkOpinionsProfile: FRONT_URL + getRouteProfileOpinions(country),
    linkPersonalityProfile:
      FRONT_URL + getPersonalityProfileLink(country, 'userId'),
    linkOrganisationProposals:
      FRONT_URL + getRouteOrganisationProposals(country, 'userId'),
    linkOrganisationVotes:
      FRONT_URL + getRouteOrganisationVotes(country, 'userId'),
    linkSearch: FRONT_URL + getRouteSearch(country, 'accessibilité'),
    linkProposalsSearch:
      FRONT_URL + getRouteSearchProposals(country, 'accessibilité'),
    linkOrganisationsSearch:
      FRONT_URL + getRouteSearchOrganisations(country, 'association'),
    linkConsultationsSearch:
      FRONT_URL + getRouteSearchConsultations(country, 'comment'),
    linkLegal: FRONT_URL + getLegalPageLink(country, language),
    linkGTU: FRONT_URL + getGTUPageLink(country, language),
    linkData: FRONT_URL + getDataPageLink(country, language),
    linkA11Y: FRONT_URL + getA11YPageLink(country, language),
    linkContact: FRONT_URL + getContactPageLink(country, language),
  };

  type elProps = {
    children: ReactNode;
  };
  const h4Component = ({ children }: elProps) => (
    <StaticFourthLevelBisTitleStyle>{children}</StaticFourthLevelBisTitleStyle>
  );
  const blockTitle = ({ children }: elProps) => (
    <FocusBlockTitleStyle>{children}</FocusBlockTitleStyle>
  );
  const blockParagraph = ({ children }: elProps) => (
    <FocusBlockParagraphStyle>{children}</FocusBlockParagraphStyle>
  );
  return (
    <>
      <MetaTags
        title={i18n.t('meta.a11y.title')}
        description={i18n.t('meta.a11y.description')}
      />
      <StaticPageWrapperStyle>
        <ReactMarkdown
          components={{
            ...markdownComponents(),
            h4: h4Component,
          }}
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
          {i18n.t('static:a11y.introduction', replacements)}
        </ReactMarkdown>
        {i18n.exists('static:a11y.firstFocus') && (
          <FocusBlockWrapperStyle as="section">
            <FocusBlockCheckIconStyle aria-hidden focusable="false" />
            <ReactMarkdown
              components={{
                ...markdownComponents(),
                h1: blockTitle,
                p: blockParagraph,
              }}
            >
              {i18n.t('static:a11y.firstFocus', replacements)}
            </ReactMarkdown>
          </FocusBlockWrapperStyle>
        )}
        {i18n.exists('static:a11y.secondFocus') && (
          <FocusBlockWrapperStyle as="section">
            <ReactMarkdown
              components={{
                ...markdownComponents(),
                h1: blockTitle,
                p: blockParagraph,
              }}
            >
              {i18n.t('static:a11y.secondFocus', replacements)}
            </ReactMarkdown>
          </FocusBlockWrapperStyle>
        )}

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
          {i18n.t('static:a11y.content', replacements)}
        </ReactMarkdown>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default A11y; // eslint-disable-line import/no-default-export
