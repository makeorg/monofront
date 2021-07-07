import React from 'react';
import renderer from 'react-test-renderer';
import snapshotDiff from 'snapshot-diff';
import { Avatar } from './index';

jest.mock('Client/ui/Svg/elements', () => ({
  SvgEmptyAvatar: 'SvgEmptyAvatar',
}));

describe('Avatar', () => {
  it('snapshot by default', () => {
    const component = renderer.create(<Avatar />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('must match the diff snapshot between default vs custom avatar', () => {
    const defaultAvatar = renderer.create(<Avatar />).toJSON();
    const customAvatar = renderer
      .create(
        <Avatar avatarSize={200}>
          <img
            src="https://pbs.twimg.com/profile_images/774660692246949888/Jq9fGs3-_400x400.jpg"
            alt="Axel Dauchez - CEO Make.org"
          />
        </Avatar>
      )
      .toJSON();
    expect(snapshotDiff(defaultAvatar, customAvatar)).toMatchSnapshot();
  });
});
