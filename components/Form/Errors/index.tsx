import React, { useRef, useLayoutEffect } from 'react';
import { ErrorObjectType } from '@make.org/types';
import i18n from 'i18next';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import {
  FormErrorsContainerStyle,
  FormErrorsIntroStyle,
  FormErrorsListItemStyle,
} from '@make.org/ui/elements/FormElements';

type Props = {
  errors: ErrorObjectType[];
};

export const FormErrors: React.FC<Props> = ({ errors }) => {
  const formRef = useRef<HTMLDivElement>(null);

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
