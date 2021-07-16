import React, { SyntheticEvent } from 'react';
import { i18n } from '@make.org/utils/i18n';
import {
  UnstyledButtonStyle,
  HidePasswordIconStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { SvgEye, SvgEyeSlash } from '@make.org/ui/Svg/elements';

type Props = {
  /** Boolean toggled when password shown / hidden */
  isPasswordDisplayed: boolean;
  /** Method called to show / encrypt password */
  toggleIsPasswordDisplayed: (event: SyntheticEvent<HTMLButtonElement>) => void;
};

export const PasswordButton: React.FC<Props> = props => {
  const { isPasswordDisplayed, toggleIsPasswordDisplayed } = props;

  return (
    <UnstyledButtonStyle
      type="button"
      as={isPasswordDisplayed ? HidePasswordIconStyle : UnstyledButtonStyle}
      onClick={toggleIsPasswordDisplayed}
      aria-label={
        isPasswordDisplayed
          ? i18n.t('common.form.hide_password')
          : i18n.t('common.form.show_password')
      }
    >
      {isPasswordDisplayed ? (
        <SvgEyeSlash aria-hidden focusable="false" />
      ) : (
        <SvgEye aria-hidden focusable="false" />
      )}
    </UnstyledButtonStyle>
  );
};
