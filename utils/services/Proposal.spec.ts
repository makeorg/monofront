// @flow

import { ProposalApiService } from 'Shared/api/ProposalApiService';
import { ProposalService } from 'Shared/services/Proposal';

jest.mock('Shared/api/ProposalApiService');
jest.mock('Shared/services/Question');
jest.mock('Shared/services/Logger');

describe('Proposal Service', () => {
  afterEach(() => {
    ProposalApiService.propose.mockRestore();
  });

  it('deprecatedPropose add bait text and call ProposalApiService', async () => {
    jest.spyOn(ProposalApiService, 'propose');
    ProposalApiService.propose.mockResolvedValue({});
    await ProposalService.deprecatedPropose('foo', 'fooQuestionId');

    expect(ProposalApiService.propose).toHaveBeenNthCalledWith(
      1,
      'proposal_submit.form.baitfoo',
      'fooQuestionId'
    );
  });

  it('propose call ProposalApiService', async () => {
    jest.spyOn(ProposalApiService, 'propose');
    ProposalApiService.propose.mockResolvedValue({});
    await ProposalService.propose('foo', 'fooQuestionId');

    expect(ProposalApiService.propose).toHaveBeenNthCalledWith(
      1,
      'foo',
      'fooQuestionId'
    );
  });
});
