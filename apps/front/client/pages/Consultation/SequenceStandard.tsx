import React, { FC } from 'react';
import { Sequence } from '@make.org/components/Sequence/Sequence';
import { SEQUENCE } from '@make.org/types/enums';

const SequenceStandardPage: FC = () => (
  <Sequence sequenceKind={SEQUENCE.KIND_STANDARD} />
);

// eslint-disable-next-line import/no-default-export
export default SequenceStandardPage;
