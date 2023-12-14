import React, { FC, useEffect } from 'react';
import i18n from 'i18next';
import ReactModal from 'react-modal';
import { lockBody, unlockBody } from '@make.org/utils/helpers/styled';
import { SidebarLogo } from '../../assets/SidebarSimple';
import { SidebarContent } from './Content';
import {
  SidebarTitleCloseStyle,
  SidebarCloseStyle,
  SidebarMakeStyle,
  SidebarLogoMakeStyle,
  SidebarTitleStyle,
} from './style';

ReactModal.setAppElement('#app');

type Props = {
  open: boolean;
  close: () => void;
};

export const SidebarModal: FC<Props> = ({ open, close }) => {
  useEffect(() => {
    lockBody();
  }, []);

  const handleClose = () => {
    unlockBody();
    close();
  };

  return (
    <ReactModal
      isOpen={open}
      overlayClassName="sidebar-overlay"
      className="sidebar-dialog"
    >
      <SidebarTitleCloseStyle>
        <SidebarTitleStyle>{i18n.t('sidebar.explore')}</SidebarTitleStyle>
        <SidebarCloseStyle
          aria-label={i18n.t('modal.closeLabel')}
          aria-expanded="false"
          onClick={handleClose}
          type="button"
        >
          <SidebarLogo />
        </SidebarCloseStyle>
      </SidebarTitleCloseStyle>

      <SidebarContent />
      <SidebarMakeStyle>
        {i18n.t('sidebar.exp')}
        <SidebarLogoMakeStyle focusable="false" aria-hidden />
      </SidebarMakeStyle>
    </ReactModal>
  );
};
