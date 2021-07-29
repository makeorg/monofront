import React, { FC, useRef } from 'react';
import { useLocation } from 'react-router';
import { SliderParamsType } from '@make.org/types';
import i18n from 'i18next';
import {
  SvgChevronArrowLeft,
  SvgChevronArrowRight,
} from '@make.org/ui/Svg/elements';
import { ChartType } from '@make.org/components/Data';
import { useSlider } from '@make.org/utils/hooks/useSlider';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { isResultsPage } from '@make.org/utils/routes';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import {
  ResultsSliderStyle,
  ResultsSliderArrowsStyle,
  ResultsSliderPagination,
} from './style';

type Props = {
  data: any[];
  sliderName: string;
  styleClass?: string;
};

export const ResultsSlider: FC<Props> = ({ data, sliderName, styleClass }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { state } = useAppContext();
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const dataLength = data.length;
  const sliderParams: SliderParamsType = {
    slidesToShow: 1,
    arrows: {
      prev: `.${sliderName}.glider-prev`,
      next: `.${sliderName}.glider-next`,
    },
    counterName: `.${sliderName}.glider-index`,
  };
  const location = useLocation();
  const resultsPage = isResultsPage(location.pathname);

  useSlider(sliderRef, sliderParams, dataLength > 0);

  return (
    <>
      <ScreenReaderItemStyle>
        {i18n.t('common.slider.introduction')}
      </ScreenReaderItemStyle>
      <div className={`${sliderName} glider-contain`}>
        <ResultsSliderStyle
          className={`${sliderName} glider ${styleClass}`}
          ref={sliderRef}
          isResultsPage={resultsPage}
        >
          <UnstyledListStyle className={`${sliderName} glider-track`}>
            {data.map((chart, index) => (
              <li key={chart.name} className={sliderName}>
                <ScreenReaderItemStyle>
                  {i18n.t('common.slider.index_count', {
                    index: index + 1,
                    total: dataLength,
                  })}
                </ScreenReaderItemStyle>
                <ChartType chart={chart} />
              </li>
            ))}
          </UnstyledListStyle>
        </ResultsSliderStyle>
        <ResultsSliderArrowsStyle
          className={`${sliderName} glider-prev`}
          aria-label={i18n.t('common.slider.previous')}
        >
          <SvgChevronArrowLeft
            aria-hidden
            focusable="false"
            width={isMobile ? 10 : 20}
          />
        </ResultsSliderArrowsStyle>
        <ResultsSliderArrowsStyle
          className={`${sliderName} glider-next`}
          aria-label={i18n.t('common.slider.next')}
        >
          <SvgChevronArrowRight
            aria-hidden
            focusable="false"
            width={isMobile ? 10 : 20}
          />
        </ResultsSliderArrowsStyle>
        <ResultsSliderPagination aria-hidden focusable="false">
          <span className={`${sliderName} glider-index`}>1</span>
          {` / ${dataLength}`}
        </ResultsSliderPagination>
      </div>
    </>
  );
};
