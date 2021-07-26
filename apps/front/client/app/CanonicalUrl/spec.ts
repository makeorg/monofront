import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-head';
import { env } from '@make.org/assets/env';
import { CanonicalUrl } from '.';

jest.mock('Shared/env');
env.frontUrl.mockReturnValue('https://test.make.org');

// mock useLocation hook
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({
    pathname: '/Fr-fr/fooUrl/fooSelection',
    search: '?query=queryFoo&utm=utmFoo',
  }),
}));

describe('CanonicalUrl', () => {
  const wrapper = shallow(<CanonicalUrl />);

  it('must return a Link component', () => {
    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it('must return pathname and search query only', () => {
    expect(wrapper.find(Link).prop('href')).toBe(
      'https://test.make.org/Fr-fr/fooUrl/fooSelection?query=queryFoo'
    );
  });
});
