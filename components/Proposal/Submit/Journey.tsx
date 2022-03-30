import React, { useEffect, useRef } from 'react';
import { closePanel, removePanelContent } from '@make.org/store/actions/panel';
import { useAppContext } from '@make.org/store';
import { useLocation } from 'react-router';
import { ProposalForm } from './Form';
import { ProposalAuthentication } from './Authentication';

export const ProposalJourney: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const location = useLocation();
  const pathname = useRef(location.pathname);
  const { authMode } = state.pendingProposal;
  const { question } = state.questions[state.currentQuestion];

  useEffect(() => {
    if (pathname.current !== location.pathname) {
      dispatch(closePanel());
      dispatch(removePanelContent());
      pathname.current = location.pathname;
    }
  }, [location.pathname]);

  if (!question) {
    return null;
  }

  if (authMode.enable) {
    return <ProposalAuthentication />;
  }

  return <ProposalForm />;
};
