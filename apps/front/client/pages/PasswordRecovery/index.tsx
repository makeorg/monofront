import * as React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import 'url-search-params-polyfill';
import { QuestionType } from '@make.org/types';
import { PasswordRecovery } from '@make.org/components/Auth/PasswordRecovery';
import {
  PasswordRecoveryWrapperStyle,
  PasswordRecoveryContentStyle,
} from '@make.org/components/Auth/PasswordRecovery/style';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { selectPasswordRecovery } from '@make.org/store/selectors/user.selector';
import { ROUTE_PASSWORD_RECOVERY } from '@make.org/utils/routes';
import { getHomeLink, getParticipateLink } from '@make.org/utils/helpers/url';
import { useAppContext } from '@make.org/store';
import i18n from 'i18next';
import { MetaTags } from '@make.org/components/MetaTags';

const PasswordRecoveryPage: React.FC = () => {
  const { country } = useParams<{ country: string }>();
  const { state } = useAppContext();
  const passwordRecovery = selectPasswordRecovery(state);
  const question: QuestionType = selectCurrentQuestion(state);
  const { validToken } = passwordRecovery;

  if (!validToken) {
    const redirectPath = !question
      ? getHomeLink(country)
      : getParticipateLink(country, question.slug);

    return <Redirect path={ROUTE_PASSWORD_RECOVERY} to={redirectPath} />;
  }

  return (
    <>
      <MetaTags title={i18n.t('meta.password-recovery.title')} />
      <PasswordRecoveryWrapperStyle>
        <PasswordRecoveryContentStyle>
          <PasswordRecovery />
        </PasswordRecoveryContentStyle>
      </PasswordRecoveryWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default PasswordRecoveryPage; // eslint-disable-line import/no-default-export
