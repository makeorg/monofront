import React, { FC, useState } from 'react';
import {
  getFieldError,
  transformFieldValueToProfileValue,
  transformProfileToFormData,
} from '@make.org/utils/helpers/form';
import { UntypedInput } from '@make.org/components/Form/UntypedInput';
import i18n from 'i18next';
import { NameFiledIcon } from '@make.org/utils/constants/icons';
import { ErrorObjectType, OrganisationProfileType } from '@make.org/types';
import { CommonProfileFields } from './Common';

type ProfileFormProps = {
  profile: OrganisationProfileType;
  handleChange: (name: string, value: string | number | null) => void;
  errors: ErrorObjectType[];
};

export const OrganisationForm: FC<ProfileFormProps> = ({
  profile,
  handleChange,
  errors,
}) => {
  const organisationNameError = getFieldError('organisationname', errors);

  const [values, setValues] = useState<OrganisationProfileType>(
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

  const { organisationName } = values;

  return (
    <>
      <UntypedInput
        type="text"
        name="organisationName"
        icon={NameFiledIcon}
        value={organisationName}
        label={i18n.t('common.form.label.organisation')}
        error={organisationNameError}
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
