import React, { useRef, useLayoutEffect } from 'react';
import { ErrorObjectType } from '@make.org/types';
import { i18n } from '@make.org/utils/i18n';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import {
  FormErrorsContainerStyle,
  FormErrorsIntroStyle,
  FormErrorsListItemStyle,
} from '@make.org/ui/elements/Form/Styled/Errors';

type Props = {
  errors: ErrorObjectType[];
};

export const FormErrors: React.FC<Props> = ({ errors }) => {
  const formRef = useRef(null);

  useLayoutEffect(() => {
    if (formRef.current) {
      formRef.current.focus();
    }
  }, [errors]);

  if (!errors || !errors.length) {
    return null;
  }

  return (
    <FormErrorsContainerStyle ref={formRef} tabIndex={0}>
      <FormErrorsIntroStyle>
        {i18n.t('common.form.messages.errors_notification')}
      </FormErrorsIntroStyle>
      <UnstyledListStyle>
        {errors.map(error => (
          <FormErrorsListItemStyle key={`${error.field}_${error.key}`}>
            {error.message}
          </FormErrorsListItemStyle>
        ))}
      </UnstyledListStyle>
    </FormErrorsContainerStyle>
  );
};