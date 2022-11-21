import { useLocation } from 'react-router';

export const useSequenceQueryParams = (): {
  firstProposalParam: string | null;
  introCardParam: boolean;
  pushProposalParam: boolean;
} => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  return {
    firstProposalParam: params.get('firstProposal'),
    introCardParam: params.get('introCard')?.toLowerCase() !== 'false',
    pushProposalParam: params.get('pushProposal')?.toLowerCase() !== 'false',
  };
};
