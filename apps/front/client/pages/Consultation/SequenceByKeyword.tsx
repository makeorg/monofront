import React, { FC, useEffect } from 'react';
import { SequenceByKeyword } from '@make.org/components/Sequence/SequenceByKeyword';
import { usePanel } from '../../helpers/panel';

const SequenceKeywordPage: FC = () => {
  const { showPanel } = usePanel();

  useEffect(() => {
    showPanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SequenceByKeyword />;
};

// eslint-disable-next-line import/no-default-export
export default SequenceKeywordPage;
