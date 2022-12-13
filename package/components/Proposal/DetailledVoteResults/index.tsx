import React, { useRef } from 'react';
import { getVotesPercentFromScore } from '@make.org/utils/helpers/voteResult';
import { VoteType, SliderParamsType } from '@make.org/types';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import i18n from 'i18next';

import { useSlider } from '@make.org/utils/hooks/useSlider';
import { GliderStylesheet } from '@make.org/assets/css-in-js/GliderStyle';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import { DetailledResultItem } from './Item';
import { VoteProgress } from './Progress';
import { DetailledItemListStyle } from './style';

type Props = {
  votes: VoteType[];
  proposalId: string;
};

export const DetailledVoteResults: React.FC<Props> = props => {
  const { votes, proposalId } = props;
  const votesPercent = getVotesPercentFromScore(votes);
  const { state } = useAppContext();
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderName = 'detailed_results';
  const hasVotes = votes.length > 0;
  const sliderParams: SliderParamsType = {
    slidesToShow: 1.15,
  };

  useSlider(sliderRef, sliderParams, isMobile && hasVotes);

  return (
    <>
      <VoteProgress
        key={`vote_progress_${proposalId}`}
        votes={votes}
        proposalId={proposalId}
      />
      <GliderStylesheet />
      <ScreenReaderItemStyle>
        <>{i18n.t('results.static_repartition')}</>
      </ScreenReaderItemStyle>
      {isMobile ? (
        <div className={`${sliderName} glider-contain`}>
          <div className={`${sliderName} glider`} ref={sliderRef}>
            <DetailledItemListStyle className={`${sliderName} glider-track`}>
              {votes.map(vote => (
                <DetailledResultItem
                  key={`detail_result_${proposalId}_${vote.voteKey}`}
                  vote={vote}
                  votePercent={votesPercent[vote.voteKey]}
                />
              ))}
            </DetailledItemListStyle>
          </div>
        </div>
      ) : (
        <DetailledItemListStyle>
          {votes.map(vote => (
            <DetailledResultItem
              key={`detail_result_${proposalId}_${vote.voteKey}`}
              vote={vote}
              votePercent={votesPercent[vote.voteKey]}
            />
          ))}
        </DetailledItemListStyle>
      )}
    </>
  );
};
