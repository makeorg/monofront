import React, { useState } from 'react';
import i18n from 'i18next';
import { getDataPageLink } from '@make.org/utils/helpers/url';
import {
  HiddenCheckbox,
  StyledCheckbox,
  CheckboxWrapper,
  CheckboxLabelStyle,
  NewWindowIconStyle,
  DataPolicyNewWindowLinkStyle,
} from '@make.org/ui/elements/FormElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { SvgCheck } from '@make.org/ui/Svg/elements';
import { useAppContext } from '@make.org/store';

type Props = {
  /** Method called on change legal field */
  handleLegalField: (fieldName: string, value: boolean) => void;
  /** Is input required or optional */
  required: boolean;
};
export const RegisterCheckBox: React.FC<Props> = ({
  handleLegalField,
  required = false,
}) => {
  const { state } = useAppContext();
  const [checked, setIsChecked] = useState<boolean>(false);
  const { country, language } = state.appConfig;

  const handleChange = () => {
    handleLegalField('approvePrivacyPolicy', !checked);
    setIsChecked(!checked);
  };

  return (
    <CheckboxWrapper>
      <CheckboxLabelStyle noFontSizeChange>
        <HiddenCheckbox
          required={required}
          checked={checked}
          onChange={handleChange}
        />
        <StyledCheckbox checked={checked}>
          <SvgCheck aria-hidden focusable="false" />
        </StyledCheckbox>
        <span>
          {i18n.t('legal_consent.privacy_policy_text')}
          <DataPolicyNewWindowLinkStyle
            href={getDataPageLink(country, language)}
            target="_blank"
            rel="noopener"
          >
            {i18n.t('legal_consent.privacy_policy')}
            <NewWindowIconStyle />
            <ScreenReaderItemStyle>
              {i18n.t('common.open_new_window')}
            </ScreenReaderItemStyle>
          </DataPolicyNewWindowLinkStyle>
          {i18n.t('legal_consent.privacy_make')}
        </span>
      </CheckboxLabelStyle>
    </CheckboxWrapper>
  );
};