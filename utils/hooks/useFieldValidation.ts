import { MutableRefObject, useEffect, useState } from 'react';
import { ErrorObjectType } from '@make.org/types';
import i18n from 'i18next';

export const useIsFieldValid = (
  ref: MutableRefObject<HTMLInputElement>,
  initialError: ErrorObjectType
): boolean => {
  const [isFieldValid, setFieldValidation] = useState<boolean>(true);
  let isInitialErrorEmpty = true;
  let isRefEmpty = true;
  let inputField;
  let filledPostalCode;
  let filledWebsite;

  if (initialError) {
    isInitialErrorEmpty = !initialError.message;
  }

  if (ref && ref.current) {
    inputField = ref.current;
    isRefEmpty = inputField.value.length === 0;
    filledPostalCode =
      (inputField.value !== undefined || inputField.value !== '') &&
      inputField.name.toLowerCase() === 'postalcode';
    filledWebsite =
      (inputField.value !== undefined || inputField.value !== '') &&
      inputField.name.toLowerCase() === 'website';
  }

  useEffect(() => {
    let validationStatus = true;
    if (!isRefEmpty) {
      validationStatus = inputField.checkValidity();
    }

    if (filledPostalCode) {
      inputField.setCustomValidity('');
      validationStatus = true;

      if (inputField.validity.patternMismatch) {
        inputField.setCustomValidity(
          i18n.t('common.form.messages.invalid_postal_code')
        );
        validationStatus = !inputField.validity.patternMismatch;
      }
    }

    if (filledWebsite) {
      inputField.setCustomValidity('');
      validationStatus = true;

      if (inputField.validity.patternMismatch) {
        inputField.setCustomValidity(i18n.t('common.form.messages.malformed'));
        validationStatus = !inputField.validity.patternMismatch;
      }
    }

    if (!isInitialErrorEmpty) {
      validationStatus = false;
    }

    return setFieldValidation(validationStatus);
  }, [
    isRefEmpty,
    filledPostalCode,
    filledWebsite,
    isInitialErrorEmpty,
    inputField,
  ]);

  return isFieldValid;
};
