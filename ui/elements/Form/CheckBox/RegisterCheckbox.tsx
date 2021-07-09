import React, { useState } from 'react';
import { i18n } from '@make.org/utils/i18n';
import { getDataPageLink } from '@make.org/utils/helpers/url';
import { ScreenReaderItemStyle } from '../../AccessibilityElements';
import { SvgCheck } from '../../../Svg/elements';
import {
  HiddenCheckbox,
  StyledCheckbox,
  CheckboxWrapper,
  CheckboxLabelStyle,
  NewWindowIconStyle,
  DataPolicyNewWindowLinkStyle,
} from '../Styled/CheckBox';

type Props = {
  /** Method called on change legal field */
  handleLegalField: (fieldName: string, value: boolean) => void,
  /** Is input required or optional */
  required: boolean,
};
export const RegisterCheckBox: React.FC<Props> = ({
  handleLegalField,
  required = false,
}) => {
  const [checked, setIsChecked] = useState<boolean>(false);
  const { country, language } = useSelector(
    (state: StateRoot) => state.appConfig
  );

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
          <SvgCheck />
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
