import React, { FC, useEffect, useState } from 'react';
import { QuestionType, ProposalType, TopIdeaType } from '@make.org/types';
import { trackLoadMoreProposals } from '@make.org/utils/services/Tracking';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import i18n from 'i18next';
import { searchProposals } from '@make.org/utils/helpers/proposal';
import { ProposalCardTagged } from '@make.org/components/Proposal/ProposalCardTagged';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';

import { TRACKING } from '@make.org/types/enums';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import {
  TopComponentContext,
  TopComponentContextValueType,
  TopComponentContextValue,
} from '@make.org/store/topComponentContext';
import { useAppContext } from '@make.org/store';
import { LoadMoreWrapperStyle } from '../Consultation/Styled/Proposal';
import { TopIdeaDetailsPageTitleStyle } from '../../pages/Consultation/style';
import { InfiniteProposalsContainerStyle } from './style';

type Props = {
  topIdea: TopIdeaType;
  question: QuestionType;
};

export const TopIdeaDetailsProposals: FC<Props> = ({ topIdea, question }) => {
  const topComponentContext: TopComponentContextValueType =
    TopComponentContextValue.getTopideaProposalList();
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [seed, setSeed] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPendingForMore, setIsPendingForMore] = useState<boolean>(false);
  const hasProposals = proposals && proposals.length > 0;
  const displayLoadMoreButton =
    hasProposals && hasMore && !isLoading && !isPendingForMore;

  const initProposals = async () => {
    const result = await searchProposals(
      country,
      question.questionId,
      undefined,
      undefined,
      page,
      undefined,
      undefined,
      'TOP_SCORE',
      undefined,
      topIdea.ideaId
    );

    if (result) {
      const { results, total, seed: apiSeed } = result;
      setProposals(results);
      setHasMore(results.length < total);
      setSeed(apiSeed);
      setPage(1);
    }
    setIsLoading(false);
  };

  const loadProposals = async () => {
    setIsPendingForMore(true);
    const result = await searchProposals(
      country,
      question.questionId,
      undefined,
      undefined,
      seed,
      undefined,
      page,
      'TOP_SCORE',
      undefined,
      topIdea.ideaId
    );
    if (result) {
      const { results, total, seed: apiSeed } = result;
      const newProposalList: ProposalType[] = [...proposals, ...results];
      setProposals(newProposalList);
      setHasMore(newProposalList.length < total);
      setSeed(apiSeed);
      setPage(page + 1);
    }
    trackLoadMoreProposals(TRACKING.COMPONENT_PARAM_DETAIL_IDEAS, page);
    setIsPendingForMore(false);
  };

  useEffect(() => {
    initProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        hasProposals && (
          <ColumnElementStyle id="proposals_list">
            <TopIdeaDetailsPageTitleStyle>
              {i18n.t('idea_details.proposals')}
            </TopIdeaDetailsPageTitleStyle>
            <TopComponentContext.Provider value={topComponentContext}>
              <InfiniteProposalsContainerStyle
                id="proposal_list"
                role="feed"
                aria-live="polite"
              >
                {proposals.map((proposal, index) => (
                  <ProposalCardTagged
                    key={proposal.id}
                    proposal={proposal}
                    position={index + 1}
                    size={proposals.length}
                  />
                ))}
              </InfiniteProposalsContainerStyle>
            </TopComponentContext.Provider>
          </ColumnElementStyle>
        )
      )}
      {isPendingForMore && <Spinner />}
      {displayLoadMoreButton && (
        <LoadMoreWrapperStyle>
          <RedButtonStyle onClick={loadProposals}>
            {i18n.t('consultation.proposal.load_more')}
          </RedButtonStyle>
        </LoadMoreWrapperStyle>
      )}
    </>
  );
};
