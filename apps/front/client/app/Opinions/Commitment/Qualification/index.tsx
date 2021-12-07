import React, { FC } from 'react';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { useAppContext } from '@make.org/store';
import {
  VoteContainerStyle,
  VoteWrapperStyle,
} from '@make.org/components/Vote/style';
import i18n from 'i18next';
import { opinionsVoteStaticParams } from '@make.org/utils/constants/opinions';
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
  const { state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  return (
    <VoteContainerStyle className="opinions">
      <VoteWrapperStyle>
        <ScreenReaderItemStyle as="p">
          {i18n.t(`personality.opinions.vote.${voteValue}`)}
        </ScreenReaderItemStyle>
        <VoteButtonStyle
          aria-label={i18n.t(`personality.opinions.vote.${voteValue}`)}
          className={`${voteValue} voted`}
          data-cy-button="vote"
          data-cy-vote-key={voteValue}
          onClick={unvote}
          isWidget={isWidget}
        >
          <VoteIconStyle
            className={isWidget ? `${voteValue} widget` : voteValue}
            aria-hidden
            focusable="false"
          />
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
                {i18n.t(`personality.opinions.qualification.${qualification}`)}
              </QualifyButtonStyle>
            </OpinionQualificationListItemStyle>
          ))}
        </OpinionQualificationListStyle>
      </VoteWrapperStyle>
    </VoteContainerStyle>
  );
};
