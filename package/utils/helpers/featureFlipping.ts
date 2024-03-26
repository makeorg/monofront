import { FEATURE_FLIPPING } from '@make.org/types/enums';

const featuresList: string[] = Object.values(FEATURE_FLIPPING);

/**
 * Feature flipping
 */
export const checkIsFeatureActivated = (
  featureSlug: string,
  activesFeatures: Array<string>
): boolean => {
  if (!featuresList.includes(featureSlug)) {
    return false;
  }

  return [...activesFeatures].includes(featureSlug);
};
