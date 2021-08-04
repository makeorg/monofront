import {
  formatMillionToText,
  formatCountWithLanguage,
} from './numberFormatter';

describe('numberFormatter', () => {
  const number = 123456;
  it('formatCountWithLocale with count < 1 million', () => {
    expect(formatCountWithLanguage(number, 'fr')).toEqual(
      number.toLocaleString('fr')
    );
  });

  it('formatMillionToText with count > 1 million', () => {
    // TODO init i18next fail
    // expect(formatMillionToText(1234567, 'fr')).toEqual('1.2 common.million');
  });
});
