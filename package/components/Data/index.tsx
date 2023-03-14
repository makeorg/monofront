import React, { FC } from 'react';
import { PieChart } from './PieChart';
import { Histogram } from './Histogram';

type Props = {
  chart: any;
};

const PIE_CHART = 'pie';
const HISTOGRAM_CHART = 'histogram';

export const ChartType: FC<Props> = ({ chart }) => {
  switch (chart.type) {
    case PIE_CHART:
      return (
        <PieChart
          type={chart.type}
          unit={chart.unit}
          name={chart.name}
          legend={chart.legend}
          data={chart.data}
        />
      );
    case HISTOGRAM_CHART:
      return (
        <Histogram
          type={chart.type}
          unit={chart.unit}
          name={chart.name}
          legend={chart.legend}
          forcedHigherValue={chart.forcedHigherValue}
          data={chart.data}
        />
      );
    default:
      return null;
  }
};
