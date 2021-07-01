import React, { useState } from 'react';
import {
  trackClickBackProposals,
  trackDisplayProposalSubmitValidation,
} from '@make.org/utils/services/Tracking';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { getLocalizedBaitText } from '@make.org/utils/helpers/proposal';
import { ProposalForm } from './Form';
import { ProposalAuthentication } from './Authentication';

import { useDispatch, useSelector } from 'react-redux';
import {
  closePanel,
  removePanelContent,
} from 'Shared/store/reducers/panel/actions';
import { selectAuthentication } from 'Shared/store/selectors/user.selector';
import { modalShowProposalSuccess } from 'Shared/store/actions/modal';
import { proposeSuccess } from 'Shared/store/actions/proposal';

const steps = {
  AUTHENTICATION_STEP: 'authentication',
  FORM: 'form',
};

export const ProposalJourney = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: StateRoot) =>
    selectAuthentication(state)
  );

  const { question } = useSelector(
    state => state.questions[state.currentQuestion]
  );
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

  const handleValueChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
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
