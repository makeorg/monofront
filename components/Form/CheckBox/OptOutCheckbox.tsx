import React, { useState } from 'react';
import { SvgCheck } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import {
  HiddenCheckbox,
  StyledCheckbox,
  CheckboxWrapper,
  CheckboxLabelCenterStyle,
} from '@make.org/ui/elements/FormElements';
import { useAppContext } from '@make.org/store';

type Props = {
  /** Method called on change legal field */
  //   handleLegalField: (fieldName: string, value: boolean) => void;
  /** Is input required or optional */
  required?: boolean;
};
export const OptOutCheckBox: React.FC<Props> = ({
  //   handleLegalField,
  required = false,
}) => {
  const { state } = useAppContext();
  const [checked, setIsChecked] = useState<boolean>(false);
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  const handleChange = () => {
    // handleLegalField('approvePrivacyPolicy', !checked);
    setIsChecked(!checked);
  };

  return (
    <CheckboxWrapper>
      <CheckboxLabelCenterStyle noFontSizeChange={false} isWidget={isWidget}>
        <HiddenCheckbox
          required={required}
          checked={checked}
          onChange={handleChange}
          id="optoutCheckbox"
        />
        <StyledCheckbox isChecked={checked}>
          <SvgCheck />
        </StyledCheckbox>
        <span>{i18n.t('legal_consent.opt_out')}</span>
      </CheckboxLabelCenterStyle>
    </CheckboxWrapper>
  );
};
