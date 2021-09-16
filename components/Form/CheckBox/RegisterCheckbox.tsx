import React, { useState } from 'react';
import { SvgCheck } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import { getDataPageLink } from '@make.org/utils/helpers/url';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  HiddenCheckbox,
  StyledCheckbox,
  CheckboxWrapper,
  CheckboxLabelStyle,
  NewWindowIconStyle,
  DataPolicyNewWindowLinkStyle,
} from '@make.org/ui/elements/FormElements';
import { useAppContext } from '@make.org/store';

type Props = {
  /** Method called on change legal field */
  handleLegalField: (fieldName: string, value: boolean) => void;
  /** Is input required or optional */
  required?: boolean;
};
export const RegisterCheckBox: React.FC<Props> = ({
  handleLegalField,
  required = false,
}) => {
  const { state } = useAppContext();
  const [checked, setIsChecked] = useState<boolean>(false);
  const { country, language, source } = state.appConfig;
  const isWidget = source === 'widget';

  const handleChange = () => {
    handleLegalField('approvePrivacyPolicy', !checked);
    setIsChecked(!checked);
  };

  return (
    <CheckboxWrapper>
      <CheckboxLabelStyle noFontSizeChange={false} isWidget={isWidget}>
        <HiddenCheckbox
          required={required}
          checked={checked}
          onChange={handleChange}
          id="registerCheckbox"
        />
        <StyledCheckbox checked={checked}>
          <SvgCheck />
        </StyledCheckbox>
        <span>
          {i18n.t('legal_consent.privacy_policy_first_part')}
          <DataPolicyNewWindowLinkStyle
            href={getDataPageLink(country, language)}
            target="_blank"
            rel="noopener"
            isWidget={isWidget}
          >
            {i18n.t('legal_consent.privacy_policy_link')}
            <NewWindowIconStyle
              className="grey"
              aria-hidden
              focusable="false"
            />
            <ScreenReaderItemStyle>
              {i18n.t('common.open_new_window')}
            </ScreenReaderItemStyle>
          </DataPolicyNewWindowLinkStyle>
          {i18n.t('legal_consent.privacy_policy_last_part')}
        </span>
      </CheckboxLabelStyle>
    </CheckboxWrapper>
  );
};
