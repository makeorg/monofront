import React, { useState, useEffect, FormEvent, SyntheticEvent } from 'react';
import i18n from 'i18next';
import {
  SecondLevelTitleStyle,
  FourthLevelTitleStyle,
} from '@make.org/ui/elements/TitleElements';
import { CheckBox } from '@make.org/components/Form/CheckBox';
import { trackDisplayLegalConsent } from '@make.org/utils/services/Tracking';
import { FORM } from '@make.org/types/enums';
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
  needLegalConsent: boolean;
  handleLegalField: (fieldName: string, value: boolean) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  toggleLegalConsent: (event: SyntheticEvent<HTMLButtonElement>) => void;
};

export const LegalConsent: React.FC<Props> = ({
  needLegalConsent,
  handleLegalField,
  handleSubmit,
  toggleLegalConsent,
}) => {
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
      id={FORM.LEGAL_CONSENT_FORMNAME}
      name={FORM.LEGAL_CONSENT_FORMNAME}
      onSubmit={handleSubmit}
      className={!needLegalConsent ? 'hidden' : ''}
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
          value={JSON.stringify(minorConsent)}
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
          value={JSON.stringify(parentalConsent)}
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
          form={FORM.LEGAL_CONSENT_FORMNAME}
          disabled={!agreedAllConsents}
        >
          {i18n.t('legal_consent.submit')}
        </LegalSubmitStyle>
      </LegalButtonGroupStyle>
    </LegalFormStyle>
  );
};
