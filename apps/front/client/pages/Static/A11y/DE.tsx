import React, { FC } from 'react';
import i18n from 'i18next';
import {
  ACCESSIBILITY_EMAIL,
  A11Y_DATE,
} from '@make.org/utils/constants/config';
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
import { RedLinkHTMLElementStyle } from '@make.org/ui/elements/LinkElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { env } from '@make.org/assets/env';
import { summary } from '@make.org/utils/constants/accessibilitySummary';
import { DateHelper } from '@make.org/utils/helpers/date';
import { DATE } from '@make.org/types/enums';
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

export const A11yDE: FC = () => {
  const { state } = useAppContext();
  const { country, language } = state.appConfig;

  return (
    <>
      <MetaTags
        title={i18n.t('meta.a11y.title')}
        description={i18n.t('meta.a11y.description')}
      />
      <StaticPageWrapperStyle>
        <StaticSecondLevelTitleStyle>
          ZUGÄNGLICHKEITSERKLÄRUNG
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Make.org verpflichtet sich, seine Website in Übereinstimmung mit
          Artikel 47 des Gesetzes Nr. 2005-102 vom 11. Februar 2005 zugänglich
          zu machen.
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          Diese Zugänglichkeitserklärung gilt für{' '}
          <RedLinkHTMLElementStyle href={env.frontUrl()}>
            {env.frontUrl()}
          </RedLinkHTMLElementStyle>
          .
        </StaticParagraphStyle>
        <FocusBlockWrapperStyle as="section">
          <FocusBlockCheckIconStyle aria-hidden focusable="false" />
          <FocusBlockTitleStyle>
            {`${summary.criteria.pourcentOk}% `}
            der{' '}
            <abbr
              lang="fr"
              title="Référentiel Général d’Amélioration de l’Accessibilité"
            >
              RGAA
            </abbr>{' '}
            4.0-Kriterien werden erfüllt
          </FocusBlockTitleStyle>
          <FocusBlockParagraphStyle>
            Make.org setzt sich für die Verbesserung der Barrierefreiheit und
            Inklusion in der digitalen Welt ein. Die{' '}
            <abbr
              lang="fr"
              title="Référentiel Général d’Amélioration de l’Accessibilité"
            >
              RGAA
            </abbr>{' '}
            (Französische Zugänglichkeitsrichtlinien) sind ein maßgebliches
            Dokument, in dem Zugänglichkeitsstandards festgelegt sind, die
            unsere Design- und Technikteams so weit wie möglich zu erfüllen
            versuchen.
          </FocusBlockParagraphStyle>
          <FocusBlockParagraphStyle>
            Diese Seite soll transparent den aktuellen Stand der
            Barrierefreiheit von Make.org aufzeigen.
          </FocusBlockParagraphStyle>
        </FocusBlockWrapperStyle>
        <StaticPrimaryOrderedListStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              KONFORMITÄTSSTATUS
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org ist teilweise konform mit{' '}
              <RedLinkHTMLElementStyle
                href="https://www.numerique.gouv.fr/publications/rgaa-accessibilite/"
                target="_blank"
                rel="noopener"
              >
                <abbr
                  lang="fr"
                  title="Référentiel Général d’Amélioration de l’Accessibilité - Version 4.0"
                >
                  RGAA 4.0
                </abbr>
                <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                <ScreenReaderItemStyle>
                  {i18n.t('common.open_new_window')}
                </ScreenReaderItemStyle>
              </RedLinkHTMLElementStyle>
              .
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              TESTERGEBNISSE
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Die interne Ordnungsmäßigkeitsprüfung zeigt, dass :
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successOk} Tests werden erfolgreich abgeschlossen.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successKo} Tests schlagen fehl.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successNa} Tests beziehen sich auf nicht anwendbare Kriterien.`}
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successOk} Kriterien erfüllt sind.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successKo} Kriterien nicht erfüllt sind.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successNa} Kriterien sind nicht anwendbar.`}
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Das bedeutet, dass
              {` ${summary.criteria.pourcentOk}% `}
              <abbr
                lang="fr"
                title="Référentiel Général d’Amélioration de l’Accessibilité"
              >
                RGAA
              </abbr>{' '}
              4.0-Kriterien erfüllt sind.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ERSTELLUNG DIESER ERKLÄRUNG ZUR ZUGÄNGLICHKEIT
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Diese Erklärung wurde am{' '}
              {DateHelper.localizedAndFormattedDate(
                A11Y_DATE,
                DATE.PPP_FORMAT
              )}{' '}
              erstellt. Sie wurde am{' '}
              {DateHelper.localizedAndFormattedDate(
                A11Y_DATE,
                DATE.PPP_FORMAT
              )}{' '}
              aktualisiert.
            </StaticParagraphStyle>
            <StaticFourthLevelTitleStyle>
              Technologien, die zur Erstellung der Make.org-Website verwendet
              werden:
            </StaticFourthLevelTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>HTML5</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>CSS</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>Javascript</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                React JS version 16
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Hier finden Sie die{' '}
                <RedLinkHTMLElementStyle
                  href="https://gitlab.com/makeorg/platform/front/-/blob/production/package.json"
                  target="_blank"
                  rel="noopener"
                >
                  vollständige Liste derverwendetenTechnologienIn einer neuen
                  Registerkarteöffnen
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticFourthLevelTitleStyle>
              Benutzeragenten, unterstützende Technologien und Werkzeuge zur
              Überprüfung der Barrierefreiheit :
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
              Die folgenden Werkzeuge wurden bei der Auswertung verwendet:
            </StaticFourthLevelTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle lang="en">
                Google Lighthouse{' '}
                <RedLinkHTMLElementStyle
                  href="https://developers.google.com/web/tools/lighthouse#devtools"
                  target="_blank"
                  rel="noopener"
                >
                  DevTools{' '}
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle lang="de">
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle lang="en">
                Google Lighthouse{' '}
                <RedLinkHTMLElementStyle
                  href="https://github.com/GoogleChrome/lighthouse-ci"
                  target="_blank"
                  rel="noopener"
                >
                  CI{' '}
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle lang="de">
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                <span lang="en">Web Developer</span>{' '}
                <RedLinkHTMLElementStyle
                  href="https://chrispederick.com/work/web-developer/"
                  target="_blank"
                  rel="noopener"
                >
                  Browser-ErweiterungIn{' '}
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Axe{' '}
                <RedLinkHTMLElementStyle
                  href="https://www.deque.com/axe/browser-extensions/"
                  target="_blank"
                  rel="noopener"
                >
                  Browser-ErweiterungIn
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle lang="en">
                WCAG Color contrast checker{' '}
                <RedLinkHTMLElementStyle
                  href="
              https://chrome.google.com/webstore/detail/wcag-color-contrast-check/plnahcmalebffmaghcpcmpaciebdhgdf"
                  target="_blank"
                  rel="noopener"
                  lang="de"
                >
                  Browser-ErweiterungIn{' '}
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticFourthLevelTitleStyle>
              Die Seiten der Site, die der Konformitätsprüfung unterzogen
              wurden:
            </StaticFourthLevelTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {'Startseite Frankreich : '}
                <RedLinkHTMLElementStyle href={getHomeLink('FR')}>
                  {env.frontUrl() + getHomeLink('FR')}
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Startseite Großbritannien : '}
                <RedLinkHTMLElementStyle href={getHomeLink('GB')}>
                  {env.frontUrl() + getHomeLink('GB')}
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Seite zum Durchsuchen von Konsultationen : '}
                <RedLinkHTMLElementStyle
                  href={getBrowseConsultationsLink(country)}
                >
                  {env.frontUrl() + getBrowseConsultationsLink(country)}
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Ergebnisse der Seitensuche : '}
                <RedLinkHTMLElementStyle href={getBrowseResultsLink(country)}>
                  {env.frontUrl() + getBrowseResultsLink(country)}
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Konsultationsseite : '}
                {env.frontUrl() + getParticipateLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Vorschlagsseite in Reihenfolge : '}
                {env.frontUrl() + getSequenceLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Ergebnisseite einer Abfrage : '}
                {env.frontUrl() + getResultsLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Top-Ideen-Seite einer Beratung : '}
                {env.frontUrl() + getTopIdeasLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Detailseite einer Top-Idee für eine Beratung : '}
                {env.frontUrl() +
                  getTopIdeaDetailsLink(country, 'dynamicslug', 'ideaId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Vorschlagsseite : '}
                {env.frontUrl() +
                  getProposalLink(
                    country,
                    'dynamicslug',
                    'proposalSlug',
                    'proposalId'
                  )}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Seite zum Zurücksetzen des Passworts : '}
                {env.frontUrl() +
                  getPasswordRecoveryLink(country, 'userId', 'resetToken')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Benutzerprofilseite : '}
                {env.frontUrl() + getRouteProfile(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Seite zum Bearbeiten des Benutzerprofils : '}
                {env.frontUrl() + getRouteProfileEdit(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Seite der Benutzer-Vorschlagsliste : '}
                {env.frontUrl() + getRouteProfileProposals(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Seite der Liste mit den Lieblingsvorschlägen des Benutzers :
                {env.frontUrl() + getRouteProfileFavourites(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Meinungsseite zur Persönlichkeit : '}
                {env.frontUrl() + getRouteProfileOpinions(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Öffentliche Profilseite einer Persönlichkeit : '}
                {env.frontUrl() + getPersonalityProfileLink(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Öffentliches Profil Organisation Vorschlagsseite : '}
                {env.frontUrl() +
                  getRouteOrganisationProposals(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {
                  'Abstimmungsseite eines öffentlichen Profils einer Organisation : '
                }
                {env.frontUrl() + getRouteOrganisationVotes(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Suchergebnisse Seite : '}
                <RedLinkHTMLElementStyle
                  href={getRouteSearch('FR', 'accessibilité')}
                >
                  {env.frontUrl() + getRouteSearch('FR', 'accessibilité')}
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Ergebnisseite der Vorschlagssuche : '}
                <RedLinkHTMLElementStyle
                  href={getRouteSearchProposals('FR', 'accessibilité')}
                >
                  {env.frontUrl() +
                    getRouteSearchProposals('FR', 'accessibilité')}
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Organisationen Suchergebnisseite : '}
                <RedLinkHTMLElementStyle
                  href={getRouteSearchOrganisations('FR', 'association')}
                >
                  {env.frontUrl() +
                    getRouteSearchOrganisations('FR', 'association')}
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Suchergebnisseite für Beratungen : '}
                <RedLinkHTMLElementStyle
                  href={getRouteSearchConsultations('FR', 'comment')}
                >
                  {env.frontUrl() +
                    getRouteSearchConsultations('FR', 'comment')}
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Rechtliche Seite : '}
                <RedLinkHTMLElementStyle
                  href={getLegalPageLink(country, language)}
                >
                  {env.frontUrl() + getLegalPageLink(country, language)}
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Seite mit den Nutzungsbedingungen : '}
                <RedLinkHTMLElementStyle
                  href={getGTUPageLink(country, language)}
                >
                  {env.frontUrl() + getGTUPageLink(country, language)}
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Seite zur Datenpolitik : '}
                <RedLinkHTMLElementStyle
                  href={getDataPageLink(country, language)}
                >
                  {env.frontUrl() + getDataPageLink(country, language)}
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Seite zur Erklärung der Barrierefreiheit : '}
                <RedLinkHTMLElementStyle
                  href={getA11YPageLink(country, language)}
                >
                  {env.frontUrl() + getA11YPageLink(country, language)}
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Kontaktseite : '}
                <RedLinkHTMLElementStyle
                  href={getContactPageLink(country, language)}
                >
                  {env.frontUrl() + getContactPageLink(country, language)}
                </RedLinkHTMLElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              FEEDBACK UND KONTAKT
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Wenn Sie auf einen Inhalt oder eine Dienstleistung nicht zugreifen
              können, können Sie sich an den Betreiber der Website wenden, um
              auf eine zugängliche Alternative verwiesen zu werden oder um den
              Inhalt in einer anderen Form zu erhalten.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              {'Kontaktieren Sie uns unter dieser E-Mail Adresse : '}
              <RedLinkHTMLElementStyle href={`mailto:${ACCESSIBILITY_EMAIL}`}>
                {`${ACCESSIBILITY_EMAIL}`}
              </RedLinkHTMLElementStyle>
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
        </StaticPrimaryOrderedListStyle>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default A11yDE; // eslint-disable-line import/no-default-export
