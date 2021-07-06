import React from 'react';
import renderer from 'react-test-renderer';
import { FormErrors } from './index';

describe('FormErrors', () => {
  const Errors = [
    { field: 'foo', message: 'fooMEssage' },
    { field: 'bar', message: 'barMessage' },
  ];

  it('snapshot FormErrors without errors', () => {
    const component = renderer.create(<FormErrors />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('snapshot FormErrors with errors', () => {
    const component = renderer.create(<FormErrors errors={Errors} />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
