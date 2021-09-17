import React, { useEffect, useRef, useState } from 'react';
import { lockBody, unlockBody } from '@make.org/utils/helpers/styled';
import {
  addAriaHiddenAndNegativeTab,
  addAriaHiddenByClass,
  removeAriaHiddenAndNegativeTab,
  removeAriaHiddenByClass,
} from '@make.org/utils/helpers/a11y';
import { PANEL } from '@make.org/types/enums';
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
  const { source } = state.appConfig;
  const isWidget = source === 'widget';
  const { isExpanded, panelContent } = state.panel;
  const [className, setClassName] = useState<string>('');

  const handleCloseAndRemove = () => {
    dispatch(closePanel());
    dispatch(removePanelContent());
  };

  useEffect(() => {
    if (!panelRef.current) {
      return undefined;
    }

    if (isExpanded) {
      setClassName('expanded');
      if (isWidget) {
        setClassName('expanded widget');
      }
      lockBody();
      addAriaHiddenByClass(PANEL.PANEL_ARIA_CLASS);
      addAriaHiddenAndNegativeTab(PANEL.PANEL_ARIA_NEGATIVE_TAB_CLASS);
      return panelRef.current.removeAttribute('aria-hidden');
    }

    setClassName('');
    if (isWidget) {
      setClassName('widget');
    }
    removeAriaHiddenByClass(PANEL.PANEL_ARIA_CLASS);
    removeAriaHiddenAndNegativeTab(PANEL.PANEL_ARIA_NEGATIVE_TAB_CLASS);
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
  }, [isExpanded, isWidget]);

  return (
    <PanelWrapperStyle
      className={isWidget ? 'widget' : ''}
      ref={panelRef}
      aria-hidden="true"
    >
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
            className={className}
            aria-label={i18n.t('common.close_panel')}
            data-cy-button="close-panel"
          >
            <PanelCloseIconStyle aria-hidden />
          </PanelCloseButtonStyle>
        </>
      )}
      <PanelInnerStyle className={className}>{panelContent}</PanelInnerStyle>
    </PanelWrapperStyle>
  );
};
