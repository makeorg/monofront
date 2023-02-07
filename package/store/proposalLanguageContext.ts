import { createContext, Context } from 'react';

export type ProposalLanguageContextValueType = string;

export const ProposalLanguageContextValue = {
  getProposalLanguage: (proposalLanguage: string): string => proposalLanguage,
};

const defaultContext: ProposalLanguageContextValueType = '';

export const ProposalLanguageContext: Context<ProposalLanguageContextValueType> =
  createContext(defaultContext);
