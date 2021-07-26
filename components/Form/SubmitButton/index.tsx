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
};

export const SubmitButton: React.FC<Props> = ({
  formName,
  icon,
  id,
  label,
  disabled,
}) => (
  <ActiveButtonStyle type="submit" form={formName} id={id} disabled={disabled}>
    {icon}
    {label}
  </ActiveButtonStyle>
);

SubmitButton.defaultProps = {
  id: undefined,
  disabled: false,
};
