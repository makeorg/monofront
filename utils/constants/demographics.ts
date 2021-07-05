import { i18n } from '@make.org/utils/i18n';
import { DemographicType } from '@make.org/types';

// Should be handled by API / BO as a configuration
export const AGE_RANGES: DemographicType[] = [
  {
    label: '8 - 15',
    value: '8-15',
  },
  {
    label: '16 - 24',
    value: '16-24',
  },
  {
    label: '25 - 34',
    value: '25-34',
  },
  {
    label: '35 - 44',
    value: '35-44',
  },
  {
    label: '45 - 54',
    value: '45-54',
  },
  {
    label: '55 - 64',
    value: '55-64',
  },
  {
    label: '65 +',
    value: '65+',
  },
];

export const GENDER: DemographicType[] = [
  {
    label: i18n.t('demographics_card.gender.male'),
    value: 'M',
  },
  {
    label: i18n.t('demographics_card.gender.female'),
    value: 'F',
  },
  {
    label: i18n.t('demographics_card.gender.other'),
    value: 'O',
  },
];

export const REGION: DemographicType[] = [
  {
    label: i18n.t('demographics_card.region.FR-ARA'),
    value: 'FR-ARA',
  },
  {
    label: i18n.t('demographics_card.region.FR-BFC'),
    value: 'FR-BFC',
  },
  {
    label: i18n.t('demographics_card.region.FR-BRE'),
    value: 'FR-BRE',
  },
  {
    label: i18n.t('demographics_card.region.FR-CVL'),
    value: 'FR-CVL',
  },
  {
    label: i18n.t('demographics_card.region.FR-COR'),
    value: 'FR-COR',
  },
  {
    label: i18n.t('demographics_card.region.FR-GES'),
    value: 'FR-GES',
  },
  {
    label: i18n.t('demographics_card.region.FR-HDF'),
    value: 'FR-HDF',
  },
  {
    label: i18n.t('demographics_card.region.FR-IDF'),
    value: 'FR-IDF',
  },
  {
    label: i18n.t('demographics_card.region.FR-NOR'),
    value: 'FR-NOR',
  },
  {
    label: i18n.t('demographics_card.region.FR-NAQ'),
    value: 'FR-NAQ',
  },
  {
    label: i18n.t('demographics_card.region.FR-OCC'),
    value: 'FR-OCC',
  },
  {
    label: i18n.t('demographics_card.region.FR-PDL'),
    value: 'FR-PDL',
  },
  {
    label: i18n.t('demographics_card.region.FR-PAC'),
    value: 'FR-PAC',
  },
  {
    label: i18n.t('demographics_card.region.FR-GUA'),
    value: 'FR-GUA',
  },
  {
    label: i18n.t('demographics_card.region.FR-GUF'),
    value: 'FR-GUF',
  },
  {
    label: i18n.t('demographics_card.region.FR-MTQ'),
    value: 'FR-MTQ',
  },
  {
    label: i18n.t('demographics_card.region.FR-LRE'),
    value: 'FR-LRE',
  },
  {
    label: i18n.t('demographics_card.region.FR-MAY'),
    value: 'FR-MAY',
  },
];
