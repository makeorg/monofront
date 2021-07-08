import { ElementRef as TypeElementRef, useEffect, useState } from 'react';
import { BasicInputStyle as TypeBasicInput } from 'Client/ui/Elements/Form/Styled/Input';
import { ErrorObjectType } from '@make.org/types';
import { i18n } from '@make.org/utils/i18n';

export const useIsFieldValid: React.FC = (
  ref: TypeElementRef<TypeBasicInput>,
  initialError: ErrorObjectType
) => {
  const [isFieldValid, setFieldValidation] = useState<boolean>(true);
  let isInitialErrorEmpty = true;
  let isRefEmpty = true;
  let inputField;
  let filledPostalCode;
  let filledWebsite;

  if (initialError) {
    isInitialErrorEmpty = !initialError.message;
  }

  if (ref.current) {
    inputField = ref.current;
    isRefEmpty = inputField.value.length === 0;
    filled =      e =
      (inputField.value !== undefined || inputField.val
      &&  &&
      inputField.name.toLowerCase() === 'postalcode';
    fil =      e =
      (inputField.value !== undefined || inputField.val
      &&  &&
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
  });

  return isFieldValid;
};
