import React, { useEffect, useState } from 'react';
import { SvgSwitchLabelChecked, SvgSwitchLabelCross } from '../../Svg/elements';

import { SwitchButtonStyle, SwitchButtonInternalLabelStyle } from './style';

type Props = {
  value?: boolean;
  onEnabling: () => void;
  onDisabling: () => void;
};

export const SwitchButton: React.FC<Props> = ({
  value = false,
  onEnabling,
  onDisabling,
}) => {
  const [isChecked, setIsChecked] = useState(value);

  const handleClick = () => {
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
      onClick={handleClick}
      role="switch"
      aria-checked={isChecked}
      className="switch"
      isChecked={isChecked}
    >
      <SwitchButtonInternalLabelStyle isChecked={isChecked}>
        {isChecked ? (
          <SvgSwitchLabelChecked
            aria-hidden
            width="8"
            height="8"
            focusable="false"
          />
        ) : (
          <SvgSwitchLabelCross
            aria-hidden
            width="8"
            height="8"
            focusable="false"
          />
        )}
      </SwitchButtonInternalLabelStyle>
    </SwitchButtonStyle>
  );
};
