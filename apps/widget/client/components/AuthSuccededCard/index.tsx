import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAppContext } from '@make.org/store';
import { QuestionService } from '@make.org/utils/services/Question';
import { DEFAULT_LANGUAGE } from '@make.org/utils/constants/config';
import { loadQuestion } from '@make.org/store/actions/questions';
import { setCurrentQuestionSlug } from '@make.org/store/actions/currentQuestion';
import { resetAuthRedirectInfo } from '@make.org/store/actions/authRedirectInfo';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { getGTUPageLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import { CharteCheckBox } from './CharteCheckBox';
import {
  AuthSuccededCardContainerStyle,
  AuthSuccededCardContentStyle,
  AuthSuccededCardTitleStyle,
  AuthSuccededCardTextStyle,
  AuthSuccededCardButtonStyle,
  AuthSuccededCardErrorStyle,
  AuthSuccededCardLinkStyle,
} from './style';

export const AuthSuccededCard: FC = () => {
  const [isParticipateEnable, setIsParticipateEnable] =
    useState<boolean>(false);
  const [charteAccepted, setCharteAccepted] = useState<boolean>(false);
  const { state } = useAppContext();
  const { authRedirectInfo } = state;
  const { country, language } = state.appConfig;
  const question = authRedirectInfo || selectCurrentQuestion(state);
  const history = useHistory();

  const { dispatch } = useAppContext();

  useEffect(() => {
    const updateQuestion = async () => {
      const questionDetails = await QuestionService.getDetail(
        question?.questionId,
        DEFAULT_LANGUAGE,
        () => {
          history.push('/');
        },
        undefined
      );

      if (questionDetails) {
        dispatch(loadQuestion(questionDetails));
        dispatch(setCurrentQuestionSlug(questionDetails.slug));
        dispatch(resetAuthRedirectInfo());
        setIsParticipateEnable(true);
      }
    };

    updateQuestion();
  }, []);

  return (
    <AuthSuccededCardContainerStyle>
      <AuthSuccededCardContentStyle>
        <AuthSuccededCardTitleStyle>
          {i18n.t('common.social_login.identification_success')}
        </AuthSuccededCardTitleStyle>
        <AuthSuccededCardTextStyle>
          {i18n.t('common.social_login.cgu_accept')}{' '}
          <AuthSuccededCardLinkStyle
            href={`https://make.org${getGTUPageLink(country, language)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {i18n.t('register.gtu_link')}
          </AuthSuccededCardLinkStyle>
        </AuthSuccededCardTextStyle>

        <CharteCheckBox
          handleCheckbox={() => setCharteAccepted(!charteAccepted)}
        />

        <AuthSuccededCardButtonStyle
          type="button"
          disabled={!charteAccepted}
          onClick={() => {
            history.push('/');
          }}
        >
          {i18n.t('login.participate')}
        </AuthSuccededCardButtonStyle>
        {!isParticipateEnable && (
          <AuthSuccededCardErrorStyle>
            {i18n.t('common.social_login.error')}
          </AuthSuccededCardErrorStyle>
        )}
      </AuthSuccededCardContentStyle>
    </AuthSuccededCardContainerStyle>
  );
};
