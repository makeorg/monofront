import React from 'react';
import { ProposalType } from '@make.org/types';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { ProposalCardWithQuestion } from '@make.org/components/Proposal/ProposalCardWithQuestion';
import i18n from 'i18next';
import {
  TopComponentContext,
  TopComponentContextValueType,
  TopComponentContextValue,
} from '@make.org/store/topComponentContext';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { MainResultsProposalsMobile } from './Mobile';
import {
  MainResultsProposalsItemStyle,
  PaginationProposalsButtonStyle,
} from './style';

type Props = {
  proposals: ProposalType[];
  count: number;
  link: string;
};

export const MainResultsProposals: React.FC<Props> = ({
  proposals,
  count,
  link,
}) => {
  const { state } = useAppContext();
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const PROPOSALS_LIMIT = 4;
  const seeMoreButton = count > PROPOSALS_LIMIT && count !== proposals.length;

  if (isMobile) {
    return <MainResultsProposalsMobile proposals={proposals} />;
  }
  const topComponentContext: TopComponentContextValueType =
    TopComponentContextValue.getSearchResultProposalList();

  return (
    <ColumnElementStyle id="proposal_list">
      <TopComponentContext.Provider value={topComponentContext}>
        <UnstyledListStyle>
          {proposals.map((proposal, index) => (
            <MainResultsProposalsItemStyle key={proposal.id}>
              <ProposalCardWithQuestion
                proposal={proposal}
                position={index + 1}
                size={proposals.length}
              />
            </MainResultsProposalsItemStyle>
          ))}
        </UnstyledListStyle>
        {seeMoreButton && (
          <PaginationProposalsButtonStyle to={link}>
            {i18n.t('consultation.proposal.load_more')}
          </PaginationProposalsButtonStyle>
        )}
      </TopComponentContext.Provider>
    </ColumnElementStyle>
  );
};
