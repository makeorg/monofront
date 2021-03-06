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
          D??claration d???Accessibilt??
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Make.org s???engage ?? rendre son site internet accessible conform??ment ??
          l???article 47 de la loi n?? 2005-102 du 11 f??vrier 2005.
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          {'Cette d??claration d???accessibilit?? s???applique ?? '}
          <RedHTMLLinkElementStyle href={FRONT_URL}>
            {FRONT_URL}
          </RedHTMLLinkElementStyle>
          .
        </StaticParagraphStyle>
        <FocusBlockWrapperStyle as="section">
          <FocusBlockCheckIconStyle aria-hidden focusable="false" />
          <FocusBlockTitleStyle>
            {`${summary.criteria.pourcentOk}% `}
            des crit??res{' '}
            <abbr title="R??f??rentiel G??n??ral d???Am??lioration de l???Accessibilit??">
              RGAA
            </abbr>{' '}
            4.0 sont respect??s
          </FocusBlockTitleStyle>
          <FocusBlockParagraphStyle>
            Make.org s&apos;engage ?? am??liorer l&apos;accessibilit?? et
            l&apos;inclusion dans le num??rique. Le RGAA (r??f??rentiel g??n??ral
            d???am??lioration de l???accessibilit??) est un document d&apos;autorit??,
            ??non??ant des normes d&apos;accessibilit?? auxquelles nos ??quipes de
            conception et techniques cherchent ?? se rapprocher au maximum.
          </FocusBlockParagraphStyle>
          <FocusBlockParagraphStyle className="no-margin">
            De fa??on transparente, cette page a pour but d&apos;indiquer
            l&apos;??tat actuel de l&apos;accessibilit?? de Make.org.
          </FocusBlockParagraphStyle>
        </FocusBlockWrapperStyle>
        <FocusBlockWrapperStyle as="section">
          <FocusBlockTitleStyle>
            D??couvrez notre engagement pour l???accessibilit?? num??rique
          </FocusBlockTitleStyle>
          <FocusBlockParagraphStyle>
            Pour que la d??mocratie reste l???affaire de toutes et tous, la prise
            en compte des enjeux d&apos;inclusion et d???accessibilit?? est
            essentielle. L???exercice de la citoyennet?? est un droit fondamental
            qui ne doit pas se voir inqui??t?? ou limit?? par une ou des situations
            de handicap.{' '}
            <strong>
              C???est pourquoi D??mocratie Ouverte et Make.org, deux acteurs de
              l???innovation d??mocratique, ont travaill?? aux c??t??s du CNCPH ??
              l?????laboration d???une charte d&apos;accessibilit?? des outils de de
              participation citoyenne.
            </strong>{' '}
            Cette charte, sign??e le 17 d??cembre 2021, 2021, officialise les
            engagements pr??c??dents des deux organisations acte la volont?? de
            continuer en ce sens.
          </FocusBlockParagraphStyle>
          <RedHTMLLinkElementStyle
            href={`${FRONT_URL}/convention/cncph.html`}
            target="_blank"
            rel="noopener"
          >
            T??l??charger la Charte (version html)
            <StaticExternalLinkIconStyle aria-hidden focusable="false" />
            <ScreenReaderItemStyle>
              {i18n.t('common.open_new_window')}
            </ScreenReaderItemStyle>
          </RedHTMLLinkElementStyle>
        </FocusBlockWrapperStyle>
        <StaticPrimaryOrderedListStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ??tat de conformit??
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org est en conformit?? partielle avec le
              <> </>
              <RedHTMLLinkElementStyle
                href="https://www.numerique.gouv.fr/publications/rgaa-accessibilite/"
                target="_blank"
                rel="noopener"
              >
                <abbr title="R??f??rentiel G??n??ral d???Am??lioration de l???Accessibilit?? - version 4.0">
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
              R??sultats des tests
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              L???audit de conformit?? r??alis?? en interne r??v??le que :
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successOk} tests sont r??alis??s avec succ??s.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successKo} tests ??chouent.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successNa} tests sont relatifs ?? des crit??res non applicables.`}
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successOk} crit??res sont respect??s.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successKo} crit??res ne sont pas respect??s.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successNa} crit??res ne sont pas applicables.`}
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Soit
              {` ${summary.criteria.pourcentOk}% crit??res `}
              <abbr title="R??f??rentiel G??n??ral d???Am??lioration de l???Accessibilit??">
                RGAA 4.0
              </abbr>
              <> </>
              sont respect??s.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ??tablissement de cette d??claration d???accessibilit??
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Cette d??claration a ??t?? ??tablie le 04 novembre 2020. Elle a ??t??
              mise jour le 04 novembre 2020.
            </StaticParagraphStyle>
            <StaticFourthLevelTitleStyle>
              Technologies utilis??es pour la r??alisation du site internet
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
                  liste compl??te des technologies utilis??es
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticFourthLevelTitleStyle>
              Agents utilisateurs, technologies d???assistance et outils utilis??s
              pour v??rifier l???accessibilit?? :
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
              Les outils suivants ont ??t?? utilis??s lors de l?????valuation :
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
              Les pages du site ayant fait l???objet de la v??rification de
              conformit?? :
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
                {'Page parcourir les r??sultats : '}
                <RedHTMLLinkElementStyle href={getBrowseResultsLink(country)}>
                  {FRONT_URL + getBrowseResultsLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page consultation : '}
                {FRONT_URL + getParticipateLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de propositions en s??quence : '}
                {FRONT_URL + getSequenceLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page de r??sultat d'une consultation : "}
                {FRONT_URL + getResultsLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page du top des id??es d'une consultation : "}
                {FRONT_URL + getTopIdeasLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page de d??tails d'une top id??e d'une consultation : "}
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
                {'Page de r??initialisation du mot de passe : '}
                {FRONT_URL +
                  getPasswordRecoveryLink(country, 'userId', 'resetToken')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de profil utilisateur : '}
                {FRONT_URL + getRouteProfile(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page d'??dition du profil utilisateur : "}
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
                {"Page des opinions d'une personnalit?? : "}
                {FRONT_URL + getRouteProfileOpinions(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page de profil public d'une personnalit?? : "}
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
                {'Page de r??sultats de recherche : '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearch(country, 'accessibilit??')}
                >
                  {FRONT_URL + getRouteSearch(country, 'accessibilit??')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de r??sultats de recherche des propositions : '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchProposals(country, 'accessibilit??')}
                >
                  {FRONT_URL +
                    getRouteSearchProposals(country, 'accessibilit??')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de r??sultats de recherche des organisations : '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchOrganisations(country, 'association')}
                >
                  {FRONT_URL +
                    getRouteSearchOrganisations(country, 'association')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de r??sultats de recherche des consultations : '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchConsultations(country, 'comment')}
                >
                  {FRONT_URL + getRouteSearchConsultations(country, 'comment')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Page de mentions l??gales : '}
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
                {'Page de politique de donn??es : '}
                <RedHTMLLinkElementStyle
                  href={getDataPageLink(country, language)}
                >
                  {FRONT_URL + getDataPageLink(country, language)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {"Page de d??claration d'accessibilit?? : "}
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
              Retour d???information et contact
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Si vous n???arrivez pas ?? acc??der ?? un contenu ou ?? un service, vous
              pouvez contacter le responsable du site internet pour ??tre orient??
              vers une alternative accessible ou obtenir le contenu sous une
              autre forme.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              {'Contactez-nous ?? cette adresse e-mail : '}
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
