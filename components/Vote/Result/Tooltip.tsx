import React from 'react';
import { i18n } from '@make.org/utils/i18n';

type Props = {
  /** Vote key's percentage */
  votePercent: number,
  /** Vote key */
  voteKey: string,
};

export const ResultTooltip: React.FC = (props: Props) => {
  const { votePercent, voteKey } = props;

  return (
    <>
      <p>{i18n.t(`vote.${voteKey}`)}</p>
      <p>{i18n.t('common.percent', { percent: votePercent })}</p>
    </>
  );
};
