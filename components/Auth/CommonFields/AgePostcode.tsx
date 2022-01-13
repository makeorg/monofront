import React, { ChangeEvent, FC } from 'react';
import i18n from 'i18next';
import {
  AgeFieldIcon,
  PostalCodeFieldIcon,
} from '@make.org/utils/constants/icons';
import { ErrorObjectType } from '@make.org/types';
import { NumberInput } from '@make.org/components/Form/NumberInput';
import { CustomPatternInput } from '@make.org/components/Form/CustomPatternInput';
import {
  html5regexByCountry,
  isSupportedCountry,
} from '@make.org/utils/validator/postCode';
import { useAppContext } from '@make.org/store';

type Props = {
  ageValue: string | number;
  postalcodeValue: string;
  ageError: ErrorObjectType;
  postalcodeError: ErrorObjectType;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  panel?: boolean;
};

export const AgePostcode: FC<Props> = ({
  ageValue,
  postalcodeValue,
  ageError,
  postalcodeError,
  handleChange,
  panel,
}) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  return (
    <>
      <NumberInput
        name="age"
        id="profile.age"
        icon={AgeFieldIcon}
        value={ageValue}
        error={ageError}
        label={i18n.t('common.form.label.age')}
        handleChange={handleChange}
        min={8}
        max={120}
        required
      />
      {isSupportedCountry(country) && (
        <CustomPatternInput
          type="text"
          name="postalcode"
          id="profile.postalcode"
          icon={PostalCodeFieldIcon}
          value={postalcodeValue}
          error={postalcodeError}
          label={i18n.t('common.form.label.postalcode_optional')}
          handleChange={handleChange}
          pattern={html5regexByCountry(country)}
        />
      )}
    </>
  );
};
