import React, { FC, useMemo } from 'react';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  VoteContainerStyle,
  VoteWrapperStyle,
} from '@make.org/components/Vote/style';
import i18n from 'i18next';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import {
  VoteButtonStyle,
  QualifyButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { VoteIconStyle } from '@make.org/ui/elements/SvgElements';
import {
  OpinionQualificationListStyle,
  OpinionQualificationListItemStyle,
} from './style';
import { opinionsVoteStaticParams } from '../../params';

type Props = {
  voteValue: string;
  unvote: () => void;
  qualifications: string[];
  qualificationValue: string;
  handleQualification: (qualification: string) => void;
};

export const CommitmentQualification: FC<Props> = ({
  voteValue,
  unvote,
  qualifications,
  qualificationValue,
  handleQualification,
}) => {
  const opinionsVoteTransMap = useMemo(
    () =>
      new Map([
        ['agree', i18n.t('personality.opinions.vote.agree')],
        ['disagree', i18n.t('personality.opinions.vote.disagree')],
        ['neutral', i18n.t('personality.opinions.vote.neutral')],
      ]),
    [i18n.language]
  );

  const opinionsQualificationTransMap = useMemo(
    () =>
      new Map([
        ['likeIt', i18n.t('personality.opinions.qualification.likeIt')],
        ['doable', i18n.t('personality.opinions.qualification.doable')],
        [
          'platitudeAgree',
          i18n.t('personality.opinions.qualification.platitudeAgree'),
        ],
        ['noWay', i18n.t('personality.opinions.qualification.noWay')],
        ['impossible', i18n.t('personality.opinions.qualification.impossible')],
        [
          'platitudeDisagree',
          i18n.t('personality.opinions.qualification.platitudeDisagree'),
        ],
        [
          'platitudeDisagree',
          i18n.t('personality.opinions.qualification.platitudeDisagree'),
        ],
        ['noOpinion', i18n.t('personality.opinions.qualification.noOpinion')],
        [
          'doNotUnderstand',
          i18n.t('personality.opinions.qualification.doNotUnderstand'),
        ],
        ['doNotCare', i18n.t('personality.opinions.qualification.doNotCare')],
      ]),
    [i18n.language]
  );

  return (
    <VoteContainerStyle className="opinions">
      <VoteWrapperStyle>
        <ScreenReaderItemStyle as="p">
          {opinionsVoteTransMap.get(voteValue) || ''}
        </ScreenReaderItemStyle>
        <VoteButtonStyle
          aria-label={opinionsVoteTransMap.get(voteValue) || ''}
          className={`${voteValue} voted`}
          data-cy-button="vote"
          data-cy-vote-key={voteValue}
          onClick={unvote}
        >
          <VoteIconStyle className={voteValue} aria-hidden focusable="false" />
        </VoteButtonStyle>
        <ScreenReaderItemStyle as="p">
          {i18n.t('qualification.title')}
        </ScreenReaderItemStyle>
        <OpinionQualificationListStyle as={UnstyledListStyle}>
          {qualifications.map(qualification => (
            <OpinionQualificationListItemStyle key={qualification}>
              <QualifyButtonStyle
                className={
                  qualification === qualificationValue ? 'qualified' : ''
                }
                color={opinionsVoteStaticParams[voteValue].color}
                onClick={() => handleQualification(qualification)}
                data-cy-button="qualification"
                data-cy-qualification-key={qualification}
              >
                {opinionsQualificationTransMap.get(qualification) || ''}
              </QualifyButtonStyle>
            </OpinionQualificationListItemStyle>
          ))}
        </OpinionQualificationListStyle>
      </VoteWrapperStyle>
    </VoteContainerStyle>
  );
};
