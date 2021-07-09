// @flow

import { ProposalApiService } from '@make.org/api/ProposalApiService';
import { ProposalService } from '@make.org/utils/services/Proposal';

jest.mock('@make.org/api/ProposalApiService');
jest.mock('@make.org/utils/services/Question');
jest.mock('@make.org/utils/services/Logger');

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
