/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC } from 'react';
import i18n from 'i18next';
import { ACCESSIBILITY_EMAIL } from '@make.org/utils/constants/config';
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
import { useAppContext } from '@make.org/store';
import { MetaTags } from '@make.org/components/MetaTags';
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { env } from '@make.org/assets/env';
import { summary } from '@make.org/utils/constants/accessibilitySummary';
import {
  StaticPageWrapperStyle,
  StaticSecondLevelTitleStyle,
  StaticParagraphStyle,
  StaticPrimaryOrderedListStyle,
  StaticPrimaryOrderedListItemStyle,
  StaticThirdLevelTitleStyle,
  StaticFourthLevelTitleStyle,
  StaticSquareListItemStyle,
  StaticSquareListStyle,
  StaticExternalLinkIconStyle,
  FocusBlockWrapperStyle,
  FocusBlockTitleStyle,
  FocusBlockParagraphStyle,
  FocusBlockCheckIconStyle,
} from '../style';

declare global {
  interface Window {
    FRONT_URL?: string;
  }
}

export const A11yEN: FC = () => {
  const { state } = useAppContext();
  const { country, language } = state.appConfig;
  const FRONT_URL = env.frontUrl() || window.FRONT_URL;

  return (
    <>
      <MetaTags
        title={i18n.t('meta.a11y.title')}
        description={i18n.t('meta.a11y.description')}
      />
      <StaticPageWrapperStyle>
        <StaticSecondLevelTitleStyle>
          Declaration of accessibility
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Make.org undertakes to render its website accessible in accordance
          with article 47 of Act no. 2005-102 of 11 February 2005.{' '}
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          {'This declaration of accessibility applies to '}
          <RedHTMLLinkElementStyle href={FRONT_URL}>
            {FRONT_URL}
          </RedHTMLLinkElementStyle>
          .
        </StaticParagraphStyle>
        <FocusBlockWrapperStyle as="section">
          <FocusBlockCheckIconStyle aria-hidden focusable="false" />
          <FocusBlockTitleStyle>
            {`${summary.criteria.pourcentOk}% `}
            of the{' '}
            <abbr
              lang="fr"
              title="Référentiel Général d’Amélioration de l’Accessibilité"
            >
              RGAA
            </abbr>{' '}
            4.0 criteria are satisfied
          </FocusBlockTitleStyle>
          <FocusBlockParagraphStyle>
            Make.org undertakes to improve accessibility and inclusion in the
            digital world. The RGAA (General Accessibility Framework for
            Administrations) is an authoritative document setting out
            accessibility standards that our design and technical teams seek to
            meet as far as possible.
          </FocusBlockParagraphStyle>
          <FocusBlockParagraphStyle className="no-margin">
            In the interests of transparency, the aim of this page is to
            indicate the current state of Make.org’s accessibility.
          </FocusBlockParagraphStyle>
        </FocusBlockWrapperStyle>
        <FocusBlockWrapperStyle as="section">
          <FocusBlockTitleStyle>
            Discover our commitment to digital accessibility{' '}
          </FocusBlockTitleStyle>
          <FocusBlockParagraphStyle>
            To ensure that democracy remains everyone’s business, it is
            essential that inclusion and accessibility issues be taken into
            account. The exercising of one’s citizenship is a fundamental right
            that must not be disturbed or limited by any question of disability.{' '}
            <strong>
              That’s why Démocratie Ouverte and Make.org, two democratic
              innovation players, worked hand in hand with the CNCPH to draw up
              an accessibility charter for citizens’ participation systems.
            </strong>{' '}
            This charter, signed on 17 December 2021, makes the preceding
            commitments by the two organisations official and formalises the
            intention to continue in this direction.
          </FocusBlockParagraphStyle>
          <RedHTMLLinkElementStyle
            href={`${FRONT_URL}/convention/cncph.html`}
            target="_blank"
            rel="noopener"
          >
            Download the charter (html version)
            <StaticExternalLinkIconStyle aria-hidden focusable="false" />
            <ScreenReaderItemStyle>
              {i18n.t('common.open_new_window')}
            </ScreenReaderItemStyle>
          </RedHTMLLinkElementStyle>
        </FocusBlockWrapperStyle>
        <StaticPrimaryOrderedListStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              Compliance status
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org complies partly with the
              <> </>
              <RedHTMLLinkElementStyle
                href="https://www.numerique.gouv.fr/publications/rgaa-accessibilite/"
                target="_blank"
                rel="noopener"
              >
                <abbr
                  lang="fr"
                  title="Référentiel Général d’Amélioration de l’Accessibilité - version 4.0"
                >
                  RGAA 4.0
                </abbr>
                <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                <ScreenReaderItemStyle>
                  {i18n.t('common.open_new_window')}
                </ScreenReaderItemStyle>
              </RedHTMLLinkElementStyle>
              .
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              Test results
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              The internal compliance audit reveals that:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successOk} tests are successfully carried out.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successKo} tests fail.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successNa} tests are concerned with inapplicable criteria.`}
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successOk} criteria are satisfied.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successKo} criteria are not satisfied.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successNa} criteria are not applicable.`}
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              So
              {` ${summary.criteria.pourcentOk}% of the `}
              <abbr title="Référentiel Général d’Amélioration de l’Accessibilité">
                RGAA 4.0
              </abbr>
              <> </>
              criteria are satisfied.{' '}
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              Establishment of this declaration of accessibility{' '}
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              This declaration was established on 04 November 2020. It was
              updated on 04 November 2020.{' '}
            </StaticParagraphStyle>
            <StaticFourthLevelTitleStyle>
              Technologies used in the creation of the Make.org website:
            </StaticFourthLevelTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>HTML5</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>CSS</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>Javascript</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                React JS version 16
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                See the <> </>
                <RedHTMLLinkElementStyle
                  href="https://gitlab.com/makeorg/platform/front/-/blob/production/package.json"
                  target="_blank"
                  rel="noopener"
                >
                  full list of technologies used{' '}
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticFourthLevelTitleStyle>
              User agents, assistive technologies and tools used to verify
              accessibility:{' '}
            </StaticFourthLevelTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Chrome 86 / Mac OS 10.15 VoiceOver
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Firefox 82.0 / Linux Orca 3.36.2
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticFourthLevelTitleStyle>
              The following tools were used during the evaluation:{' '}
            </StaticFourthLevelTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle lang="en">
                Google Lighthouse
                <> </>
                <RedHTMLLinkElementStyle
                  href="https://developers.google.com/web/tools/lighthouse#devtools"
                  target="_blank"
                  rel="noopener"
                >
                  DevTools
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle lang="fr">
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle lang="en">
                Google Lighthouse
                <> </>
                <RedHTMLLinkElementStyle
                  href="https://github.com/GoogleChrome/lighthouse-ci"
                  target="_blank"
                  rel="noopener"
                >
                  CI
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle lang="fr">
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                <span lang="en">Web Developer</span>
                <> </>
                <RedHTMLLinkElementStyle
                  href="https://chrispederick.com/work/web-developer/"
                  target="_blank"
                  rel="noopener"
                >
                  browser plug-in{' '}
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Axe
                <> </>
                <RedHTMLLinkElementStyle
                  href="https://www.deque.com/axe/browser-extensions/"
                  target="_blank"
                  rel="noopener"
                >
                  browser plug-in{' '}
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle lang="en">
                WCAG Color contrast checker
                <> </>
                <RedHTMLLinkElementStyle
                  href="
              https://chrome.google.com/webstore/detail/wcag-color-contrast-check/plnahcmalebffmaghcpcmpaciebdhgdf"
                  target="_blank"
                  rel="noopener"
                  lang="fr"
                >
                  browser plug-in{' '}
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticFourthLevelTitleStyle>
              The website’s pages that have undergone compliance verification:{' '}
            </StaticFourthLevelTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {'Homepage France: '}
                <RedHTMLLinkElementStyle href={getHomeLink('FR')}>
                  {FRONT_URL + getHomeLink('FR')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Homepage Great Britain: '}
                <RedHTMLLinkElementStyle href={getHomeLink('GB')}>
                  {FRONT_URL + getHomeLink('GB')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Consultations browsing page: '}
                <RedHTMLLinkElementStyle
                  href={getBrowseConsultationsLink(country)}
                >
                  {FRONT_URL + getBrowseConsultationsLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Results browsing page: '}
                <RedHTMLLinkElementStyle href={getBrowseResultsLink(country)}>
                  {FRONT_URL + getBrowseResultsLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Consultation page: '}
                {FRONT_URL + getParticipateLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Sequenced solutions page: '}
                {FRONT_URL + getSequenceLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Consultation results page: '}
                {FRONT_URL + getResultsLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Consultation top ideas page: '}
                {FRONT_URL + getTopIdeasLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Consultation top idea details page: '}
                {FRONT_URL +
                  getTopIdeaDetailsLink(country, 'dynamicslug', 'ideaId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Solution page: '}
                {FRONT_URL +
                  getProposalLink(
                    country,
                    'dynamicslug',
                    'proposalSlug',
                    'proposalId'
                  )}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Password reset page: '}
                {FRONT_URL +
                  getPasswordRecoveryLink(country, 'userId', 'resetToken')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'User profile page: '}
                {FRONT_URL + getRouteProfile(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'User profile editing page: '}
                {FRONT_URL + getRouteProfileEdit(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'User’s solutions list page: '}
                {FRONT_URL + getRouteProfileProposals(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'User’s favourite solutions list page: '}
                {FRONT_URL + getRouteProfileFavourites(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Personality’s opinions page: '}
                {FRONT_URL + getRouteProfileOpinions(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Personality’s public profile page: '}
                {FRONT_URL + getPersonalityProfileLink(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Organisation’s public profile solutions page: '}
                {FRONT_URL + getRouteOrganisationProposals(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Organisation’s public profile votes page: '}
                {FRONT_URL + getRouteOrganisationVotes(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Search results page: '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearch(country, 'accessibilité')}
                >
                  {FRONT_URL + getRouteSearch(country, 'accessibilité')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Solutions search results page: '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchProposals(country, 'accessibilité')}
                >
                  {FRONT_URL +
                    getRouteSearchProposals(country, 'accessibilité')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Organisations’ search results page: '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchOrganisations(country, 'association')}
                >
                  {FRONT_URL +
                    getRouteSearchOrganisations(country, 'association')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Consultations search results page: '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchConsultations(country, 'comment')}
                >
                  {FRONT_URL + getRouteSearchConsultations(country, 'comment')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Legal notices page: '}
                <RedHTMLLinkElementStyle
                  href={getLegalPageLink(country, language)}
                >
                  {FRONT_URL + getLegalPageLink(country, language)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Conditions of use page: '}
                <RedHTMLLinkElementStyle
                  href={getGTUPageLink(country, language)}
                >
                  {FRONT_URL + getGTUPageLink(country, language)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Data policy page: '}
                <RedHTMLLinkElementStyle
                  href={getDataPageLink(country, language)}
                >
                  {FRONT_URL + getDataPageLink(country, language)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Accessibility declaration page: '}
                <RedHTMLLinkElementStyle
                  href={getA11YPageLink(country, language)}
                >
                  {FRONT_URL + getA11YPageLink(country, language)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Contact page: '}
                <RedHTMLLinkElementStyle
                  href={getContactPageLink(country, language)}
                >
                  {FRONT_URL + getContactPageLink(country, language)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              Feedback and contact
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              If you are unable to access particular content or a service, you
              can contact the website manager to be redirected to an accessible
              alternative or obtain the content in another form.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              {'Contact us at this e-mail address: '}
              <RedHTMLLinkElementStyle href={`mailto:${ACCESSIBILITY_EMAIL}`}>
                {`${ACCESSIBILITY_EMAIL}`}
              </RedHTMLLinkElementStyle>
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
        </StaticPrimaryOrderedListStyle>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default A11yEN; // eslint-disable-line import/no-default-export
