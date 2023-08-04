import React, { FC } from 'react';
import { Sequence } from '@make.org/components/Sequence/Sequence';

type Props = {
  kind: 'standard' | 'controversy' | 'consensus';
};

const SequenceStandardPage: FC<Props> = ({ kind }) => (
  <Sequence sequenceKind={kind} />
);

// eslint-disable-next-line import/no-default-export
export default SequenceStandardPage;
