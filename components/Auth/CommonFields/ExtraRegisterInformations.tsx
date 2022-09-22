import React, { ChangeEvent, FC } from 'react';
import { UntypedInput } from '@make.org/components/Form/UntypedInput';
import i18n from 'i18next';
import {
  AgeFieldIcon,
  NameFiledIcon,
  MapMarkerIcon,
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
  firstnameValue: string;
  ageValue: string | number;
  postalcodeValue: string;
  firstnameError: ErrorObjectType;
  ageError: ErrorObjectType;
  postalcodeError: ErrorObjectType;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  panel?: boolean;
};

export const ExtraInRegisterformationsFields: FC<Props> = ({
  firstnameValue,
  ageValue,
  postalcodeValue,
  firstnameError,
  ageError,
  postalcodeError,
  handleChange,
  panel,
}) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  return (
    <>
      <UntypedInput
        type="text"
        name="firstname"
        id="profile.firstname"
        icon={NameFiledIcon}
        error={firstnameError}
        value={firstnameValue}
        label={i18n.t('common.form.label.firstname')}
        required
        handleChange={handleChange}
      />
      {isSupportedCountry(country) ? (
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
          <CustomPatternInput
            type="text"
            name="postalcode"
            id="profile.postalcode"
            icon={MapMarkerIcon}
            value={postalcodeValue}
            error={postalcodeError}
            label={i18n.t('common.form.label.postalcode_optional')}
            handleChange={handleChange}
            pattern={html5regexByCountry(country)}
          />
        </>
      ) : (
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
      )}
    </>
  );
};
