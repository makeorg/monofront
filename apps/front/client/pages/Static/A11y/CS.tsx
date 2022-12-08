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

export const A11yCS: FC = () => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const FRONT_URL = env.frontUrl() || window.FRONT_URL;

  return (
    <>
      <MetaTags
        title={i18n.t('meta.a11y.title')}
        description={i18n.t('meta.a11y.description')}
      />
      <StaticPageWrapperStyle>
        <StaticSecondLevelTitleStyle>
          PROHLÁŠENÍ O PŘÍSTUPNOSTI
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Make.org se zavazuje zpřístupnit své internetové stránky v souladu s
          článkem 47 zákona č. 2005-102 ze dne 11. února 2005.{' '}
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          {'Toto prohlášení o přístupnosti se vztahuje na web '}
          <RedHTMLLinkElementStyle href={FRONT_URL}>
            {FRONT_URL}
          </RedHTMLLinkElementStyle>
          .
        </StaticParagraphStyle>
        <FocusBlockWrapperStyle as="section">
          <FocusBlockCheckIconStyle aria-hidden focusable="false" />
          <FocusBlockTitleStyle>
            {`Je splněno ${summary.criteria.pourcentOk}% kritérií`}{' '}
            <abbr
              lang="fr"
              title="Référentiel Général d’Amélioration de l’Accessibilité"
            >
              RGAA
            </abbr>{' '}
            4.0
          </FocusBlockTitleStyle>
          <FocusBlockParagraphStyle>
            Make.org se zavázala zlepšovat digitální dostupnost a začlenění.
            RGAA (General Repository for Improving Accessibility) je
            autoritativní dokument stanovující standardy přístupnosti, kterým se
            naše projekční a technické týmy snaží co nejvíce přiblížit.
          </FocusBlockParagraphStyle>
          <FocusBlockParagraphStyle className="no-margin">
            Tato stránka má transparentním způsobem ukázat aktuální stav
            přístupnosti Make.org.
          </FocusBlockParagraphStyle>
        </FocusBlockWrapperStyle>
        <FocusBlockWrapperStyle as="section">
          <FocusBlockTitleStyle>
            Seznamte se s našim závazkem vůči digitální dostupnosti
          </FocusBlockTitleStyle>
          <FocusBlockParagraphStyle>
            Aby demokracie zůstala záležitostí všech, je nezbytné vzít v úvahu
            otázky začlenění a dostupnosti. Výkon občanství je základním právem,
            které by nemělo být narušeno nebo omezeno jednou nebo více situacemi
            zdravotního postižení.
            <strong>
              To je důvod, proč Démocratie Ouverte a Make.org, dva hráči v
              oblasti demokratických inovací, spolupracovali společně s CNCPH na
              vytvoření charty přístupnosti nástrojů pro zapojení občanů.
            </strong>{' '}
            Tato charta 2021, podepsaná 17. prosince 2021, formalizuje předchozí
            závazky obou organizací a vyjadřuje vůli pokračovat tímto směrem.
          </FocusBlockParagraphStyle>
          <RedHTMLLinkElementStyle
            href={`${FRONT_URL}/convention/cncph.html`}
            target="_blank"
            rel="noopener"
          >
            Stáhnout si chartu (html verze){' '}
            <StaticExternalLinkIconStyle aria-hidden focusable="false" />
            <ScreenReaderItemStyle>
              {i18n.t('common.open_new_window')}
            </ScreenReaderItemStyle>
          </RedHTMLLinkElementStyle>
        </FocusBlockWrapperStyle>
        <StaticPrimaryOrderedListStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>STAV SHODY</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org je částečně v souladu s
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
              VÝSLEDKY TESTŮ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Interní audit shody ukazuje následující:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successOk} testů bylo provedeno úspěšně.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successKo} testů se nezdařilo.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successNa} testů se týká nepoužitelných kritérií.`}
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successOk} kritérií je dodržováno.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successKo} kritérií není dodržováno.`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successNa} kritérií není použitelných.`}
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              {`Což ukazuje, že ${summary.criteria.pourcentOk}% kritérií `}
              <abbr title="Référentiel Général d’Amélioration de l’Accessibilité">
                RGAA 4.0
              </abbr>
              <> </>
              je respektováno.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              STANOVENÍ TOHOTO PROHLÁŠENÍ O DOSTUPNOSTI
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Toto prohlášení bylo učiněno dne 4. listopadu 2020. Bylo
              aktualizováno dne 4. listopadu 2020.
            </StaticParagraphStyle>
            <StaticFourthLevelTitleStyle>
              Technologie použité pro vytvoření internetových stránek Make.org:
            </StaticFourthLevelTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>HTML5</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>CSS</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>Javascript</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                React JS verze 16
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Na odkazu
                <> </>
                <RedHTMLLinkElementStyle
                  href="https://gitlab.com/makeorg/platform/front/-/blob/production/package.json"
                  target="_blank"
                  rel="noopener"
                >
                  najdete úplný seznam použitých technologií
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticFourthLevelTitleStyle>
              Uživatelské agenty, asistenční technologie a nástroje používané k
              ověření přístupnosti:
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
              Při hodnocení byly použity následující nástroje:
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
                  rozšíření prohlížeče
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
                  rozšíření prohlížeče
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
                  rozšíření prohlížeče
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticFourthLevelTitleStyle>
              Stránky webu, které byly předmětem kontroly souladu:
            </StaticFourthLevelTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {'Domovská stránka, Francie: '}
                <RedHTMLLinkElementStyle href={getHomeLink('FR')}>
                  {FRONT_URL + getHomeLink('FR')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Domovská stránka, Velká Británie: '}
                <RedHTMLLinkElementStyle href={getHomeLink('GB')}>
                  {FRONT_URL + getHomeLink('GB')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Procházet konzultace: '}
                <RedHTMLLinkElementStyle
                  href={getBrowseConsultationsLink(country)}
                >
                  {FRONT_URL + getBrowseConsultationsLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Procházet výsledky: '}
                <RedHTMLLinkElementStyle href={getBrowseResultsLink(country)}>
                  {FRONT_URL + getBrowseResultsLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Konzultace: '}
                {FRONT_URL + getParticipateLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Návrhy v sekvenci: '}
                {FRONT_URL + getSequenceLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Výsledek konzultace: '}
                {FRONT_URL + getResultsLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Nejlepší nápady konzultace: '}
                {FRONT_URL + getTopIdeasLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka s detaily nejlepšího nápadu konzultace: '}
                {FRONT_URL +
                  getTopIdeaDetailsLink(country, 'dynamicslug', 'ideaId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Návrh: '}
                {FRONT_URL +
                  getProposalLink(
                    country,
                    'dynamicslug',
                    'proposalSlug',
                    'proposalId'
                  )}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Obnovit heslo: '}
                {FRONT_URL +
                  getPasswordRecoveryLink(country, 'userId', 'resetToken')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Profil uživatele: '}
                {FRONT_URL + getRouteProfile(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Editace profilu uživatele: '}
                {FRONT_URL + getRouteProfileEdit(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Seznam návrhů uživatele: '}
                {FRONT_URL + getRouteProfileProposals(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Seznamu oblíbených návrhů uživatele: '}
                {FRONT_URL + getRouteProfileFavourites(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Názory osobnosti: '}
                {FRONT_URL + getRouteProfileOpinions(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Veřejný profil osobnosti: '}
                {FRONT_URL + getPersonalityProfileLink(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Návrhy veřejného profilu organizace: '}
                {FRONT_URL + getRouteOrganisationProposals(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Hlasy veřejného profilu organizace: '}
                {FRONT_URL + getRouteOrganisationVotes(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Výsledky vyhledávání: '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearch(country, 'accessibilité')}
                >
                  {FRONT_URL + getRouteSearch(country, 'accessibilité')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Výsledky vyhledávání návrhů: '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchProposals(country, 'accessibilité')}
                >
                  {FRONT_URL +
                    getRouteSearchProposals(country, 'accessibilité')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Výsledky vyhledávání organizací: '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchOrganisations(country, 'association')}
                >
                  {FRONT_URL +
                    getRouteSearchOrganisations(country, 'association')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Výsledky vyhledávání konzultací: '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchConsultations(country, 'comment')}
                >
                  {FRONT_URL + getRouteSearchConsultations(country, 'comment')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Zákonná oznámení: '}
                <RedHTMLLinkElementStyle href={getLegalPageLink(country)}>
                  {FRONT_URL + getLegalPageLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Podmínky použití: '}
                <RedHTMLLinkElementStyle href={getGTUPageLink(country)}>
                  {FRONT_URL + getGTUPageLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Datové zásady: '}
                <RedHTMLLinkElementStyle href={getDataPageLink(country)}>
                  {FRONT_URL + getDataPageLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Strana Prohlášení o přístupu: '}
                <RedHTMLLinkElementStyle href={getA11YPageLink(country)}>
                  {FRONT_URL + getA11YPageLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Stránka Kontakt: '}
                <RedHTMLLinkElementStyle href={getContactPageLink(country)}>
                  {FRONT_URL + getContactPageLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ZPĚTNÁ VAZBA A KONTAKT
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Pokud nemáte přístup k obsahu nebo službě, můžete kontaktovat
              správce webu, který vás přesměruje na dostupnou alternativu nebo
              vám pomůže získat obsah jinou formou.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              {'Kontaktujte nás na této e-mailové adrese: '}
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
export default A11yCS; // eslint-disable-line import/no-default-export
