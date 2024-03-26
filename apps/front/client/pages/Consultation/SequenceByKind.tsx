import React, { FC, useEffect } from 'react';
import { Sequence } from '@make.org/components/Sequence/Sequence';
import { ClientLogger } from '@make.org/logger/clientLogger';
import { usePanel } from '../../helpers/panel';

type Props = {
  kind: 'standard' | 'controversy' | 'consensus';
};

const SequenceStandardPage: FC<Props> = ({ kind }) => {
  const { showPanel } = usePanel();

  useEffect(() => {
    showPanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Sequence sequenceKind={kind} logger={ClientLogger.getInstance()} />;
};

// eslint-disable-next-line import/no-default-export
export default SequenceStandardPage;
