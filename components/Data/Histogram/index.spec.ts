import React from 'react';
import renderer from 'react-test-renderer';
import snapshotDiff from 'snapshot-diff';
import {
  MockedHistogramResults,
  MockedHistogram2BarsResults,
} from 'Shared/types/__fixtures__/results.fixture';
import { Histogram } from './index';

jest.mock('./Styled', () => ({
  HistogramWrapperStyle: 'HistogramWrapperStyle',
  HistogramListStyle: 'HistogramListStyle',
  HistogramListItemStyle: 'HistogramListItemStyle',
  HistogramBarContainerStyle: 'HistogramBarContainerStyle',
  HistogramBarStyle: 'HistogramBarStyle',
  HistogramLabelStyle: 'HistogramLabelStyle',
  HistogramPercentStyle: 'HistogramPercentStyle',
  HistogramTitleStyle: 'HistogramTitleStyle',
  HistogramLegendStyle: 'HistogramLegendStyle',
  HistogramLegendLabelStyle: 'HistogramLegendLabelStyle',
  HistogramLegendColorsStyle: 'HistogramLegendColorsStyle',
}));

jest.mock('Client/ui/Elements/AccessibilityElements', () => ({
  ScreenReaderItemStyle: 'ScreenReaderItemStyle',
}));

describe('Histogram', () => {
  it('snapshot by default', () => {
    const component = renderer
      .create(
        <Histogram
          name={MockedHistogramResults.name}
          unit={MockedHistogramResults.unit}
          legend={MockedHistogramResults.legend}
          data={MockedHistogramResults.data}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('must match the diff snapshot between default vs 2 bars', () => {
    const defaultTile = renderer
      .create(
        <Histogram
          name={MockedHistogramResults.name}
          unit={MockedHistogramResults.unit}
          legend={MockedHistogramResults.legend}
          data={MockedHistogramResults.data}
        />
      )
      .toJSON();
    const TwoBarsStyle = renderer
      .create(
        <Histogram
          name={MockedHistogram2BarsResults.name}
          unit={MockedHistogram2BarsResults.unit}
          legend={MockedHistogram2BarsResults.legend}
          data={MockedHistogram2BarsResults.data}
        />
      )
      .toJSON();
    expect(snapshotDiff(defaultTile, TwoBarsStyle)).toMatchSnapshot();
  });
});
