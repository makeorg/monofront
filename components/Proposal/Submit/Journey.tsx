import React, { useEffect, useState, useRef } from 'react';
import {
  trackClickBackProposals,
  trackDisplayProposalSubmitValidation,
} from '@make.org/utils/services/Tracking';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { getLocalizedBaitText } from '@make.org/utils/helpers/proposal';
import {
  closePanel,
  removePanelContent,
  setPanelContent,
} from '@make.org/store/actions/panel';
import { proposeSuccess } from '@make.org/store/actions/proposal';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { useAppContext } from '@make.org/store';
import { useLocation } from 'react-router';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import { ProposalForm } from './Form';
import { ProposalAuthentication } from './Authentication';
import { ProposalSuccess } from './Success';

const steps = {
  AUTHENTICATION_STEP: 'authentication',
  FORM: 'form',
};

export const ProposalJourney: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const location = useLocation();
  const pathname = useRef(location.pathname);
  const { isLoggedIn, user } = selectAuthentication(state);
  const { question } = state.questions[state.currentQuestion];
  const [proposalContent, setProposalContent] = useState('');
  const [proposalStep, setProposalStep] = useState(steps.FORM);
  const [waiting, setWaiting] = useState(false);
  const baitText = getLocalizedBaitText(
    question?.language || DEFAULT_LANGUAGE,
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
    dispatch(
      setPanelContent(
        <ProposalSuccess
          firstname={user?.profile.firstName}
          email={user?.email}
        />
      )
    );
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

  useEffect(() => {
    if (pathname.current !== location.pathname) {
      dispatch(closePanel());
      dispatch(removePanelContent());
      pathname.current = location.pathname;
    }
  }, [location.pathname, dispatch]);

  if (!question) {
    return null;
  }

  if (proposalStep === steps.AUTHENTICATION_STEP) {
    return (
      <ProposalAuthentication
        handleStepBack={handleStepBack}
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
