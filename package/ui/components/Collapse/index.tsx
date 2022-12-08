import React, { FC, SyntheticEvent, useState } from 'react';
import i18n from 'i18next';
import { SvgArrowDown } from '../../Svg/elements/ArrowDown';
import {
  CollapseContentStyle,
  CollapseIconStyle,
  CollapseTriggerStyle,
  CollapseWrapperStyle,
} from './style';

type Props = {
  /** Title of the tile */
  title: string;
  /** Chidlren to render */
  children: JSX.Element | string;
  /** Set collapse value */
  open?: boolean;
  /** Optional language to handle lang attribute */
  language?: string;
};

export const Collapse: FC<Props> = ({
  title,
  children,
  open = false,
  language,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(!open);

  const toggleCollapse = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <CollapseWrapperStyle className={isCollapsed ? 'collapsed' : ''}>
      <CollapseTriggerStyle
        onClick={toggleCollapse}
        aria-expanded={!isCollapsed}
        aria-label={
          isCollapsed
            ? i18n.t('common.expand_collapse', { name: title }) || undefined
            : i18n.t('common.shrink_collapse', { name: title }) || undefined
        }
        lang={language}
      >
        {title}
        <CollapseIconStyle aria-hidden isCollapsed={isCollapsed}>
          <SvgArrowDown width={10} height={10} focusable="false" />
        </CollapseIconStyle>
      </CollapseTriggerStyle>
      <CollapseContentStyle isCollapsed={isCollapsed} aria-hidden={isCollapsed}>
        {children}
      </CollapseContentStyle>
    </CollapseWrapperStyle>
  );
};
