import React from 'react';
import renderer from 'react-test-renderer';
import { LoadingDots } from './index';

describe('LoadingDots', () => {
  it('must match the snapshot with default Props', () => {
    const component = renderer.create(<LoadingDots />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
