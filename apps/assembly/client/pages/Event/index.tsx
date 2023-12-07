import React, { FC } from 'react';
import { OnboardingModal } from '../../../components/onboarding/OnboardingModal';
import { Prompt } from '../../../components/prompt/Prompt';
import { Welcome } from '../../../components/welcome/Welcome';
import { PromptResponseContainer } from '../../../components/promptResponse/PromptResponseContainer';

const EventPage: FC = () => (
  <>
    <OnboardingModal />
    <Welcome />
    <PromptResponseContainer />
    <Prompt />
  </>
);

// default export needed for loadable component
export default EventPage; // eslint-disable-line import/no-default-export
