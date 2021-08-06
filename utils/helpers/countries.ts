import i18n from 'i18next';
import { CountryType } from '@make.org/types';
import { LocaleType } from '@make.org/types/enums';
import { trackingParamsService } from '../services/TrackingParamsService';
import { DateHelper } from './date';
import { countriesConfiguration } from '../constants/languages';
import { DEFAULT_LANGUAGE } from '../constants/config';

export const compareCountriesByName = (
  a: CountryType,
  b: CountryType
): number => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

export const getLanguageFromCountryCode = (
  countryCode: string
): keyof typeof LocaleType => {
  const countryConfiguration = countriesConfiguration.find(
    countryConf => countryConf.countryCode === countryCode
  );
  const language = countryConfiguration
    ? countryConfiguration.language
    : DEFAULT_LANGUAGE;

  return language;
};

const languageStorageKey = 'language';
const languageStorage = {
  set: (language: string, country: string) =>
    sessionStorage.setItem(`${languageStorageKey}_${country}`, language),
  get: (country: string) =>
    sessionStorage.getItem(`${languageStorageKey}_${country}`),
  hasValue: (country: string) =>
    !!sessionStorage.getItem(`${languageStorageKey}_${country}`),
  delete: (country: string) =>
    sessionStorage.removeItem(`${languageStorageKey}_${country}`),
  isAvailable: () =>
    typeof window !== 'undefined' && window && !!sessionStorage,
};

export const setCountry = (country: string): void => {
  trackingParamsService.country = country;
};

export const setLanguage = (
  language: keyof typeof LocaleType,
  cloneI18nInstance?: boolean
): void => {
  if (cloneI18nInstance) {
    i18n.cloneInstance();
  }
  i18n.changeLanguage(language || DEFAULT_LANGUAGE);
  DateHelper.language = language || DEFAULT_LANGUAGE;
};

export const getCountryWithConsultations = (
  country: string,
  countriesWithConsultations: string[]
): null | string => {
  const countryHasConsultations = countriesWithConsultations.find(
    countryWithConsultations => countryWithConsultations === country
  );

  if (!countryHasConsultations) {
    return null;
  }

  return countryHasConsultations;
};

export const getLanguageFromParams = (
  countryCode: string,
  queryLanguageParam?: string
): string => {
  if (queryLanguageParam) {
    return queryLanguageParam.toLowerCase();
  }

  if (languageStorage.isAvailable() && languageStorage.hasValue(countryCode)) {
    return languageStorage.get(countryCode) || '';
  }

  return getLanguageFromCountryCode(countryCode);
};

