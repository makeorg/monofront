import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { DemographicNameType, DemographicDataType } from '@make.org/types';
import { BlackBorderButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import i18n from 'i18next';
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
import { SubmitButton } from '@make.org/ui/components/SubmitButton';
import { useCookies } from 'react-cookie';
import { COOKIE } from '@make.org/types/enums';
import { RadioDemographics } from './Radio';
import { ExtraDataFormStyle, SkipIconStyle, SubmitWrapperStyle } from './style';
import { SelectDemographics } from './Select';

const SKIP_TRACKING_VALUE = 'SKIPPED';

type Props = {
  type: DemographicNameType;
  demographics: {
    ui: string;
    data: DemographicDataType[];
  };
  currentQuestion: string;
};

export const renderFormUI = (
  type: DemographicNameType,
  ui: string,
  data: DemographicDataType[],
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
  const [currentValue, setCurrentValue] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isSkipDisabled, setIsSkipDisabled] = useState(false);
  const { data, ui } = demographics;
  const FORM_NAME = `demographics_${type}`;
  const isMobile = matchMobileDevice(device);

  // set cookie duration to a month with december corner case
  const expirationDate = new Date();
  const month = (expirationDate.getMonth() + 1) % 12;
  expirationDate.setMonth(month);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies([COOKIE.DEMOGRAPHICS]);

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
    (value: string) =>
    async (
      event: SyntheticEvent<HTMLFormElement> | SyntheticEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
      setIsSubmitDisabled(true);
      setIsSkipDisabled(true);
      setCookie(COOKIE.DEMOGRAPHICS, true, {
        path: '/',
        expires: expirationDate,
      });
      const success = () => {
        setIsSubmitDisabled(false);
        setIsSkipDisabled(false);
        dispatch(incrementSequenceIndex());
        if (value === SKIP_TRACKING_VALUE) {
          trackClickSkipDemographics(type);
        } else {
          trackClickSaveDemographics(type);
        }
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
    };

  const onClickSkip = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    handleSubmit(SKIP_TRACKING_VALUE)(event);
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
          <SkipIconStyle aria-hidden focusable="false" />
          {i18n.t('demographics_card.skip')}
        </BlackBorderButtonStyle>
        <SubmitButton
          formName={FORM_NAME}
          data-cy-button="submit-demographics"
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
