import React, { FC } from 'react';
import { OnboardingModal } from '../../../components/onboarding/OnboardingModal';
import { Prompt } from '../../../components/prompt/Prompt';
import { Welcome } from '../../../components/welcome/Welcome';

const EventPage: FC = () => (
  <>
    <OnboardingModal />
    <Welcome />
    <Prompt />
  </>
);

// default export needed for loadable component
export default EventPage; // eslint-disable-line import/no-default-export
