import React, { FC, useEffect } from 'react';
import { SequenceByKeyword } from '@make.org/components/Sequence/SequenceByKeyword';
import { ClientLogger } from '@make.org/logger/clientLogger';
import { usePanel } from '../../helpers/panel';

const SequenceKeywordPage: FC = () => {
  const { showPanel } = usePanel();

  useEffect(() => {
    showPanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SequenceByKeyword logger={ClientLogger.getInstance()} />;
};

// eslint-disable-next-line import/no-default-export
export default SequenceKeywordPage;
