import React, { FC, useEffect } from 'react';
import { Sequence } from '@make.org/components/Sequence/Sequence';
import { useAppContext } from '@make.org/store';
import { setDemographicsCookie } from '@make.org/utils/helpers/clientCookies';

type Props = {
  kind: 'standard' | 'controversy' | 'consensus';
};

const SequenceStandardPage: FC<Props> = ({ kind }) => {
  const { state } = useAppContext();
  const isSubmitted = !!state.sequence.demographics.submitted;

  useEffect(() => {
    if (isSubmitted) {
      // set cookie when demographics form isSubmitted on sequence
      setDemographicsCookie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  return <Sequence sequenceKind={kind} />;
};

// eslint-disable-next-line import/no-default-export
export default SequenceStandardPage;
