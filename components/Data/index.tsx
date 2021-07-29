import React, { FC } from 'react';
import { HISTOGRAM_CHART, PIE_CHART } from '@make.org/utils/constants/elements';
import { PieChart } from './PieChart';
import { Histogram } from './Histogram';

type Props = {
  chart: any;
};

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
