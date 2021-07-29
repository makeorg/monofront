import React from 'react';
import renderer from 'react-test-renderer';
import { MockedPieChartResults } from 'Shared/types/__fixtures__/results.fixture';
import * as reactRedux from 'react-redux';
import { initialStateDebug } from 'Shared/store/initialState.debug';
import { PieChart } from './index';

jest.mock('./Styled', () => ({
  PieChartWrapperStyle: 'PieChartWrapperStyle',
  PieChartTitleStyle: 'PieChartTitleStyle',
  PieChartLegendStyle: 'PieChartLegendStyle',
  PieChartCanvasStyle: 'PieChartCanvasStyle',
}));

jest.mock('Client/ui/Elements/AccessibilityElements', () => ({
  ScreenReaderItemStyle: 'ScreenReaderItemStyle',
}));

describe('PieChart', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  beforeEach(() => {
    useSelectorMock.mockReturnValue(initialStateDebug);
  });

  afterEach(() => {
    useSelectorMock.mockClear();
  });

  it('snapshot by default', () => {
    const component = renderer
      .create(
        <PieChart
          name={MockedPieChartResults.name}
          unit={MockedPieChartResults.unit}
          legend={MockedPieChartResults.legend}
          data={MockedPieChartResults.data}
        />
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
