import React, { FC } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { ROUTE_ACCOUNT_ACTIVATION } from '@make.org/utils/routes';
import { useAppContext } from '@make.org/store';
import { getHomeLink, getParticipateLink } from '@make.org/utils/helpers/url';

const AccountActivationPage: FC = () => {
  const { country } = useParams<{ country: string }>();
  const { state } = useAppContext();
  const question = selectCurrentQuestion(state);

  const redirectPath = !question
    ? getHomeLink(country)
    : getParticipateLink(country, question.slug);

  return <Redirect path={ROUTE_ACCOUNT_ACTIVATION} to={redirectPath} />;
};

// default export needed for loadable component
export default AccountActivationPage; // eslint-disable-line import/no-default-export
