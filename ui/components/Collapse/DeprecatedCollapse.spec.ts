import React from 'react';
import renderer from 'react-test-renderer';
import snapshotDiff from 'snapshot-diff';
import { DeprecatedCollapse } from './DeprecatedCollapse';

jest.mock('Client/ui/Elements/CollapseElements', () => ({
  TileWithCollapseWrapperStyle: 'TileWithCollapseWrapperStyle',
  CollapseWrapperStyle: 'TileSeparatorStyle',
  CollapseTriggerStyle: 'CollapseTriggerStyle',
  CollapseIconStyle: 'CollapseIconStyle',
  CollapseContentStyle: 'CollapseContentStyle',
  CollapseSeparatorStyle: 'CollapseSeparatorStyle',
}));

jest.mock('Client/ui/Svg/elements', () => ({
  SvgAngleArrowRight: 'SvgAngleArrowRight',
}));

describe('Collapse', () => {
  const title = 'foo';
  const children = 'bar';

  it('must match the snapshot with default Props', () => {
    const component = renderer
      .create(<DeprecatedCollapse title={title}>{children}</DeprecatedCollapse>)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('must match the diff snapshot between Expand vs Collapse Props', () => {
    const expandedComponent = renderer
      .create(
        <DeprecatedCollapse title={title} open>
          {children}
        </DeprecatedCollapse>
      )
      .toJSON();
    const defaultCollapse = renderer
      .create(<DeprecatedCollapse title={title}>{children}</DeprecatedCollapse>)
      .toJSON();
    expect(snapshotDiff(expandedComponent, defaultCollapse)).toMatchSnapshot();
  });

  it('must match the diff snapshot between Tile vs default Collapse Style', () => {
    const collapseWithTile = renderer
      .create(
        <DeprecatedCollapse title={title} withTileStyle>
          {children}
        </DeprecatedCollapse>
      )
      .toJSON();
    const defaultCollapse = renderer
      .create(<DeprecatedCollapse title={title}>{children}</DeprecatedCollapse>)
      .toJSON();
    expect(snapshotDiff(collapseWithTile, defaultCollapse)).toMatchSnapshot();
  });
});
