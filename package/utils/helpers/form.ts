import {
  ErrorObjectType,
  OrganisationProfileType,
  PersonalityProfileType,
  UserProfileType,
} from '@make.org/types';
import { defaultApiError } from '../errors/Messages';
import { mapErrors } from '../services/ApiErrors';
import { Logger } from '../services/Logger';

type StringOrNumberOrNull<T> = T extends number ? number : string | null;

export const setEmptyStringToNull = <T extends string | number | null>(
  initialValue: T
): StringOrNumberOrNull<T> => {
  if (typeof initialValue === 'number') {
    return initialValue as StringOrNumberOrNull<T>;
  }

  if (!initialValue || !initialValue.trim()) {
    return null as StringOrNumberOrNull<T>;
  }

  return initialValue.trim() as StringOrNumberOrNull<T>;
};

export const setNullToEmptyString = (
  initialValue: string | number | null | boolean
): string | number | boolean => {
  if (typeof initialValue === 'number') {
    return initialValue;
  }

  return !initialValue ? '' : initialValue;
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
    name: 'shared-helpers',
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
