import { passwordPattern } from '.';

describe('Password validation', () => {
  const regex = new RegExp(passwordPattern);

  const shuffle = (value: string) =>
    value
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');

  it('Should respect the rules', () => {
    const testValues: Map<string, boolean> = new Map([
      [shuffle('a1?'), false],
      [shuffle('azertyui'), false],
      [shuffle('azertyu1'), false],
      [shuffle('azertyuB'), false],
      [shuffle('azertyu.'), false],
      [shuffle('azertyuio'), false],
      [shuffle('éééééééé'), false],
      [shuffle('????????'), false],
      [shuffle('AAAAAAAA'), false],
      [shuffle('11111111'), false],
      [shuffle('1?1111111'), false],
      [shuffle('1?a111111'), false],
      [shuffle('aZ rtyuio1o'), false],
      [shuffle('1?aA11111'), true],
      [shuffle('Azertyuio1?'), true],
      [shuffle('aZ?rtyuio1o'), true],
      [shuffle('aZ.rtyuio1o'), true],
      [shuffle('aZ!rtyuio1o'), true],
      [shuffle('aZ^rtyuio1o'), true],
      [shuffle('aZ_rtyuio1o'), true],
      [shuffle('aZ|rtyuio1o'), true],
      [shuffle('aB.rtyuio1o'), true],
      [shuffle('aBértyuio1o'), true],
    ]);
    testValues.forEach((value: boolean, key: string) => {
      expect({ isValid: regex.test(key), password: key }).toEqual({
        isValid: value,
        password: key,
      });
    });
  });
});
