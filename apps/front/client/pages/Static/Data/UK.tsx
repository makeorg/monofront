/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC } from 'react';
import { PRIVACY_POLICY_DATE } from '@make.org/utils/constants/config';
import { MetaTags } from '@make.org/components/MetaTags';
import { DateHelper } from '@make.org/utils/helpers/date';
import { DATE } from '@make.org/types/enums';
import {
  RedHTMLLinkElementStyle,
  RedLinkStyle,
} from '@make.org/ui/elements/LinkElements';
import { getContactMailByCountry } from '@make.org/utils/helpers/countries';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { getCookiesPageLink } from '@make.org/utils/helpers/url';
import {
  StaticPageWrapperStyle,
  StaticSecondLevelTitleStyle,
  StaticTitleExtra,
  StaticParagraphStyle,
  StaticPrimaryUnorderedListStyle,
  StaticPrimaryUnorderedListItemStyle,
  StaticThirdLevelTitleStyle,
  StaticSquareListStyle,
  StaticSquareListItemStyle,
} from '../style';

export const DataUK: FC = () => {
  const { state } = useAppContext();
  const { country, countriesWithConsultations } = state.appConfig;
  const contactMailByCountry = getContactMailByCountry(
    country,
    countriesWithConsultations
  );
  return (
    <>
      <MetaTags
        title={i18n.t('meta.privacy_policy.title')}
        description={i18n.t('meta.privacy_policy.description')}
      />
      <StaticPageWrapperStyle>
        <StaticSecondLevelTitleStyle>
          КОДЕКС ЩОДО ПЕРСОНАЛЬНИХ ДАНИХ
          <StaticTitleExtra>
            - станом на{' '}
            {DateHelper.localizedAndFormattedDate(
              PRIVACY_POLICY_DATE,
              DATE.PPP_FORMAT
            )}{' '}
            -
          </StaticTitleExtra>
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Цей документ доповнює Загальні умови користування MAKE.ORG і являє
          собою зобов’язання Make.org, акціонерного товариства спрощеного типу,
          що має юридичну адресу: 4 rue René Villermé, 75011 Paris,
          зареєстрована в Реєстрі торгівлі та компаній Парижа під номером 820
          016 095, що діє як контролер даних, щодо дотримання чинних нормативних
          актів, що застосовуються до обробки персональних даних, зокрема
          Регламенту (
          <abbr lang="fr" title="Union Européenne">
            ЄС
          </abbr>
          ) 2016/679 Європейського Парламенту та Ради від 27 квітня 2016 року,
          який набув чинності з 25 травня 2018 року (надалі «RGPD»).
        </StaticParagraphStyle>
        <StaticPrimaryUnorderedListStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ОПИС ОБРОБКИ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org турбується про захист персональних даних загалом та
              користувачів свого вебсайту й публічних онлайн-консультацій. Для
              Make.org це одна з фундаментальних цінностей цифрових технологій і
              необхідна умова свободи совісті. Для дотримання цього Make.org
              зобов’язується обмежити обсяг зібраних персональних даних тим, що
              є необхідним для роботи вебсайту й публічних консультацій та інших
              операцій онлайн.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Отже, Make.org може обробляти персональні дані тільки в межах
              виконання своєї місії та для таких цілей:
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Отже, Make.org може обробляти персональні дані тільки в межах
              виконання своєї місії та для таких цілей: &nbsp;
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                використання та вдосконалення вебсайту та послуг Make.org;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                проведення публічних консультацій та інших операцій Make.org.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Правовою підставою для обробки персональних даних компанією
              Make.org є згода користувачів вебсайту на участь у публічних
              консультаціях та інших онлайн-операціях.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org дозволяє користувачам подавати пропозиції до публічних
              консультацій (варіант 1) і/або реагувати й голосувати за
              пропозиції, подані до публічних консультацій іншими користувачами
              (варіант 2). Персональні дані, які обробляються Make.org, можуть
              бути у двох варіантах.
            </StaticParagraphStyle>
            <StaticParagraphStyle>Варіант 1</StaticParagraphStyle>
            <StaticParagraphStyle>Ідентифікація</StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Ім’я та прізвище
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Дата народження
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Професія (необов’язково для деяких публічних консультацій)
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Поштовий індекс (необов’язково для деяких публічних
                консультацій)
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>Підключення</StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>IP-адреса</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>Facebook ID</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>Google ID</StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Та/або, якщо ви створили обліковий запис на Make.org
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Адреса електронної пошти
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>Пароль</StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Участь у публічній консультації
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Пропозиції, надані для публічної консультації
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              У разі необхідності — відповіді на пропозиції, подані для
              публічної консультації
            </StaticParagraphStyle>
            <StaticParagraphStyle>Варіант 2</StaticParagraphStyle>
            <StaticParagraphStyle>Ідентифікація</StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Ім’я та прізвище
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>Підключення</StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>IP-адреса</StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Участь у публічній консультації
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Відповіді на пропозиції, подані для публічної консультації
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              За винятком категорій персональних даних, визначених як
              необов’язкові, відмова від надання вищезазначених даних
              унеможливить подання користувачем пропозицій до публічних
              консультацій (варіант 1) і/або реагування на пропозиції, подані до
              публічних консультацій (варіант 2).
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ЗОБОВ’ЯЗАННЯ MAKE.ORG
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org зобов’язується:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                обробляти персональні дані тільки для цілей, викладених нижче;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                гарантувати конфіденційність персональних даних, зокрема шляхом
                забезпечення того, щоб треті особи, уповноважені обробляти
                персональні дані, взяли на себе зобов’язання дотримуватися
                конфіденційності або на них було покладено відповідне юридичне
                зобов’язання щодо дотримання конфіденційності;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                ураховувати у своїх інструментах, публічних консультаціях,
                додатках або послугах принципи захисту даних із моменту розробки
                та захисту даних за замовчуванням (Privacy By Design).
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>ОТРИМУВАЧІ</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Персональні дані, які обробляються під час виконання місії, не
              можуть бути передані третім особам, за винятком випадків,
              передбачених нижче, або за винятком випадків, передбачених
              законодавчими чи нормативними положеннями.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Так, доступ до персональних даних виключно задля виконання своїх
              завдань можуть мати:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                особи, відповідальні за проведення публічних консультацій,
                особи, відповідальні за роботу зі зверненнями та скаргами
                користувачів, особи, відповідальні за матеріально-технічне та
                інформаційне забезпечення, а також їхні безпосередні керівники;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                будь-які субпідрядники Make.org — зокрема уточнюється, що в
                договорі, підписаному між зазначеними субпідрядниками та
                Make.org, будуть указані зобов’язання, які покладаються на
                субпідрядників щодо захисту безпеки та конфіденційності даних;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                у відповідних випадках партнери або замовники публічних
                консультацій задля їхньої підтримки та просування, зокрема
                редакційного.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Нарешті, дані, що стосуються участі в публічних консультаціях,
              доступні в анонімній формі у відкритих джерелах, за винятком,
              звичайно, даних, що стосуються ідентифікації користувачів і даних
              про з’єднання.
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>ОТРИМУВАЧІ</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Персональні дані, які обробляються під час виконання місії, не
              можуть бути передані третім особам, за винятком випадків,
              передбачених нижче, або за винятком випадків, передбачених
              законодавчими чи нормативними положеннями.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Так, доступ до персональних даних виключно задля виконання своїх
              завдань можуть мати:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                особи, відповідальні за проведення публічних консультацій,
                особи, відповідальні за роботу зі зверненнями та скаргами
                користувачів, особи, відповідальні за матеріально-технічне та
                інформаційне забезпечення, а також їхні безпосередні керівники;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                будь-які субпідрядники Make.org — зокрема уточнюється, що в
                договорі, підписаному між зазначеними субпідрядниками та
                Make.org, будуть указані зобов’язання, які покладаються на
                субпідрядників щодо захисту безпеки та конфіденційності даних;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                у відповідних випадках партнери або замовники публічних
                консультацій задля їхньої підтримки та просування, зокрема
                редакційного.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Нарешті, дані, що стосуються участі в публічних консультаціях,
              доступні в анонімній формі у відкритих джерелах, за винятком,
              звичайно, даних, що стосуються ідентифікації користувачів і даних
              про з’єднання.
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>COOKIES </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Коли ви відвідуєте наш сайт, на вашому пристрої розміщуються файли
              cookie, щоб покращити ваш користувацький досвід, підвищити
              продуктивність сайту й оптимізувати наші публічні консультації
              громадян. Інформація, що міститься у файлах cookie, не призначена
              для вашої особистої ідентифікації та ніколи не використовується
              для будь-яких інших цілей крім тих, які вказані на нашій сторінці{' '}
              <RedLinkStyle to={`${getCookiesPageLink(country)}`}>
                управління файлами cookie
              </RedLinkStyle>
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              РЕАЛІЗАЦІЯ ПРАВ КОРИСТУВАЧІВ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Користувачі мають право на доступ до своїх персональних даних,
              право на виправлення, видалення, обмеження обробки й перенесення
              своїх персональних даних, право не бути об’єктом автоматизованих
              персональних рішень (включно з профілюванням) і право визначати
              вказівки щодо долі своїх персональних даних після смерті.
              Користувачі також мають право заперечувати проти обробки своїх
              персональних даних Make.org.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Користувачі можуть відкликати свою згоду на обробку своїх
              персональних даних Make.org у будь-який час, розуміючи, що таке
              відкликання не вплине на законність попередньої обробки,
              здійсненої на підставі згоди.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Користувачі можуть реалізувати вищезазначені права будь-якими
              способами, зокрема шляхом надсилання електронного листа на
              адресу:&nbsp;
              <RedHTMLLinkElementStyle
                as="a"
                href={`mailto:${contactMailByCountry}`}
              >
                {`${contactMailByCountry}`}
              </RedHTMLLinkElementStyle>
              . Якщо користувачі вважають, що їхні права на дані не були
              дотримані Make.org, вони можуть у будь-якому випадку подати скаргу
              до{' '}
              <RedHTMLLinkElementStyle
                as="a"
                href="https://www.cnil.fr/fr/adresser-une-plainte"
              >
                CNIL відкрити в новому вікні
              </RedHTMLLinkElementStyle>
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              БЕЗПЕКА Й КОНФІДЕНЦІЙНІСТЬ ОБРОБКИ ДАНИХ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org уживатиме всіх необхідних заходів для збереження та
              забезпечення цілісності та конфіденційності персональних даних.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Зокрема, Make.org зобов’язується впровадити технічні й
              організаційні заходи для забезпечення, із урахуванням сучасного
              рівня розвитку, рівня безпеки та конфіденційності, що відповідає
              ризикам, пов’язаним із обробкою та характером оброблюваних
              персональних даних.
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>ДОЛЯ ДАНИХ</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Персональні дані зберігаються протягом трьох років після
              останнього відвідування сайту або після останнього входу до
              облікового запису.
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              СПЕЦІАЛІСТ ІЗ ЗАХИСТУ ДАНИХ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Відповідальним за захист даних, призначеним відповідно до статті
              37 RGPD, є SELARL FWPA Avocats, 18 rue des Pyramides, 75001,
              Paris, у особі пана Жана-Батіста Суфрона (Jean-Baptiste Soufron).
              Із ним можна зв’язатися за електронною адресою:{' '}
              <RedHTMLLinkElementStyle
                as="a"
                href={`mailto:${contactMailByCountry}`}
              >
                {`${contactMailByCountry}`}
              </RedHTMLLinkElementStyle>
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
        </StaticPrimaryUnorderedListStyle>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default DataUK; // eslint-disable-line import/no-default-export
