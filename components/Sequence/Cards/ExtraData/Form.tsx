import React, { useEffect, useMemo, useState } from 'react';
import { DemographicsType } from '@make.org/types';
import { BlackBorderButtonStyle } from '@make.org/ui/elements/Buttons/style';
import { i18n } from '@make.org/utils/i18n';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { DemographicsTrackingService } from '@make.org/utils/services/DemographicsTracking';
import {
  incrementSequenceIndex,
  persistDemographics,
} from '@make.org/store/actions/sequence';
import { useLocation } from 'react-router';
import {
  trackClickSaveDemographics,
  trackClickSkipDemographics,
  trackDisplayDemographics,
} from '@make.org/utils/services/Tracking';
import { useAppContext } from '@make.org/store';
import { SubmitButton } from '@make.org/ui/elements/Form/SubmitButton';
import { TypeDemographicName } from '@make.org/api/DemographicsTrackingApiService';
import { RadioDemographics } from './Radio';
import { ExtraDataFormStyle, SkipIconStyle, SubmitWrapperStyle } from './style';
import { SelectDemographics } from './Select';

const SKIP_TRACKING_VALUE = 'SKIPPED';

type Props = {
  type: string;
  demographics: {
    ui: string;
    data: DemographicsType[];
  };
  currentQuestion: string;
};

export const renderFormUI = (
  type: TypeDemographicName,
  ui: string,
  data: DemographicsType[],
  currentValue: string,
  setCurrentValue: (value: string) => void
): React.ReactNode => {
  switch (ui) {
    case 'radio':
      return (
        <RadioDemographics
          type={type}
          data={data}
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
        />
      );
    case 'select':
      return (
        <SelectDemographics data={data} setCurrentValue={setCurrentValue} />
      );
    default:
      return null;
  }
};

export const ExtraDataForm: React.FC<Props> = ({
  type,
  demographics,
  currentQuestion,
}) => {
  const { dispatch, state } = useAppContext();
  const location = useLocation();

  const { device } = state.appConfig;
  const [currentValue, setCurrentValue] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState();
  const [isSkipDisabled, setIsSkipDisabled] = useState(false);
  const { data, ui } = demographics;
  const FORM_NAME = `demographics_${type}`;
  const isMobile = matchMobileDevice(device);

  const utmParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const accumulator = {};
    params.forEach((value, key) => {
      if (key.startsWith('utm_')) {
        accumulator[key] = params.getAll(key).join(',');
      }
    });

    return accumulator;
  }, [location.search]);

  const handleSubmit =
    value => async (event: React.SyntheticEvent<HTMLInputElement>) => {
      event.preventDefault();
      setIsSubmitDisabled(true);
      setIsSkipDisabled(true);
      const success = () => {
        setIsSubmitDisabled(false);
        setIsSkipDisabled(false);
        dispatch(incrementSequenceIndex());
      };
      const error = () => {
        setIsSubmitDisabled(false);
        setIsSkipDisabled(false);
      };

      await DemographicsTrackingService.track(
        type,
        value,
        utmParams,
        success,
        error
      );

      dispatch(persistDemographics(type, value, currentQuestion));
      trackClickSaveDemographics(type);
    };

  const onClickSkip = event => {
    handleSubmit(SKIP_TRACKING_VALUE)(event);
    trackClickSkipDemographics(type);
  };

  useEffect(() => {
    setIsSubmitDisabled(!currentValue);
  }, [currentValue]);

  useEffect(() => {
    trackDisplayDemographics(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ExtraDataFormStyle
      id={FORM_NAME}
      name={FORM_NAME}
      onSubmit={handleSubmit(currentValue)}
      method="post"
    >
      {renderFormUI(type, ui, data, currentValue, setCurrentValue)}
      <SubmitWrapperStyle>
        <BlackBorderButtonStyle
          disabled={isSkipDisabled}
          onClick={onClickSkip}
          data-cy-button="skip-demographics"
        >
          <SkipIconStyle aria-hidden focusable={false} />
          {i18n.t('demographics_card.skip')}
        </BlackBorderButtonStyle>
        <SubmitButton
          formName={FORM_NAME}
          label={
            isMobile
              ? i18n.t('demographics_card.submit_mobile')
              : i18n.t('demographics_card.submit_desktop')
          }
          disabled={isSubmitDisabled}
        />
      </SubmitWrapperStyle>
    </ExtraDataFormStyle>
  );
};