import React, { FC, useRef, useEffect } from 'react';
import i18n from 'i18next';
import ReactModal from 'react-modal';
import { lockBody, unlockBody } from '@make.org/utils/helpers/styled';
import useOnClickOutside from '@make.org/utils/hooks/useOnClickOutside';
import { SidebarCloseLogo } from '../../assets/sidebarclose';
import { SidebarContent } from './Content';
import { LogoMakeStyle } from '../style';
import {
  SidebarContentStyle,
  SidebarTitleCloseStyle,
  SidebarCloseStyle,
  SidebarMakeStyle,
  SidebarTitleStyle,
} from './style';

ReactModal.setAppElement('#app');

type Props = {
  open: boolean;
  close: () => void;
};

export const SidebarModal: FC<Props> = ({ open, close }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lockBody();
  }, []);

  const handleClose = () => {
    unlockBody();
    close();
  };

  const handleClickOutside = () => {
    if (open) {
      unlockBody();
      close();
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <ReactModal
      isOpen={open}
      overlayClassName="sidebar-overlay"
      className="sidebar-dialog"
    >
      <SidebarContentStyle ref={ref}>
        <SidebarTitleCloseStyle>
          <SidebarTitleStyle>{i18n.t('sidebar.explore')}</SidebarTitleStyle>
          <SidebarCloseStyle
            aria-label={i18n.t('modal.closeLabel')}
            aria-expanded="true"
            onClick={handleClose}
            type="button"
          >
            <SidebarCloseLogo />
          </SidebarCloseStyle>
        </SidebarTitleCloseStyle>
        <SidebarContent closeModal={handleClose} />
        <SidebarMakeStyle>
          {i18n.t('sidebar.exp')}
          <LogoMakeStyle focusable="false" aria-hidden />
        </SidebarMakeStyle>
      </SidebarContentStyle>
    </ReactModal>
  );
};
