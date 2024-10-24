import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { DemographicParameterType, ILogger } from '@make.org/types';
import i18n from 'i18next';
import { DemographicsTrackingService } from '@make.org/utils/services/DemographicsTracking';
import { incrementSequenceIndex } from '@make.org/store/actions/sequence';
import { useLocation } from 'react-router';
import {
  trackClickSaveDemographics,
  trackClickSkipDemographics,
  trackDisplayDemographics,
} from '@make.org/utils/services/Tracking';
import { SkipLinkButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { useAppContext } from '@make.org/store';
import {
  DEMOGRAPHIC_LAYOUT_ONE_COLUMN_RADIO,
  DEMOGRAPHIC_LAYOUT_SELECT,
  DEMOGRAPHIC_LAYOUT_THREE_COLUMNS_RADIO,
} from '@make.org/utils/constants/demographics';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import { RadioDemographics } from './Radio';
import {
  ExtraDataFormStyle,
  SubmitButtonStyle,
  SubmitWrapperStyle,
} from './style';
import { SelectDemographics } from './Select';

const SKIP_TRACKING_VALUE = null;

type Props = {
  demographicId: string;
  name: string;
  layout: string;
  data: DemographicParameterType[];
  token: string;
  sessionBindingMode: boolean;
  submitSuccess: () => void;
  logger: ILogger;
};

const renderFormUI = (
  layout: string,
  data: DemographicParameterType[],
  currentValue: string,
  setCurrentValue: (value: string) => void
): React.ReactNode => {
  switch (layout) {
    case DEMOGRAPHIC_LAYOUT_ONE_COLUMN_RADIO:
      return (
        <RadioDemographics
          type="one-column"
          data={data}
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
        />
      );
    case DEMOGRAPHIC_LAYOUT_THREE_COLUMNS_RADIO:
      return (
        <RadioDemographics
          type="three-columns"
          data={data}
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
        />
      );
    case DEMOGRAPHIC_LAYOUT_SELECT:
      return (
        <SelectDemographics data={data} setCurrentValue={setCurrentValue} />
      );
    default:
      return null;
  }
};

export const ExtraDataForm: React.FC<Props> = ({
  demographicId,
  name,
  layout,
  data,
  token,
  sessionBindingMode,
  submitSuccess,
  logger,
}) => {
  const { dispatch, state } = useAppContext();
  const location = useLocation();
  const { sessionId } = state.session;
  const { currentQuestion } = state;
  const { question } = state.questions[currentQuestion];
  const [currentValue, setCurrentValue] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isSkipDisabled, setIsSkipDisabled] = useState(false);
  const FORM_NAME = `demographics`;
  const utmParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const accumulator: { [key: string]: string } = {};
    params.forEach((value, key) => {
      if (key.startsWith('utm_')) {
        accumulator[key] = params.getAll(key).join(',');
      }
    });

    return accumulator;
  }, [location.search]);

  const handleSubmit =
    (value: string | null) =>
    async (
      event: SyntheticEvent<HTMLFormElement> | SyntheticEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
      setIsSubmitDisabled(true);
      setIsSkipDisabled(true);
      const success = () => {
        setIsSubmitDisabled(false);
        setIsSkipDisabled(false);
        dispatch(incrementSequenceIndex());
        if (sessionBindingMode) {
          logger.logInfo({
            message: `submit of demographic ${demographicId}`,
            value: `demographic value : ${value}`,
            data: `demographic data : ${data}`,
          });
        }
        if (value === SKIP_TRACKING_VALUE) {
          trackClickSkipDemographics(name, demographicId, sessionBindingMode);
        } else {
          trackClickSaveDemographics(name, demographicId, sessionBindingMode);
        }
        submitSuccess();
      };
      const error = (message: string, content: unknown) => {
        logger.logError({
          message,
          body: content as string,
          name: 'demographics',
        });
        setIsSubmitDisabled(false);
        setIsSkipDisabled(false);
      };

      const { source, country } = trackingParamsService.all();

      await DemographicsTrackingService.track(
        demographicId,
        value,
        question.questionId,
        source || 'no source',
        country || 'no country',
        utmParams,
        token,
        success,
        error,
        sessionBindingMode ? sessionId : undefined
      );
    };

  const onClickSkip = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    handleSubmit(SKIP_TRACKING_VALUE)(event);
  };

  useEffect(() => {
    setIsSubmitDisabled(!currentValue);
  }, [currentValue]);

  useEffect(() => {
    trackDisplayDemographics(name, demographicId, sessionBindingMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ExtraDataFormStyle
      as="form"
      id={FORM_NAME}
      name={FORM_NAME}
      onSubmit={handleSubmit(currentValue)}
      method="post"
    >
      {renderFormUI(layout, data, currentValue, setCurrentValue)}
      <SubmitWrapperStyle>
        <SubmitButtonStyle
          data-cy-button="submit-demographics"
          type="submit"
          form={FORM_NAME}
          disabled={isSubmitDisabled}
        >
          {i18n.t('demographics_card.submit')}
        </SubmitButtonStyle>
        <SkipLinkButtonStyle
          disabled={isSkipDisabled}
          onClick={onClickSkip}
          data-cy-button="skip-demographics"
        >
          {i18n.t('demographics_card.skip')}
        </SkipLinkButtonStyle>
      </SubmitWrapperStyle>
    </ExtraDataFormStyle>
  );
};
