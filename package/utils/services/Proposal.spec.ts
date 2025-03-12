import { ProposalApiService } from '@make.org/api/services/ProposalApiService';
import { ProposalService } from '@make.org/utils/services/Proposal';
import * as ErrorHandler from '@make.org/utils/services/DefaultErrorHandler';

jest.mock('@make.org/api/services/ProposalApiService');
jest.mock('@make.org/utils/services/DefaultErrorHandler');

describe('getProposal ApiService', () => {
  it('proposal api service has been called with right params', async () => {
    jest.spyOn(ProposalApiService, 'getProposal');

    await ProposalService.getProposal('12345', '12345', 'fr');
    expect(ProposalApiService.getProposal).toHaveBeenCalledWith(
      '12345',
      '12345',
      'fr'
    );
  });
});

describe('post a proposal report', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('proposal api service has been called with right params', async () => {
    jest.spyOn(ProposalApiService, 'report');

    const questionId = 'fake-question-id';
    const proposalId = 'fake-proposal-id';
    const reason = 'Inintelligible';
    const proposalLanguage = 'fr';
    const success = jest.fn();
    const failure = jest.fn();

    await ProposalService.report(
      questionId,
      proposalId,
      reason,
      proposalLanguage,
      success,
      failure
    );
    expect(ProposalApiService.report).toHaveBeenCalledWith(
      questionId,
      proposalId,
      reason,
      proposalLanguage
    );
    expect(success).toHaveBeenCalled();
    expect(failure).not.toHaveBeenCalled();
  });

  it('handle failure', async () => {
    const spyApiService = jest.spyOn(ProposalApiService, 'report');
    spyApiService.mockRejectedValue(Error('failed call'));
    const spyErrorHandler = jest.spyOn(ErrorHandler, 'defaultUnexpectedError');
    const success = jest.fn();
    const failure = jest.fn();

    await ProposalService.report(
      'fake-question-id',
      'fake-proposal-id',
      'Inintelligible',
      'fr',
      success,
      failure
    );
    expect(spyErrorHandler).toHaveBeenCalledWith(Error('failed call'));
    expect(success).not.toHaveBeenCalled();
    expect(failure).toHaveBeenCalled();
  });
});
