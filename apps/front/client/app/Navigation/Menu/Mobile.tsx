import React, { useState, FC } from 'react';
import i18n from 'i18next';
import { NAVIGATION, SEARCH } from '@make.org/types/enums';

import {
  addAriaHiddenByClass,
  removeAriaHiddenByClass,
  addAriaHiddenAndNegativeTab,
  removeAriaHiddenAndNegativeTab,
} from '@make.org/utils/helpers/a11y';
import { lockBody, unlockBody } from '@make.org/utils/helpers/styled';
import { MenuOpenTriggerStyle, MenuBarStyle } from './style';
import { MenuPanel } from './Panel';

export const MobileMenu: FC = () => {
  const [isExpanded, setExpansion] = useState(false);

  const toggleExpansion = () => {
    if (isExpanded) {
      removeAriaHiddenByClass(NAVIGATION.NAVIGATION_ARIA_CLASS);
      removeAriaHiddenByClass(NAVIGATION.NAVIGATION_ELEMENT_ARIA_CLASS);
      removeAriaHiddenAndNegativeTab(
        NAVIGATION.NAVIGATION_ARIA_NEGATIVE_TAB_CLASS
      );
      unlockBody();
    } else {
      addAriaHiddenByClass(NAVIGATION.NAVIGATION_ARIA_CLASS);
      addAriaHiddenByClass(NAVIGATION.NAVIGATION_ELEMENT_ARIA_CLASS);
      addAriaHiddenAndNegativeTab(
        NAVIGATION.NAVIGATION_ARIA_NEGATIVE_TAB_CLASS
      );
      lockBody();
    }

    return setExpansion(!isExpanded);
  };

  return (
    <>
      <MenuOpenTriggerStyle
        className={`${NAVIGATION.NAVIGATION_ELEMENT_ARIA_CLASS} ${SEARCH.SEARCH_ELEMENT_ARIA_CLASS}`}
        aria-label={i18n.t('header.open_menu')}
        onClick={toggleExpansion}
        disabled={isExpanded}
        data-cy-button="mobile-header-menu"
        type="button"
      >
        <MenuBarStyle className="first" />
        <MenuBarStyle className="second" />
        <MenuBarStyle />
      </MenuOpenTriggerStyle>
      <MenuPanel isExpanded={isExpanded} toggleExpansion={toggleExpansion} />
    </>
  );
};
