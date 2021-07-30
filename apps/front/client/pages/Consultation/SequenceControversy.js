import { KIND_CONTROVERSY } from 'Shared/constants/sequence';
import React from 'react';
import { Sequence } from 'Client/features/sequence/Sequence';

const SequenceControversyPage = () => (
  <Sequence sequenceKind={KIND_CONTROVERSY} />
);

// eslint-disable-next-line import/no-default-export
export default SequenceControversyPage;
