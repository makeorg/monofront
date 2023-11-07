import { QuestionType } from '@make.org/types/Question';
import { useAppContext } from '@make.org/store';
import { useLocation } from 'react-router';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { parse } from 'query-string';
import { clearProposalPending } from '@make.org/store/actions/pendingProposal';
import { setPanelContent } from '@make.org/store/actions/panel';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';

export const usePanel = (): {
  showPanel: () => void;
} => {
  const { dispatch, state } = useAppContext();
  const currentQuestion: QuestionType = selectCurrentQuestion(state);
  const { isLoggedIn } = selectAuthentication(state);
  const { search } = useLocation();
  const urlQueryParams = parse(search);
  const { displayPanel } = urlQueryParams;

  const showPanel = () => {
    if (displayPanel === 'signin' && !isLoggedIn) {
      dispatch(setPanelContent(PANEL_CONTENT.LOGIN));
    }

    if (displayPanel === 'signup' && !isLoggedIn) {
      dispatch(setPanelContent(PANEL_CONTENT.REGISTER));
    }

    if (
      displayPanel === 'propose' &&
      currentQuestion &&
      currentQuestion.canPropose
    ) {
      dispatch(clearProposalPending());
      dispatch(setPanelContent(PANEL_CONTENT.PROPOSAL_JOURNEY));
    }
  };

  return {
    showPanel,
  };
};
