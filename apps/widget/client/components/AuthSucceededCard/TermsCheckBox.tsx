import React, { useState } from 'react';
import { SvgCheck } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import {
  HiddenCheckbox,
  StyledCheckbox,
  CheckboxWrapper,
  CheckboxLabelStyle,
} from '@make.org/ui/elements/FormElements';
import { getDataPageLink } from '@make.org/utils/helpers/url';
import { useAppContext } from '@make.org/store';

type Props = {
  /** Method called on change legal field */
  handleCheckbox: (fieldName: string, value: boolean) => void;
};
export const TermsCheckBox: React.FC<Props> = ({ handleCheckbox }) => {
  const { state } = useAppContext();
  const [checked, setIsChecked] = useState<boolean>(false);
  const { source, country, language } = state.appConfig;
  const isWidget = source === 'widget';

  const handleChange = () => {
    handleCheckbox('termsCheckbox', !checked);
    setIsChecked(!checked);
  };

  return (
    <CheckboxWrapper style={{ width: 'fit-content' }}>
      <CheckboxLabelStyle noFontSizeChange={false} isWidget={isWidget}>
        <HiddenCheckbox
          required
          checked={checked}
          onChange={handleChange}
          id="termsCheckbox"
        />
        <StyledCheckbox isChecked={checked}>
          <SvgCheck />
        </StyledCheckbox>
        <div>
          <span>{i18n.t('common.social_login.charte')}</span>{' '}
          <a
            style={{ color: 'red' }}
            href={`https://make.org${getDataPageLink(country, language)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {i18n.t('common.social_login.charte_link')}
          </a>
        </div>
      </CheckboxLabelStyle>
    </CheckboxWrapper>
  );
};
