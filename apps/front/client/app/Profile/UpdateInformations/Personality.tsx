import React, { useState, FC } from 'react';
import { UntypedInput } from '@make.org/components/Form/UntypedInput';
import i18n from 'i18next';
import { NameFiledIcon } from '@make.org/utils/constants/icons';
import { PersonalityProfileType, ErrorObjectType } from '@make.org/types';
import {
  getFieldError,
  transformFieldValueToProfileValue,
  transformProfileToFormData,
} from '@make.org/utils/helpers/form';
import { CommonProfileFields } from './Common';

type ProfileFormProps = {
  profile: PersonalityProfileType;
  handleChange: (name: string, value: string | number | null) => void;
  errors: ErrorObjectType[];
};

export const PersonalityForm: FC<ProfileFormProps> = ({
  profile,
  handleChange,
  errors,
}) => {
  const firstNameError = getFieldError('firstname', errors);

  const [values, setValues] = useState<PersonalityProfileType>(
    transformProfileToFormData(profile)
  );

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    handleChange(name, transformFieldValueToProfileValue(value));
  };

  const { firstName, lastName, gender } = values;

  return (
    <>
      <UntypedInput
        type="text"
        name="firstName"
        icon={NameFiledIcon}
        value={firstName}
        label={i18n.t('common.form.label.personality.firstname', {
          context: gender,
        })}
        error={firstNameError}
        handleChange={onChange}
      />
      <UntypedInput
        type="text"
        name="lastName"
        icon={NameFiledIcon}
        value={lastName}
        label={i18n.t('common.form.label.personality.lastname', {
          context: gender,
        })}
        required
        handleChange={onChange}
      />
      <CommonProfileFields
        profile={values}
        onChange={onChange}
        errors={errors}
      />
    </>
  );
};
