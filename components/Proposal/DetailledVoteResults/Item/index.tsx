import React, { useMemo } from 'react';
import { VoteType } from '@make.org/types';
import { voteStaticParams } from '@make.org/utils/constants/vote';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { VoteButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { VoteIconStyle } from '@make.org/ui/elements/SvgElements';
import { QualificationResults } from '../../../Qualification/Results';
import {
  DetailledItemStyle,
  VoteDataListStyle,
  VoteDataBoldItemStyle,
  QualificationDataListStyle,
} from '../style';

type Props = {
  /** Object with vote's properties */
  vote: VoteType;
  /** Vote percentage */
  votePercent: number;
};

export const DetailledResultItem: React.FC<Props> = props => {
  const { vote, votePercent } = props;
  const { voteKey } = vote;
  const voteColor = voteStaticParams[voteKey].color;

  const transVoteMap = useMemo(
    () =>
      new Map([
        ['agree', i18n.t('vote.agree')],
        ['disagree', i18n.t('vote.disagree')],
        ['neutral', i18n.t('vote.neutral')],
      ]),
    [i18n.language]
  );

  return (
    <DetailledItemStyle className={voteKey}>
      <FlexElementStyle>
        <ScreenReaderItemStyle>
          {transVoteMap.get(voteKey) || voteKey}
          {' : '}
        </ScreenReaderItemStyle>
        <VoteButtonStyle className={`${voteKey} voted`} as="span">
          <VoteIconStyle className={voteKey} aria-hidden focusable="false" />
        </VoteButtonStyle>
        <VoteDataListStyle as="span">
          <VoteDataBoldItemStyle>
            {i18n.t('common.percent', { percent: votePercent })}
          </VoteDataBoldItemStyle>
        </VoteDataListStyle>
      </FlexElementStyle>
      <ScreenReaderItemStyle>
        {i18n.t('qualification.static_repartition')}
      </ScreenReaderItemStyle>
      <QualificationDataListStyle>
        {vote.qualifications.map(qualification => (
          <QualificationResults
            key={qualification.qualificationKey}
            qualification={qualification}
            voteColor={voteColor}
          />
        ))}
      </QualificationDataListStyle>
    </DetailledItemStyle>
  );
};
