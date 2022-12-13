import { createContext, Context } from 'react';

export type TopComponentContextValueType = string;

export const TopComponentContextValue = {
  getProposalList: (): string => 'proposal-list',
  getPopularProposalsTop: (): string => 'top-proposals',
  getControversialProposals: (): string => 'controversial-proposals-showcase',
  getTopideaProposalList: (): string => 'top-idea-proposal-list',
  getSearchResultProposalList: (): string => 'search-result-proposal-list',
  getOrganisationProposalList: (): string => 'organisation-proposal-list',
  getSingleProposal: (): string => 'single-proposal ',
  getSequenceProposal: (): string => 'sequence-proposal-card',
  getSequencePopular: (): string => 'sequence-popular',
  getSequenceControversial: (): string => 'sequence-controversial',
  getSequenceKeyword: (): string => 'sequence-keyword',
};

const defaultContext: TopComponentContextValueType = '';

export const TopComponentContext: Context<TopComponentContextValueType> =
  createContext(defaultContext);
