import React, { useEffect, useRef } from 'react';
import { lockBody, unlockBody } from '@make.org/utils/helpers/styled';
import {
  addAriaHiddenAndNegativeTab,
  addAriaHiddenByClass,
  removeAriaHiddenAndNegativeTab,
  removeAriaHiddenByClass,
} from '@make.org/utils/helpers/a11y';
import {
  PANEL_ARIA_NEGATIVE_TAB_CLASS,
  PANEL_ARIA_CLASS,
} from '@make.org/utils/constants/a11y';
import { closePanel, removePanelContent } from '@make.org/store/actions/panel/';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import {
  PanelWrapperStyle,
  PanelOverlayStyle,
  PanelInnerStyle,
  PanelCloseButtonStyle,
  PanelCloseIconStyle,
} from './style';

export const Panel: React.FC = () => {
  const panelRef = useRef<HTMLDivElement>();
  const { dispatch, state } = useAppContext();
  const { isExpanded, panelContent } = state.panel;

  const handleCloseAndRemove = () => {
    dispatch(closePanel());
    dispatch(removePanelContent());
  };

  useEffect(() => {
    if (!panelRef.current) {
      return undefined;
    }

    if (isExpanded) {
      lockBody();
      addAriaHiddenByClass(PANEL_ARIA_CLASS);
      addAriaHiddenAndNegativeTab(PANEL_ARIA_NEGATIVE_TAB_CLASS);
      return panelRef.current.removeAttribute('aria-hidden');
    }

    removeAriaHiddenByClass(PANEL_ARIA_CLASS);
    removeAriaHiddenAndNegativeTab(PANEL_ARIA_NEGATIVE_TAB_CLASS);
    const timer = setTimeout(() => {
      if (
        !!panelRef &&
        !!panelRef.current &&
        'setAttribute' in panelRef.current
      ) {
        panelRef.current.setAttribute('aria-hidden', 'true');
      }
    }, 500);
    unlockBody();
    return () => clearTimeout(timer);
  }, [isExpanded]);

  return (
    <PanelWrapperStyle ref={panelRef} aria-hidden="true">
      {isExpanded && (
        <>
          <PanelOverlayStyle
            onClick={handleCloseAndRemove}
            className={isExpanded && 'expanded'}
            aria-label={i18n.t('common.close_panel')}
            data-cy-button="close-panel-overlay"
          />
          <PanelCloseButtonStyle
            onClick={handleCloseAndRemove}
            className={isExpanded && 'expanded'}
            aria-label={i18n.t('common.close_panel')}
            data-cy-button="close-panel"
          >
            <PanelCloseIconStyle aria-hidden />
          </PanelCloseButtonStyle>
        </>
      )}
      <PanelInnerStyle className={isExpanded ? 'expanded' : ''}>
        {panelContent}
      </PanelInnerStyle>
    </PanelWrapperStyle>
  );
};
