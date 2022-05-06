import React from 'react';
import i18n from 'i18next';
import { ErrorObjectType } from '@make.org/types';
import { FormRequirementsStyle } from '@make.org/ui/elements/FormElements';
import { FormErrors } from '../../../Form/Errors';
import { RegisterEmailTitleStyle } from '../../style';

type Props = {
  errors: ErrorObjectType[];
  registerStep: number;
};

export const TitleForm: React.FC<Props> = ({ errors, registerStep }) => (
  <>
    <RegisterEmailTitleStyle>
      {i18n.t('common.social_login.email_register')}{' '}
      {i18n.t('common.social_login.count_register', {
        count: registerStep,
      })}
    </RegisterEmailTitleStyle>
    <FormRequirementsStyle>
      {registerStep === 1
        ? i18n.t('common.form.requirements_short')
        : i18n.t('common.form.requirements')}
    </FormRequirementsStyle>
    <FormErrors errors={errors} />
  </>
);
