import { DemographicNameType, DemographicsType } from '@make.org/types';
import {
  AGE_RANGES,
  GENDER,
  REGION,
} from '@make.org/utils/constants/demographics';
import { i18n } from '@make.org/utils/i18n';

export const DEMOGRAPHIC_TYPES: DemographicNameType[] = [
  'region',
  'gender',
  'age',
];

export const setTitleByType = (type: string): string => {
  switch (type) {
    case 'gender':
      return i18n.t('demographics_card.gender.title');
    case 'region':
      return i18n.t('demographics_card.region.title');
    default:
      return i18n.t('demographics_card.age.title');
  }
};

export const buildDemographicsByType = (type: string): DemographicsType => {
  switch (type) {
    case 'gender':
      return {
        ui: 'radio',
        data: GENDER,
      };
    case 'region':
      return {
        ui: 'select',
        data: [
          {
            label: i18n.t('demographics_card.region.select'),
            value: '',
          },
          ...REGION.sort((a, b) => a.label.localeCompare(b.label)),
        ],
      };
    default:
      return {
        ui: 'radio',
        data: AGE_RANGES,
      };
  }
};
