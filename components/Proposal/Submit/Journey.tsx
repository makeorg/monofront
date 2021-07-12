import React, { useState } from 'react';
import {
  trackClickBackProposals,
  trackDisplayProposalSubmitValidation,
} from '@make.org/utils/services/Tracking';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { getLocalizedBaitText } from '@make.org/utils/helpers/proposal';
import { closePanel, removePanelContent } from '@make.org/store/actions/panel';
import { proposeSuccess } from '@make.org/store/actions/proposal';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { modalShowProposalSuccess } from '@make.org/store/actions/modal';
import { useAppContext } from '@make.org/store';
import { ProposalForm } from './Form';
import { ProposalAuthentication } from './Authentication';

const steps = {
  AUTHENTICATION_STEP: 'authentication',
  FORM: 'form',
};

export const ProposalJourney: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { isLoggedIn } = selectAuthentication(state);
  const { question } = state.questions[state.currentQuestion];
  const [proposalContent, setProposalContent] = useState('');
  const [proposalStep, setProposalStep] = useState('form');
  const [waiting, setWaiting] = useState(false);
  const baitText = getLocalizedBaitText(
    question?.language,
    question?.questionId
  );

  const handleFieldFocus = () => {
    if (proposalContent.length === 0) {
      setProposalContent(baitText);
    }
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (proposalContent.length < baitText.length) {
      return setProposalContent(baitText);
    }
    return setProposalContent(event.currentTarget.value);
  };

  const handleCancel = () => {
    dispatch(closePanel());
    dispatch(removePanelContent());
    trackClickBackProposals();
  };

  const handleStepBack = () => {
    setProposalStep(steps.FORM);
  };

  const handleProposeAPICall = async () => {
    if (waiting) {
      return;
    }
    setWaiting(true);
    await ProposalService.propose(proposalContent, question.questionId);
    setWaiting(false);
    dispatch(removePanelContent());
    dispatch(closePanel());
    dispatch(modalShowProposalSuccess());
    dispatch(proposeSuccess());
    trackDisplayProposalSubmitValidation();
  };

  const handleSubmitForm = () => {
    if (isLoggedIn) {
      handleProposeAPICall();
      return;
    }
    setProposalStep(steps.AUTHENTICATION_STEP);
  };

  if (proposalStep === steps.AUTHENTICATION_STEP) {
    return (
      <ProposalAuthentication
        handleStepBack={handleStepBack}
        handleCancel={handleCancel}
        handleProposeAPICall={handleProposeAPICall}
      />
    );
  }

  return (
    <ProposalForm
      proposalContent={proposalContent}
      setProposalContent={setProposalContent}
      handleValueChange={handleValueChange}
      handleFieldFocus={handleFieldFocus}
      handleCancel={handleCancel}
      handleSubmit={handleSubmitForm}
      waitingApiCallback={waiting}
    />
  );
};
