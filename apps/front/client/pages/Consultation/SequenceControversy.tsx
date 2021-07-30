import { KIND_CONTROVERSY } from '@make.org/utils/constants/sequence';
import React, { FC } from 'react';
import { Sequence } from '@make.org/components/Sequence/Sequence';

const SequenceControversyPage: FC = () => (
  <Sequence sequenceKind={KIND_CONTROVERSY} />
);

// eslint-disable-next-line import/no-default-export
export default SequenceControversyPage;
