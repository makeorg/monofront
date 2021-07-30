import i18n from 'i18next';
import {
  ErrorObjectType,
  OrganisationProfileType,
  PersonalityProfileType,
  UserProfileType,
} from '@make.org/types';
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
  initialValue: string | number | null | boolean
): string | number | boolean => {
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
  let fieldError = errors.find(error => error.field === field);
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
  serviceErrors: ErrorObjectType[] | ErrorObjectType,
  logId: string
): ErrorObjectType[] => {
  if (Array.isArray(serviceErrors)) {
    return mapErrors(internalErrors, serviceErrors, logId);
  }

  Logger.logError({
    message: `Unexpected error (array expected): ${serviceErrors}`,
    logId,
  });
  return [defaultApiError];
};

export const transformFieldValueToProfileValue = (
  initialValue: string | number
): string | number | null => setEmptyStringToNull(initialValue);

export const transformProfileToFormData = (
  profile: UserProfileType | PersonalityProfileType | OrganisationProfileType
): any => {
  const formData: { [key: string]: number | string | boolean | null } = {
    ...profile,
  };

  Object.keys(formData).forEach((key): void => {
    formData[key] = setNullToEmptyString(formData[key]);
  });

  return formData;
};
