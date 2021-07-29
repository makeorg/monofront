import React, { FC } from 'react';
import i18n from 'i18next';
import { SvgMail } from '@make.org/ui/Svg/elements';
import { modalShowRegister } from '@make.org/store/actions/modal';
import { trackClickSubscribe } from '@make.org/utils/services/Tracking';
import { useAppContext } from '@make.org/store';
import {
  NoConsultationWrapperStyle,
  NoConsultationImageStyle,
  ConsultationElementTitleStyle,
  NoConsultationButtonStyle,
} from './style';

type Props = {
  questionsCount: number;
  resultsContext: boolean;
};

const getTitleFromContext = (
  questionsCount: number,
  resultsContext: boolean
) => {
  const noQuestions = questionsCount === 0;

  if (resultsContext && noQuestions) {
    return i18n.t('browse.no_results');
  }

  if (resultsContext) {
    return i18n.t('browse.one_result');
  }

  if (noQuestions) {
    return i18n.t('browse.no_consultations');
  }

  return i18n.t('browse.one_consultation');
};

export const RegistrationIncentive: FC<Props> = ({
  questionsCount,
  resultsContext,
}) => {
  const { dispatch } = useAppContext();

  const handleClick = () => {
    dispatch(modalShowRegister());
    trackClickSubscribe('subscribe-next-consultation');
  };

  return (
    <NoConsultationWrapperStyle>
      <NoConsultationImageStyle>
        <SvgMail aria-hidden focusable="false" />
      </NoConsultationImageStyle>
      <ConsultationElementTitleStyle>
        {getTitleFromContext(questionsCount, resultsContext)}
      </ConsultationElementTitleStyle>
      <NoConsultationButtonStyle
        onClick={handleClick}
        aria-label={i18n.t('common.register_label')}
        data-cy-link="subscribe"
      >
        {i18n.t('browse.subscribe')}
      </NoConsultationButtonStyle>
    </NoConsultationWrapperStyle>
  );
};
