// @flow
import React from 'react';
import { i18n } from 'Shared/i18n';
import { SvgMail } from 'Client/ui/Svg/elements';
import { useDispatch } from 'react-redux';
import { modalShowRegister } from 'Shared/store/actions/modal';
import { trackClickSubscribe } from 'Shared/services/Tracking';
import {
  NoConsultationWrapperStyle,
  NoConsultationImageStyle,
  ConsultationElementTitleStyle,
  NoConsultationButtonStyle,
} from './style';

type Props = {
  questionsCount: number,
  resultsContext: boolean,
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

export const RegistrationIncentive = ({
  questionsCount,
  resultsContext,
}: Props) => {
  const dispatch = useDispatch();

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
