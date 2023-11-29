import React, { FC } from 'react';
import { OnboardingModal } from '../../../components/onboarding/OnboardingModal';
import { Prompt } from '../../../components/prompt/Prompt';
import { Welcome } from '../../../components/welcome/Welcome';
import { PageContainer } from '../../../components/style';

const EventPage: FC = () => (
  <>
    <OnboardingModal />
    <PageContainer>
      <Welcome />
    </PageContainer>
    <Prompt />
  </>
);

// default export needed for loadable component
export default EventPage; // eslint-disable-line import/no-default-export
