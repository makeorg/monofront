import React from 'react';
import { ErrorObjectType } from '@make.org/types';
import { MessageWithDynamicLabel } from '@make.org/components/Form/Errors/Message';

export const updatePersonalityErrors: ErrorObjectType[] = [
  {
    field: 'firstname',
    key: 'mandatory',
    message: (
      <MessageWithDynamicLabel
        messageKey="common.form.messages.mandatory"
        field="firstName"
        labelKey="common.form.label.firstname"
      />
    ),
  },
];
