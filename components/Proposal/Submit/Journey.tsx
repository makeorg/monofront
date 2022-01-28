import React, { useEffect, useRef } from 'react';
import {
  emitter,
  Experiment,
  mixpanelHelper,
  Variant,
} from '@marvelapp/react-ab-test';
import { closePanel, removePanelContent } from '@make.org/store/actions/panel';
import { useAppContext } from '@make.org/store';
import { useLocation } from 'react-router';
import { DeprecatedProposalForm } from './Deprecated/Form';
import { DeprecatedProposalAuthentication } from './Deprecated/Authentication';
import { ProposalForm } from './Form';
import { ProposalAuthentication } from './Authentication';

export const ProposalJourney: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const location = useLocation();
  const pathname = useRef(location.pathname);
  const { authMode } = state.pendingProposal;
  const { question } = state.questions[state.currentQuestion];
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  const variant = 'Old signup/signin in proposal field';
  const oldVariant = 'Old signup/signin proposal';
  const newVariant = 'Signup/signin proposal';

  emitter.defineVariants(variant, [oldVariant, newVariant]);

  if (!isWidget) {
    mixpanelHelper.enable();
  }

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
    if (question.slug === 'environnement') {
      return (
        <Experiment name={variant}>
          <Variant name={oldVariant}>
            <DeprecatedProposalAuthentication />
          </Variant>
          <Variant name={newVariant}>
            <ProposalAuthentication />
          </Variant>
        </Experiment>
      );
    }
    return <DeprecatedProposalAuthentication />;
  }

  if (question.slug === 'environnement') {
    return (
      <Experiment name={variant}>
        <Variant name={oldVariant}>
          <DeprecatedProposalForm />
        </Variant>
        <Variant name={newVariant}>
          <ProposalForm />
        </Variant>
      </Experiment>
    );
  }
  return <DeprecatedProposalForm />;
};
