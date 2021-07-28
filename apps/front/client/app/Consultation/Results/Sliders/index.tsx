// @flow
import React, { useRef } from 'react';
import { useLocation } from 'react-router';
import { type StateRoot } from 'Shared/store/types';
import { type SliderParamsType } from 'Shared/types/views';
import { i18n } from 'Shared/i18n';
import {
  SvgChevronArrowLeft,
  SvgChevronArrowRight,
} from 'Client/ui/Svg/elements';
import { ChartType } from 'Client/ui/Data';
import { useSlider } from 'Client/hooks/useSlider';
import { ScreenReaderItemStyle } from 'Client/ui/Elements/AccessibilityElements';
import { UnstyledListStyle } from 'Client/ui/Elements/ListElements';
import { isResultsPage } from 'Shared/routes';
import { matchMobileDevice } from 'Shared/helpers/styled';
import { useSelector } from 'react-redux';
import {
  ResultsSliderStyle,
  ResultsSliderArrowsStyle,
  ResultsSliderPagination,
} from './style';

type Props = {
  data: any[],
  sliderName: string,
  styleClass?: string,
};

export const ResultsSlider = ({ data, sliderName, styleClass }: Props) => {
  const sliderRef = useRef();
  const { device } = useSelector((state: StateRoot) => state.appConfig);
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
          isResultsPage={resultsPage}
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
          isResultsPage={resultsPage}
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
