import React, { useEffect, useRef } from 'react';
import { closePanel, removePanelContent } from '@make.org/store/actions/panel';
import { useAppContext } from '@make.org/store';
import { useLocation } from 'react-router';
import { ILogger } from '@make.org/types';
import { ProposalForm } from './Form';

type Props = {
  logger: ILogger;
};

export const ProposalJourney: React.FC<Props> = ({ logger }) => {
  const { dispatch, state } = useAppContext();
  const location = useLocation();
  const pathname = useRef(location.pathname);
  const { question } = state.questions[state.currentQuestion];

  useEffect(() => {
    if (pathname.current !== location.pathname) {
      dispatch(closePanel());
      dispatch(removePanelContent());
      pathname.current = location.pathname;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (!question) {
    dispatch(closePanel());
    dispatch(removePanelContent());
    return null;
  }

  return <ProposalForm logger={logger} />;
};
