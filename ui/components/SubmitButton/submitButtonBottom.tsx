import React from 'react';
import { ActiveButtonCenterBottomStyle } from '../../elements/ButtonsElements';

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
  'data-cy-button'?: string;
};

export const SubmitButtonBottom: React.FC<Props> = ({
  formName,
  id,
  label,
  disabled,
  'data-cy-button': dataCyButton,
}) => (
  <ActiveButtonCenterBottomStyle
    data-cy-button={dataCyButton}
    type="submit"
    form={formName}
    id={id}
    disabled={disabled}
  >
    {label}
  </ActiveButtonCenterBottomStyle>
);
