import { RefObject, useEffect, useState } from 'react';
import { ErrorObjectType } from '@make.org/types';
import i18n from 'i18next';

export const useIsFieldValid = (
  ref: RefObject<HTMLInputElement> | null,
  initialError: ErrorObjectType | undefined
): boolean => {
  const [isFieldValid, setFieldValidation] = useState<boolean>(true);
  const isInitialErrorEmpty = !initialError?.message;
  let isRefEmpty = true;
  let inputField: HTMLInputElement;
  let filledPostalCode = false;
  let filledWebsite = false;

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  });

  return isFieldValid;
};
