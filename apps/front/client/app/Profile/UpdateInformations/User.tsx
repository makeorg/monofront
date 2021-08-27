import React, { FC, useState } from 'react';
import {
  getAgeFromDateOfBirth,
  getDateOfBirthFromAge,
} from '@make.org/utils/helpers/date';
import {
  getFieldError,
  transformFieldValueToProfileValue,
  transformProfileToFormData,
} from '@make.org/utils/helpers/form';
import { TextArea } from '@make.org/components/Form/TextArea';
import { UntypedInput } from '@make.org/components/Form/UntypedInput';
import i18n from 'i18next';
import {
  NameFiledIcon,
  AgeFieldIcon,
  PostalCodeFieldIcon,
  JobFieldIcon,
  DescriptionFieldIcon,
} from '@make.org/utils/constants/icons';
import { CustomPatternInput } from '@make.org/components/Form/CustomPatternInput';
import { NumberInput } from '@make.org/components/Form/NumberInput';
import { ErrorObjectType, UserProfileType } from '@make.org/types';
import * as postCodeValidator from '@make.org/utils/validator/postCode';
import { useAppContext } from '@make.org/store';

type ProfileFormProps = {
  profile: UserProfileType;
  handleChange: (name: string, value: string | number | null) => void;
  errors: ErrorObjectType[];
};

export const UserForm: FC<ProfileFormProps> = ({
  profile,
  handleChange,
  errors,
}) => {
  const ageError = getFieldError('dateofbirth', errors);
  const postalCodeError = getFieldError('postalCode', errors);
  const firstNameError = getFieldError('firstName', errors);
  const { state } = useAppContext();
  const { country } = state.appConfig;

  const [values, setValues] = useState<UserProfileType & { age: string }>({
    ...transformProfileToFormData(profile),
    age: getAgeFromDateOfBirth(profile.dateOfBirth),
  });

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (name === 'age') {
      handleChange('dateOfBirth', getDateOfBirthFromAge(value));
      return;
    }

    handleChange(name, transformFieldValueToProfileValue(value));
  };

  const { firstName, age, profession, postalCode, description } = values;

  return (
    <>
      <UntypedInput
        type="text"
        name="firstName"
        id="firstName"
        icon={NameFiledIcon}
        value={firstName}
        label={i18n.t('common.form.label.firstname')}
        error={firstNameError}
        required
        handleChange={onChange}
      />
      <NumberInput
        name="age"
        icon={AgeFieldIcon}
        value={age}
        label={i18n.t('common.form.label.age')}
        error={ageError}
        handleChange={onChange}
        min={8}
        max={120}
        required
      />
      <UntypedInput
        type="text"
        name="profession"
        id="profession"
        icon={JobFieldIcon}
        value={profession}
        label={i18n.t('common.form.label.profession', {
          context: 'optional',
        })}
        handleChange={onChange}
      />
      {postCodeValidator.isSupportedCountry(country) && (
        <CustomPatternInput
          type="text"
          name="postalCode"
          id="postalCode"
          icon={PostalCodeFieldIcon}
          value={postalCode}
          label={i18n.t('common.form.label.postalcode', {
            context: 'optional',
          })}
          error={postalCodeError}
          handleChange={onChange}
          maxLength={5}
          pattern={postCodeValidator.html5regexByCountry(country)}
        />
      )}
      <TextArea
        name="description"
        icon={DescriptionFieldIcon}
        value={description}
        label={i18n.t('common.form.label.biography', { context: 'optional' })}
        maxLength={450}
        withCounter
        handleChange={onChange}
      />
    </>
  );
};
