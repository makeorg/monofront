// @flow
import React, { useState, useEffect } from 'react';
import { LEGAL_CONSENT_FORMNAME } from 'Shared/constants/form';
import { i18n } from 'Shared/i18n';
import {
  SecondLevelTitleStyle,
  FourthLevelTitleStyle,
} from 'Client/ui/Elements/TitleElements';
import { CheckBox } from 'Client/ui/Elements/Form/CheckBox';
import { trackDisplayLegalConsent } from 'Shared/services/Tracking';
import {
  LegalFormStyle,
  LegalIconStyle,
  LegalSeparatorStyle,
  LegalCheckboxWrapperStyle,
  LegalParagraphStyle,
  LegalButtonGroupStyle,
  LegalCancelStyle,
  LegalSubmitStyle,
} from '../style';

type Props = {
  needLegalConsent: boolean,
  handleLegalField: (fieldName: string, value: boolean) => any,
  handleSubmit: (event: SyntheticInputEvent<HTMLInputElement>) => any,
  toggleLegalConsent: (event: SyntheticInputEvent<any>) => void,
};

export const LegalConsent = ({
  needLegalConsent,
  handleLegalField,
  handleSubmit,
  toggleLegalConsent,
}: Props) => {
  const [minorConsent, setMinorConsent] = useState<boolean>(false);
  const [parentalConsent, setParentalConsent] = useState<boolean>(false);
  const agreedAllConsents = minorConsent && parentalConsent;

  useEffect(() => {
    if (needLegalConsent) {
      trackDisplayLegalConsent();
    }
  }, [needLegalConsent]);

  return (
    <LegalFormStyle
      id={LEGAL_CONSENT_FORMNAME}
      name={LEGAL_CONSENT_FORMNAME}
      onSubmit={handleSubmit}
      className={!needLegalConsent && 'hidden'}
    >
      <SecondLevelTitleStyle id="legal_consent_title">
        {i18n.t('legal_consent.title')}
      </SecondLevelTitleStyle>
      <LegalIconStyle aria-hidden focusable="false" />
      <FourthLevelTitleStyle as="h3">
        {i18n.t('legal_consent.subtitle')}
      </FourthLevelTitleStyle>
      <LegalParagraphStyle>
        {i18n.t('legal_consent.description')}
      </LegalParagraphStyle>
      <LegalSeparatorStyle />
      <LegalCheckboxWrapperStyle>
        <CheckBox
          name="legalMinorConsent"
          value={minorConsent}
          handleCheck={() => setMinorConsent(!minorConsent)}
          handleChange={() =>
            handleLegalField('legalMinorConsent', minorConsent)
          }
          label={i18n.t('legal_consent.minor_consent')}
          isChecked={minorConsent}
          required
        />
      </LegalCheckboxWrapperStyle>
      <LegalCheckboxWrapperStyle>
        <CheckBox
          name="profile.legalAdvisorApproval"
          value={parentalConsent}
          handleCheck={() => setParentalConsent(!parentalConsent)}
          handleChange={() =>
            handleLegalField('legalAdvisorApproval', parentalConsent)
          }
          label={i18n.t('legal_consent.parental_consent')}
          isChecked={parentalConsent}
          required
        />
      </LegalCheckboxWrapperStyle>
      <LegalButtonGroupStyle>
        <LegalCancelStyle type="button" onClick={toggleLegalConsent}>
          {i18n.t('legal_consent.cancel')}
        </LegalCancelStyle>
        <LegalSubmitStyle
          type="submit"
          form={LEGAL_CONSENT_FORMNAME}
          disabled={!agreedAllConsents}
        >
          {i18n.t('legal_consent.submit')}
        </LegalSubmitStyle>
      </LegalButtonGroupStyle>
    </LegalFormStyle>
  );
};
