import React, { FC } from 'react';
import {
  PRIVACY_POLICY_DATE,
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
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { getContactMailByCountry } from '@make.org/utils/helpers/countries';
import { getCookiesPageLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
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
  StaticExternalLinkIconStyle,
  StaticFourthLevelTitleStyle,
  StaticListTitleStyle,
} from '../style';

export const DataCS: FC = () => {
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
          CHARTA OSOBNÍCH ÚDAJŮ
          <StaticTitleExtra>
            - ze dne{' '}
            {DateHelper.localizedAndFormattedDate(
              PRIVACY_POLICY_DATE,
              DATE.PPP_FORMAT
            )}{' '}
            -
          </StaticTitleExtra>
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Tento dokument doplňuje obecné podmínky MAKE.ORG a představuje závazky
          Make.org, zjednodušené akciové společnosti, se sídlem na adrese 4 rue
          René Villermé, 75011 Paříž, registrovanou u RCS PARIS pod číslem{' '}
          {MAKE_RCS} , jednající jako správce údajů, s ohledem na dodržování
          platných předpisů upravujících zpracování osobních údajů a zejména
          nařízení Evropského parlamentu a Rady (
          <abbr title="European Union">UE</abbr>) 2016/679 ze dne 27. dubna 2016
          platného do května 25, 2018 (dále jen „GDPR“).
        </StaticParagraphStyle>
        <StaticPrimaryUnorderedListStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              POPIS ZPRACOVÁNÍ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org dbá o ochranu osobních údajů obecně a zejména o ochranu
              uživatelů svých webových stránek a online konzultací. Pro Make.org
              je to jedna ze základních hodnot digitální technologie a nezbytná
              podmínka svobody svědomí. Za tímto účelem se Make.org zavazuje
              omezit množství shromažďovaných osobních údajů na minimum nezbytné
              pro provoz jejích webových stránek, konzultací a dalších online
              operací.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              V důsledku toho může Make.org zpracovávat osobní údaje pouze a
              jedině v rámci výkonu svého poslání a pro následující účely:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                používání a zlepšování webových stránek a služeb Make.org a
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                realizace konzultací a dalších operací Make.org.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Právním základem pro zpracování osobních údajů, které prování
              Make.org, je souhlas uživatelů webových stránek, konzultací a
              další online operací.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org uživatelům umožňuje předkládat návrhy ke konzultaci
              (možnost č. 1) a/nebo reagovat na návrhy předložené ke konzultaci
              jinými uživateli a nebo o noch hlasovat (možnost č. 2). Osobní
              údaje, které Make.org zpracovává, se dle těchto dvou možností dělí
              na dvě skupiny:
            </StaticParagraphStyle>
            <StaticFourthLevelTitleStyle>
              Možnost č. 1
            </StaticFourthLevelTitleStyle>
            <StaticListTitleStyle>Totožnost</StaticListTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Křestní jméno
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Datum narození
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Povolání (volitelné u určitých konzultací)
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Poštovní směrovací číslo (volitelné u určitých konzultací)
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticListTitleStyle>Připojení</StaticListTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>IP adresa</StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                Facebookové ID
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>Google ID</StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticListTitleStyle>
              A/nebo v případě otevření personalizovaného účtu na Make.org
            </StaticListTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Emailová adresa
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>Heslo</StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticListTitleStyle>Účast na konzultaci</StaticListTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Návrh podaný v rámci konzultace
                <StaticParagraphStyle>
                  Případné reakce na návrhy předložené v rámci konzultace
                </StaticParagraphStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticFourthLevelTitleStyle>
              Možnost č. 2
            </StaticFourthLevelTitleStyle>
            <StaticListTitleStyle>Totožnost</StaticListTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Křestní jméno
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticListTitleStyle>Připojení</StaticListTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>IP adresa</StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticListTitleStyle>Účast na konzultaci</StaticListTitleStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                Reakce na návrhy předložené v rámci konzultace
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              S výjimkou kategorií osobních údajů označených jako nepovinné
              zabrání odmítnutí poskytnutí údajů uvedených výše uživateli
              předkládat návrhy v rámci konzultace (možnost č. 1) a/nebo
              reagovat na návrhy předložené v rámci konzultace (možnost č. 2).
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              POVINNOSTI MAKE.ORG
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>Make.org se zavazuje:</StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                zpracovávat osobní údaje pouze pro účely uvedené níže;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                zaručit důvěrnost osobních údajů, zejména tím, že zajistí, aby
                se třetí osoby oprávněné zpracovávat osobní údaje zavázaly k
                respektování jejich důvěrnosti nebo aby se na ně vztahovala
                přiměřená zákonná povinnost mlčenlivosti;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                brát v úvahu s ohledem na své nástroje, konzultace, aplikace
                nebo služby zásady ochrany údajů již od návrhu a standardně
                ochrany údajů (Privacy By Design).
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>PŘÍJEMCI</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Osobní údaje zpracovávané při plnění úkolu nesmějí být poskytnuty
              třetím stranám s výjimkou případů uvedených níže nebo s výjimkou
              zákonných nebo regulačních ustanovení.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Proto je přístup, za účelem plnění příslušných úkolů, k osobním
              údajům udělen pouze:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                osobám odpovědným za realizaci konzultací, osobám odpovědným za
                správu vztahů s uživateli a stížností, osobám odpovědným za
                logistiku a IT služby a rovněž jejich liniovým manažerům;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                případným subdodavatelům Make.org, s upřesněním, že smlouva
                podepsaná mezi uvedenými subdodavateli a Make.org bude uvádět
                povinnosti subdodavatelů, pokud jde o ochranu bezpečnosti a
                důvěrnosti údajů;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                případně partnerům nebo sponzorům konzultací, zejména za účelem
                jejich podpory a propagace, zvláště redakční.
              </StaticSquareListItemStyle>
              <StaticParagraphStyle>
                A konečně, údaje týkající se účasti na konzultaci jsou anonymně
                dostupné v open source – samozřejmě kromě údajů týkajících se
                identity uživatelů a také údajů o připojení.
              </StaticParagraphStyle>
            </StaticSquareListStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              SOUBORY COOKIES
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Když se připojíte k našim webovým stránkám, na váš terminál jsou
              umístěny soubory cookies. Jejich účel je zpříjemnit vám váš čas
              strávených na stránkách, zvýšit výkonnost našich stránek a
              optimalizovat naše občanské konzultace. Informace obsažené v
              souborech cookies nejsou určeny k tomu, aby vás osobně
              identifikovaly, a nikdy se nepoužívají k jiným účelům, než je
              uvedeno na naší stránce{' '}
              <RedLinkStyle to={`${getCookiesPageLink(country)}`}>
                správa souborů cookies
              </RedLinkStyle>
              .
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              VÝKON UŽIVATELSKÝCH PRÁV
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Uživatelé mají právo na přístup ke svým osobním údajům, právo na
              opravu svých osobních údajů, právo na výmaz svých osobních údajů,
              právo na omezení zpracování svých osobních údajů, právo na
              přenositelnost svých osobních údajů, právo nebýt předmětem
              automatizovaného individuálního rozhodování (včetně profilování) a
              také právo definovat směrnice týkající se osudu osobních údajů po
              smrti. Uživatelé mají také právo vznést námitku proti zpracování
              jejich osobních údajů oraganizací Make.org.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Uživatelé mohou svůj souhlas se zpracováním svých osobních údajů
              společností Make.org kdykoli odvolat, přičemž je uvedeno, že toto
              odvolání neovlivní zákonnost předchozího zpracování založeného na
              souhlasu.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Uplatnění výše uvedených práv uživateli může být provedeno
              jakýmkoli způsobem, zejména zasláním e-mailu na adresu:{' '}
              <RedHTMLLinkElementStyle
                as="a"
                href={`mailto:${contactMailByCountry}`}
              >
                {`${contactMailByCountry}`}
              </RedHTMLLinkElementStyle>
              Pokud se uživatelé domnívají, že jejich práva týkající se údajů
              nejsou společností Make.org respektována, mohou v každém případě
              podat stížnost u{' '}
              <RedHTMLLinkElementStyle
                as="a"
                href="https://www.cnil.fr/fr/adresser-une-plainte"
                target="_blank"
                rel="noopener"
              >
                CNIL
                <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                <ScreenReaderItemStyle>
                  Otevřít v novém okně
                </ScreenReaderItemStyle>
              </RedHTMLLinkElementStyle>
              .
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ZABEZPEČENÍ A DŮVĚRNOST ZPRACOVÁNÍ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org přijme veškerá nezbytná opatření k zachování a prosazení
              integrity a důvěrnosti osobních údajů.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org se zavazuje zejména zavést technická a organizační
              opatření k zajištění úrovně bezpečnosti a důvěrnosti při
              zohlednění současného stavu techniky odpovídající rizikům, která
              zpracování představuje, a povaze zpracovávaných osobních údajů.
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              DATOVÝ VÝSTUP
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Osobní údaje jsou uchovávány po dobu tří let od poslední návštěvy
              webových stránek nebo od posledního připojení k účtu.
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              POVĚŘENEC PRO OCHRANU ÚDAJŮ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Pověřenec pro ochranu údajů jmenovaný podle článku 37 GDPR je
              SELARL FWPA Avocats, 18 rue des Pyramides, 75001, Paříž,
              zastoupená notářem Jean-Baptiste Soufronem. Lze ho kontaktovat na
              adrese:{' '}
              <RedHTMLLinkElementStyle href={`mailto:${contactMailByCountry}`}>
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
export default DataCS; // eslint-disable-line import/no-default-export
