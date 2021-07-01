import { Logger } from '../services/Logger';
import * as features from '../constants/featureFlipping';

const featuresList: string[] = Object.values(features);

/**
 * Feature flipping
 */
export const checkIsFeatureActivated = (
  featureSlug: string,
  activesFeatures: Array<string>
): boolean => {
  if (!featuresList.includes(featureSlug)) {
    Logger.logWarning(`Feature "${featureSlug}" not found`);

    return false;
  }
  return [...activesFeatures].includes(featureSlug);
};

export const getFeatures = (): { [f: string]: string } => features;
