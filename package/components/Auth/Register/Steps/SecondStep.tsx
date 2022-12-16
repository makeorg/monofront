import React, { ChangeEvent } from 'react';
import { useAppContext } from '@make.org/store';
import i18n from 'i18next';
import { ErrorObjectType, RegisterFormDataType } from '@make.org/types';
import { FORM } from '@make.org/types/enums';
import { SubmitButtonBottom } from '@make.org/ui/components/SubmitButton/submitButtonBottom';
import { getGTUPageLink } from '@make.org/utils/helpers/url';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { ConditionParagraphMarginStylePanel } from '@make.org/ui/elements/ParagraphElements';
import { OptInCheckBox } from '@make.org/components/Form/CheckBox/OptInCheckbox';
import { RegisterCheckBox } from '@make.org/components/Form/CheckBox/RegisterCheckbox';
import { isSupportedCountry } from '@make.org/utils/validator/postCode';
import { ExtraInRegisterformationsFields } from '../../CommonFields/ExtraRegisterInformations';

import {
  NewWindowIconStyle,
  TermsOfUseLinkGreyStyle,
  PostCodeWrapperStyle,
} from '../../style';

type Props = {
  user: RegisterFormDataType;
  firstnameError: ErrorObjectType;
  ageError: ErrorObjectType;
  postalcodeError: ErrorObjectType;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCheckbox: (fieldName: string, value: boolean) => void;
  disableSubmit: boolean;
};

export const SecondStepRegister: React.FC<Props> = ({
  user,
  firstnameError,
  ageError,
  postalcodeError,
  handleChange,
  handleCheckbox,
  disableSubmit,
}) => {
  const { state } = useAppContext();

  const { country, language, source } = state.appConfig;
  const isWidget = source === 'widget';
  return (
    <>
      <ExtraInRegisterformationsFields
        firstnameValue={user.profile.firstname}
        ageValue={user.profile.age}
        postalcodeValue={user.profile.postalcode}
        firstnameError={firstnameError}
        ageError={ageError}
        postalcodeError={postalcodeError}
        handleChange={handleChange}
      />
      {isSupportedCountry(country) && (
        <PostCodeWrapperStyle>
          {i18n.t('common.form.post_code')}
        </PostCodeWrapperStyle>
      )}
      <ConditionParagraphMarginStylePanel>
        {i18n.t('register.gtu_text_first')}
        <TermsOfUseLinkGreyStyle
          href={
            isWidget
              ? `https://make.org${getGTUPageLink(country, language)}`
              : getGTUPageLink(country, language)
          }
          target="_blank"
          rel="noopener"
        >
          {i18n.t('register.gtu_link')}
          <NewWindowIconStyle className="grey" aria-hidden focusable="false" />
          <ScreenReaderItemStyle>
            {i18n.t('common.open_new_window')}{' '}
          </ScreenReaderItemStyle>
        </TermsOfUseLinkGreyStyle>
      </ConditionParagraphMarginStylePanel>
      <RegisterCheckBox handleCheckbox={handleCheckbox} required />
      <OptInCheckBox handleCheckbox={handleCheckbox} />
      <SubmitButtonBottom
        formName={FORM.REGISTER_PANEL_FORMNAME}
        id="authentication-register-submit"
        label={i18n.t('common.register_label')}
        disabled={disableSubmit}
      />
    </>
  );
};
