import React from 'react';
import renderer from 'react-test-renderer';
import snapshotDiff from 'snapshot-diff';
import { SvgInfos } from '@make.org/ui/Svg/elements';
import { TileWithTitle } from './index';

jest.mock('@make.org/ui/elements/TileWithTitle/style', () => ({
  TileWithTitleStyle: 'TileWithTitleStyle',
  TileTitleStyle: 'TileTitleStyle',
  TileSeparatorStyle: 'TileSeparatorStyle',
}));

jest.mock('@make.org/ui/Svg/elements', () => ({
  SvgInfos: 'SvgInfos',
}));

describe('TileWithTitle', () => {
  const title = 'foo';
  const children = 'bar';
  const icon = <SvgInfos />;

  it('must match the snapshot with default Props', () => {
    const component = renderer
      .create(<TileWithTitle title={title}>{children}</TileWithTitle>)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('must match the diff snapshot between default vs with Icon', () => {
    const defaultTile = renderer
      .create(<TileWithTitle title={title}>{children}</TileWithTitle>)
      .toJSON();
    const withIconTile = renderer
      .create(
        <TileWithTitle title={title} icon={icon}>
          {children}
        </TileWithTitle>
      )
      .toJSON();
    expect(snapshotDiff(defaultTile, withIconTile)).toMatchSnapshot();
  });
});
