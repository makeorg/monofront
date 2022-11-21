import i18n from 'i18next';

export const getCountriesTransMap = (): Map<string, string> =>
  new Map([
    ['AT', i18n.t('countries.AT')],
    ['BE', i18n.t('countries.BE')],
    ['BG', i18n.t('countries.BG')],
    ['BR', i18n.t('countries.BR')],
    ['CA', i18n.t('countries.CA')],
    ['CH', i18n.t('countries.CH')],
    ['CN', i18n.t('countries.CN')],
    ['CY', i18n.t('countries.CY')],
    ['CZ', i18n.t('countries.CZ')],
    ['DE', i18n.t('countries.DE')],
    ['DK', i18n.t('countries.DK')],
    ['EE', i18n.t('countries.EE')],
    ['ES', i18n.t('countries.ES')],
    ['FI', i18n.t('countries.FI')],
    ['FR', i18n.t('countries.FR')],
    ['GB', i18n.t('countries.GB')],
    ['GR', i18n.t('countries.GR')],
    ['HR', i18n.t('countries.HR')],
    ['HU', i18n.t('countries.HU')],
    ['IE', i18n.t('countries.IE')],
    ['IN', i18n.t('countries.IN')],
    ['IS', i18n.t('countries.IS')],
    ['IT', i18n.t('countries.IT')],
    ['JP', i18n.t('countries.JP')],
    ['LI', i18n.t('countries.LI')],
    ['LT', i18n.t('countries.LT')],
    ['LU', i18n.t('countries.LU')],
    ['LV', i18n.t('countries.LV')],
    ['MT', i18n.t('countries.MT')],
    ['NL', i18n.t('countries.NL')],
    ['NO', i18n.t('countries.NO')],
    ['PL', i18n.t('countries.PL')],
    ['PT', i18n.t('countries.PT')],
    ['RO', i18n.t('countries.RO')],
    ['RU', i18n.t('countries.RU')],
    ['SE', i18n.t('countries.SE')],
    ['SI', i18n.t('countries.SI')],
    ['SK', i18n.t('countries.SK')],
    ['UA', i18n.t('countries.UA')],
    ['US', i18n.t('countries.US')],
  ]);

export const getLanguagesTransMap = (): Map<string, string> =>
  new Map([
    ['fr', i18n.t('languages.fr')],
    ['en', i18n.t('languages.en')],
    ['de', i18n.t('languages.de')],
  ]);
