import React, { useEffect, useState } from 'react';
import { SwitchButtonStyle } from '@make.org/designsystem/components/Buttons';

type Props = {
  value?: boolean;
  onEnabling: any;
  onDisabling: any;
};

export const SwitchButton: React.FC<Props> = ({
  value = false,
  onEnabling,
  onDisabling,
}) => {
  const [isChecked, setIsChecked] = useState(value);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!isChecked) {
      onEnabling();
    } else {
      onDisabling();
    }
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  return (
    <SwitchButtonStyle
      onClick={e => handleClick(e)}
      role="switch"
      aria-checked={isChecked}
      className="switch"
      isChecked={isChecked}
      data-cy-button="switch"
    />
  );
};
