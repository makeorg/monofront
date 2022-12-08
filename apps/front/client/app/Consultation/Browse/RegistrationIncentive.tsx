import React, { FC } from 'react';
import i18n from 'i18next';
import { SvgMail } from '@make.org/ui/Svg/elements';
import { trackClickSubscribe } from '@make.org/utils/services/Tracking';
import { setPanelContent } from '@make.org/store/actions/panel';
import { Register } from '@make.org/components/Auth/Register';
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
    dispatch(setPanelContent(<Register />));
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
        aria-label={i18n.t('common.register_label') || undefined}
        data-cy-link="subscribe"
      >
        {i18n.t('browse.subscribe')}
      </NoConsultationButtonStyle>
    </NoConsultationWrapperStyle>
  );
};
