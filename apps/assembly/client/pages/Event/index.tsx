import React, { FC } from 'react';
import { OnboardingModal } from '../../../components/onboarding/Modal';
import { Welcome } from '../../../components/welcome/Welcome';
import { PromptResponseContainer } from '../../../components/promptResponse/Container';
import { PromptContainerStyle } from '../../../components/prompt/style';
import { PromptQueries } from '../../../components/prompt/Queries';
import { PromptForm } from '../../../components/prompt/Form';

const EventPage: FC = () => (
  <>
    <OnboardingModal />
    <Welcome />
    <PromptResponseContainer />
    <PromptContainerStyle>
      <PromptQueries />
      <PromptForm />
    </PromptContainerStyle>
  </>
);

// default export needed for loadable component
export default EventPage; // eslint-disable-line import/no-default-export
