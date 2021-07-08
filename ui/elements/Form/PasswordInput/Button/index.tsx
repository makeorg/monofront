import React from 'react';
import { i18n } from '@make.org/utils/i18n';
import { SvgEyeSlash, SvgEye } from '../../../../Svg/elements';
import { UnstyledButtonStyle } from '../../../Buttons/style';
import { HidePasswordIconStyle } from '../../Styled/Icons';

type Props = {
  /** Boolean toggled when password shown / hidden */
  isPasswordDisplayed: boolean,
  /** Method called to show / encrypt password */
  toggleIsPasswordDisplayed: (
    event: SyntheticInputEvent<HTMLInputElement>
  ) => void,
};

export const PasswordButton: React.FC<Props> = (props) => {
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
