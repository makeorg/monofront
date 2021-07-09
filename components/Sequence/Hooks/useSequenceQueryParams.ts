import { useLocation } from 'react-router';

export const useSequenceQueryParams = (): {
  firstProposal: string,
  introCardParam: string,
  pushProposalParam: string
} => {
  const { search } = useLocation;
  const params = new URLSearchParams(search);
  const firstProposal = params.get('firstProposal');
  const introCardParam = params.get('introCard')?.toLowerCase() !== 'false';
  const pushProposalParam = params.get('pushProposal')?.toLowerCase() !== 'false';

  return { firstProposal, introCardParam, pushProposalParam };
};
