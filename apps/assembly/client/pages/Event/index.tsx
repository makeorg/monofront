import React, { FC } from 'react';
import { OnboardingModal } from '../../../components/OnboardingModal';

const EventPage: FC = () => (
  <>
    <OnboardingModal />
    Event
  </>
);

// default export needed for loadable component
export default EventPage; // eslint-disable-line import/no-default-export
