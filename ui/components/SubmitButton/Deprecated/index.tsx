import React from 'react';
import { ActiveButtonStyle } from '@make.org/ui/elements/ButtonsElements';

type Props = {
  /** Name of the input */
  formName: string;
  /** Label of the input */
  label: string;
  /** Is input required or optional */
  id?: string;
  /** disabled interaction */
  disabled?: boolean;
  /** Icon of the input */
  icon?: React.ReactElement;
  /** Icon of the input */
  'data-cy-button'?: string;
};

export const DeprecatedSubmitButton: React.FC<Props> = ({
  formName,
  icon,
  id,
  label,
  disabled,
  'data-cy-button': dataCyButton,
}) => (
  <ActiveButtonStyle
    data-cy-button={dataCyButton}
    type="submit"
    form={formName}
    id={id}
    disabled={disabled}
  >
    {icon}
    {label}
  </ActiveButtonStyle>
);
