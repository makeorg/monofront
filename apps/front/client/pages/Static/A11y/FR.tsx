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

export const A11yFR: FC = () => {
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
          Déclaration d’Accessibilté
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Make.org s’engage à rendre son site internet accessible conformément à
          l’article 47 de la loi n° 2005-102 du 11 février 2005.
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          {'Cette déclaration d’accessibilité s’applique à '}
          <RedHTMLLinkElementStyle href={FRONT_URL}>
            {FRONT_URL}
          </RedHTMLLinkElementStyle>
          .
        </StaticParagraphStyle>
        <FocusBlockWrapperStyle as="section">
          <FocusBlockCheckIconStyle aria-hidden focusable="false" />
          <FocusBlockTitleStyle>
            {`${summary.criteria.pourcentOk}% `}
            des critères{' '}
            <abbr title="Référentiel Général d’Amélioration de l’Accessibilité">
              RGAA
            </abbr>{' '}
            4.0 sont respectés
          </FocusBlockTitleStyle>
          <FocusBlockParagraphStyle>
            Make.org s&apos;engage à améliorer l&apos;accessibilité et
            l&apos;inclusion dans le numérique. Le RGAA (référentiel général
            d’amélioration de l’accessibilité) est un document d&apos;autorité,
            énonçant des normes d&apos;accessibilité auxquelles nos équipes de
            conception et techniques cherchent à se rapprocher au maximum.
          </FocusBlockParagraphStyle>
          <FocusBlockParagraphStyle className="no-margin">
            De façon transparente, cette page a pour but d&apos;indiquer
            l&apos;état actuel de l&apos;accessibilité de Make.org.
          </FocusBlockParagraphStyle>
        </FocusBlockWrapperStyle>
        <FocusBlockWrapperStyle as="section">
          <FocusBlockTitleStyle>
            Découvrez notre engagement pour l’accessibilité numérique
          </FocusBlockTitleStyle>
          <FocusBlockParagraphStyle>
            Pour que la démocratie reste l’affaire de toutes et tous, la prise
            en compte des enjeux d&apos;inclusion et d’accessibilité est
            essentielle. L’exercice de la citoyenneté est un droit fondamental
            qui ne doit pas se voir inquiété ou limité par une ou des situations
            de handicap.{' '}
            <strong>
              C’est pourquoi Démocratie Ouverte et Make.org, deux acteurs de
              l’innovation démocratique, ont travaillé aux côtés du CNCPH à
              l’élaboration d’une charte d&apos;accessibilité des outils de de
              participation citoyenne.
            </strong>{' '}
            Cette charte, signée le 17 décembre 2021, 2021, officialise les
            engagements précédents des deux organisations acte la volonté de
            continuer en ce sens.
          </FocusBlockParagraphStyle>
          <RedHTMLLinkElementStyle
            href={`${FRONT_URL}/convention/cncph.html`}
            target="_blank"
            rel="noopener"
          >
            Télécharger la Charte (version html)
            <StaticExternalLinkIconStyle aria-hidden focusable="false" />
            <ScreenReaderItemStyle>
              {i18n.t('common.open_new_window')}
            </ScreenReaderItemStyle>
          </RedHTMLLinkElementStyle>
        </FocusBlockWrapperStyle>
        <StaticPrimaryOrderedListStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              État de conformité
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org est en conformité partielle avec le
              <> </>
              <RedHTMLLinkElementStyle
                href="https://www.numerique.gouv.fr/publications/rgaa-accessibilite/"
                target="_blank"
                rel="noopener"
              >
                <abbr title="Référentiel Général d’Amélioration de l’Accessibilité - version 4.0">
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
              Résultats des tests
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              L’audit de conformité réalisé en interne révèle que :
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successOk} tests sont réalisés avec succès.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successKo} tests échouent.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successNa} tests sont relatifs à des critères non applicables.`}
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successOk} critères sont respectés.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successKo} critères ne sont pas respectés.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successNa} critères ne sont pas applicables.`}
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Soit
              {` ${summary.criteria.pourcentOk}% critères `}
              <abbr title="Référentiel Général d’Amélioration de l’Accessibilité">
                RGAA 4.0
              </abbr>
              <> </>
              sont respectés.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              Établissement de cette déclaration d’accessibilité
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Cette déclaration a été établie le 04 novembre 2020. Elle a été
              mise jour le 04 novembre 2020.
            </StaticParagraphStyle>
            <StaticFourthLevelTitleStyle>
              Technologies utilisées pour la réalisation du site internet
              Make.org :
            </StaticFourthLevelTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>HTML5</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>CSS</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>Javascript</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                React JS version 16
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Retrouver la
                <> </>
                <RedHTMLLinkElementStyle
                  href="https://gitlab.com/makeorg/platform/front/-/blob/production/package.json"
                  target="_blank"
                  rel="noopener"
                >
                  liste complète des technologies utilisées
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticFourthLevelTitleStyle>
              Agents utilisateurs, technologies d’assistance et outils utilisés
              pour vérifier l’accessibilité :
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
              Les outils suivants ont été utilisés lors de l’évaluation :
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
                  extension navigateur
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
                  extension navigateur
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
                  extension navigateur
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticFourthLevelTitleStyle>
              Les pages du site ayant fait l’objet de la vérification de
              conformité :
            </StaticFourthLevelTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {"Page d'accueil France : "}
                <RedHTMLLinkElementStyle href={getHomeLink('FR')}>
                  {FRONT_URL + getHomeLink('FR')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page d'accueil Grande Bretagne : "}
                <RedHTMLLinkElementStyle href={getHomeLink('GB')}>
                  {FRONT_URL + getHomeLink('GB')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page parcourir les consultations : '}
                <RedHTMLLinkElementStyle
                  href={getBrowseConsultationsLink(country)}
                >
                  {FRONT_URL + getBrowseConsultationsLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page parcourir les résultats : '}
                <RedHTMLLinkElementStyle href={getBrowseResultsLink(country)}>
                  {FRONT_URL + getBrowseResultsLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page consultation : '}
                {FRONT_URL + getParticipateLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de propositions en séquence : '}
                {FRONT_URL + getSequenceLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page de résultat d'une consultation : "}
                {FRONT_URL + getResultsLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page du top des idées d'une consultation : "}
                {FRONT_URL + getTopIdeasLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page de détails d'une top idée d'une consultation : "}
                {FRONT_URL +
                  getTopIdeaDetailsLink(country, 'dynamicslug', 'ideaId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de proposition : '}
                {FRONT_URL +
                  getProposalLink(
                    country,
                    'dynamicslug',
                    'proposalSlug',
                    'proposalId'
                  )}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de réinitialisation du mot de passe : '}
                {FRONT_URL +
                  getPasswordRecoveryLink(country, 'userId', 'resetToken')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de profil utilisateur : '}
                {FRONT_URL + getRouteProfile(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page d'édition du profil utilisateur : "}
                {FRONT_URL + getRouteProfileEdit(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page de la liste des propositions de l'utilisateur : "}
                {FRONT_URL + getRouteProfileProposals(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {
                  "Page de la liste des propositions favorites de l'utilisateur : "
                }
                {FRONT_URL + getRouteProfileFavourites(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page des opinions d'une personnalité : "}
                {FRONT_URL + getRouteProfileOpinions(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page de profil public d'une personnalité : "}
                {FRONT_URL + getPersonalityProfileLink(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page de propositions d'un profil public d'organisation : "}
                {FRONT_URL + getRouteOrganisationProposals(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page de votes d'un profil public d'organisation : "}
                {FRONT_URL + getRouteOrganisationVotes(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de résultats de recherche : '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearch(country, 'accessibilité')}
                >
                  {FRONT_URL + getRouteSearch(country, 'accessibilité')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de résultats de recherche des propositions : '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchProposals(country, 'accessibilité')}
                >
                  {FRONT_URL +
                    getRouteSearchProposals(country, 'accessibilité')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de résultats de recherche des organisations : '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchOrganisations(country, 'association')}
                >
                  {FRONT_URL +
                    getRouteSearchOrganisations(country, 'association')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de résultats de recherche des consultations : '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchConsultations(country, 'comment')}
                >
                  {FRONT_URL + getRouteSearchConsultations(country, 'comment')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de mentions légales : '}
                <RedHTMLLinkElementStyle
                  href={getLegalPageLink(country, language)}
                >
                  {FRONT_URL + getLegalPageLink(country, language)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page de conditions d'utilisation : "}
                <RedHTMLLinkElementStyle
                  href={getGTUPageLink(country, language)}
                >
                  {FRONT_URL + getGTUPageLink(country, language)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de politique de données : '}
                <RedHTMLLinkElementStyle
                  href={getDataPageLink(country, language)}
                >
                  {FRONT_URL + getDataPageLink(country, language)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page de déclaration d'accessibilité : "}
                <RedHTMLLinkElementStyle
                  href={getA11YPageLink(country, language)}
                >
                  {FRONT_URL + getA11YPageLink(country, language)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de contact : '}
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
              Retour d’information et contact
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Si vous n’arrivez pas à accéder à un contenu ou à un service, vous
              pouvez contacter le responsable du site internet pour être orienté
              vers une alternative accessible ou obtenir le contenu sous une
              autre forme.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              {'Contactez-nous à cette adresse e-mail : '}
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
export default A11yFR; // eslint-disable-line import/no-default-export
