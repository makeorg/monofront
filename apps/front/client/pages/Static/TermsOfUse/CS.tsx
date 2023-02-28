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
  getModerationPageLink,
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

export const TermsOfUseCS: FC = () => {
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
          PODMÍNKY POUŽITÍ MAKE.ORG
          <StaticTitleExtra>
            - dne{' '}
            {DateHelper.localizedAndFormattedDate(GTU_DATE, DATE.PPP_FORMAT)} -
          </StaticTitleExtra>
        </StaticSecondLevelTitleStyle>
        <StaticParagraphStyle>
          Make.org je zcela nezávislá organizace, která edituje internetové
          stránky a služby přístupné veřejnosti.
        </StaticParagraphStyle>
        <StaticParagraphStyle>
          Za tímto účelem zprostředkovává webové stránky, na kterých mohou
          uživatelé předkládat své Návrhy. Ostatní uživatelé, kteří si to přejí,
          pak mohou tyto Návrhy komentovat nebo pro ně hlasovat, aby je
          podpořili, přičemž cílem je uspět ve vnesení úvah o otázkách obecného
          zájmu, zejména ekonomických, sociálních a občanských. Tyto úvahy pak
          mohou převzít partneři organizace Make.org, kteří je pomohou
          konkretizovat a realizovat.
        </StaticParagraphStyle>
        <StaticPrimaryOrderedListStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              PŘEDNĚT SLUŽBY
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Předmětem těchto obecných podmínek je vymezit podmínky používání
              služeb nabízených na Make.org (dále jen „Služby“), jakož i vymezit
              práva a povinnosti stran v této souvislosti.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Zejména jsou kdykoli přístupné a lze je vytisknout prostřednictvím
              přímého odkazu ve spodní části domovské stránky webu.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Mohou být případně doplněny o podmínky použití specifické pro
              určité Služby nebo o podmínky použití specifické pro určité
              konkrétní uživatele. V případě rozporu mají zvláštní podmínky
              přednost před těmito obecnými podmínkami.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              PROVOZOVATEL WEBOVÝCH STRÁNEK A SLUŽEB
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Webové stránky a Služby (nebo společně „Služby“) provozuje
              společnost Make.org, zjednodušená akciová společnost s kapitálem{' '}
              {MAKE_CAPITAL}, se sídlem na adrese {MAKE_ADDRESS}, zapsaná u RCS
              Paris pod číslem {MAKE_RCS} (dále jen „Make.org“).
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org není provozovatelem online platformy spadající do
              působnosti zákona č. 2018-1202 ze dne 22. prosince 2018 o boji
              proti manipulaci s informacemi. Proto se na nás nevztahují
              související povinnosti. Pravdivost informací zveřejněných na
              našich stránkách je však pro nás důležitá, veškerá v tomto ohledu
              přijatá opatření naleznete v těchto{' '}
              <abbr lang="cs" title="Obecných Podmínek Používání">
                OPP
              </abbr>{' '}
              a v{' '}
              <RedHTMLLinkElementStyle
                href={getModerationPageLink(country, language)}
                target="_blank"
                rel="noopener"
              >
                Chartě moderování.
                <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                <ScreenReaderItemStyle>
                  {i18n.t('common.open_new_window')}
                </ScreenReaderItemStyle>
              </RedHTMLLinkElementStyle>
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              PŘÍSTUP NA WEBOVÉ STRÁNKY A KE SLUŽBÁM
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Přístup na webové stránky a ke službám je zdarma.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Přístup na webové stránky a ke službám je zdarma. Je otevřený, s
              výhradou omezení uvedených na webových stránkách:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                jakékoli fyzické osobě plně způsobilé k právním úkonům za těchto
                obecných podmínek. Fyzické osobě, která není způsobilá k právním
                úkonům v plném rozsahu, je přístup na stránky a ke službám
                umožněn pouze se souhlasem jejího zákonného zástupce,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                jakémukoli nezletilému se souhlasem jeho zákonných zástupců a
                pod jejich kontrolou,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                jakékoli právnické osobě jednající prostřednictvím fyzické
                osoby, která je způsobilá uzavírat smlouvy jménem a na účet
                právnické osoby.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              PŘIJETÍ SMLUVNÍCH PODMÍNEK
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Účelem těchto obecných podmínek používání (dále jen „{' '}
              <abbr lang="cs" title="Obecných Podmínek Používání">
                OPP
              </abbr>{' '}
              “) je definovat podmínky, za kterých může uživatel přistupovat ke
              Službám a používat je. Představují smlouvu mezi oraganizací
              Make.org a uživateli Služby. Ruší a nahrazují všechna předchozí
              ustanovení a tvoří veškerá práva a povinnosti stran.{' '}
              <abbr lang="cs" title="Obecných Podmínek Používání">
                OPP
              </abbr>{' '}
              jsou sděleny každému uživateli, který se s nimi v ten okamžik
              seznámí.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Používání Služby předpokládá plné a bezvýhradné přijetí těchto{' '}
              <abbr lang="cs" title="Obecných Podmínek Používání">
                OPP
              </abbr>{' '}
              . Nepřijetí tedy znamená zřeknutí se jejího využívání.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Využívání Služby také znamená úplné a bezvýhradné přijetí Zásad
              používání dat Make.org, které jsou nedílnou součástí těchto{' '}
              <abbr lang="cs" title="Obecných Podmínek Používání">
                OPP
              </abbr>{' '}
              a jsou k dispozici{' '}
              <RedLinkStyle to={getDataPageLink(country, language)}>
                zde
              </RedLinkStyle>
              .
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Tyto{' '}
              <abbr lang="cs" title="Obecných Podmínek Používání">
                OPP
              </abbr>{' '}
              může Make.org kdykoli a bez upozornění upravit. Jakákoli změna
              nabude účinnosti okamžitě po zveřejnění nové verze{' '}
              <abbr lang="cs" title="Obecných Podmínek Používání">
                OPP
              </abbr>{' '}
              sur le Site. L’Utilisateur est donc invité à consulter
              régulièrement la dernière version des{' '}
              <abbr lang="cs" title="Obecných Podmínek Používání">
                OPP
              </abbr>{' '}
              na webových stránkách. Uživatel je proto vyzván, aby na nich
              pravidelně konzultoval nejnovější verzi OPP. Pokud tak neučiní,
              bude se mít za to, že bez výhrad přijímá novou verzi obecných
              podmínek použití.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              POUŽÍVÁNÍ WEBOVÝCH STRÁNEK
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Přístup na webové stránky
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Webové stránky jsou přístupné široké veřejnosti a všichni
                  uživatelé je mohou navštívit a hlasovat o Návrzích.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Registrovaní uživatelé
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Na webových stránkách mohou hlasovat všichni uživatelé, ale
                  pouze registrovaní uživatelé mohou podávat Občanské návrhy.
                  Pokud si neregistrovaní uživatelé přejí podat návrh, mohou se
                  na webových stránkách zaregistrovat vyplněním formuláře
                  poskytnutého pro tento účel. Poté musí poskytnout všechny
                  údaje označené jako povinné. Jakákoli neúplná registrace
                  nebude potvrzena.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Uživatelé registrovaní na webových stránkách jsou specificky
                  definováni jako „Registrovaní uživatelé“.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Registrovaní uživatelé zaručují, že všechny informace uvedené
                  v registračním formuláři jsou přesné, aktuální a pravdivé a
                  nejsou poškozeny žádným zavádějícím charakterem.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Registrovaný uživatel se zavazuje informace uvedené ve svém
                  osobním prostoru aktualizovat zasláním e-mailu organizaci
                  Make.org na adresu&nbsp;
                  <RedHTMLLinkElementStyle
                    href={`mailto:${contactMailByCountry}`}
                  >
                    {`${contactMailByCountry}`}
                  </RedHTMLLinkElementStyle>
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Registrovaný uživatel je informován a souhlasí s tím, že
                  informace zadané za účelem vytvoření nebo aktualizace jeho
                  účtu jsou ekvivalentní důkazu jeho totožnosti. Údaje zadané
                  uživatelem ho zavazují, jakmile jsou ověřeny.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section5">
                <StaticFourthLevelTitleStyle>
                  Účet a osobní prostor
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Registrace vede automaticky k otevření účtu (dále jen „Účet“),
                  který umožňuje přístup do osobnímu prostoru (dále jen „Osobní
                  prostor“), který umožňuje správu využívání Služeb ve formě a
                  podle technických prostředků, které Make.org považuje za
                  nejvhodnější a které se mohou v průběhu času měnit.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Registrovaní uživatelé mohou do svého Osobního prostoru
                  vstoupit kdykoli poté, co se identifikují pomocí svého
                  přihlašovacího jména a hesla.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Registrovaní uživatelé se zavazují, že budou používat Služby
                  výhradně pro osobní účely a neumožní žádné třetí straně je
                  používat místo nich nebo jejich jménem, s výjimkou, kdy v
                  takovém případě ponesou plnou odpovědnost.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Registrovaní uživatelé jsou podobně odpovědní za zachování
                  důvěrnosti svého uživatelského jména a hesla. Pokud zjistí, že
                  jejich účet byl použit bez jejich vědomí, musí skutečnost
                  okamžitě ohlásit organizaci Make.org. V takových případech
                  uznávají právo organizace Make.org uchýlit se ke všem vhodným
                  opatřením.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              POPIS SLUŽEB
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Občanské návrhy
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Platforma Uživatelům nabízí možnost hlasovat o Občanských
                  návrzích, které byly navrženy jinými Uživateli.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Všechny občanské návrhy předložené na Make.org mají stejnou
                  šanci na realizaci.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Právě svým hlasováním může uživatel podpořit přechod návrhu k
                  občanské akci, ke které se Make.org zavázala.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org pak vidí svou roli jako roli prostředníka mezi
                  občanskými návrhy a akčními partnery. (
                  <RedHTMLLinkElementStyle href="#anchor_partners">
                    Viz 6.8 Akční partneři
                  </RedHTMLLinkElementStyle>
                  )
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Formulace Občanského návrhu
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Registrovaní uživatelé mohou podávat své vlastní Občanské
                  návrhy, které jsou určeny ke zveřejnění, komentování, analýze
                  a diskusi a které budou předloženy Uživatelům k hlasování.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Forma a obsah Občanských návrhů
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Každý Občanský návrh musí začínat slovy „Je třeba“ a může
                  obsahovat maximálně 140 znaků. Občanský návrh musí být čitelný
                  a napsaný v češtině, ve formě srozumitelné všem, bez zkratek a
                  bez zneužívání velkých písmen.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Návrh nesmí obsahovat prvky, které by byly v rozporu se
                  zákonem, dobrými mravy nebo jejichž znění by bylo v rozporu s
                  ustanoveními těchto obecných podmínek použití.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Moderování a zveřejnění Občanského návrhu
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Zveřejnění Občanského návrhu Uživatele podléhá procesu
                  moderování za podmínek definovaných v těchto{' '}
                  <abbr lang="cs" title="Obecných Podmínek Používání">
                    OPP
                  </abbr>{' '}
                  . Žádost o zveřejnění Občanského návrhu bude týmy Make.org
                  zpracována co nejrychleji s cílem odpovědět do 48 hodin.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Před zveřejněním online je každý podaný Občanský návrh
                  prozkoumán týmem moderátorů Make.org. Uživatel proto musí dbát
                  na to, aby zbytečně opětovně nezasílal návrh na Občanský návrh
                  a nepodával stejný návrh na Občanský návrh. Rovněž nesmí
                  Služby zahlcovat zasíláním spammů, ve kterých nabízí stejná
                  řešení, z různých e-mailových adres. S cílem zajistit stejný
                  prostor pro vyjádření se všem Uživatelům, každý uživatel může
                  v rámci jedné konzultace předložit maximálně 100 návrhů. Po
                  překročení této hranice nám již nebude možné jeho návrhy
                  přijímat a příslušný Uživatel obdrží e-mail s vysvětlením
                  důvodů tohoto prahu a s tipy na optimálním využívání
                  platformy.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Občanský návrh Uživatele bude po schválení zveřejněn ve Službě
                  a jeho autorovi bude zasláno oznámení o zveřejnění.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  V případě zamítnutí Občanského návrhu Uživatele mu Make.org
                  zašle e-mail s upozorněním na toto odmítnutí. Uživatel pak
                  může dle vlastního uvážení podat nový občanský návrh.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Po zveřejnění ve Službě může být dále uveden v popředí ve
                  Službách, ovšem Make.org nezaručuje frekvenci výskytu nebo
                  publikum.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org se zavazuje, že nebude svévolně upravovat zákonný
                  obsah, který odpovídá stanoveným pravidlům moderování, který
                  jí je předkládán s výjimkou jakýchkoli oprav souvisejících s
                  pravopisem.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Žádost Registrovaného uživatele o smazání Občanského návrhu
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  V případě, že si Registrovaný uživatel přeje, aby byl jeho
                  zveřejněný Občanský návrh smazán, zašle svůj požadavek
                  organizaci Make.org e-mailem na následující adresu:&nbsp;
                  <RedHTMLLinkElementStyle
                    href={`mailto:${contactMailByCountry}`}
                  >
                    {`${contactMailByCountry}`}
                  </RedHTMLLinkElementStyle>
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Organizace Make.org pak žádost Uživatele o smazání v přiměřené
                  době zpracuje..
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Hlasování o Občanském návrhu
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  O Občanských návrzích zveřejněných na webových stránkách mohou
                  hlasovat všichni uživatelé, aniž by si museli vytvořit účet.
                  Stačí kliknout na tlačítka „Souhlasím“, „Nesouhlasím“ nebo
                  „Prázdný hlas“.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section6">
                <StaticFourthLevelTitleStyle>
                  Použití Občanských návrhů
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Použití pro statistické účely:&nbsp;
                  </StaticStrongStyle>
                  Make.org může Občanské návrhy, agregované nebo neagregované a
                  zbavené všech osobních údajů, včetně kompilací a souhrnů,
                  používat pro účely statistiky, studie nebo pro jakýkoli jiný
                  účel.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Použití pro účely debat:&nbsp;
                  </StaticStrongStyle>
                  Občanské návrhy zveřejněné na Službě mohou být organizací
                  Make.org vybrány k analýze, komentování a/nebo diskuzi během
                  veřejných debat pořádaných Make.org nebo jejími partnery.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Použití pro účely závěrečné zprávy a studie:&nbsp;
                  </StaticStrongStyle>
                  Občanské návrhy zveřejněné na Službě, stejně jako hlasování s
                  nimi související, mohou být organizací Make.org vybrány k
                  sepsání zpráv či provedení analýz a studií pro statistické a
                  výzkumné účely nebo za účelem vytvoření reformních projektů.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Publikování bílých knih:&nbsp;
                  </StaticStrongStyle>
                  Make.org může publikovat nebo se podílet na publikaci
                  nekomerční bílé knihy obsahující, částečně nebo úplně,
                  Občanské návrhy.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>Redakční použití:&nbsp;</StaticStrongStyle>
                  Občanské návrhy a hlasování s nimi související mohou být také
                  převzaty, komentovány a analyzovány Make.org a/nebo novináři z
                  řad partnerů za účelem vytvoření redakčního obsahu.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Použití pro komunikační účely:&nbsp;
                  </StaticStrongStyle>
                  Make.org má právo Občanské návrhy použít na webových stránkách
                  a zobrazit na reklamních plochách provozovaných partnery
                  Make.org. V tomto případě je Občanský návrh na uvedených
                  reklamních plochách anonymizován, ať už jej Uživatel zveřejnil
                  anonymně nebo vyplnil údaje jako křestní jméno, věk nebo
                  okres.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  <StaticStrongStyle>
                    Realizace Občanských návrhů:&nbsp;
                  </StaticStrongStyle>
                  Konečně, návrhy mohou být předmětem konkrétní transformace, a
                  to buď přímo ze strany Uživatelů, nebo prostřednictvím akčních
                  partnerů Make.org, čemuž Uživatel, autor Návrhu, jakož i
                  Uživatelé, kteří o něm hlasovali, výslovně rozumí a skutečnost
                  výslovně přijímají.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle
                id="anchor_partners"
                className="section6"
              >
                <StaticFourthLevelTitleStyle>
                  Akční partneři
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Registrovaní uživatelé mohou podávat své vlastní Občanské
                  návrhy, které jsou určeny ke zveřejnění, komentování, analýze
                  a diskusi a které budou předloženy Uživatelům k hlasování.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>DŮKAZ </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Uživatel bere na vědomí a výslovně přijímá:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                že údaje shromážděné na webové stránce a na počítačovém vybavení
                Make.org jsou důkazem reálnosti operací prováděných v rámci
                tohoto dokumentu;
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                že tyto údaje představují jediný způsob důkazu, který strany
                akceptují.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              POVINNOSTI UŽIVATELE
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Aniž by byly dotčeny ostatní povinnosti zde uvedené, Uživatel se
              zavazuje dodržovat následující povinnosti:
            </StaticParagraphStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Dodržování zákonů a předpisů
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Uživatel se při používání Služeb zavazuje respektovat platné
                  zákony a předpisy a neporušovat práva třetích osob ani veřejný
                  pořádek. Zejména je výhradně odpovědný za řádné splnění všech
                  administrativních, daňových a/nebo sociálních formalit a za
                  všechny platby příspěvků, daní nebo cel jakéhokoli druhu,
                  které jsou případně jeho odpovědností v souvislosti s
                  používáním Služeb. V tomto ohledu nelze v žádném případě
                  přenést odpovědnost na Make.org.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Používání webových stránek a Služeb
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Uživatel potvrzuje, že si na webových stránkách přečetl
                  charakteristiky a omezení, zejména technická, všech Služeb. Je
                  výhradně odpovědný za používání Služeb z jeho strany.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Uživatel je informován a souhlasí s tím, že implementace
                  Služeb vyžaduje připojení k internetu a že kvalita Služeb
                  přímo závisí na tomto připojení, za které nese výhradní
                  odpovědnost.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Uživatel se zavazuje nezveřejňovat návrhy reklamního
                  charakteru nebo propagující výdělečné služby. Uživatel
                  souhlasí s tím, že nezveřejní návrhy, které jsou neseriózní
                  nebo nespadají do daného tématu. Uživatel se zavazuje, že bude
                  Služby využívat výhradně osobně. Proto se zdržuje přenechání,
                  postoupení nebo převodu všech nebo části svých práv nebo
                  povinností vyplývajících z tohoto dokumentu na třetí stranu, a
                  to jakýmkoli způsobem.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Uživatel se zavazuje nezveřejňovat návrhy propagující nebo
                  očerňující strany, organizace nebo veřejně známé osoby.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Uživatel je rovněž výhradně odpovědný za vztahy, které může
                  navázat s ostatními Uživateli, a za informace, které jim
                  sděluje v rámci Služeb. Je na něm, aby se v těchto vztazích a
                  komunikaci uchýlil k náležité obezřetnosti a soudnosti.
                  Uživatel se rovněž zavazuje, že při výměně názorů s ostatními
                  Uživateli bude respektovat běžná pravidla slušnosti a
                  zdvořilosti.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Uživatel se zavazuje, že nebude činit komentáře nebo návrhy v
                  rozporu se zákonem a dobrými mravy, a to zejména, ale ne
                  výhradně:
                </StaticParagraphStyle>
                <StaticSquareListStyle>
                  <StaticSquareListItemStyle>
                    výroky podněcující rasovou nenávist, rasistické,
                    antisemitské, xenofobní, homofobní výroky atd.;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    výroky násilné, pornografické, pedofilní povahy atd.;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    urážky, očerňování, pomlouvačné poznámky nebo výroky
                    porušující osobnostní práva třetích stran;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    výroky popírající zločiny proti lidskosti a uznané genocidy
                    a omlouvající zločiny;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    výroky podněcující ke spáchání činů postižitelných zákonem,
                    jako je podněcování k páchání násilných nebo teroristických
                    činů, prodej narkotik atd.;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    výroky porušující soukromí nebo práva duševního vlastnictví
                    třetích stran,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    výroky narušující presumpci neviny nebo důvěrnost
                    předběžných vyšetřování atd.;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    výroky, které napadají lidskou důstojnost;
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    výroky, které by mohly být považovány za zneužití svobody
                    projevu.
                  </StaticSquareListItemStyle>
                </StaticSquareListStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section8">
                <StaticFourthLevelTitleStyle>
                  Vztah k Make.org
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Uživatel se zavazuje poskytnout Make.org veškeré informace
                  nezbytné pro řádné plnění Služeb. Obecněji řečeno, Uživatel
                  souhlasí s aktivní spoluprací s Make.org za účelem řádného
                  plnění těchto podmínek.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Uživatel souhlasí s tím, že jeho návrhy budou reprodukovány v
                  souladu s pravidly indexování, formátování a vylepšování ze
                  strany Make.org jako vydavatele Služby.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              UŽIVATELSKÁ ZÁRUKA
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>Obsah</StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Uživatel je výhradně odpovědný za obsah jakéhokoli druhu
                  (redakční, grafický, audiovizuální nebo jiný, včetně jména
                  a/nebo obrázku, který si Uživatel případně zvolí k
                  identifikaci na stránce), který šíří v rámci Služeb (dále jen
                  dále jen: „Obsah“).
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Společnosti Make.org ručí za to, že má všechna práva a
                  oprávnění nezbytná k distribuci tohoto Obsahu.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Zavazuje se, že uvedený Obsah je v souladu se zákonem,
                  neporušuje veřejný pořádek, dobré mravy nebo práva třetích
                  stran, neporušuje žádné legislativní nebo regulační ustanovení
                  a obecněji, v žádném případě neohrožuje občanskoprávní nebo
                  trestní odpovědnost Make.org.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Uživateli je tak zakázáno šířit, zejména, ale ne výhradně:
                </StaticParagraphStyle>
                <StaticSquareListStyle>
                  <StaticSquareListItemStyle>
                    Obsah, který je pornografický, obscénní, neslušný, šokující
                    nebo nevhodný pro rodinné publikum, pomlouvačný, urážlivý,
                    násilný, rasistický, xenofobní nebo revizionistický,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Obsah porušující autorská práva,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Obsah poškozující pověst třetí strany,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Obsah, který je nepravdivý, zavádějící nebo který navrhuje
                    či propaguje nezákonné, podvodné nebo klamavé aktivity,
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    Obsah škodlivý pro počítačové systémy třetích stran (jako
                    jsou viry, červi, trojští koně atd.),
                  </StaticSquareListItemStyle>
                  <StaticSquareListItemStyle>
                    a obecně Obsah, který může jakýmkoli způsobem a v jakékoli
                    formě porušovat práva třetích stran nebo třetí strany
                    poškozovat.
                  </StaticSquareListItemStyle>
                </StaticSquareListStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>
                  Omezení používání Služeb
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Uživatel bere na vědomí, že mu Služby nabízejí dodatečné,
                  nikoli však alternativní řešení k prostředkům, které již
                  používá jinde k dosažení stejného cíle, a že toto řešení
                  nemůže nahradit tyto jiné prostředky.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Uživatel musí přijmout nezbytná opatření k uložení informací
                  ve svém Osobním prostoru vlastními prostředky, které považuje
                  za nezbytné.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Uživatel je informován a souhlasí s tím, že implementace
                  Služeb vyžaduje připojení k internetu a že kvalita Služeb
                  přímo závisí na tomto připojení, za které nese výhradní
                  odpovědnost.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section9">
                <StaticFourthLevelTitleStyle>
                  Nároky a odškodnění
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Uživatel přejímá zodpovědnost vůči Make.org za veškeré
                  stížnosti, reklamace, akce a nároky, které může Make.org
                  utrpět v důsledku porušení kterékoli z povinností nebo záruk
                  ze strany Uživatele podle těchto obecných podmínek.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Zavazuje se k odškodní Make.org za jakoukoli škodu, kterou
                  může utrpět, a uhradí všechny náklady, poplatky a/nebo
                  rozsudky, které v důsledku toho bude Make.org povinna nést.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ZAKÁZANÉ CHOVÁNÍ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Používat Služby pro následující účely je přísně zakázáno:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                vykonávání nezákonných, podvodných činností nebo činností, které
                porušují práva nebo bezpečnost třetích osob,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                porušování veřejného pořádku nebo platných zákonů a předpisů,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                vniknutí do počítačového systému třetí strany nebo jakákoli
                činnost, která by mohla poškodit, ovládat, zasahovat nebo
                zachytit celý počítačový systém třetí strany nebo jeho část,
                narušit jeho integritu nebo bezpečnost,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                zasílání nevyžádaných e-mailů a/nebo komerční prospekce nebo
                nabídky,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                manipulace určené ke zlepšení odkazování na stránky třetí
                strany,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                napomáhání nebo podněcování v jakékoli formě a jakýmkoli
                způsobem k jednomu nebo více činům a činnostem popsaným výše,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                a obecněji jakékoli praktiky přesměrování Služeb k jiným účelům,
                než pro které byly navrženy.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
            <StaticParagraphStyle>
              Uživatelům je přísně zakázáno kopírovat a/nebo zneužívat koncept,
              technologie nebo jakýkoli jiný prvek webových stránek Make.org pro
              své vlastní účely nebo účely třetích stran.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Je také přísně zakázáno: i) jakékoli chování, které by mohlo
              přerušit, pozastavit, zpomalit nebo zabránit kontinuitě Služeb,
              ii) jakékoli vniknutí nebo pokus o vniknutí do systémů Make.org,
              iii) jakékoli zneužití systémových prostředků webových stránek,
              iv) jakékoli jednání, která by mohla neúměrně zatížit jejich
              infrastruktury, v) jakékoli porušení bezpečnostních a
              autentizačních opatření, vi) jakékoli jednání, které by mohlo
              porušovat práva a finanční, obchodní nebo morální zásady
              společnosti Make.org nebo Uživatelů jejích webových stránek, a
              konečně obecně vii) jakékoli porušení těchto obecných podmínek.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Je přísně zakázáno zpeněžovat, prodávat nebo udělovat celý nebo
              částečný přístup ke Službám nebo na webové stránky, jakož i k
              informacím, které jsou tam umístěny a/nebo sdíleny.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              OMEZENÍ ZÁRUKY MAKE.ORG
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Kvalita služeb
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Make.org nemůže zaručit, že Služba nebude přerušena. Make.org
                  se zavazuje poskytovat Službu svědomitě a v souladu s
                  pravidly, přičemž připomíná, že jde pouze o povinnost přijmout
                  opatření, což Uživatelé berou výslovně na vědomí a souhlasí s
                  tím.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org se zavazuje provádět pravidelné kontroly k ověření
                  provozu a přístupnosti webových stránek. Make.org si jako
                  taková vyhrazuje právo dočasně přerušit přístup na webové
                  stránky z důvodů údržby. Podobně Make.org nemůže být vedena
                  zodpovědná za dočasné potíže nebo zamezení přístupu na webové
                  stránky vyplývající z okolností, které nemůže ovlivnit, vyšší
                  moci nebo dokonce z důvodu přerušení telekomunikační sítě.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Make.org Uživatelům nezaručuje, i) že Služby, které jsou
                  předmětem neustálého výzkumu za účelem zlepšení výkonu a
                  pokroku, budou zejména zcela bez chyb, vad nebo závad, ii) že
                  Služby, které jsou standardní a v žádném případě nejsou
                  navrženy pro výhradní záměr daného Uživatele podle jeho
                  vlastních osobních omezení, budou splňovat konkrétně jeho
                  potřeby a očekávání.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>Obsah</StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Přestože Služby podléhají moderování, Make.org nemůže být
                  zodpovědná za Obsah, jehož autory jsou třetí strany, jakákoli
                  případná stížnost musí být v první řadě směřována na autora
                  dotyčného Obsahu.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Obsahy škodící třetí straně mohou být nahlášeny Make.org v
                  souladu s postupy stanovenými v článku 6 I 5 zákona č.
                  2004-575 ze dne 21. června 2004 o důvěře v digitální
                  ekonomiku, Make.org si vyhrazuje právo přijmout opatření
                  popsaná v článku 12.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Ztráta informací
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Vzhledem k tomu, že je služba poskytována zdarma, Make.org
                  odmítá veškerou odpovědnost v případě jakékoli ztráty
                  informací dostupných v Osobním prostoru Uživatele, přičemž
                  Uživatel je zodpovědný za zálohování a nemůže v tomto ohledu
                  požadovat žádnou náhradu.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section11">
                <StaticFourthLevelTitleStyle>
                  Poškození
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  V každém případě je odpovědnost, která může dle těchto
                  obecných podmínek organizaci Make.org vzniknout, výslovně
                  omezena jedině na prokázanou přímou škodu, kterou utrpěl
                  Uživatel.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              DUŠEVNÍ VLASTNICTVÍ
            </StaticThirdLevelTitleStyle>
            <StaticSecondaryOrderedListStyle>
              <StaticSecondaryOrderedListItemStyle className="section12">
                <StaticFourthLevelTitleStyle>
                  Vlastnictví Make.org
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Make.org si nenárokuje žádné vlastnictví dat a Obsahu
                  poskytnutého Uživateli.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Systémy, software, struktury, infrastruktury, databáze a obsah
                  jakéhokoli druhu (texty, obrázky, vizuály, hudba, loga,
                  značky, databáze atd.) provozované Make.org v rámci webových
                  stránek jsou chráněny všemi platnými právy duševního
                  vlastnictví resp. práva tvůrců databáze.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Za jakoukoli reprodukci, reprezentaci, publikaci, přenos nebo
                  obecně jakékoli neoprávněné použití celé nebo části Služby a
                  informací v ní obsažených, bez výslovného souhlasu Make.org,
                  ponese odpovědnost Uživatel.
                </StaticParagraphStyle>
                <StaticParagraphStyle>
                  Veškeré rozebírání, dekompilace, dešifrování, extrahování,
                  opětovné použití, kopírování a obecně všechny úkony
                  reprodukce, reprezentace, distribuce a použití jakéhokoli z
                  těchto prvků, zcela nebo částečně, bez povolení Make.org jsou
                  přísně zakázány a mohou být předmětem stíhání.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
              <StaticSecondaryOrderedListItemStyle className="section12">
                <StaticFourthLevelTitleStyle>
                  Vlastnictví Občanských návrhů
                </StaticFourthLevelTitleStyle>
                <StaticParagraphStyle>
                  Samotné Občanské návrhy jsou majetkem jejich autorů, kteří
                  Make.org udělují nevýhradní, přenosnou a bezplatnou provozní
                  licenci pro Francii a pro celý svět, pro jakékoli online
                  použití a pro jakýkoli způsob distribuce, po dobu trvání
                  těchto{' '}
                  <abbr lang="cs" title="Obecných Podmínek Používání">
                    OPP
                  </abbr>{' '}
                  a pro všechna použití, na která se vztahují.
                </StaticParagraphStyle>
              </StaticSecondaryOrderedListItemStyle>
            </StaticSecondaryOrderedListStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              ODKAZY A WEBOVÉ STRÁNKY TŘETÍCH STRAN
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org nemůže v žádném případě nést odpovědnost za technickou
              dostupnost webových stránek nebo mobilních aplikací provozovaných
              třetími stranami (včetně jakýchkoli partnerů), ke kterým má
              Uživatel prostřednictvím webových stránek přístup.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org nepřijímá žádnou odpovědnost za obsah, reklamu, výrobky
              a/nebo služby dostupné na takových webových stránkách třetích
              stran a mobilních aplikacích, které se, pro připomenutí, řídí
              svými vlastními podmínkami použití.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Make.org také nenese odpovědnost za transakce mezi Uživatelem a
              jakýmkoli inzerentem, profesionálem nebo obchodníkem (včetně
              jakýchkoli partnerů), na které může být Uživatel přesměrován
              prostřednictvím webových stránek, a nemůže se v žádném případě
              podílet a žádných možných sporech vedených s těmito třetími
              stranami, které se týkají zejména dodávek výrobků a/nebo služeb,
              záruk, prohlášení a jakýchkoli dalších závazků, kterými jsou tyto
              třetí strany vázány.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              POKUTY A UKONČENÍ
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              V případě porušení některého z ustanovení těchto obecných podmínek
              nebo obecně porušení platných zákonů a předpisů ze strany
              Uživatele si Make.org vyhrazuje právo přijmout jakákoli vhodná
              opatření a zejména:
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                pozastavit nebo ukončit přístup Uživatele, autora porušení nebo
                přestupku nebo toho, kdo se na nich podílel, ke Službám,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                smazat veškerý obsah zveřejněný na webových stránkách,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                zveřejnit na webových stránkách jakoukoli informační zprávu,
                kterou Make.org považuje za užitečnou,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                informovat jakýkoli dotčený orgán,
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                zahájit jakékoli právní kroky.
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>

            <StaticParagraphStyle>
              Obecně platí, že v případě, že Uživatel nesplní své povinnosti
              stanovené v tomto dokumentu a/nebo v případě porušení jakéhokoli
              platného zákona nebo nařízení, může Make.org tyto obecné podmínky
              používání podle práva a bez předchozího upozornění nebo formalit
              ukončit.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Ukončení těchto obecných podmínek používání bude mít za následek
              ukončení přístupu dotčeného Uživatele ke Službám, jakož i smazání
              jeho dat a obsahu. Uživatel bude o tomto ukončení informován
              e-mailem na adrese, kterou uvedl při registraci. Ukončení není
              dotčeno případnými nároky na náhradu škody, které může Make.org
              požadovat jako náhradu za jakékoli škody utrpěné v důsledku
              porušení ze strany Uživateli. Make.org může následně zamítnout
              Uživatelův požadavek na vytvoření nového účtu ve Službě.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Vzhledem k tomu, že jsou Služby bezplatné, může Make.org kdykoli,
              bez upozornění a z jakéhokoli důvodu, dočasně nebo trvale,
              odstranit zveřejnění Občanského návrhu.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Podobně, protože jsou služby bezplatné, může Make.org kdykoli, bez
              upozornění a z jakéhokoli důvodu, dočasně nebo trvale, upravit
              nebo částečně či úplně ukončit poskytování Služeb.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              DOBA TRVÁNÍ SLUŽEB, ZRUŠENÍ REGISTRACE
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Služby jsou předplaceny na dobu neurčitou.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Registrovaný uživatel se může z odběru Služeb kdykoli odhlásit
              zasláním žádosti společnosti Make.org e-mailem na adresu&nbsp;
              <RedHTMLLinkElementStyle href={`mailto:${contactMailByCountry}`}>
                {`${contactMailByCountry}`}
              </RedHTMLLinkElementStyle>
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Odhlášení z odběru Služeb je účinné okamžitě. Zahrnuje automatické
              smazání Účtu Registrovaného uživatele i jeho Návrhů.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>ZMĚNY</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Make.org si vyhrazuje právo tyto obecné podmínky kdykoli upravit.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Uživatel bude o těchto změnách informován jakýmikoli užitečnými
              prostředky.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Uživatel, který nepřijme upravené obecné podmínky, se musí z
              odběru Služeb odhlásit a to podle postupů uvedených v těchto
              obecných podmínkách používání webových stránek.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Má se za to, že každý Uživatel, který využívá Služby po vstupu
              upravených obecných podmínek v platnost, s těmito změnami
              souhlasí.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>INTEGRITA</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Pokud bude jedno nebo více ustanovení tohoto dokumentu považováno
              za neplatné zákonem nebo nařízením nebo bude za takové prohlášeno
              konečným rozhodnutím příslušné jurisdikce, bude považováno za
              neplatné. Ostatní ustanovení tohoto dokumentu zůstanou v
              platnosti, přičemž si zachovají veškerou svou platnost a rozsah,
              pokud je to možné, přičemž se strany dohodly, že se v případě
              potřeby sejdou, aby nahradily nulovou klauzuli platnou klauzulí,
              která se, ve svém duchu, bude nahrazované klauzuli podobat, co
              nejvíce to bude možné.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              NEZŘEKNUTÍ SE
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Skutečnost, že jedna ze smluvních stran v daný okamžik nevyužije
              některého z ustanovení této smlouvy, nebude vykládána ani
              považována za vzdání se svých práv podle podmínek tohoto
              dokumentu, žádným způsobem neovlivní platnost všech nebo část
              dokumentu a neovlivní práva dotčené strany jednat podle toho.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              Nebude se mít za to, že se jakákoli ze stran vzdala jakéhokoli
              práva nabytého podle podmínek smlouvy, s výjimkou písemného a
              podepsaného zřeknutí se.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>VYŠŠÍ MOC</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Jakoukoli událost, která je nepředvídatelná, neodolatelná a
              nesouvisí se Stranami, jako jsou (a nejen) válečné nebo
              teroristické činy, trestné činy, nepokoje, přírodní nebo
              průmyslové katastrofy, výbuchy, právní rekvizice a další
              ustanovení legislativního nebo regulačního řádu ukládající omezení
              o výkonu činnosti Make.org, narušení sítí elektronických
              komunikací mimo kontrolu Make.org apod., je nutno považovat za
              případ vyšší moci. V případě vyšší moci může Make.org Službu
              pozastavit. Účinky smlouvy jsou poté pozastaveny a mohou se
              obnovit po odeznění případu vyšší moci po zbytek trvání smlouvy.
              Mohou také zůstat deaktivované.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>JAZYK</StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              V případě překladu těchto obecných podmínek do jednoho nebo více
              jazyků bude jazykem výkladu francouzský jazyk v případě rozporu
              nebo sporu o význam termínu nebo ustanovení.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              PLATNÉ PRÁVO A JURISDIKCE
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Tyto obecné podmínky se řídí francouzským právem.
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              V případě sporu o platnost, výklad a/nebo aplikaci těchto obecných
              obchodních podmínek se strany dohodly, že výlučná pravomoc
              soudního rozhodnutí náleží soudům v Paříži, pokud neexistují
              závazná procesní pravidla, která by nařizovala opak.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
          <StaticPrimaryOrderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              VSTUP V PLATNOST
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              Tyto obecné podmínky vstoupily v platnost dne{' '}
              {DateHelper.localizedAndFormattedDate(GTU_DATE, DATE.P_FORMAT)}.
            </StaticParagraphStyle>
          </StaticPrimaryOrderedListItemStyle>
        </StaticPrimaryOrderedListStyle>
      </StaticPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default TermsOfUseCS; // eslint-disable-line import/no-default-export
