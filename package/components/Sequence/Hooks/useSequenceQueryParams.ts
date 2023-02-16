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
    introCardParam:
      params.has('introCard') &&
      params.get('introCard')?.toLowerCase() !== 'false',
    pushProposalParam: !(
      params.has('pushProposal') &&
      params.get('pushProposal')?.toLowerCase() === 'false'
    ),
  };
};
