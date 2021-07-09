import React from 'react';
import renderer from 'react-test-renderer';
import { Spinner } from './index';

describe('Spinner', () => {
  it('must match the snapshot with default Props', () => {
    const component = renderer.create(<Spinner />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
