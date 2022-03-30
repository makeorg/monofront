import React, { FC, useState } from 'react';
import { SEQUENCE } from '@make.org/types/enums';
import { useAppContext } from '@make.org/store';
import { Sequence } from '@make.org/components/Sequence/Sequence';
import { Modal } from '@make.org/components/Modal';
import { Panel } from '@make.org/components/Panel';
import { PrivacyPolicyModal } from '@make.org/components/PrivacyPolicyModal';

import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { isInProgress } from '@make.org/utils/helpers/date';
import { QuestionType } from '@make.org/types';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { HeaderPanel } from '../../components/HeaderPanel';
import { ClosedConsultation } from '../../components/ClosedConsultation';
import { IntroProposal } from '../../components/IntroProposal';
import { WidgetContainerStyle } from '../../style';

export const RootPage: FC = () => {
  const { state } = useAppContext();
  const { currentQuestion, appConfig, modal } = state;
  const { unsecure } = appConfig;
  const { showDataPolicy } = modal;
  const question: QuestionType = selectCurrentQuestion(state);
  const topProposalIsActive = question.activeFeatureData?.topProposal !== null;
  const [topProposal, disableTopProposal] =
    useState<boolean>(topProposalIsActive);
  if (!currentQuestion) {
    return <Spinner />;
  }

  if (!isInProgress(question) || unsecure) {
    return <ClosedConsultation />;
  }

  return (
    <WidgetContainerStyle>
      <HeaderPanel />
      {topProposal ? (
        <IntroProposal handleChange={disableTopProposal} />
      ) : (
        <Sequence sequenceKind={SEQUENCE.KIND_STANDARD} />
      )}
      <Panel />
      <Modal />
      {showDataPolicy && <PrivacyPolicyModal />}
    </WidgetContainerStyle>
  );
};
