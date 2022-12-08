import React, { FC } from 'react';
import {
  GTU_DATE,
  MAKE_ADDRESS,
  MAKE_CAPITAL,
  MAKE_RCS,
} from '@make.org/utils/constants/config';
import { useAppContext } from '@make.org/store';
import { MetaTags } from '@make.org/components/MetaTags';
import { DateHelper } from '@make.org/utils/helpers/date';
import { DATE } from '@make.org/types/enums';
import {
  RedHTMLLinkElementStyle,
  RedLinkStyle,
} from '@make.org/ui/elements/LinkElements';
import { getContactMailByCountry } from '@make.org/utils/helpers/countries';
import {
  getDataPageLink,
  getModerationLinkByLanguage,
} from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  StaticPageWrapperStyle,
  StaticSecondLevelTitleStyle,
  StaticTitleExtra,
  StaticParagraphStyle,
  StaticPrimaryOrderedListStyle,
  StaticPrimaryOrderedListItemStyle,
  StaticThirdLevelTitleStyle,
  StaticFourthLevelTitleStyle,
  StaticSquareListItemStyle,
  StaticSquareListStyle,
  StaticSecondaryOrderedListStyle,
  StaticSecondaryOrderedListItemStyle,
  StaticStrongStyle,
  StaticExternalLinkIconStyle,
} from '../style';

