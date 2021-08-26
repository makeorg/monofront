import { DemographicNameType } from '@make.org/types';

export const getRandomFromArray = (
  items: DemographicNameType[]
): DemographicNameType => {
  const randomValue = Math.floor(Math.random() * items.length);

  return items[randomValue];
};
