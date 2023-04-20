import React, { useEffect, useState, useRef, FC } from 'react';
import { HistogramType } from '@make.org/types';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  HistogramWrapperStyle,
  HistogramListStyle,
  HistogramListItemStyle,
  HistogramBarContainerStyle,
  HistogramBarStyle,
  HistogramLabelStyle,
  HistogramPercentStyle,
  HistogramTitleStyle,
  HistogramLegendStyle,
  HistogramLegendLabelStyle,
  HistogramLegendColorsStyle,
} from './style';
import {
  getHistogramBarWidth,
  getHistogramBarMargin,
  getHistogramBarHeight,
} from './helpers';

export const Histogram: FC<HistogramType> = ({
  unit,
  name,
  legend,
  forcedHigherValue = 0,
  data,
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [maxValue, setMaxValue] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [itemGap, setItemGap] = useState(0);
  const valuesArray: number[] = [];

  useEffect(() => {
    data.forEach(item => {
      const secondBarValue = item.bars.second;
      if (secondBarValue) {
        valuesArray.push(secondBarValue);
      }
      valuesArray.push(item.bars.first);
    });
    if (forcedHigherValue) {
      valuesArray.push(forcedHigherValue);
    }
    setMaxValue(Math.max(...valuesArray));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (listRef.current) {
      const itemWidthValue = getHistogramBarWidth(
        listRef.current.offsetWidth,
        data.length
      );
      setItemWidth(itemWidthValue);
    }

    const itemGapValue = getHistogramBarMargin(itemWidth, data.length);
    setItemGap(itemGapValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listRef.current]);

  const translatedUnit =
    unit === 'percentage'
      ? i18n.t('consultation.results.table.percentage')
      : unit;

  return (
    <HistogramWrapperStyle>
      <HistogramTitleStyle>{name}</HistogramTitleStyle>
      <ScreenReaderItemStyle>
        <table>
          <caption>{name}</caption>
          <thead>
            <tr>
              <td aria-hidden />
              <th scope="col">
                {legend.dimensions.first}
                {` (${i18n.t('consultation.results.table.value_with_unit', {
                  unit: translatedUnit,
                })})`}
              </th>
              {legend.dimensions.second && (
                <th scope="col">
                  {legend.dimensions.second}
                  {` (${i18n.t('consultation.results.table.value_with_unit', {
                    unit: translatedUnit,
                  })})`}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.label}>
                <th scope="row">{item.label}</th>
                <td>{`${item.bars.first}%`}</td>
                {item.bars.second && <td>{`${item.bars.second}%`}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </ScreenReaderItemStyle>
      <HistogramLegendStyle aria-hidden>
        <h5>{legend.title}</h5>
        <HistogramLegendLabelStyle>
          {legend.dimensions.first}
          <HistogramLegendColorsStyle />
        </HistogramLegendLabelStyle>
        {legend.dimensions.second && (
          <HistogramLegendLabelStyle>
            {legend.dimensions.second}
            <HistogramLegendColorsStyle background />
          </HistogramLegendLabelStyle>
        )}
      </HistogramLegendStyle>
      <HistogramListStyle ref={listRef} itemGap={itemGap} aria-hidden>
        {data.map(item => (
          <HistogramListItemStyle
            key={item.label}
            itemWidth={itemWidth}
            itemGap={itemGap}
          >
            <HistogramLabelStyle>{item.label}</HistogramLabelStyle>
            <HistogramBarContainerStyle>
              <HistogramBarStyle
                barWidth={item.bars.second ? 50 : 100}
                barHeight={getHistogramBarHeight(item.bars.first, maxValue)}
              >
                <HistogramPercentStyle>
                  {`${item.bars.first}%`}
                </HistogramPercentStyle>
              </HistogramBarStyle>
              {item.bars.second && (
                <HistogramBarStyle
                  background
                  barWidth={50}
                  barHeight={getHistogramBarHeight(item.bars.second, maxValue)}
                >
                  <HistogramPercentStyle>
                    {`${item.bars.second || 'undefined'}%`}
                  </HistogramPercentStyle>
                </HistogramBarStyle>
              )}
            </HistogramBarContainerStyle>
          </HistogramListItemStyle>
        ))}
      </HistogramListStyle>
    </HistogramWrapperStyle>
  );
};
