import React, { FC } from 'react';
import { OnboardingModal } from '../../../components/OnboardingModal';

const EventPage: FC = () => (
  <div>
    <OnboardingModal />
    Event
  </div>
);

// default export needed for loadable component
export default EventPage; // eslint-disable-line import/no-default-export
