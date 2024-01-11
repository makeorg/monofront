import React, { FC } from 'react';
import i18n from 'i18next';
import { useHistory } from 'react-router';
import {
  NotFoundBackButtonStyle,
  NotFoundContainerStyle,
  NotFoundTextStyle,
  NotFoundTitleStyle,
} from './style';

const NotFoundPage: FC = () => {
  const history = useHistory();
  // @todo check compatibility issues, router V5 doesn't work properly with react 18 and might cause some redirection problems
  return (
    <NotFoundContainerStyle>
      <NotFoundTitleStyle>{i18n.t('error.not_found')}</NotFoundTitleStyle>
      <NotFoundTextStyle>{i18n.t('error.no_page')}</NotFoundTextStyle>
      <NotFoundBackButtonStyle type="button" onClick={() => history.goBack()}>
        {i18n.t('error.back')}
      </NotFoundBackButtonStyle>
    </NotFoundContainerStyle>
  );
};

// default export needed for loadable component
export default NotFoundPage; // eslint-disable-line import/no-default-export
