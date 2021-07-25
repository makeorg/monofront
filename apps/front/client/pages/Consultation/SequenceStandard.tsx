import React, { FC } from 'react';
import { KIND_STANDARD } from '@make.org/utils/constants/sequence';
import { Sequence } from '@make.org/components/Sequence/Sequence';

const SequenceStandardPage: FC = () => (
  <Sequence sequenceKind={KIND_STANDARD} />
);

// eslint-disable-next-line import/no-default-export
export default SequenceStandardPage;
