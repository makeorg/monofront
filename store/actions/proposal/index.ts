import { Logger } from '@make.org/utils/services/Logger';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { Dispatch, ReducerAction } from '@make.org/types';
import * as actionTypes from '../../actionTypes';

export const proposeSuccess = (): ReducerAction => ({ type: actionTypes.PROPOSE_SUCCESS });

export const fetchProposalData = (proposalId: string): void => (dispatch: Dispatch) => ProposalService.getProposal(proposalId)
  .then((proposal) => {
    dispatch({ type: actionTypes.PROPOSAL_LOAD, payload: proposal });
    // Important ! Do not remove: use by the parent to use proposal.question.questionId
    return proposal;
  })
  .catch((error) => {
    Logger.logError(Error(error));
  });
