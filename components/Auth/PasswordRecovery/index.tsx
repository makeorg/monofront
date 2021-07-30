import React from 'react';
import i18n from 'i18next';
import { SecondLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { SmallSeparatorWithMarginStyle } from '@make.org/ui/elements/SeparatorsElements';
import { useAppContext } from '@make.org/store';
import { selectPasswordRecovery } from '@make.org/store/selectors/user.selector';
import { PasswordRecoveryForm } from './Form';
import { PasswordRecoveryStyle, PasswordRecoveryTitleStyle } from './style';

export const PasswordRecoverySuccess: React.FC = () => (
  <>
    <SecondLevelTitleStyle id="password_recovery_title">
      {i18n.t('reset_password.success.title')}
    </SecondLevelTitleStyle>
  </>
);

/**
 * Renders Password Recovery component
 */
export const PasswordRecovery: React.FC = () => {
  const { state } = useAppContext();
  const { updated } = selectPasswordRecovery(state);
  return (
    <PasswordRecoveryStyle aria-labelledby="password_recovery_title">
      {updated ? (
        <PasswordRecoverySuccess />
      ) : (
        <>
          <SecondLevelTitleStyle id="password_recovery_title">
            {i18n.t('reset_password.title')}
          </SecondLevelTitleStyle>
          <SmallSeparatorWithMarginStyle />
          <>
            <PasswordRecoveryTitleStyle as="h3">
              {i18n.t('reset_password.info')}
            </PasswordRecoveryTitleStyle>
            <PasswordRecoveryForm />
          </>
        </>
      )}
    </PasswordRecoveryStyle>
  );
};
