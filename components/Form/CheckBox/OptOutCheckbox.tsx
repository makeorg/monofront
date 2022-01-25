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
  handleCheckbox: (fieldName: string, value: boolean) => void;
  /** Is input required or optional */
  required?: boolean;
};
export const OptOutCheckBox: React.FC<Props> = ({
  handleCheckbox,
  required = false,
}) => {
  const { state } = useAppContext();
  // to remember : optInNewsletter has been swapped for an optOut boolean (might be changed later)
  const [checked, setIsChecked] = useState<boolean>(true);
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  const handleChange = () => {
    handleCheckbox('optInNewsletter', !checked);
    setIsChecked(!checked);
  };

  return (
    <CheckboxWrapper>
      <CheckboxLabelCenterStyle noFontSizeChange={false} isWidget={isWidget}>
        <HiddenCheckbox
          required={required}
          checked={checked}
          onChange={handleChange}
          id="optInNewsletter"
        />
        <StyledCheckbox isChecked={!checked}>
          <SvgCheck />
        </StyledCheckbox>
        <span>{i18n.t('legal_consent.opt_out')}</span>
      </CheckboxLabelCenterStyle>
    </CheckboxWrapper>
  );
};
