import React, { FC, ReactNode } from 'react';
import { ErrorObjectType } from '@make.org/types';
import i18n from 'i18next';
import { throttle } from '@make.org/utils/helpers/throttle';
import {
  BasicTextAreaStyle,
  TextAreaCounterStyle,
  TextAreaIconStyle,
  FloatingLabelStyle,
  FakeFieldStyle,
  FieldWrapperStyle,
} from '@make.org/ui/elements/FormElements';

type Props = {
  /** Name of the TextArea */
  name: string;
  /** Icon of the TextArea */
  icon?: ReactNode;
  /** Value of the TextArea */
  value: string;
  /** Label of the TextArea */
  label: string;
  /** Mehtod called on change event */
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Array containing form errors */
  errors?: ErrorObjectType[];
  /** Is input required or optional */
  required?: boolean;
  /** Setting rows attribute for Textarea */
  rows?: number;
  /** Setting minLength for Textarea */
  minLength?: number;
  /** Setting maxLength for Textarea */
  maxLength?: number;
  /** Enable /Disable spellCheck for Textarea */
  spellCheck?: boolean;
  /** Autocomplete spellCheck for Textarea */
  autoComplete?: string;
  /** Show or not the counter */
  withCounter?: boolean;
};

export const TextArea: FC<Props> = ({
  name,
  icon,
  errors,
  value,
  label,
  required,
  handleChange,
  rows,
  minLength,
  maxLength,
  spellCheck,
  autoComplete,
  withCounter,
}) => (
  <FakeFieldStyle hasError={!!errors}>
    <TextAreaIconStyle aria-hidden>{icon}</TextAreaIconStyle>
    <FieldWrapperStyle>
      <BasicTextAreaStyle
        name={name}
        id={name}
        value={value}
        required={required}
        onChange={throttle(handleChange)}
        rows={rows}
        maxRows={25}
        minLength={minLength}
        maxLength={maxLength}
        spellCheck={spellCheck}
        autoComplete={autoComplete}
      />
      <FloatingLabelStyle htmlFor={name}>{label}</FloatingLabelStyle>
      {maxLength && withCounter && (
        <TextAreaCounterStyle>
          {`${value ? value.length : '0'}/${maxLength} ${i18n.t(
            'common.max_characters'
          )}`}
        </TextAreaCounterStyle>
      )}
    </FieldWrapperStyle>
  </FakeFieldStyle>
);

TextArea.defaultProps = {
  required: false,
  errors: undefined,
  rows: 5,
  minLength: undefined,
  maxLength: undefined,
  spellCheck: true,
  autoComplete: 'off',
  withCounter: true,
};
