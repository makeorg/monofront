import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  MouseEventHandler,
  SyntheticEvent,
} from 'react';
import {
  CheckboxWrapper,
  CheckboxLabelStyle,
  FakeCheckboxInputStyle,
} from '../../elements/FormElements';
import { SvgCheck } from '../../Svg/elements';

type Props = {
  /** Name of the checkbox */
  name: string;
  /** Label of the checkbox */
  label: string;
  /** handleLabelClick of the checkbox */
  handleCheck: (
    event:
      | SyntheticEvent<HTMLLabelElement>
      | MouseEventHandler<HTMLLabelElement>
  ) => void;
  /** Value of the checkbox */
  value: string | number | readonly string[];
  /** onChange of the checkbox */
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Default value of the checkbox */
  isChecked?: boolean;
  /** Is input required or optional */
  required?: boolean;
  /** isBlack color parameter optional */
  isBlack?: boolean;
  /** noFontSizeChange parameter optional */
  noFontSizeChange?: boolean;
};

export const CheckBox: FC<Props> = ({
  name,
  label,
  handleCheck,
  value,
  handleChange,
  required = false,
  isChecked = false,
  isBlack = false,
  noFontSizeChange = false,
}) => {
  const handleEnterKey = (event: KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === 'Enter') {
      handleCheck(event);
    }
  };

  return (
    <CheckboxWrapper>
      <input
        type="checkbox"
        id={name}
        name={name}
        value={value}
        required={required}
        checked={isChecked}
        aria-checked={isChecked}
        onChange={handleChange}
        hidden
      />
      <CheckboxLabelStyle
        htmlFor={name}
        onClick={handleCheck}
        onKeyPress={handleEnterKey}
        tabIndex={0}
        isBlack={isBlack}
        noFontSizeChange={noFontSizeChange}
      >
        <FakeCheckboxInputStyle aria-hidden>
          {isChecked ? <SvgCheck /> : null}
        </FakeCheckboxInputStyle>
        <span>{label}</span>
      </CheckboxLabelStyle>
    </CheckboxWrapper>
  );
};
