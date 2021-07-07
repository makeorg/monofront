import React from 'react';
import snapshotDiff from 'snapshot-diff';
import renderer from 'react-test-renderer';
import { SubmitButton } from './index';

describe('SubmitButton', () => {
  const formName = 'foo';
  const label = 'bar';
  const icon = 'SvgThumbsUp';

  it('must match the snapshot with default Props', () => {
    const component = renderer
      .create(<SubmitButton formName={formName} label={label} icon={icon} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('must return the diff between when disabled', () => {
    const OneSubmit = renderer.create(
      <SubmitButton formName={formName} label={label} icon={icon} />
    );
    const TwoSubmit = renderer
      .create(
        <SubmitButton formName={formName} label={label} icon={icon} disabled />
      )
      .toJSON();
    expect(snapshotDiff(OneSubmit, TwoSubmit)).toMatchSnapshot();
  });
});