export const getCountryDPA = (
  country: string
): { name: string; link: string } => {
  switch (country) {
    case 'AT':
      return {
        name: 'Österreichische Datenschutzbehörde',
        link: 'https://www.dsb.gv.at/download-links/dokumente.html',
      };
    case 'BE':
      return {
        name: 'Data Protection Authority',
        link: 'https://www.dataprotectionauthority.be/citizen/actions/lodge-a-complaint',
      };
    case 'BG':
      return {
        name: 'Comission for Personal Data Protection',
        link: 'https://www.cpdp.bg/en/index.php?p=pages&aid=56',
      };
    case 'BR':
      return {
        name: 'Brazilian Data Protection Law (LGPD)',
        link: 'https://iapp.org/media/pdf/resource_center/Brazilian_General_Data_Protection_Law.pdf',
      };
    case 'CA':
      return {
        name: 'Office of the Privacy Commissioner of Canada',
        link: 'https://www.priv.gc.ca/en/privacy-topics/information-and-advice-for-individuals/reporting-concerns-and-filing-complaints/',
      };
    case 'CH':
      return {
        name: 'Federal Data Protection and Information Commissioner',
        link: 'https://www.edoeb.admin.ch/edoeb/en/home.html',
      };
    case 'CN':
      return {
        name: '',
        link: '#',
      };
    case 'CY':
      return {
        name: 'Office of the Commissioner for Personal Data Protection',
        link: 'http://www.dataprotection.gov.cy/dataprotection/dataprotection.nsf/page1i_en/page1i_en?opendocument',
      };
    case 'CZ':
      return {
        name: 'Office for Personal Data Protection',
        link: 'https://www.uoou.cz/en/',
      };
    case 'DE':
      return {
        name: 'Bundesbeauftragte für den Datenschutz und die Informationsfreiheit',
        link: 'https://www.bfdi.bund.de/DE/Service/Kontakt/kontakt_node.html',
      };
    case 'DK':
      return {
        name: 'Danish Data Protection Agency',
        link: 'https://www.datatilsynet.dk/english/file-a-complaint',
      };
    case 'EE':
      return {
        name: 'Data Protection Inspectorate',
        link: 'https://www.aki.ee/en',
      };
    case 'ES':
      return {
        name: 'Spanish Data Protection Agency',
        link: 'https://www.aepd.es/',
      };
    case 'FI':
      return {
        name: 'Office of the Data Protection Ombudsman',
        link: 'https://tietosuoja.fi/en/home',
      };
    case 'FR':
      return {
        name: 'CNIL',
        link: 'https://www.cnil.fr/fr/adresser-une-plainte',
      };
    case 'GB':
      return {
        name: 'ICO',
        link: 'https://ico.org.uk/make-a-complaint/',
      };
    case 'GR':
      return {
        name: 'Hellenic Data Protection Authority',
        link: 'https://www.dpa.gr/en/individuals/complaint-to-the-hellenic-dpa',
      };
    case 'HR':
      return {
        name: 'Croatian Pesronal Data Protection Agency',
        link: 'https://azop.hr/how-to-lodge-a-complaint/',
      };
    case 'HU':
      return {
        name: 'Hungarian National Authority for Data Protection and Freedom of Information',
        link: 'https://naih.hu/about-the-authority',
      };
    case 'IE':
      return {
        name: 'Data Protection Commission',
        link: 'https://forms.dataprotection.ie/contact',
      };
    case 'IN':
      return {
        name: '',
        link: '#',
      };
    case 'IT':
      return {
        name: 'Italian Data Protection Authority',
        link: 'https://www.garanteprivacy.it/home_en',
      };
    case 'JP':
      return {
        name: 'Personal Information Protection Commission',
        link: 'https://www.ppc.go.jp/en/',
      };
    case 'LT':
      return {
        name: 'State Data Protection Inspectorate',
        link: 'https://vdai.lrv.lt/en/',
      };
    case 'LU':
      return {
        name: 'Commission nationale pour la protection des données',
        link: 'https://cnpd.public.lu/fr/particuliers/faire-valoir.html',
      };
    case 'LV':
      return {
        name: 'Latvian Data Protection Authority',
        link: 'https://www.dvi.gov.lv/lv',
      };
    case 'MT':
      return {
        name: 'Information and Data Protection Commissioner',
        link: 'https://idpc.org.mt/raise-a-concern/',
      };
    case 'NL':
      return {
        name: 'Dutch Data Protection Authority',
        link: 'https://www.autoriteitpersoonsgegevens.nl/en',
      };
    case 'NO':
      return {
        name: 'Norwegian Data Protection Authority',
        link: 'https://www.datatilsynet.no/en/',
      };
    case 'PL':
      return {
        name: 'Personal Data Protection Office',
        link: 'https://uodo.gov.pl/en/559/941',
      };
    case 'PT':
      return {
        name: 'Portuguese Data Protection Authority',
        link: 'https://www.cnpd.pt/en/',
      };
    case 'RO':
      return {
        name: 'National Supervisory Authority For Personal Data Processing',
        link: 'https://www.dataprotection.ro/index.jsp?page=Plangeri_RGPD',
      };
    case 'RU':
      return {
        name: 'Federal Service for Supervision of Communications, Information Technology, and Mass Media',
        link: 'http://eng.rkn.gov.ru/personal_data/protecting_the_rigthts_of_personal_data_subjects/',
      };
    case 'SE':
      return {
        name: 'Swedish Authority for Privacy Protection',
        link: 'https://www.imy.se/en/privatperson/forms-and-e-services/file-a-gdpr-complaint/',
      };
    case 'SI':
      return {
        name: 'Slovenian Data Protection Authority',
        link: 'https://www.ip-rs.si/',
      };
    case 'SK':
      return {
        name: 'Office for Personal Data Protection of the Slovak Republic',
        link: 'https://dataprotection.gov.sk/uoou/en',
      };
    case 'US':
      return {
        name: 'Federal Trade Commission',
        link: 'https://www.ftc.gov/tips-advice/business-center/privacy-and-security/privacy-shield',
      };
    default:
      return {
        name: '',
        link: '#',
      };
  }
};
