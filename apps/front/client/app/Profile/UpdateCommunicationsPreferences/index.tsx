/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect } from 'react';
import i18n from 'i18next';
import { FORM, USER, LocaleType } from '@make.org/types/enums';
import {
  ErrorObjectType,
  OrganisationProfileType,
  PersonalityProfileType,
  UserProfileType,
} from '@make.org/types';
import { SubmitButton } from '@make.org/components/Form/SubmitButton';
import {
  SubmitSaveIcon,
  MapMarkerIcon,
  SelectLanguageFieldIcon,
} from '@make.org/utils/constants/icons';
import { CheckBox } from '@make.org/components/Form/CheckBox';
import { UserService } from '@make.org/utils/services/User';
import { OrganisationService } from '@make.org/utils/services/Organisation';
import { TileWithTitle } from '@make.org/ui/components/TileWithTitle';
import { FormErrors } from '@make.org/components/Form/Errors';
import { FormSuccessMessage } from '@make.org/components/Form/Success';
import { getUser } from '@make.org/store/actions/authentication';
import { PersonalityService } from '@make.org/utils/services/Personality';
import { useAppContext } from '@make.org/store';
import { FormLeftAlignStyle } from '@make.org/ui/elements/FormElements';
import { SelectWithIcon } from '@make.org/components/Form/SelectWithIcon';
import {
  getCountriesTransMap,
  getLanguagesTransMap,
} from '@make.org/front/client/helpers/translationsMap';
import { getCountriesAndLanguages } from '@make.org/front/client/helpers/LanguagesAndCountries';
import { FormParagraphStyle } from '../Styled/Forms';

type Props = {
  /** User id */
  userId: string;
  /** User type */
  userType: string;
  /** User Profile */
  profile: UserProfileType & OrganisationProfileType & PersonalityProfileType;
};

export const UpdateCommunicationPreferences: FC<Props> = ({
  userId,
  userType,
  profile,
}) => {
  const { dispatch, state } = useAppContext();
  const [optInNewsletter, setOptInNewsletter] = useState<boolean>(
    profile.optInNewsletter
  );
  const {
    availableTranslations,
    countriesWithConsultations,
    language,
    country,
  } = state.appConfig;
  const { crmLanguage, crmCountry } = profile;
  const [crmNewLanguage, setNewCrmLanguage] = useState(crmLanguage);
  const [crmNewCountry, setNewCrmCountry] = useState(crmCountry);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorObjectType[]>([]);
  const [countriesTransMap, setCountriesTransMap] = useState(
    getCountriesTransMap()
  );
  const [languagesTransMap, setLanguagesTransMap] = useState(
    getLanguagesTransMap()
  );

  useEffect(() => {
    setCountriesTransMap(getCountriesTransMap());
  }, [country, language]);

  useEffect(() => {
    setLanguagesTransMap(getLanguagesTransMap());
  }, [language]);

  // helper to retreive available countries and languages
  const { countries, languages } = getCountriesAndLanguages(
    countriesWithConsultations,
    countriesTransMap,
    languagesTransMap,
    language,
    availableTranslations
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === 'country') {
      setNewCrmCountry(value);
    }
    if (name === 'language') {
      setNewCrmLanguage(value as keyof typeof LocaleType);
    }
    setCanSubmit(true);
  };

  const handleCheck = (event: React.SyntheticEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setOptInNewsletter(!optInNewsletter);

    setCanSubmit(true);
    setIsSubmitSuccessful(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    const success = () => {
      setIsSubmitSuccessful(true);
      setCanSubmit(false);
      getUser(dispatch, state.modal.isOpen);
    };

    const handleErrors = (serviceErrors: ErrorObjectType[]) => {
      setErrors(serviceErrors);
      setIsSubmitSuccessful(false);
    };

    const newProfile = {
      ...profile,
      crmCountry: crmNewCountry,
      crmLanguage: crmNewLanguage,
      optInNewsletter,
    };
    switch (userType) {
      case USER.TYPE_ORGANISATION:
        await OrganisationService.update(
          userId,
          newProfile,
          () => success(),
          serviceErrors => handleErrors(serviceErrors)
        );
        break;
      case USER.TYPE_PERSONALITY:
        await PersonalityService.update(
          userId,
          newProfile,
          () => success(),
          serviceErrors => handleErrors(serviceErrors)
        );
        break;
      default:
        await UserService.update(
          userId,
          {
            ...profile,
            crmCountry: crmNewCountry,
            crmLanguage: crmNewLanguage,
            optInNewsletter,
            legalAdvisorApproval: true,
            legalMinorConsent: true,
          },
          () => success(),
          serviceErrors => handleErrors(serviceErrors)
        );
        break;
    }
  };

  return (
    <TileWithTitle title={i18n.t('profile.communication_preferences.title')}>
      <FormLeftAlignStyle
        id={FORM.COMMUNICATION_UPDATE_FORMNANE}
        onSubmit={handleSubmit}
      >
        <FormParagraphStyle>
          {i18n.t('profile.communication_preferences.description')}
        </FormParagraphStyle>
        <SelectWithIcon
          name="country"
          icon={MapMarkerIcon}
          defaultValue={crmCountry}
          data={countries}
          handleChange={handleChange}
        />
        <SelectWithIcon
          name="language"
          icon={SelectLanguageFieldIcon}
          defaultValue={crmNewLanguage}
          data={languages}
          handleChange={handleChange}
        />
        <FormErrors errors={errors} />
        <CheckBox
          name="optInNewsletter"
          value="newsletter"
          handleCheck={handleCheck}
          label={i18n.t('profile.communication_preferences.optin_label')}
          isChecked={optInNewsletter}
        />
        <SubmitButton
          disabled={!canSubmit}
          formName={FORM.COMMUNICATION_UPDATE_FORMNANE}
          icon={SubmitSaveIcon}
          label={i18n.t('profile.common.submit_label')}
        />
        {isSubmitSuccessful && <FormSuccessMessage />}
      </FormLeftAlignStyle>
    </TileWithTitle>
  );
};
