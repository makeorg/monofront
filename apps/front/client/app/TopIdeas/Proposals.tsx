import React, { FC, useEffect, useState } from 'react';
import { QuestionType, ProposalType, TopIdeaType } from '@make.org/types';
import { trackLoadMoreProposals } from '@make.org/utils/services/Tracking';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import i18n from 'i18next';
import { searchProposals } from '@make.org/utils/helpers/proposal';
import { ProposalCardTagged } from '@make.org/components/Proposal/ProposalCardTagged';
import { PROPOSALS_LISTING_LIMIT } from '@make.org/utils/constants/proposal';
import { useParams } from 'react-router';
import { TRACKING } from '@make.org/types/enums';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import {
  TopComponentContext,
  TopComponentContextValueType,
  TopComponentContextValue,
} from '@make.org/store/topComponentContext';
import { Pagination } from '@make.org/components/Pagination';
import { useAppContext } from '@make.org/store';
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
  const { country, language } = state.appConfig;
  const params: { country: string; pageId: string } = useParams();
  const { pageId } = params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [proposals, setProposals] = useState<ProposalType[]>([]);
  const [proposalsTotal, setProposalsTotal] = useState<number>(0);
  const [seed, setSeed] = useState<number | undefined>(undefined);
  const hasProposals = proposals && proposals.length > 0;

  const loadProposals = async () => {
    setIsLoading(true);
    const result = await searchProposals(
      country,
      language,
      question.questionId,
      undefined,
      undefined,
      seed,
      PROPOSALS_LISTING_LIMIT,
      JSON.parse(pageId) - 1,
      'TOP_SCORE',
      undefined,
      topIdea.ideaId
    );

    if (result) {
      const { results, total, seed: apiSeed } = result;
      setProposals(results);
      setProposalsTotal(total);
      setSeed(apiSeed);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadProposals();
    trackLoadMoreProposals(
      TRACKING.COMPONENT_PARAM_DETAIL_IDEAS,
      Number(pageId)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

  useEffect(() => {
    loadProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, language]);

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
      {proposalsTotal > PROPOSALS_LISTING_LIMIT && (
        <Pagination
          itemsPerPage={PROPOSALS_LISTING_LIMIT}
          itemsTotal={proposalsTotal}
        />
      )}
    </>
  );
};
