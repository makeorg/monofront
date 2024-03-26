import { ClientLogger } from '@make.org/logger/clientLogger';
import { ErrorObjectType } from '@make.org/types';
import i18n from 'i18next';

/**
 * Map errors from API to internal error message
 *
 * @param {ErrorObjectType[]} errors an array of error map object {field: 'value', key: 'key of the error', message: 'error message to display'}
 */
export const mapErrors = (
  internalErrors: ErrorObjectType[],
  apiErrors: ErrorObjectType[],
  logId: string
): ErrorObjectType[] => {
  const errors: ErrorObjectType[] = apiErrors.map(
    (apiError: ErrorObjectType) => {
      const apiErrorField = apiError.field.toLowerCase();

      const getTranslatedMessage = (error: string) => {
        switch (error) {
          case 'errors_notification':
            return i18n.t('common.form.messages.errors_notification');
          case 'invalid_email':
            return i18n.t('common.form.messages.invalid_email');
          case 'invalid_email_dynamic':
            return i18n.t('common.form.messages.invalid_email_dynamic');
          case 'already_registered':
            return i18n.t('common.form.messages.already_registered');
          case 'already_registered_dynamic':
            return i18n.t('common.form.messages.already_registered_dynamic');
          case 'email_doesnot_exist':
            return i18n.t('common.form.messages.email_doesnot_exist');
          case 'email_doesnot_exist_dynamic':
            return i18n.t('common.form.messages.email_doesnot_exist_dynamic');
          case 'invalid_password':
            return i18n.t('common.form.messages.invalid_password');
          case 'invalid_password_dynamic':
            return i18n.t('common.form.messages.invalid_password_dynamic');
          case 'api_error':
            return i18n.t('common.form.messages.api_error');
          case 'mandatory':
            return i18n.t('common.form.messages.mandatory');
          case 'mandatory_dynamic':
            return i18n.t('common.form.messages.mandatory_dynamic');
          case 'invalid_age':
            return i18n.t('common.form.messages.invalid_age');
          case 'invalid_age_dynamic':
            return i18n.t('common.form.messages.invalid_age_dynamic');
          case 'the_field_[email]_is_missing':
            return i18n.t('common.form.messages.the_field_[email]_is_missing');
          case 'the_field_[password]_is_missing':
            return i18n.t(
              'common.form.messages.the_field_[password]_is_missing'
            );
          case 'invalid_postal_code':
            return i18n.t('common.form.messages.invalid_postal_code');
          case 'invalid_privacy_policy':
            return i18n.t('common.form.messages.invalid_privacy_policy');
          case 'invalid_postal_code_dynamic':
            return i18n.t('common.form.messages.invalid_postal_code_dynamic');
          case 'submit_success':
            return i18n.t('common.form.messages.submit_success');
          case 'malformed':
            return i18n.t('common.form.messages.malformed');
          default:
            return error;
        }
      };

      const apiErrorMessage = getTranslatedMessage(apiError.key);
      const errorMatch = internalErrors.find(
        (internalError: ErrorObjectType) =>
          apiErrorField === internalError.field &&
          apiError.key === internalError.key
      );

      if (typeof errorMatch !== 'undefined') {
        return {
          field: errorMatch.field,
          key: errorMatch.key,
          message: errorMatch.message,
        };
      }
      ClientLogger.getInstance().logError({
        message: `Unexpected error: "field": "${apiErrorField}", "key": "${apiError.key}", "message": "${apiError.message}"`,
        name: 'services',
        logId,
      });
      return {
        field: apiErrorField,
        key: apiError.key,
        message: apiErrorMessage,
      };
    }
  );

  return errors;
};
