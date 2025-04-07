import React, { FC, useState } from 'react';
import { useAppContext } from '@make.org/store';
import { QuestionService } from '@make.org/utils/services/Question';
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
import { updateTrackingQuestionParam } from '@make.org/utils/helpers/question';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { transformExtraSlidesConfigFromQuery } from '@make.org/widget/server/helpers/query.helper';
import {
  AuthSucceededCardContainerStyle,
  AuthSucceededCardContentStyle,
  AuthSucceededCardTitleStyle,
  AuthSucceededCardTextStyle,
  AuthSucceededCardButtonStyle,
  AuthSucceededCardLinkStyle,
} from './style';
import { TermsCheckBox } from './TermsCheckBox';

interface AuthSucceededCardProps {
  code: string;
  onSuccess: () => void;
  onFailure: () => void;
}

export const AuthSucceededCard: FC<AuthSucceededCardProps> = ({
  code,
  onSuccess,
  onFailure,
}) => {
  useState<boolean>(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { state } = useAppContext();
  const { authRedirectInfo } = state;
  const { country, language } = state.appConfig;
  const question = authRedirectInfo || selectCurrentQuestion(state);

  const { dispatch } = useAppContext();

  const updateQuestion = async () => {
    const questionDetails = await QuestionService.getDetail(
      question?.questionId,
      language,
      undefined,
      undefined
    );

    if (questionDetails) {
      const { sequenceConfig } = questionDetails;
      const questionModified = {
        ...questionDetails,
        sequenceConfig: transformExtraSlidesConfigFromQuery(
          sequenceConfig,
          true,
          false
        ),
      };
      updateTrackingQuestionParam(questionDetails);
      dispatch(loadQuestion(questionModified));
      dispatch(setCurrentQuestionSlug(questionModified.slug));
      dispatch(resetAuthRedirectInfo());
    }
  };

  const useLoginSuccess = () => async () => {
    await getUser(dispatch);
    await updateQuestion();
    dispatch(loginSocialSuccess());
    onSuccess();
  };

  const useLoginFailure = () => () => {
    setIsLoading(false);
    dispatch(loginSocialFailure());
    onFailure();
  };

  const loginSuccess = useLoginSuccess();
  const loginFailure = useLoginFailure();

  const handleClickParticipate = async () => {
    setIsLoading(true);
    await UserService.loginSocial(
      'oidc',
      code!,
      true,
      false,
      loginSuccess,
      loginFailure,
      () => {
        setIsLoading(false);
      },
      question?.questionId,
      `${window.location.origin}/oidc`
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

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
