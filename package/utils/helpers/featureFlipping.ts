import { FEATURE_FLIPPING } from '@make.org/types/enums';
import { Logger } from '../services/Logger';

const featuresList: string[] = Object.values(FEATURE_FLIPPING);

/**
 * Feature flipping
 */
export const checkIsFeatureActivated = (
  featureSlug: string,
  activesFeatures: Array<string>
): boolean => {
  if (!featuresList.includes(featureSlug)) {
    Logger.logWarning({
      message: `Feature "${featureSlug}" not found`,
      name: 'client-helper',
    });

    return false;
  }
  return [...activesFeatures].includes(featureSlug);
};
