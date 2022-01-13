import React from 'react';
import { ActiveButtonCenterStyle } from '../../elements/ButtonsElements';

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
  icon?: React.ReactNode;
  /** Icon of the input */
  'data-cy-button'?: string;
};

export const SubmitButton: React.FC<Props> = ({
  formName,
  icon,
  id,
  label,
  disabled,
  'data-cy-button': dataCyButton,
}) => (
  <ActiveButtonCenterStyle
    data-cy-button={dataCyButton}
    type="submit"
    form={formName}
    id={id}
    disabled={disabled}
  >
    {label}
  </ActiveButtonCenterStyle>
);
