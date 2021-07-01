import React from 'react';
import renderer from 'react-test-renderer';
import { env } from 'Shared/env';
import { FontSize } from './index';

jest.mock('Shared/env');
env.frontUrl.mockReturnValue('http://test.make.org');

describe('Fonts', () => {
  it('must match the snapshot with default Props', () => {
    const component = renderer.create(<FontSize />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
