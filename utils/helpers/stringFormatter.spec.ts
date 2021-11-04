import {
  capitalize,
  formatUserName,
  formatAuthorName,
  formatOrganisationName,
} from './stringFormatter';

describe('capitalize', () => {
  it('should be formatted', () => {
    expect(capitalize('OLIVIER')).toBe('Olivier');
    expect(capitalize('anne-laure')).toBe('Anne-Laure');
    expect(capitalize('éléanore')).toBe('Éléanore');
    expect(capitalize('renÉ la frite')).toBe('René La Frite');
    expect(capitalize('jEAN')).toBe('Jean');
    expect(capitalize('marie-céCile de bonne foi')).toBe(
      'Marie-Cécile De Bonne Foi'
    );
    expect(capitalize('oLIVIER', false)).toBe('OLIVIER');
    expect(capitalize('marie-céCile de bonne foi', false)).toBe(
      'Marie-CéCile De Bonne Foi'
    );
    expect(capitalize('', false)).toBe('');
    expect(capitalize('', true)).toBe('');
  });
});

describe('formatUserName', () => {
  it('should be formatted', () => {
    expect(formatUserName('marie-céCile de bonne foi')).toBe(
      'Marie-Cécile De Bonne Foi'
    );
  });
});

describe('formatAuthorName', () => {
  it('should be formatted', () => {
    expect(formatAuthorName('marie-céCile de bonne foi')).toBe(
      'Marie-Cécile De Bonne Foi'
    );
  });
});

describe('formatOrganisationName', () => {
  it('should be formatted', () => {
    expect(formatOrganisationName('marie-céCILE de bonne foi')).toBe(
      'Marie-CéCILE De Bonne Foi'
    );
  });
});
