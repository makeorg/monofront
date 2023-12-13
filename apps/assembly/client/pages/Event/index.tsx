import React, { FC } from 'react';
import { OnboardingModal } from '../../../components/onboarding/Modal';
import { Welcome } from '../../../components/welcome';
import { Feed } from '../../../components/feed';
import { PromptContainerStyle } from '../../../components/prompt/style';
import { PromptQueries } from '../../../components/prompt/Queries';
import { PromptForm } from '../../../components/prompt/Form';
import { useAssemblyContext } from '../../../store/context';

const EventPage: FC = () => {
  const { state } = useAssemblyContext();
  const { feed } = state;

  return (
    <>
      <OnboardingModal />
      {!feed.length ? <Welcome /> : <Feed />}
      <PromptContainerStyle>
        <PromptQueries />
        <PromptForm />
      </PromptContainerStyle>
    </>
  );
};

// default export needed for loadable component
export default EventPage; // eslint-disable-line import/no-default-export
