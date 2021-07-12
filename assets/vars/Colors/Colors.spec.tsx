import React from 'react';
import renderer from 'react-test-renderer';
import { env } from '../../env';
import { Colors } from './index';

jest.mock('Shared/env');
env.frontUrl.mockReturnValue('http://test.make.org');

describe('Colors', () => {
  it('must match the snapshot with default Props', () => {
    const component = renderer.create(<Colors />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
