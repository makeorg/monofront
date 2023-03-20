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
import { trackingClickClosePanel } from '@make.org/utils/services/Tracking';
import {
  clearProposalPending,
  setProposalSource,
} from '@make.org/store/actions/pendingProposal';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import { Register } from '@make.org/components/Auth/Register';
import { Login } from '@make.org/components/Auth/Login';
import { ProposalJourney } from '@make.org/components/Proposal/Submit/Journey';
import { ProposalSuccess } from '@make.org/components/Proposal/Submit/Success';
import { PasswordForgot } from '@make.org/components/Auth/PasswordForgot';
import { ProposalAuthentication } from '@make.org/components/Proposal/Submit/Authentication';
import { RegisterConfirmation } from '@make.org/components/Auth/RegisterConfirmation';
import { ProposalForm } from '@make.org/components/Proposal/Submit/Form';
import { ReportTranslationConfirmation } from '@make.org/components/ReportOptions/Steps/Confirmation';
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
  const { isExpanded, panelContent: panelContentState } = state.panel;
  const [className, setClassName] = useState<string>('');

  const panels = new Map<PANEL_CONTENT, JSX.Element>([
    [PANEL_CONTENT.LOGIN, <Login />],
    [PANEL_CONTENT.REGISTER, <Register />],
    [PANEL_CONTENT.PROPOSAL_JOURNEY, <ProposalJourney />],
    [PANEL_CONTENT.PROPOSAL_SUCCESS, <ProposalSuccess />],
    [PANEL_CONTENT.PROPOSAL_SUCCESS_REGISTER, <ProposalSuccess isRegister />],
    [PANEL_CONTENT.PASSWORD_FORGOT, <PasswordForgot />],
    [PANEL_CONTENT.PROPOSAL_AUTHENTICATION, <ProposalAuthentication />],
    [PANEL_CONTENT.REGISTER_CONFIRMATION, <RegisterConfirmation />],
    [
      PANEL_CONTENT.REGISTER_CONFIRMATION_SOCIAL,
      <RegisterConfirmation isSocial />,
    ],
    [PANEL_CONTENT.PROPOSAL_SUBMIT, <ProposalForm />],
    [
      PANEL_CONTENT.REPORT_TRANSLATION_CONFIRMATION,
      <ReportTranslationConfirmation />,
    ],
  ]);

  const panelContent: JSX.Element = panels.has(panelContentState)
    ? panels.get(panelContentState)
    : panelContentState;

  const handleCloseAndRemove = () => {
    dispatch(closePanel());
    dispatch(trackingClickClosePanel());
    dispatch(removePanelContent());
    dispatch(clearProposalPending());
    dispatch(setProposalSource(''));
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
            type="button"
            onClick={handleCloseAndRemove}
            className={isExpanded && 'expanded'}
            aria-label={i18n.t('common.close_panel') || undefined}
            data-cy-button="close-panel-overlay"
          />
          <PanelCloseButtonStyle
            type="button"
            onClick={handleCloseAndRemove}
            className={className}
            aria-label={i18n.t('common.close_panel') || undefined}
            data-cy-button="close-panel"
          >
            <PanelCloseIconStyle aria-hidden focusable="false" />
          </PanelCloseButtonStyle>
        </>
      )}
      <PanelInnerStyle className={className}>{panelContent}</PanelInnerStyle>
    </PanelWrapperStyle>
  );
};
