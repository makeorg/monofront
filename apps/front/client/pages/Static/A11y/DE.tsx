import React, { FC } from 'react';
import i18n from 'i18next';
import {
  ACCESSIBILITY_EMAIL,
  MAKE_ADDRESS,
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
import {
  RedHTMLLinkElementStyle,
  RedLinkStyle,
} from '@make.org/ui/elements/LinkElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { env } from '@make.org/assets/env';
import {
  StaticPageWrapperStyle,
  StaticSecondLevelTitleStyle,
  StaticParagraphStyle,
  StaticPrimaryOrderedListStyle,
  StaticPrimaryOrderedListItemStyle,
  StaticThirdLevelTitleStyle,
  StaticSquareListItemStyle,
  StaticSquareListStyle,
  StaticExternalLinkIconStyle,
  StaticStrongStyle,
} from '../style';

export const A11yDE: FC = () => {
  const { state } = useAppContext();
  const { country, language } = state.appConfig;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const FRONT_URL: string = env.frontUrl() || window.FRONT_URL;
  return (
    <>
      <MetaTags
        title={i18n.t('meta.a11y.title')}
        description={i18n.t('meta.a11y.description')}
      />
      <StaticPageWrapperStyle>
        <StaticSecondLevelTitleStyle>
          ERKLÄRUNG ZUR BARRIEREFREIHEIT
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Make.org verpflichtet sich, seine Website gemäß der{' '}
          <RedHTMLLinkElementStyle href="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32016L2102">
            {' '}
            Richtlinie (EU) 2016/2102 des Europäischen Parlaments und des Rates
          </RedHTMLLinkElementStyle>{' '}
          barrierefrei zu gestalten.
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          Diese Erklärung zur Barrierefreiheit bezieht sich auf{' '}
          <RedHTMLLinkElementStyle href={FRONT_URL}>
            {FRONT_URL}
          </RedHTMLLinkElementStyle>
          .
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          <StaticStrongStyle>Identität des Registranten: </StaticStrongStyle>
          <br /> Make.org <br /> {MAKE_ADDRESS} <br />
          Kontakt:{' '}
          <RedHTMLLinkElementStyle href={ACCESSIBILITY_EMAIL}>
            {ACCESSIBILITY_EMAIL}
          </RedHTMLLinkElementStyle>
        </StaticParagraphStyle>
        <StaticPrimaryOrderedListStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              KONFORMITÄTSSTATUS
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org entspricht teilweise den{' '}
              <RedHTMLLinkElementStyle
                href="https://www.w3.org/TR/WCAG21/"
                target="_blank"
                rel="noopener"
              >
                <abbr
                  lang="fr"
                  title="Web Content Accessibility Guidelines - Version 2.1"
                >
                  WCAG 2.1
                </abbr>
                <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                <ScreenReaderItemStyle>
                  {i18n.t('common.open_new_window')}
                </ScreenReaderItemStyle>
              </RedHTMLLinkElementStyle>
              .
            </StaticParagraphStyle>
            <StaticThirdLevelTitleStyle>
              TESTERGEBNISSE
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Ein Audit der Website offenbart, dass diese die Konformitätsstufen
              A und AA erreicht und somit eine teilweise Konformität mit den
              WCAG 2.1-Richtlinien aufweist.
            </StaticParagraphStyle>
            <StaticThirdLevelTitleStyle>
              ERSTELLUNG DER ERKLÄRUNG ZUR BARRIEREFREIHEIT
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Diese Erklärung wurde am 4. November 2020 erstellt und am 28. Juli
              2021 aktualisiert.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Technologien, die zur Erstellung der Make.org-Website verwendet
              wurden:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>HTML5</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>CSS</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>JavaScript </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                React JS Version 16
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Hier finden Sie die{' '}
                <RedHTMLLinkElementStyle href="https://gitlab.com/makeorg/platform/front/-/blob/production/package.json">
                  vollständige Liste der verwendeten Technologien
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Zur Überprüfung der Barrierefreiheit verwendete Nutzeragenten,
              unterstützende Technologien und Tools:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Chrome 86 / Mac OS 10.15 VoiceOver
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Firefox 82.0 / Linux Orca 3.36.2
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Für die Auswertung wurden folgende Tools verwendet:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Google Lighthouse{' '}
                <RedHTMLLinkElementStyle href="https://developers.google.com/web/tools/lighthouse#devtools">
                  DevTools
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Google Lighthouse{' '}
                <RedHTMLLinkElementStyle href="https://github.com/GoogleChrome/lighthouse-ci">
                  CI
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Web Developer{' '}
                <RedHTMLLinkElementStyle href="https://chrispederick.com/work/web-developer/">
                  Browser-Plug-in
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Axe{' '}
                <RedHTMLLinkElementStyle href="https://www.deque.com/axe/browser-extensions/">
                  Browser-Plug-in
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                WCAG Color contrast checker{' '}
                <RedHTMLLinkElementStyle href="https://chrome.google.com/webstore/detail/wcag-color-contrast-check/plnahcmalebffmaghcpcmpaciebdhgdf">
                  Browser-Plug-in
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Folgende Seiten der Website wurden auf ihre Barrierefreiheit
              geprüft:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {'Startseite Frankreich : '}
                <RedLinkStyle to={getHomeLink('FR')}>
                  {FRONT_URL + getHomeLink('FR')}
                </RedLinkStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Startseite Großbritannien : '}
                <RedLinkStyle to={getHomeLink('GB')}>
                  {FRONT_URL + getHomeLink('GB')}
                </RedLinkStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Seite zum Durchsuchen von Konsultationen : '}
                <RedLinkStyle to={getBrowseConsultationsLink('FR')}>
                  {FRONT_URL + getBrowseConsultationsLink('FR')}
                </RedLinkStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Ergebnisse der Seitensuche : '}
                <RedLinkStyle to={getBrowseResultsLink('FR')}>
                  {FRONT_URL + getBrowseResultsLink('FR')}
                </RedLinkStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Konsultationsseite : '}
                {FRONT_URL + getParticipateLink('FR', 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Vorschlagsseite in Reihenfolge : '}
                {FRONT_URL + getSequenceLink('FR', 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Ergebnisseite einer Abfrage : '}
                {FRONT_URL + getResultsLink('FR', 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Top-Ideen-Seite einer Beratung : '}
                {FRONT_URL + getTopIdeasLink('FR', 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Detailseite einer Top-Idee für eine Beratung : '}
                {FRONT_URL +
                  getTopIdeaDetailsLink('FR', 'dynamicslug', 'ideaId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Vorschlagsseite : '}
                {FRONT_URL +
                  getProposalLink(
                    'FR',
                    'dynamicslug',
                    'proposalSlug',
                    'proposalId'
                  )}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Seite zum Zurücksetzen des Passworts : '}
                {FRONT_URL +
                  getPasswordRecoveryLink('FR', 'userId', 'resetToken')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Benutzerprofilseite : '}
                {FRONT_URL + getRouteProfile('FR')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Seite zum Bearbeiten des Benutzerprofils : '}
                {FRONT_URL + getRouteProfileEdit('FR')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Seite der Benutzer-Vorschlagsliste : '}
                {FRONT_URL + getRouteProfileProposals('FR')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Seite der Liste mit den Lieblingsvorschlägen des Benutzers :
                {FRONT_URL + getRouteProfileFavourites('FR')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Meinungsseite zur Persönlichkeit : '}
                {FRONT_URL + getRouteProfileOpinions('FR')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Öffentliche Profilseite einer Persönlichkeit : '}
                {FRONT_URL + getPersonalityProfileLink('FR', 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Öffentliches Profil Organisation Vorschlagsseite : '}
                {FRONT_URL + getRouteOrganisationProposals('FR', 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {
                  'Abstimmungsseite eines öffentlichen Profils einer Organisation : '
                }
                {FRONT_URL + getRouteOrganisationVotes('FR', 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Suchergebnisse Seite : '}
                <RedLinkStyle to={getRouteSearch('FR', 'accessibilité')}>
                  {FRONT_URL + getRouteSearch('FR', 'accessibilité')}
                </RedLinkStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Ergebnisseite der Vorschlagssuche : '}
                <RedLinkStyle
                  to={getRouteSearchProposals('FR', 'accessibilité')}
                >
                  {FRONT_URL + getRouteSearchProposals('FR', 'accessibilité')}
                </RedLinkStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Organisationen Suchergebnisseite : '}
                <RedLinkStyle
                  to={getRouteSearchOrganisations('FR', 'association')}
                >
                  {FRONT_URL + getRouteSearchOrganisations('FR', 'association')}
                </RedLinkStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Suchergebnisseite für Beratungen : '}
                <RedLinkStyle to={getRouteSearchConsultations('FR', 'comment')}>
                  {FRONT_URL + getRouteSearchConsultations('FR', 'comment')}
                </RedLinkStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Rechtliche Seite : '}
                <RedLinkStyle to={getLegalPageLink(country, language)}>
                  {FRONT_URL + getLegalPageLink(country, language)}
                </RedLinkStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Seite mit den Nutzungsbedingungen : '}
                <RedLinkStyle to={getGTUPageLink(country, language)}>
                  {FRONT_URL + getGTUPageLink(country, language)}
                </RedLinkStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Seite zur Datenpolitik : '}
                <RedLinkStyle to={getDataPageLink(country, language)}>
                  {FRONT_URL + getDataPageLink(country, language)}
                </RedLinkStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Seite zur Erklärung der Barrierefreiheit : '}
                <RedLinkStyle to={getA11YPageLink(country, language)}>
                  {FRONT_URL + getA11YPageLink(country, language)}
                </RedLinkStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Kontaktseite : '}
                <RedLinkStyle to={getContactPageLink(country, language)}>
                  {FRONT_URL + getContactPageLink(country, language)}
                </RedLinkStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
        </StaticPrimaryOrderedListStyle>
        <StaticParagraphStyle>
          Da der Länderindikator eine Variable in der Seitenstruktur ist, können
          wir bestätigen, dass alle Seiten, deren URLs einer der geprüften
          Strukturen folgen, die gleichen Prüfergebnisse aufweisen und dass der
          Grad der Barrierefreiheit in allen Ländern, in denen Make.org
          verfügbar ist, der gleiche ist.
        </StaticParagraphStyle>
        <StaticThirdLevelTitleStyle>
          NICHT BARRIEREFREIHEITE INHALTE
        </StaticThirdLevelTitleStyle>
        <StaticSquareListStyle>
          <StaticSquareListItemStyle>
            Informationstragende Canvas-Elemente („Canvas“-Tags) lassen sich
            nicht ersetzen oder können nicht durch formatierten Text ersetzt
            werden;
          </StaticSquareListItemStyle>
          <StaticSquareListItemStyle>
            Rahmen-Elemente („iframe“-Tags) der Vermittlungsdienste von Google
            und Facebook beinhalten kein Attribut „title“;
          </StaticSquareListItemStyle>
          <StaticSquareListItemStyle>
            Manche Skript-Elemente („Skript“-Tags) sind mit den unterstützenden
            Technologien nicht kompatibel und bieten keine sinnvolle
            Alternative;
          </StaticSquareListItemStyle>
          <StaticSquareListItemStyle>
            Es kann unvermittelt zu einem Kontextwechsel kommen (Abmelden,
            Benachrichtigungen, Weiterleitung usw.);
          </StaticSquareListItemStyle>
          <StaticSquareListItemStyle>
            Manche Abkürzungen werden nicht erklärt;
          </StaticSquareListItemStyle>
          <StaticSquareListItemStyle>
            Bei bestimmten Elementen kann der „Fokus“ unscharf werden;
          </StaticSquareListItemStyle>
          <StaticSquareListItemStyle>
            Manche ausgeblendeten Elemente können von Sprachsynthesizern
            mitgesprochen werden;
          </StaticSquareListItemStyle>
          <StaticSquareListItemStyle>
            Steuerung von Elementen wie „Tooltip“ oder „Sliders“;
          </StaticSquareListItemStyle>
          <StaticSquareListItemStyle>
            Manche Felder in Formularen müssen gesondert bestätigt werden, ohne
            dass dies ausdrücklich vorab erklärt wird;
          </StaticSquareListItemStyle>
          <StaticSquareListItemStyle>
            Es fehlt eine Übersicht über die Website (Sitemap);
          </StaticSquareListItemStyle>
          <StaticSquareListItemStyle>
            Auf Seiten ohne Ankerlink kann die Rückkehr nach oben die
            Reihenfolge der Tastaturbefehle durcheinanderbringen.
          </StaticSquareListItemStyle>
          <StaticSquareListItemStyle>
            Einige länderspezifische Bilder (visueller Inhalt, Alternative)
          </StaticSquareListItemStyle>
        </StaticSquareListStyle>
        <StaticThirdLevelTitleStyle>
          FEEDBACK UND KONTAKT
        </StaticThirdLevelTitleStyle>
        <StaticParagraphStyle>
          Sollten Sie auf einen Inhalt oder eine Funktion nicht zugreifen
          können, wenden Sie sich bitte an den Betreiber der Website. Er zeigt
          Ihnen eine barrierefreie Alternative auf oder lässt Ihnen den Inhalt
          in einer anderen Form zukommen.
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          Sie erreichen uns unter dieser E-Mail-Adresse:{' '}
          <RedHTMLLinkElementStyle href={ACCESSIBILITY_EMAIL}>
            {ACCESSIBILITY_EMAIL}
          </RedHTMLLinkElementStyle>
        </StaticParagraphStyle>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default A11yDE; // eslint-disable-line import/no-default-export
