import { ProposalService } from '@make.org/utils/services/Proposal';

jest.mock('@make.org/api/ProposalApiService');

describe('getProposal ApiService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('proposal service has been called with right params', async () => {
    jest.spyOn(ProposalService, 'getProposal');

    ProposalService.getProposal('12345', 'fr');
    expect(ProposalService.getProposal).toHaveBeenCalledWith('12345', 'fr');
  });
});