export const TermsOfUseUK: FC = () => {
  const { state } = useAppContext();
  const { country, language, countriesWithConsultations } = state.appConfig;
  const contactMailByCountry = getContactMailByCountry(
    country,
    countriesWithConsultations
  );

  return (
    <>
      <MetaTags
        title={i18n.t('meta.gtu.title')}
        description={i18n.t('meta.gtu.description')}
      />
      <StaticPageWrapperStyle>
        <StaticSecondLevelTitleStyle>
          УМОВИ КОРИСТУВАННЯ MAKE.ORG
          <StaticTitleExtra>
            - станом на{' '}
            {DateHelper.localizedAndFormattedDate(GTU_DATE, DATE.PPP_FORMAT)}-
          </StaticTitleExtra>
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Make.org — це незалежна організація, яка є видавцем вебсайту й
          сервісів, відкритих для громадськості.
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          Для цього вона дозволяє Користувачам створювати Пропозиції на сайті.
          Інші Користувачі, які бажають це зробити, можуть коментувати або
          голосувати за ці Пропозиції, щоб підтримати їх. Мета — висунути на
          перший план релевантні суспільні роздуми, зокрема економічного,
          соціального, громадського та громадянського характеру. Ці роздуми
          потім зможуть підтримати партнери Make.org, які сприятимуть утіленню
          запропонованих ідей у життя.
        </StaticParagraphStyle>
        <StaticPrimaryOrderedListStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              МЕТА СЕРВІСУ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Метою цих загальних умов є визначення правил користування
              сервісами, що пропонуються на сайті Make.org (далі: «Сервіси»), а
              також визначення прав і обов’язків сторін у цьому контексті.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Вони доступні й можуть бути роздруковані в будь-який час за прямим
              посиланням у нижньому колонтитулі головної сторінки сайту.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Вони можуть бути доповнені, за необхідності, особливими умовами
              користування певними Сервісами або особливими умовами користування
              конкретними користувачами. У разі суперечності, спеціальні умови
              мають переважну силу над загальними.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ОПЕРАТОР САЙТУ Й СЕРВІСІВ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Управління Сайтом та Сервісами (або разом «Сервісами»)
              здійснюється компанією Make.org, акціонерним товариством
              спрощеного типу з капіталом {MAKE_CAPITAL}євро, що має юридичну
              адресу: {MAKE_ADDRESS}, зареєстроване в Реєстрі торгівлі та
              компаній Парижа під номером {MAKE_RCS} (надалі «Make.org»).
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org не є оператором онлайн-платформи, що підпадає під дію
              Закону Франції № 2018-1202 від 22 грудня 2018 року про протидію
              маніпулюванню інформацією. Таким чином, ми не є суб’єктом
              відповідних зобов’язань. Проте ми дуже серйозно ставимося до
              достовірності інформації, розміщеної на нашому сайті, і детально
              описуємо вживані стосовно цього заходи в даних Умовах користування
              та в нашому{' '}
              <RedHTMLLinkElementStyle
                href={getModerationLinkByLanguage(language)}
                target="_blank"
                rel="noopener"
              >
                Кодексі модерації
                <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                <ScreenReaderItemStyle>
                  {i18n.t('common.open_new_window')}
                </ScreenReaderItemStyle>
              </RedHTMLLinkElementStyle>{' '}
              .
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ДОСТУП ДО САЙТУ Й СЕРВІСІВ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Доступ до Сайту та Сервісів є безкоштовним.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Доступ до Сайту та Сервісів є безкоштовним. Він відкритий, із
              урахуванням обмежень, викладених на сайті:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                будь-якій фізичній особі, яка має повну правоздатність брати на
                себе зобов’язання відповідно до загальних умов (будь-яка фізична
                особа, яка не має повної правоздатності, може отримати доступ до
                Сайту та Сервісів тільки за згодою свого законного
                представника);,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                будь-якій неповнолітній особі з дозволу її законних
                представників та під їхнім наглядом;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                будь-якій юридичній особі, що діє через фізичну особу, яка має
                правоздатність діяти від імені й за дорученням юридичної особи.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ПРИЙНЯТТЯ ЗАГАЛЬНИХ УМОВ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Метою цих Загальних умов користування (далі — «{' '}
              <abbr lang="uk" title=" Умовах користування">
                CGUS
              </abbr>{' '}
              »)) є визначення умов, за якими Користувач може отримати доступ до
              Сервісів і користуватися ними. Вони є договором між Make.org та
              Користувачами Сервісу. Вони скасовують і замінюють усі попередні
              положення та становлять повний обсяг прав і обов’язків сторін.{' '}
              <abbr lang="uk" title=" Умовах користування">
                CGUS
              </abbr>{' '}
              доводяться до відома кожного Користувача, який їх читає.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Використання Сервісу означає повну й беззастережну згоду з цими{' '}
              <abbr lang="uk" title=" Умовах користування">
                CGUS
              </abbr>{' '}
              . Неприйняття, таким чином, тягне за собою відмову від
              використання Сервісу. Використання Сервісу також означає повну й
              беззастережну згоду з Політикою використання даних Make.org, яка є
              невід’ємною частиною цих{' '}
              <abbr lang="uk" title=" Умовах користування">
                CGUS
              </abbr>{' '}
              і доступна за{' '}
              <RedLinkStyle to={getDataPageLink(country)}>
                посиланням
              </RedLinkStyle>
              .
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Ці{' '}
              <abbr lang="uk" title=" Умовах користування">
                CGUS
              </abbr>{' '}
              можуть бути змінені в будь-який час і без попереднього
              повідомлення Make.org. Будь-які зміни вступають у силу відразу
              після розміщення нової версії{' '}
              <abbr lang="uk" title=" Умовах користування">
                CGUS
              </abbr>{' '}
              на Сайті. У зв’язку з цим Користувачеві пропонується регулярно
              ознайомлюватися з останньою версією{' '}
              <abbr lang="uk" title=" Умовах користування">
                CGUS
              </abbr>{' '}
              на Сайті. У іншому випадку вважається, що Користувач беззастережно
              приймає нову редакцію Загальних умов користування.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              КОРИСТУВАННЯ САЙТОМ
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Доступ до сайту
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Сайт є загальнодоступним, і всі Користувачі можуть відвідувати
                  його та голосувати за Пропозиції.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Зареєстровані користувачі
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Голосувати на сайті можуть усі Користувачі, але вносити
                  Громадські пропозиції можуть лише Зареєстровані користувачі.
                  Із цією метою бажаючі можуть зареєструватися на сайті,
                  заповнивши передбачену для цього форму. Після цього вони
                  повинні надати всю інформацію, позначену як обов’язкова.
                  Будь-яка неповна реєстрація не буде затверджена.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Користувачі, зареєстровані на сайті, окремо визначені як
                  «Зареєстровані користувачі».
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Зареєстровані користувачі гарантують, що вся інформація,
                  надана в реєстраційній формі, є точною, актуальною та
                  правдивою та не вводить в оману.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Зареєстрований користувач зобов’язується актуалізувати цю
                  інформацію у своєму Особистому кабінеті, звернувшись до
                  Make.org за електронною адресою&nbsp;
                  <RedHTMLLinkElementStyle
                    href={`mailto:${contactMailByCountry}`}
                  >
                    {`${contactMailByCountry}`}
                  </RedHTMLLinkElementStyle>
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Зареєстрований користувач поінформований та погоджується, що
                  інформація, яка вводиться для створення або оновлення його
                  Облікового запису, є підтвердженням його особи. Інформація, що
                  надається Користувачем, накладає зобов’язання після
                  підтвердження.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Обліковий запис та Особистий кабінет
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Реєстрація автоматично призводить до відкриття облікового
                  запису (далі: «Обліковий запис»), що дає доступ до особистого
                  простору (далі: «Особистий кабінет»), який дозволяє керувати
                  використанням Сервісів у формі та відповідно до технічних
                  засобів, які Make.org вважає найбільш прийнятними та які
                  можуть змінюватися згодом.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Зареєстровані користувачі можуть отримати доступ до свого
                  Особистого кабінету в будь-який час після ідентифікації за
                  допомогою імені користувача та пароля.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Зареєстровані користувачі зобов’язуються використовувати
                  Сервіси виключно у власних цілях і не дозволяти будь-якій
                  третій особі використовувати їх замість себе або від свого
                  імені, за винятком випадків, коли вони беруть на себе повну
                  відповідальність за це.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Зареєстровані користувачі також несуть відповідальність за
                  збереження конфіденційності свого імені користувача та паролю.
                  Вони повинні негайно зв’язатися з Make.org, якщо їм стане
                  відомо, що їхній Обліковий запис був використаний без їхнього
                  відома. Вони визнають, що Make.org має право вживати
                  відповідних заходів у таких випадках.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ОПИС СЕРВІСІВ
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Громадські пропозиції
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Платформа надає Користувачам можливість голосувати за
                  Громадські пропозиції, які були запропоновані іншими
                  Користувачами.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Усі пропозиції громадян, подані на Make.org, мають рівні шанси
                  бути втіленими в життя.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Саме за допомогою голосування користувачі можуть перетворити
                  пропозицію на Громадянську дію, щодо якої Make.org бере на
                  себе зобов’язання.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org бачить свою роль як посередника між пропозиціями
                  громадян і партнерами з реалізації проєктів. (
                  <RedHTMLLinkElementStyle href="#anchor_partners">
                    Див. 6.8 Партнери з реалізації проєктів
                  </RedHTMLLinkElementStyle>
                  )
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Оформлення Громадської пропозиції
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Зареєстровані користувачі можуть вносити власні Пропозиції,
                  які призначені для публікації, коментування, аналізу й
                  обговорення та які будуть винесені на голосування
                  Користувачами.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Форма та зміст Громадської пропозиції
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Кожна Громадська пропозиція повинна починатися зі слова «
                  Потрібно» й містити щонайбільше 140 символів. Громадська
                  пропозиція повинна бути розбірливою та написаною українською
                  мовою, у формі, зрозумілій для всіх, без скорочень і без
                  зловживання великими літерами.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Пропозиція не повинна містити елементів, які б суперечили
                  законодавству, моралі або умови яких порушували б положення
                  цих Умов користування.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Модерація та публікація Громадської пропозиції
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Публікація Громадської пропозиції Користувача підлягає
                  модерації на умовах, визначених цими{' '}
                  <abbr lang="uk" title=" Умовах користування">
                    CGUS
                  </abbr>{' '}
                  . Запит на публікацію Громадської пропозиції буде опрацьовано
                  командою Make.org у найкоротші терміни, протягом 48 годин.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Служба модерації Make.org перевіряє кожну отриману Громадську
                  пропозицію, перш ніж розмістити її на сайті. Таким чином,
                  Користувач повинен переконатися, що він не повторює без
                  необхідності подання Громадської пропозиції та не подає одну й
                  ту ж саму Громадську пропозицію. Він також не має спамити
                  працівників Сервісу, надсилаючи одні й ті ж Рішення з різних
                  адрес електронної пошти. Знову-таки, щоб надати голос усім
                  Користувачам, кожен Користувач може подати щонайбільше 100
                  пропозицій щодо однієї публічної консультації. Понад це
                  обмеження ми більше не зможемо приймати пропозиції та
                  повідомимо про це відповідного Користувача електронною поштою,
                  щоб пояснити причини цього обмеження та допомогти йому/їй
                  оптимально використовувати платформу.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Щойно Громадська пропозиція Користувача пройде перевірку, вона
                  буде опублікована на Сервісі, а її автору буде надіслано
                  повідомлення про публікацію.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Якщо Громадська пропозиція Користувача буде відхилена,
                  Make.org надішле Користувачеві електронного листа з
                  повідомленням про відхилення. Після цього Користувач має право
                  подати нову Громадську пропозицію.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Після публікації на Сервісі вона може просуватися на Сервісах,
                  але Make.org не гарантує частоту її показу або її аудиторію.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org зобов’язується не вносити довільних змін до
                  будь-якого юридичного вмісту, який відповідає правилам
                  модерації, за винятком будь-яких виправлень, пов’язаних з
                  орфографією.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Запит на видалення Громадської пропозиції Зареєстрованим
                  користувачем
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  У випадку, якщо Зареєстрований користувач бажає видалити
                  опубліковану ним Громадську пропозицію, він повинен надіслати
                  свій запит електронною поштою за наступною адресою Make.org:
                  &nbsp;
                  <RedHTMLLinkElementStyle
                    href={`mailto:${contactMailByCountry}`}
                  >
                    {`${contactMailByCountry}`}
                  </RedHTMLLinkElementStyle>
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Запит Користувача на видалення буде оброблений Make.org у
                  розумні терміни.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Голосування за Громадську пропозицію
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Усі Користувачі можуть голосувати за Громадську пропозицію на
                  Сайті без необхідності створення облікового запису, натискаючи
                  на кнопки «За», «Проти» або «Утримуюся».
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Використання Громадських пропозицій
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Використання для статистичних цілей:&nbsp;
                  </StaticStrongStyle>
                  Make.org може використовувати очищені від усіх персональних
                  даних Громадські пропозиції, незалежно від того, у зведеному
                  вони вигляді чи ні, включно з компіляціями, зведеннями для
                  статистичних, дослідницьких або будь-яких інших цілей.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Використання для дебатів:&nbsp;
                  </StaticStrongStyle>
                  Громадські пропозиції, опубліковані на Сервісі, можуть бути
                  відібрані Make.org для аналізу, коментування та/або
                  обговорення в межах публічних дебатів, організованих Make.org
                  або його партнерами.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Використання для звітності та дослідницьких цілей:&nbsp;
                  </StaticStrongStyle>
                  Громадські пропозиції, опубліковані на Сервісі, а також
                  пов’язані з ними голосування можуть бути відібрані Make.org
                  для проведення, серед іншого, аналізів, звітів і досліджень зі
                  статистичною та дослідницькою метою або для розробки проєктів
                  реформ.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Публікація білих книг: &nbsp;
                  </StaticStrongStyle>
                  Make.org може публікувати (зокрема й спільно з кимось)
                  некомерційні білі книги, що містять, частково або повністю,
                  Громадські пропозиції.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Редакційне використання:&nbsp;
                  </StaticStrongStyle>
                  Громадські пропозиції та пов’язані з ними голосування також
                  можуть бути прийняті, прокоментовані та проаналізовані
                  Make.org та/або журналістами-партнерами задля створення
                  редакційного контенту.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Використання в комунікативних цілях:&nbsp;
                  </StaticStrongStyle>
                  Громадські пропозиції можуть також використовуватися Make.org
                  на Сайті та відображатися на рекламних майданчиках, якими
                  керують партнери Make.org. За такої умови використання
                  Громадської пропозиції на зазначених рекламних майданчиках
                  призведе до публікації Пропозиції анонімно, якщо вона була
                  опублікована анонімно, або з субтитруванням із зазначенням
                  ПІБ, віку та департаменту, якщо Користувач надав таку
                  інформацію.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Реалізація Громадських пропозицій: &nbsp;
                  </StaticStrongStyle>
                  Нарешті, Пропозиції можуть бути предметом конкретної
                  трансформаційної дії як безпосередньо Користувачами, так і
                  через партнерів Make.org; як Користувач, який подав
                  Пропозицію, так і Користувачі, які проголосували за неї, чітко
                  розуміють і приймають це.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle
                id="anchor_partners"
                className="section6"
              >
                <StaticFourthLevelTitleStyle>
                  Партнери з реалізації проєктів
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Зареєстровані користувачі можуть подавати власні Громадські
                  пропозиції, які призначені для публікації, коментування,
                  аналізу та обговорення та які будуть висунуті на голосування
                  Користувачами.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>ДОКАЗИ </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Користувач визнає та прямо висловлює згоду з наступним:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                що дані, зібрані на сайті та на комп’ютерному обладнанні
                Make.org, є доказом реальності операцій, що здійснюються в
                контексті цього документа;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                що ці дані є єдиним доказом, прийнятним для сторін.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ОБОВ’ЯЗКИ КОРИСТУВАЧА
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Без шкоди для інших зобов’язань, викладених у цьому документі,
              Користувач зобов’язується дотримуватися зобов’язань, зазначених
              нижче.
            </StaticParagraphStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Дотримання законів і нормативно-правових актів
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Користувач зобов’язується під час використання Сервісів
                  дотримуватися чинних законів і нормативних актів, не
                  порушувати права третіх осіб і громадський порядок. Зокрема,
                  Користувач несе повну відповідальність за належне виконання
                  всіх адміністративних, фіскальних та/або соціальних
                  формальностей, а також за сплату всіх внесків, податків або
                  зборів будь-якого виду, які можуть знадобитися у зв’язку з
                  використанням ним Сервісу. Make.org не несе жодної
                  відповідальності в цьому відношенні
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Використання Сайту та Сервісів
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Користувач підтверджує, що він узяв до відома характеристики й
                  обмеження, зокрема технічні, усіх Сервісів на сайті. Він /
                  вона / вони несе / несуть повну відповідальність за
                  використання ним / нею / ними Сервісів.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Користувач поінформований і приймає, що реалізація Сервісів
                  вимагає від нього підключення до мережі інтернет і що якість
                  Сервісів безпосередньо залежить від цього підключення, за яке
                  він несе повну відповідальність.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Користувач зобов’язується не публікувати пропозиції рекламного
                  характеру або просування послуг для отримання прибутку.
                  Користувач зобов’язується не публікувати пропозиції, які не є
                  серйозними або не стосуються теми. Користувач зобов’язується
                  використовувати Сервіси виключно в особистих цілях.
                  Відповідно, він / вона / вони не може / можуть переуступати,
                  поступатися або передавати всі або частину своїх прав або
                  зобов’язань за цим документом третім особам у будь-який
                  спосіб.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Користувач зобов’язується не публікувати пропозиції, що
                  пропагують або ганьблять партії, організації або громадських
                  діячів.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Користувач також несе повну відповідальність за стосунки, які
                  він може встановити з іншими Користувачами, і за інформацію,
                  яку він передає їм у контексті Сервісів. Користувач несе
                  відповідальність за прояв належної обережності та
                  розсудливості в цих стосунках і комунікаціях. Користувач також
                  зобов’язується дотримуватися звичайних правил ввічливості й
                  чемності під час спілкування з іншими Користувачами.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Користувач зобов’язується не робити зауважень або пропозицій,
                  що суперечать законодавству або моралі, зокрема (цей перелік
                  не є вичерпним):
                </StaticParagraphStyle>
                <StaticSquareListStyle>
                  <StaticSquareListItemStyle>
                    висловлювання, що розпалюють расову ворожнечу, расистські,
                    антисемітські, ксенофобські, гомофобські висловлювання тощо;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    коментарі насильницького, порнографічного чи педофільського
                    характеру тощо;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    образливі, принизливі, наклепницькі висловлювання, а також
                    висловлювання, що зачіпають особисті права третіх осіб;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    коментарі щодо заперечення злочинів проти людяності та
                    визнаних геноцидів і вибачення за злочини;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    висловлювання, що підбурюють до вчинення дій, які караються
                    законом, наприклад підбурювання до вчинення насильницьких
                    або терористичних актів, до збуту наркотиків тощо;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    висловлювання, що порушують право на приватне життя або
                    право інтелектуальної власності третіх осіб;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    висловлювання, що порушують презумпцію невинуватості або
                    таємницю слідства тощо;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    висловлювання, що ображають людську гідність;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    висловлювання, які можуть розглядатися як зловживання
                    свободою вираження поглядів.
                  </StaticSquareListItemStyle>
                </StaticSquareListStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Зв’язок із Make.org
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Користувач зобов’язується надати Make.org усю інформацію,
                  необхідну для належного забезпечення роботи Сервісів. Загалом
                  Користувач погоджується активно співпрацювати з Make.org у
                  належному виконанні цих правил.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Користувач зобов’язується забезпечити відтворення своїх
                  пропозицій відповідно до правил індексації, форматування та
                  виділення Make.org, як видавця Сервісу.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ГАРАНТІЇ КОРИСТУВАЧА
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>Уміст</StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Користувач несе повну відповідальність за вміст будь-якого
                  виду (редакційний, графічний, аудіовізуальний або інший,
                  включно з ім’ям та/або зображенням, обраними Користувачем для
                  його ідентифікації на сайті), який він поширює в межах
                  Сервісів (надалі — «Вміст / Уміст»).
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Користувач гарантує Make.org, що він / вона / вони має / мають
                  усі права й дозволи, необхідні для розповсюдження цього Вмісту
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Користувач зобов’язується гарантувати, що зазначений Уміст є
                  законним, не порушує громадський порядок, суспільну мораль або
                  права третіх осіб, не порушує будь-які законодавчі або
                  нормативні положення та загалом не може призвести до цивільної
                  або кримінальної відповідальності для Make.org.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Таким чином, Користувачеві забороняється розповсюджувати,
                  зокрема (і цей перелік не є вичерпним):
                </StaticParagraphStyle>
                <StaticSquareListStyle>
                  <StaticSquareListItemStyle>
                    порнографічний, непристойний, шокуючий або непридатний для
                    сімейної аудиторії, наклепницький, образливий,
                    насильницький, расистський, ксенофобський або
                    ревізіоністський уміст;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Уміст, що порушує авторські права;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Уміст, що завдає шкоди іміджу третьої сторони;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Уміст, який не відповідає дійсності, вводить в оману або
                    пропонує чи пропагує незаконну, шахрайську чи оманливу
                    діяльність;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Уміст, що завдає шкоди комп’ютерним системам третіх осіб
                    (наприклад, віруси, хробаки, троянські програми тощо);
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    і в більш загальному сенсі Вміст, який може порушити права
                    третіх осіб або завдати шкоди третім особам будь-яким
                    способом або в будь-якій формі.
                  </StaticSquareListItemStyle>
                </StaticSquareListStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>
                  Обмеження на використання Сервісів
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Користувач визнає, що Сервіси пропонують додаткове, але не
                  альтернативне рішення до засобів, які він уже використовує для
                  досягнення тієї ж мети, і що це рішення не може замінити ці
                  інші засоби.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Користувач зобов’язаний уживати необхідних заходів для
                  збереження власними засобами у своєму Особистому кабінеті тієї
                  інформації, яку він вважає потрібною .
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Користувач поінформований і приймає, що реалізація Сервісів
                  вимагає від нього підключення до мережі інтернет і що якість
                  Сервісів безпосередньо залежить від цього підключення, за яке
                  він несе повну відповідальність.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>
                  Претензії та відшкодування
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Користувач звільняє Make.org від усіх претензій, скарг, дій і
                  вимог будь-якого роду, які Make.org може понести в результаті
                  порушення Користувачем будь-яких своїх зобов’язань або
                  гарантій, передбачених цими умовами та положеннями.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Користувач зобов’язується компенсувати Make.org будь-яку
                  шкоду, якої платформа може зазнати, і сплатити всі витрати,
                  збори та/або присудження, які він може понести в результаті.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ЗАБОРОНЕНА ПОВЕДІНКА
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Категорично забороняється використовувати Сервіси в наступних
              цілях:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                для здійснення незаконної або шахрайської діяльності або
                діяльності, що порушує права або безпеку третіх осіб;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                для порушення громадського порядку або чинних законів і правил;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                для втручання в комп’ютерну систему третьої сторони або для
                будь-якої діяльності характеру, що має на меті завдати шкоди,
                контролювати, втручатися або перехоплювати всю або частину
                комп’ютерної системи третьої сторони, або порушити її цілісність
                чи безпеку;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                для надсилання небажаних електронних листів та/або комерційних
                пропозицій чи запитів;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                для маніпуляцій, спрямованих на поліпшення індексування сайту
                третьої сторони;,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                для пособництва або підбурювання в будь-якій формі або будь-яким
                способом до одного або більше з вищезазначених актів і видів
                діяльності;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                і , загалом, для будь-якої практики, яка відвертає Сервіси до
                цілей, відмінних від тих, для яких вони були розроблені.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Користувачам суворо забороняється копіювати та/або привласнювати
              концепцію, технології або будь-який інший елемент вебсайту
              Make.org для власних цілей або цілей третіх осіб.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Також суворо забороняється: (i) будь-яка поведінка, яка може
              зашкодити, призупинити, уповільнити або запобігти безперервності
              роботи Сервісів; (ii) будь-яке втручання або спроба втручання в
              системи компанії Make. org; (iii) будь-яке незаконне привласнення
              системних ресурсів сайту; (iv) будь-які дії, які накладають
              непропорційне навантаження на інфраструктуру сайту; (v) будь-яке
              порушення заходів безпеки й автентифікації; (vi) будь-які дії, які
              можуть завдати шкоди фінансовим, комерційним або моральним правам
              та інтересам Make.org або користувачів сайту; і загалом (vii)
              будь-які порушення цих загальних умов.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Суворо забороняється монетизувати, продавати або ліцензувати весь
              або частину доступу до Сервісів або сайту, а також інформацію,
              розміщену та/або надану в ньому.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ОБМЕЖЕННЯ ГАРАНТІЇ MAKE.ORG
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Якість послуг
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Make.org не може гарантувати, що Сервіс буде безперебійним.
                  Make.org зобов’язується забезпечувати роботу Сервісу старанно
                  й відповідно до правил торгівлі, пам’ятаючи, що це лише
                  зобов’язання дії, яке Користувачі прямо визнають і приймають.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org зобов’язується проводити регулярні перевірки роботи й
                  доступності сайту. У зв’язку із цим Make.org залишає за собою
                  право тимчасово переривати доступ до сайту для технічного
                  обслуговування. Аналогічним чином, Make.org не може нести
                  відповідальність за тимчасові труднощі або неможливість
                  доступу до сайту через обставини непереборної сили,
                  форс-мажорні обставини або через перебої в роботі
                  телекомунікаційних мереж.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org не гарантує Користувачам, що (i) Сервіси, хоч вони і
                  є предметом постійних досліджень для поліпшення продуктивності
                  й прогресу, будуть повністю вільними від помилок, дефектів або
                  недоліків; (ii) Сервіси, що є стандартними й не пропонуються
                  виключно для використання цього Користувача відповідно до його
                  власних особистих обмежень, будуть конкретно відповідати його
                  потребам і очікуванням.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>Уміст</StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Незважаючи на те, що Сервіси модеруються, Make.org не може
                  нести відповідальність за Вміст, авторами якого є треті особи,
                  і будь-які претензії повинні бути надіслані насамперед автору
                  відповідного Вмісту.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Про Вміст, який завдає шкоди третій стороні, може бути
                  повідомлено Make.org відповідно до умов статті 6 I 5 закону
                  Франції № 2004-575 від 21 червня 2004 року про довіру до
                  цифрової економіки. Make.org залишає за собою право вжити
                  заходів, описаних у статті 12.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Утрата інформації
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Оскільки послуга надається безкоштовно, Make.org знімає з себе
                  будь-яку відповідальність за будь-яку втрату інформації,
                  доступної в Особистому кабінеті Користувача, оскільки
                  Користувач зобов’язаний зберегти її копію та не може вимагати
                  за це компенсації.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Збитки
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  У будь-якому випадку відповідальність, яка може бути понесена
                  Make.org за цими умовами, чітко обмежена доведеними прямими
                  збитками, зазнаними Користувачем.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ІНТЕЛЕКТУАЛЬНА ВЛАСНІСТЬ
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section12">
                <StaticFourthLevelTitleStyle>
                  Власність Make.org
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Make.org не претендує на право власності на Дані та Вміст,
                  надані Користувачами.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Системи, програмне забезпечення, структури, інфраструктура,
                  бази даних і вміст будь-якого виду (тексти, зображення,
                  візуальні ефекти, музика, логотипи, торгові марки, бази даних
                  тощо), що використовуються Make.org в межах сайту, захищені
                  всіма чинними правами інтелектуальної власності або правами
                  виробників баз даних.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Будь-яке відтворення, представлення, публікація, передача або
                  взагалі будь-яке несанкціоноване використання всього або
                  частини Сервісу та інформації, що міститься в ньому без
                  прямого дозволу Make.org, тягне за собою відповідальність
                  Користувача.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Будь-яке розбирання, декомпіляція, дешифрування, вилучення,
                  повторне використання, копіювання і,в більш загальному сенсі,
                  будь-який акт відтворення, представлення, розповсюдження і
                  використання будь-якого із цих елементів, повністю або
                  частково, без дозволу Make.org суворо заборонено й може бути
                  предметом судового розгляду.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section12">
                <StaticFourthLevelTitleStyle>
                  Право власності на Громадські пропозиції
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Власне Громадські пропозиції є власністю їхніх авторів, які
                  надають Make.org невиключну, передавану та безкоштовну
                  ліцензію на їхнє використання у Франції та в усьому світі, для
                  будь-якого використання онлайн та для будь-яких засобів
                  розповсюдження на термін дії цих{' '}
                  <abbr lang="fr" title="Conditions générales d'utilisation">
                    CGUS
                  </abbr>{' '}
                  та для всіх видів використання, зазначених у них.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ПОСИЛАННЯ ТА САЙТИ ТРЕТІХ ОСІБ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org жодним чином не несе відповідальності за технічну
              доступність вебсайтів або мобільних додатків третіх осіб (зокрема
              його можливих партнерів), на яких Користувач може отримати доступ
              через сайт.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org не несе відповідальності за вміст, рекламу, продукти
              та/або послуги, доступні на таких сторонніх вебсайтах і мобільних
              додатках, які регулюються їхніми власними умовами використання.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org також не несе відповідальності за взаємодію між
              Користувачем і будь-яким рекламодавцем, фахівцем або торговцем (як
              і будь-якого з його партнерів), до якого Користувач направляється
              через сайт, і не є стороною в будь-яких суперечках із такими
              третіми особами щодо доставки продуктів та/або послуг, гарантій,
              декларацій і будь-яких інших зобов’язань, якими пов’язані такі
              треті сторони.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ПОКАРАННЯ ТА ПРИПИНЕННЯ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              У разі порушення Користувачем будь-якого з положень Загальних умов
              користування або загалом чинних законів і нормативних актів,
              Make.org залишає за собою право вжити будь-яких відповідних
              заходів, зокрема:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                призупинити або припинити доступ до Сервісу Користувача, який є
                автором або учасником порушення або посягання;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                видаляти будь-який уміст, розміщений на сайті;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                публікувати на сайті будь-яке інформаційне повідомлення, яке
                Make.org вважає корисним;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                повідомляти в будь-який відповідний орган;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                учиняти будь-які юридичні дії.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>

            <StaticParagraphStyle>
              Загалом у разі порушення Користувачем своїх зобов’язань за цими
              CGUS і/або в разі порушення будь-якого чинного законодавства або
              нормативних актів, Make.org може припинити дію цих{' '}
              <abbr lang="uk" title=" Умовах користування">
                CGUS
              </abbr>{' '}
              із повним правом і без попереднього повідомлення або
              формальностей.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Припинення дії цих CGUS призведе до припинення доступу до Сервісів
              для відповідного Користувача, а також до видалення його даних та
              вмісту. Користувач буде проінформований про зазначене припинення
              електронною поштою, на адресу, указану ним під час реєстрації.
              Припинення дії не впливає на будь-які збитки, які Make.org може
              вимагати як компенсацію за будь-яку шкоду, понесену в результаті
              порушень Користувача. Make.org може згодом відмовити Користувачеві
              у створенні нового облікового запису на Сервісі.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Оскільки Сервіси є безкоштовними, Make.org може в будь-який час і
              без попередження, із будь-якої причини, тимчасово або назавжди,
              видалити публікацію Громадської пропозиції.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Аналогічно, оскільки Сервіси є безкоштовними, Make.org може в
              будь-який час і без попередження, із будь-якої причини, тимчасово
              або назавжди, змінювати або видаляти Сервіси частково або
              повністю.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ТРИВАЛІСТЬ НАДАННЯ ПОСЛУГ, СКАСУВАННЯ РЕЄСТРАЦІЇ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Підписка на Сервіси здійснюється на невизначений термін.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Зареєстрований Користувач може в будь-який момент відмовитися від
              реєстрації на Сервісі, надіславши відповідний запит на адресу
              Make.org електронною поштою за адресою&nbsp;
              <RedHTMLLinkElementStyle href={`mailto:${contactMailByCountry}`}>
                {`${contactMailByCountry}`}
              </RedHTMLLinkElementStyle>
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Відмова від реєстрації вступає в силу негайно. Це призводить до
              автоматичного видалення Облікового запису Зареєстрованого
              користувача та його Пропозицій.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>ЗМІНИ</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org залишає за собою право змінювати Загальні умови
              користування в будь-який час.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Користувач буде проінформований про ці зміни будь-яким зручним для
              нього способом.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Будь-який Користувач, який не приймає змінені загальні умови,
              повинен відписатися від Сервісів відповідно до умов, викладених у
              цих загальних умовах користування сайтом.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Будь-який Користувач, який користується Сервісами після набрання
              чинності зміненими загальними умовами, вважається таким, що
              прийняв ці зміни.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>ЦІЛІСНІСТЬ</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Якщо одне або декілька положень цих Умов є недійсними відповідно
              до закону або нормативно-правового акта, або визнані такими
              остаточним рішенням компетентного суду, вони вважаються такими, що
              не мають юридичної сили. Інші положення цієї Угоди залишаються
              чинними, зберігаючи всю свою силу та обсяг, наскільки це можливо,
              і Сторони зобов’язуються, у разі необхідності, об’єднати зусилля
              для заміни недійсного положення дійсним, якомога ближчим за духом
              до того, яке передбачається замінити.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>НЕВІДМОВА</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Той факт, що одна зі Сторін не скористалася в певний час одним із
              положень цієї Угоди, не може тлумачитися або розглядатися як
              відмова від своїх прав за цією Угодою, жодним чином не впливає на
              дійсність усієї або частини цієї Угоди й не зачіпає права
              відповідної Сторони діяти відповідним чином.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Жодна зі Сторін не вважається такою, що відмовилася від будь-якого
              права за Угодою, якщо вона не підписала письмову відмову.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>ФОРС-МАЖОР</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Будь-яка непередбачувана, непереборна подія зовнішнього характеру
              з точки зору Сторін, як-от (перелік не є вичерпним) військові або
              терористичні акти, злочинні дії, масові заворушення, стихійні лиха
              або промислові катастрофи, вибухи, законодавчі реквізиції й інші
              законодавчі або нормативні положення, що обмежують здійснення
              діяльності Make.org, збої в роботі електронних мереж зв’язку, що
              не залежать від Make.org тощо, вважається форс-мажорною
              обставиною. У разі настання таких обставин Make.org може бути
              змушений призупинити роботу Сервісу. Дія договору буде призупинена
              й може бути відновлена після закінчення форс-мажорних обставин на
              період, що залишився до кінця дії договору. Вона також може
              залишатися тимчасово обмеженою.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>МОВА</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              У разі перекладу Загальних умов однією або кількома мовами мовою
              тлумачення буде французька в разі виникнення розбіжностей або
              суперечок щодо значення терміну або положення.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ЗАСТОСОВНЕ ПРАВО ТА ЮРИСДИКЦІЯ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Загальні умови регулюються французьким законодавством.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              У разі виникнення супереки щодо дійсності, тлумачення та/або
              виконання цих загальних положень і умов, сторони погоджуються, що
              суди м. Парижа мають виключну юрисдикцію виносити рішення з цього
              питання, за винятком випадків, коли обов’язкові процесуальні норми
              передбачають інше.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              НАБРАННЯ ЧИННОСТІ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Загальні умови набули чинності{' '}
              {DateHelper.localizedAndFormattedDate(GTU_DATE, DATE.P_FORMAT)}.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
        </StaticPrimaryOrderedListStyle>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default TermsOfUseUK; // eslint-disable-line import/no-default-export
