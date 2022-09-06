import configuration from './configuration.yaml';

const postCodeRegexes: Map<string, string> = new Map(
  Object.entries(configuration.postCode)
);

export const isSupportedCountry = (country: string): boolean =>
  postCodeRegexes.has(country);

export const html5regexByCountry = (country: string): string | undefined =>
  postCodeRegexes.get(country);
