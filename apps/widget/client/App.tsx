/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState } from 'react';
import { SEQUENCE } from '@make.org/types/enums';
import { useAppContext } from '@make.org/store';
import { Sequence } from '@make.org/components/Sequence/Sequence';
import { Modal } from '@make.org/components/Modal';
import { Panel } from '@make.org/components/Panel';
import { PrivacyPolicyModal } from '@make.org/components/PrivacyPolicyModal';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { QuestionType } from '@make.org/types';
import { isInProgress } from '@make.org/utils/helpers/date';
import { WidgetContainer } from './style';
import { HeaderPanel } from './components/HeaderPanel';
import { Maintenance } from './components/Maintenance';
import { IntroProposal } from './components/IntroProposal';
import { ClosedConsultation } from './components/ClosedConsultation';

const App: FC = () => {
  const { state } = useAppContext();
  const { currentQuestion, appConfig, modal } = state;
  const { maintenance, unsecure } = appConfig;
  const question: QuestionType = selectCurrentQuestion(state);
  const { showDataPolicy } = modal;
  const topProposalIsActive = question.activeFeatureData.topProposal !== null;
  const [topProposal, disableTopProposal] =
    useState<boolean>(topProposalIsActive);
  const openedConsultation = isInProgress(question);

  if (maintenance) {
    return <Maintenance />;
  }

  if (!currentQuestion) {
    return (
      <WidgetContainer>
        <Spinner />
      </WidgetContainer>
    );
  }

  if (!openedConsultation || unsecure) {
    return <ClosedConsultation />;
  }

  return (
    <WidgetContainer>
      <HeaderPanel />
      {topProposal ? (
        <IntroProposal handleChange={disableTopProposal} />
      ) : (
        <Sequence sequenceKind={SEQUENCE.KIND_STANDARD} />
      )}
      <Panel />
      <Modal />
      {showDataPolicy && <PrivacyPolicyModal />}
    </WidgetContainer>
  );
};

export default App;
