// @flow
import React from 'react';
import { ErrorObjectType } from '@make.org/types';
import { MessageWithDynamicLabel } from '@make.org/ui/Elements/Form/Errors/Message';

export const updateOrganisationErrors: ErrorObjectType[] = [
  {
    field: 'organisationname',
    key: 'mandatory',
    message: (
      <MessageWithDynamicLabel
        messageKey="common.form.messages.mandatory"
        field="organisationName"
        labelKey="common.form.label.organisation"
      />
    ),
  },
];
