/* @flow */

import * as helpers from './stringFormatter';

describe('capitalize', () => {
  it('should be formatted', () => {
    expect(helpers.capitalize('OLIVIER')).toBe('Olivier');
    expect(helpers.capitalize('anne-laure')).toBe('Anne-Laure');
    expect(helpers.capitalize('éléanore')).toBe('Éléanore');
    expect(helpers.capitalize('renÉ la frite')).toBe('René La Frite');
    expect(helpers.capitalize('jEAN')).toBe('Jean');
    expect(helpers.capitalize(null)).toBe(null);
    expect(helpers.capitalize('marie-céCile de bonne foi')).toBe(
      'Marie-Cécile De Bonne Foi'
    );
    expect(helpers.capitalize('oLIVIER', false)).toBe('OLIVIER');
    expect(helpers.capitalize('marie-céCile de bonne foi', false)).toBe(
      'Marie-CéCile De Bonne Foi'
    );
    expect(helpers.capitalize('', false)).toBe('');
    expect(helpers.capitalize('', true)).toBe('');
  });
});

describe('formatUserName', () => {
  it('should be formatted', () => {
    expect(helpers.formatUserName('marie-céCile de bonne foi')).toBe(
      'Marie-Cécile De Bonne Foi'
    );
  });
});

describe('formatAuthorName', () => {
  it('should be formatted', () => {
    expect(helpers.formatAuthorName('marie-céCile de bonne foi')).toBe(
      'Marie-Cécile De Bonne Foi'
    );
  });
});

describe('formatOrganisationName', () => {
  it('should be formatted', () => {
    expect(helpers.formatOrganisationName('marie-céCILE de bonne foi')).toBe(
      'Marie-CéCILE De Bonne Foi'
    );
  });
});

describe('capitalizeFirstLetter', () => {
  it('should be formatted', () => {
    expect(helpers.capitalizeFirstLetter('emballages et déchets')).toBe(
      'Emballages et déchets'
    );
  });
});
