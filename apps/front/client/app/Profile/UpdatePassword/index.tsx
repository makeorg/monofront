import React, { FC, useState, useEffect } from 'react';
import { useAppContext } from '@make.org/store';
import i18n from 'i18next';
import { ErrorObjectType } from '@make.org/types';
import { FORM } from '@make.org/types/enums';
import { PasswordInput } from '@make.org/components/Form/PasswordInput';
import { SubmitButton } from '@make.org/components/Form/SubmitButton';
import {
  PasswordFieldIcon,
  SubmitThumbsUpIcon,
} from '@make.org/utils/constants/icons';
import { TileWithTitle } from '@make.org/ui/components/TileWithTitle';
import { getUser } from '@make.org/store/actions/authentication';
import { UserService } from '@make.org/utils/services/User';
import { throttle } from '@make.org/utils/helpers/throttle';
import {
  FormRequirementsStyle,
  FormLeftAlignStyle,
} from '@make.org/ui/elements/FormElements';
import { FormErrors } from '@make.org/components/Form/Errors';
import { getFieldError } from '@make.org/utils/helpers/form';
import { FormSuccessMessage } from '@make.org/components/Form/Success';
import { ClientLogger } from '@make.org/logger/clientLogger';

type Props = {
  /** Id of the User */
  userId: string;
  /** User has a password */
  hasPassword: boolean;
};

type TypePasswordValues = {
  newPassword: string;
  actualPassword: string;
};

export const UpdatePassword: FC<Props> = ({ userId, hasPassword }) => {
  const { dispatch, state } = useAppContext();
  const defaultFormValues = {
    newPassword: '',
    actualPassword: '',
  };
  const [formValues, setFormValues] =
    useState<TypePasswordValues>(defaultFormValues);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorObjectType[]>([]);
  const actualPasswordError = getFieldError('password', errors);
  const newPasswordError = getFieldError('newPassword', errors);
  const actualPasswordIsEmptyAndWrong =
    actualPasswordError && formValues.actualPassword.length <= 1;
  const newPasswordIsEmptyAndWrong =
    newPasswordError && formValues.newPassword.length <= 1;

  useEffect(() => {
    if (formValues.actualPassword && formValues.newPassword) {
      setCanSubmit(true);
    }
  }, [formValues]);

  const disableSubmitAndErrors = () => {
    setCanSubmit(false);
    setErrors([]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });

    setCanSubmit(true);

    if (
      hasPassword &&
      (actualPasswordIsEmptyAndWrong || newPasswordIsEmptyAndWrong)
    ) {
      disableSubmitAndErrors();
    }

    if (newPasswordIsEmptyAndWrong) {
      disableSubmitAndErrors();
    }

    setIsSubmitSuccessful(false);
  };

  const success = () => {
    setFormValues(defaultFormValues);
    setErrors([]);
    setIsSubmitSuccessful(true);
    setCanSubmit(false);
    getUser(dispatch, state.modal.isOpen);
  };

  const handleErrors = (serviceErrors: ErrorObjectType[]) => {
    setErrors(serviceErrors);
    setCanSubmit(false);
  };

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();

    await UserService.updatePassword(
      userId,
      formValues,
      hasPassword,
      () => success(),
      serviceErrors => handleErrors(serviceErrors),
      ClientLogger.getInstance()
    );
  };

  return (
    <TileWithTitle title={i18n.t('profile.password_update.title')}>
      <FormLeftAlignStyle
        id={FORM.PASSWORD_UPDATE_FORMNAME}
        onSubmit={throttle(handleSubmit)}
      >
        <FormRequirementsStyle>
          {i18n.t('common.form.requirements')}
        </FormRequirementsStyle>
        <FormErrors errors={errors} />
        {hasPassword && (
          <PasswordInput
            label={i18n.t('profile.password_update.actual_password.label')}
            name="actualPassword"
            autocomplete="current-password"
            icon={PasswordFieldIcon}
            value={formValues.actualPassword}
            error={actualPasswordError}
            handleChange={handleChange}
            validatePattern={false}
          />
        )}
        <PasswordInput
          label={i18n.t('profile.password_update.newpassword')}
          name="newPassword"
          autocomplete="new-password"
          icon={PasswordFieldIcon}
          value={formValues.newPassword}
          error={newPasswordError}
          handleChange={handleChange}
          requirements
          validatePattern
        />
        <SubmitButton
          disabled={!canSubmit}
          formName={FORM.PASSWORD_UPDATE_FORMNAME}
          icon={SubmitThumbsUpIcon}
          label={i18n.t('profile.common.submit_label')}
        />
        {isSubmitSuccessful && <FormSuccessMessage />}
      </FormLeftAlignStyle>
    </TileWithTitle>
  );
};
