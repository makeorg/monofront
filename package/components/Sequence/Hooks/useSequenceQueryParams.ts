import { useLocation } from 'react-router';

export const useSequenceQueryParams = (): {
  firstProposalParam: string | null;
  introCardParam: boolean | null;
  pushProposalParam: boolean | null;
} => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const toBoolean = (paramValue: string | null) => {
    if (paramValue?.toLowerCase() === 'true') {
      return true;
    }
    if (paramValue?.toLowerCase() === 'false') {
      return false;
    }

    return null;
  };

  return {
    firstProposalParam: params.get('firstProposal'),
    introCardParam: toBoolean(params.get('introCard')),
    pushProposalParam: toBoolean(params.get('pushProposal')),
  };
};
