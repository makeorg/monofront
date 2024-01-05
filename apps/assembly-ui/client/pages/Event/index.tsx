import React, { FC } from 'react';
import { GliderStylesheet } from '@make.org/assets/css-in-js/GliderStyle';
import { OnboardingModal } from '../../../components/Onboarding/Modal';
import { Feed } from '../../../components/Feed';
import { PromptContainerStyle } from '../../../components/Prompt/style';
import { PromptForm } from '../../../components/Prompt/Form';
import { Welcome } from '../../../components/Welcome';

const EventPage: FC = () => (
  <>
    <GliderStylesheet />
    <OnboardingModal />
    <Welcome />
    <Feed />
    <PromptContainerStyle>
      <PromptForm />
    </PromptContainerStyle>
  </>
);
// default export needed for loadable component
export default EventPage; // eslint-disable-line import/no-default-export
