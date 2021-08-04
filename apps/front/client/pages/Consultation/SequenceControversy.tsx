import { SEQUENCE } from '@make.org/types/enums';
import React, { FC } from 'react';
import { Sequence } from '@make.org/components/Sequence/Sequence';

const SequenceControversyPage: FC = () => (
  <Sequence sequenceKind={SEQUENCE.KIND_CONTROVERSY} />
);

// eslint-disable-next-line import/no-default-export
export default SequenceControversyPage;
