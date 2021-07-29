import React, { FC, SyntheticEvent, useState } from 'react';
import i18n from 'i18next';
import { SvgAngleArrowRight } from '../../Svg/elements';
import {
  CollapseContentStyle,
  CollapseIconStyle,
  CollapseSeparatorStyle,
  CollapseTriggerStyle,
  CollapseWrapperStyle,
  TileWithCollapseWrapperStyle,
} from '../../elements/CollapseElements';

type Props = {
  /** Title of the tile */
  title: string;
  /** Children to render */
  children: Node | JSX.Element;
  /** Set collapse value */
  open?: boolean;
  /** Set collapse styling like a Tile Component */
  withTileStyle?: boolean;
  /** Optional boolean to avoid margin */
  noMargin?: boolean;
  /** Optional language to handle lang attribute */
  language?: string;
};

export const DeprecatedCollapse: FC<Props> = ({
  title,
  children,
  open = false,
  withTileStyle = false,
  noMargin = false,
  language,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(!open);

  const toggleCollapse = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <CollapseWrapperStyle
      as={withTileStyle ? TileWithCollapseWrapperStyle : CollapseWrapperStyle}
      className={isCollapsed && 'collapsed'}
      noMargin={noMargin}
    >
      <CollapseTriggerStyle
        onClick={toggleCollapse}
        aria-expanded={!isCollapsed}
        aria-label={
          isCollapsed
            ? i18n.t('common.expand_collapse', { name: title })
            : i18n.t('common.shrink_collapse', { name: title })
        }
        lang={language}
      >
        {title}
        <CollapseIconStyle aria-hidden iscollapsed={isCollapsed}>
          <SvgAngleArrowRight focusable="false" />
        </CollapseIconStyle>
      </CollapseTriggerStyle>
      {!withTileStyle && <CollapseSeparatorStyle />}
      <CollapseContentStyle iscollapsed={isCollapsed} aria-hidden={isCollapsed}>
        {withTileStyle && <CollapseSeparatorStyle />}
        {children}
      </CollapseContentStyle>
    </CollapseWrapperStyle>
  );
};
