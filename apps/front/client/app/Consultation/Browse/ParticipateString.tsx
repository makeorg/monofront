/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC } from 'react';
import { HomeQuestionType } from '@make.org/types';
import { NewWindowIconStyle } from '@make.org/ui/elements/LinkElements';
import { isInProgress } from '@make.org/utils/helpers/date';
import { ConsultationParticipateStringStyle } from './style';

type Props = {
  question: HomeQuestionType;
  label: string;
};
export const ConsultationParticipateString: FC<Props> = ({
  question,
  label,
}) => {
  const { resultsLink } = question;

  const openedConsultation = isInProgress(question);
  const closedConsultationWithoutResults = !openedConsultation && !resultsLink;
  const externalResultLink =
    resultsLink && resultsLink.kind === 'external' && resultsLink.value;

  return (
    <ConsultationParticipateStringStyle aria-hidden>
      {label}
      {closedConsultationWithoutResults || externalResultLink ? (
        <NewWindowIconStyle focusable="false" />
      ) : null}
    </ConsultationParticipateStringStyle>
  );
};
