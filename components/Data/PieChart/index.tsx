import React, { useRef, useEffect, FC } from 'react';
import { PieChartType } from '@make.org/types';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import {
  PieChartWrapperStyle,
  PieChartTitleStyle,
  PieChartCanvasStyle,
  PieChartLegendStyle,
} from './style';
import { buildPieChart } from './Build';

export const PieChart: FC<PieChartType> = ({ unit, name, legend, data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state } = useAppContext();
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);

  useEffect(() => {
    if (canvasRef) {
      buildPieChart(canvasRef, data, isMobile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef.current]);

  return (
    <PieChartWrapperStyle>
      <PieChartTitleStyle>{name}</PieChartTitleStyle>
      <ScreenReaderItemStyle>
        {legend && <p>{legend}</p>}
        <table>
          <caption>{name}</caption>
          <thead>
            <tr>
              <th>{i18n.t('consultation.results.table.name')}</th>
              <th>
                {i18n.t('consultation.results.table.value_with_unit', {
                  unit: i18n.t(`consultation.results.table.${unit}`),
                })}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.label}>
                <td>
                  {item.label}
                  {item.sublabel && ` ${item.sublabel}`}
                </td>
                <td>{`${item.percent}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScreenReaderItemStyle>
      <PieChartCanvasStyle aria-hidden ref={canvasRef} />
      {legend && (
        <PieChartLegendStyle aria-hidden>{legend}</PieChartLegendStyle>
      )}
    </PieChartWrapperStyle>
  );
};
