import React from 'react';
import { ErrorObjectType } from '@make.org/types';
import { DefaultApiErrorMessage } from '@make.org/ui/elements/Form/Errors/Message';

export const emptyError: ErrorObjectType = {
  field: '',
  key: '',
  message: '',
};

export const defaultApiError: ErrorObjectType = {
  field: 'global',
  key: 'api_error',
  message: <DefaultApiErrorMessage />,
};
