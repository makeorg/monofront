import React, { FC, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useAppContext } from '@make.org/store';
import { QuestionService } from '@make.org/utils/services/Question';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import { loadQuestion } from '@make.org/store/actions/questions';
import { setCurrentQuestionSlug } from '@make.org/store/actions/currentQuestion';
import { resetAuthRedirectInfo } from '@make.org/store/actions/authRedirectInfo';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { getGTUPageLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import {
  loginSocialSuccess,
  loginSocialFailure,
  getUser,
} from '@make.org/store/actions/authentication';
import { UserService } from '@make.org/utils/services/User';

import { TermsCheckBox } from './TermsCheckBox';
import {
  AuthSucceededCardContainerStyle,
  AuthSucceededCardContentStyle,
  AuthSucceededCardTitleStyle,
  AuthSucceededCardTextStyle,
  AuthSucceededCardButtonStyle,
  AuthSucceededCardLinkStyle,
} from './style';

export const AuthSucceededCard: FC = () => {
  useState<boolean>(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const { state } = useAppContext();
  const { authRedirectInfo } = state;
  const { country, language } = state.appConfig;
  const question = authRedirectInfo || selectCurrentQuestion(state);
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const code = searchParams.get('code');

  const { dispatch } = useAppContext();

  const updateQuestion = async () => {
    const questionDetails = await QuestionService.getDetail(
      question?.questionId,
      DEFAULT_LANGUAGE,
      undefined,
      undefined
    );

    if (questionDetails) {
      dispatch(loadQuestion(questionDetails));
      dispatch(setCurrentQuestionSlug(questionDetails.slug));
      dispatch(resetAuthRedirectInfo());
    }
  };

  const useLoginSuccess = () => async () => {
    dispatch(loginSocialSuccess());
    await getUser(dispatch);
    await updateQuestion();
    history.push('/');
  };

  const useLoginFailure = () => () => {
    dispatch(loginSocialFailure());
    history.push({
      pathname: '/',
      search: '?error=login_social',
    });
  };

  const loginSuccess = useLoginSuccess();
  const loginFailure = useLoginFailure();

  const handleClickParticipate = async () => {
    await UserService.loginSocial(
      'oidc',
      code!,
      true,
      false,
      loginSuccess,
      loginFailure,
      () => null,
      question?.questionId,
      `${window.location.origin}/oidc`
    );
  };

  return (
    <AuthSucceededCardContainerStyle>
      <AuthSucceededCardContentStyle>
        <AuthSucceededCardTitleStyle>
          {i18n.t('common.social_login.identification_success')}
        </AuthSucceededCardTitleStyle>
        <AuthSucceededCardTextStyle>
          {i18n.t('common.social_login.cgu_accept')}{' '}
          <AuthSucceededCardLinkStyle
            href={`https://make.org${getGTUPageLink(country, language)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {i18n.t('register.gtu_link')}
          </AuthSucceededCardLinkStyle>
        </AuthSucceededCardTextStyle>

        <TermsCheckBox
          handleCheckbox={() => setIsTermsAccepted(!isTermsAccepted)}
        />

        <AuthSucceededCardButtonStyle
          type="button"
          disabled={!isTermsAccepted}
          onClick={() => {
            handleClickParticipate();
          }}
        >
          {i18n.t('login.participate')}
        </AuthSucceededCardButtonStyle>
      </AuthSucceededCardContentStyle>
    </AuthSucceededCardContainerStyle>
  );
};
