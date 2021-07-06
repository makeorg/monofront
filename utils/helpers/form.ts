import { i18n } from '@make.org/utils/i18n';
import { ErrorObjectType } from '@make.org/types';
import { defaultApiError } from '../errors/Messages';
import { mapErrors } from '../services/ApiErrors';
import { Logger } from '../services/Logger';

export const setEmptyStringToNull = (
  initialValue: string | number | null
): string | number | null => {
  if (typeof initialValue === 'number') {
    return initialValue;
  }

  if (!initialValue || !initialValue.trim()) {
    return null;
  }

  return initialValue.trim();
};

export const setNullToEmptyString = (
  initialValue: string | number | null
): string | number => {
  if (typeof initialValue === 'number') {
    return initialValue;
  }

  return !initialValue ? '' : initialValue;
};

export const errorTranslation = (message: string): string => {
  const translatedError = i18n.t(message);
  if (translatedError === undefined) {
    return message;
  }

  return translatedError;
};

export const getFieldError = (
  field: string,
  errors: ErrorObjectType[]
): ErrorObjectType => {
  let fieldError = errors.find((error) => error.field === field);
  if (fieldError === undefined) {
    fieldError = {
      field: '',
      key: '',
      message: '',
    };
  }
  return fieldError;
};

export const getErrorMessages = (
  internalErrors: ErrorObjectType[],
  serviceErrors: ErrorObjectType[],
  logId?: string
): ErrorObjectType[] => {
  switch (true) {
    case !Array.isArray(serviceErrors):
      Logger.logError({
        message: `Unexpected error (array expected): ${serviceErrors}`,
        logId,
      });
      return [defaultApiError];
    default:
      return mapErrors(internalErrors, serviceErrors, logId);
  }
};

export const transformFieldValueToProfileValue = (
  initialValue: string | number
): string | number | null => setEmptyStringToNull(initialValue);

export const transformProfileToFormData = (profile: any) => {
  const formData = { ...profile };

  Object.keys(formData).forEach((key) => {
    formData[key] = setNullToEmptyString(formData[key]);
  });

  return formData;
};
