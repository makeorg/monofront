import React, { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { DemographicParameterType } from '@make.org/types';
import { BlackBorderButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import i18n from 'i18next';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { DemographicsTrackingService } from '@make.org/utils/services/DemographicsTracking';
import { incrementSequenceIndex } from '@make.org/store/actions/sequence';
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
import {
  DEMOGRAPHIC_LAYOUT_ONE_COLUMN_RADIO,
  DEMOGRAPHIC_LAYOUT_SELECT,
  DEMOGRAPHIC_LAYOUT_THREE_COLUMNS_RADIO,
} from '@make.org/utils/constants/demographics';
import { Logger } from '@make.org/utils/services/Logger';
import { RadioDemographics } from './Radio';
import { ExtraDataFormStyle, SkipIconStyle, SubmitWrapperStyle } from './style';
import { SelectDemographics } from './Select';

const SKIP_TRACKING_VALUE = 'SKIPPED';

type Props = {
  demographicId: string;
  name: string;
  layout: string;
  data: DemographicParameterType[];
  token: string;
  submitSuccess: () => void;
};

export const renderFormUI = (
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
  submitSuccess,
}) => {
  const { dispatch, state } = useAppContext();
  const location = useLocation();

  const { device, source } = state.appConfig;
  const { currentQuestion } = state;
  const { question } = state.questions[currentQuestion];
  const [currentValue, setCurrentValue] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isSkipDisabled, setIsSkipDisabled] = useState(false);
  const FORM_NAME = `demographics`;
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
          trackClickSkipDemographics(name, demographicId);
        } else {
          trackClickSaveDemographics(name, demographicId);
        }
        submitSuccess();
      };
      const error = (message: string, content: unknown) => {
        Logger.logError({
          message,
          body: content as string,
          name: 'demographics',
        });
        setIsSubmitDisabled(false);
        setIsSkipDisabled(false);
      };

      await DemographicsTrackingService.track(
        demographicId,
        token,
        value,
        question.questionId,
        source,
        utmParams,
        success,
        error
      );
    };

  const onClickSkip = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    handleSubmit(SKIP_TRACKING_VALUE)(event);
  };

  useEffect(() => {
    setIsSubmitDisabled(!currentValue);
  }, [currentValue]);

  useEffect(() => {
    trackDisplayDemographics(name, demographicId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ExtraDataFormStyle
      id={FORM_NAME}
      name={FORM_NAME}
      onSubmit={handleSubmit(currentValue)}
      method="post"
    >
      {renderFormUI(layout, data, currentValue, setCurrentValue)}
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
