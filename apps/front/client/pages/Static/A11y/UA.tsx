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

export const A11yUA: FC = () => {
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
          ДЕКЛАРАЦІЯ ПРО ДОСТУПНІСТЬ
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Make.org зобов’язується зробити свій вебсайт загальнодоступним
          відповідно до статті 47 закону Франції № 2005-102 від 11 лютого 2005
          року.
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          {'Ця декларація доступності застосовується до вебсайту '}
          <RedHTMLLinkElementStyle href={FRONT_URL}>
            {FRONT_URL}
          </RedHTMLLinkElementStyle>
          .
        </StaticParagraphStyle>
        <FocusBlockWrapperStyle as="section">
          <FocusBlockCheckIconStyle aria-hidden focusable="false" />
          <FocusBlockTitleStyle>
            {`${summary.criteria.pourcentOk}% `}
            критеріїв{' '}
            <abbr
              lang="fr"
              title="Référentiel Général d’Amélioration de l’Accessibilité"
            >
              RGAA
            </abbr>{' '}
            4.0 виконано
          </FocusBlockTitleStyle>
          <FocusBlockParagraphStyle>
            Make.org прагне покращити доступність та інклюзивність у цифровому
            світі. RGAA є авторитетним документом, що встановлює стандарти
            доступності, яких наші проєктні та технічні команди намагаються
            максимально дотримуватися.
          </FocusBlockParagraphStyle>
          <FocusBlockParagraphStyle className="no-margin">
            Ця сторінка має на меті показати поточний стан доступності Make.org
            у прозорий спосіб.
          </FocusBlockParagraphStyle>
        </FocusBlockWrapperStyle>
        <FocusBlockWrapperStyle as="section">
          <FocusBlockTitleStyle>
            Дізнайтеся про нашу залученість до цифрової доступності
          </FocusBlockTitleStyle>
          <FocusBlockParagraphStyle>
            Щоб демократія залишалася справою кожного, необхідно враховувати
            питання інклюзії та доступності.{' '}
            <strong>
              Здійснення громадянських принципів є основоположним правом, яке не
              повинно ставитися під загрозу або обмежуватися однією або кількома
              ситуаціями обмежених можливостей.
            </strong>{' '}
            Саме тому Démocratie Ouverte та Make.org, два суб’єкти демократичних
            інновацій, працювали разом із CNCPH над розробкою Кодексу
            доступності інструментів для участі громадян. Цей Кодекс, підписаний
            17 грудня 2021 року, формалізує попередні зобов’язання двох
            організацій і демонструє волю продовжувати рух у цьому напрямку.
          </FocusBlockParagraphStyle>
          <RedHTMLLinkElementStyle
            href={`${FRONT_URL}/convention/cncph.html`}
            target="_blank"
            rel="noopener"
          >
            Завантажити Кодекс (html-версію)
            <StaticExternalLinkIconStyle aria-hidden focusable="false" />
            <ScreenReaderItemStyle>
              {i18n.t('common.open_new_window')}
            </ScreenReaderItemStyle>
          </RedHTMLLinkElementStyle>
        </FocusBlockWrapperStyle>
        <StaticPrimaryOrderedListStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              СТАН ВІДПОВІДНОСТІ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org частково відповідає вимогам
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
              РЕЗУЛЬТАТИ ПЕРЕВІРКИ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Проведений внутрішній аудит відповідності свідчить про те, що:{' '}
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successOk} перевірок успішно завершені;`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successKo} перевірки були неуспішними;`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.test.successNa} перевірок стосуються незастосовних критеріїв;`}
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successOk} критеріїв виконано;`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successKo} критеріїв не виконано;`}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {`${summary.criteria.successNa} критерії не є застосовними.`}
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Soit
              {` Тобто ${summary.criteria.pourcentOk}% критеріїв `}
              <abbr title="Référentiel Général d’Amélioration de l’Accessibilité">
                RGAA 4.0
              </abbr>
              <> </>
              виконано.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              СТВОРЕННЯ ДЕКЛАРАЦІЇ ДОСТУПНОСТІ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Ця декларація була створена 4 листопада 2020 року. Оновлено 4
              листопада 2020 року.
            </StaticParagraphStyle>
            <StaticFourthLevelTitleStyle>
              Технології, використані під час створення сайту Make.org:
            </StaticFourthLevelTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>HTML5</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>CSS</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>Javascript</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                React JS версії 16
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Переглянути
                <> </>
                <RedHTMLLinkElementStyle
                  href="https://gitlab.com/makeorg/platform/front/-/blob/production/package.json"
                  target="_blank"
                  rel="noopener"
                >
                  повний список використаних технологій
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticFourthLevelTitleStyle>
              Користувацькі агенти, допоміжні технології та інструменти, що
              використовуються для перевірки доступності:
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
              Під час оцінювання використовувався наступний інструментарій:
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
                  розширення браузера
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
                  розширення браузера
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
                  розширення браузера
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticFourthLevelTitleStyle>
              Сторінки сайту, які пройшли перевірку на відповідність:
            </StaticFourthLevelTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {'Головна сторінка (Франція): '}
                <RedHTMLLinkElementStyle href={getHomeLink('FR')}>
                  {FRONT_URL + getHomeLink('FR')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Головна сторінка (Велика Британія): '}
                <RedHTMLLinkElementStyle href={getHomeLink('GB')}>
                  {FRONT_URL + getHomeLink('GB')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка перегляду публічних консультацій:  '}
                <RedHTMLLinkElementStyle
                  href={getBrowseConsultationsLink(country)}
                >
                  {FRONT_URL + getBrowseConsultationsLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка перегляду результатів: '}
                <RedHTMLLinkElementStyle href={getBrowseResultsLink(country)}>
                  {FRONT_URL + getBrowseResultsLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка публічної консультації: '}
                {FRONT_URL + getParticipateLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка з пропозиціями: '}
                {FRONT_URL + getSequenceLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка результатів публічних консультацій: '}
                {FRONT_URL + getResultsLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка найпопулярніших ідей публічних консультацій: '}
                {FRONT_URL + getTopIdeasLink(country, 'dynamicslug')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {
                  'Сторінка з подробицями щодо найпопулярнішої ідеї публічної консультації:  '
                }
                {FRONT_URL +
                  getTopIdeaDetailsLink(country, 'dynamicslug', 'ideaId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка пропозиції: '}
                {FRONT_URL +
                  getProposalLink(
                    country,
                    'dynamicslug',
                    'proposalSlug',
                    'proposalId'
                  )}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка скидання паролю: '}
                {FRONT_URL +
                  getPasswordRecoveryLink(country, 'userId', 'resetToken')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка профілю користувача: '}
                {FRONT_URL + getRouteProfile(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка редагування профілю користувача: '}
                {FRONT_URL + getRouteProfileEdit(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка з переліком пропозицій користувача: '}
                {FRONT_URL + getRouteProfileProposals(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка з переліком обраних пропозицій користувача: '}
                {FRONT_URL + getRouteProfileFavourites(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка думок особистості: '}
                {FRONT_URL + getRouteProfileOpinions(country)}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Публічна сторінка профілю особистості: '}
                {FRONT_URL + getPersonalityProfileLink(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Публічний профіль сторінки пропозиції організації: '}
                {FRONT_URL + getRouteOrganisationProposals(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка голосування в профілі громадської організації: '}
                {FRONT_URL + getRouteOrganisationVotes(country, 'userId')}
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка результатів пошуку: '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearch(country, 'accessibilité')}
                >
                  {FRONT_URL + getRouteSearch(country, 'accessibilité')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка результатів пошуку пропозицій: '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchProposals(country, 'accessibilité')}
                >
                  {FRONT_URL +
                    getRouteSearchProposals(country, 'accessibilité')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка результатів пошуку організацій: '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchOrganisations(country, 'association')}
                >
                  {FRONT_URL +
                    getRouteSearchOrganisations(country, 'association')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка результатів пошуку публічних консультацій: '}
                <RedHTMLLinkElementStyle
                  href={getRouteSearchConsultations(country, 'comment')}
                >
                  {FRONT_URL + getRouteSearchConsultations(country, 'comment')}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка юридичної інформації: '}
                <RedHTMLLinkElementStyle href={getLegalPageLink(country)}>
                  {FRONT_URL + getLegalPageLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'PСторінка умов користування: '}
                <RedHTMLLinkElementStyle href={getGTUPageLink(country)}>
                  {FRONT_URL + getGTUPageLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка політики обробки даних: '}
                <RedHTMLLinkElementStyle href={getDataPageLink(country)}>
                  {FRONT_URL + getDataPageLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка декларації доступності: '}
                <RedHTMLLinkElementStyle href={getA11YPageLink(country)}>
                  {FRONT_URL + getA11YPageLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Сторінка з контактними даними: '}
                <RedHTMLLinkElementStyle href={getContactPageLink(country)}>
                  {FRONT_URL + getContactPageLink(country)}
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ЗВОРОТНИЙ ЗВ’ЯЗОК І КОНТАКТ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Якщо ви не можете отримати доступ до вмісту або послуги,
              зверніться до менеджера вебсайту, щоб він скерував вас на доступну
              альтернативу або надав можливість отримати вміст у іншій формі.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              {'Зв’яжіться з нами за цією електронною адресою: '}
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
export default A11yUA; // eslint-disable-line import/no-default-export
