import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { env } from '@make.org/assets/env';
import { SidebarLogo } from '../../assets/SidebarSimple';
import { LogoMakeStyle } from '../style';
import { SidebarModal } from '../SideBar/Modal';
import {
  HeaderContainerStyle,
  HeaderImgStyle,
  HeaderLogosContainerStyle,
  HeaderSvgStyle,
  HeaderLogoMakeStyle,
  HeaderBetaStyle,
  HeaderButton,
} from './style';
import { useAssemblyContext } from '../../store/context';

export const Header: FC = () => {
  const { state } = useAssemblyContext();
  const { logoUrl } = state.event;
  const [openSidebar, setOpenSidebar] = useState(false);
  const isMobile = !!(env.isClientSide() && Math.min(window.innerWidth) < 768);

  return (
    <HeaderContainerStyle>
      <HeaderSvgStyle
        type="button"
        aria-label={i18n.t('modal.openLabel')}
        aria-expanded="false"
        onClick={() => setOpenSidebar(true)}
      >
        <SidebarLogo />
      </HeaderSvgStyle>

      {openSidebar && (
        <SidebarModal open={openSidebar} close={() => setOpenSidebar(false)} />
      )}

      <HeaderLogosContainerStyle className={!logoUrl ? 'end' : ''}>
        {logoUrl && (
          <HeaderButton
            type="button"
            title={i18n.t('header.top')}
            onClick={scrollToTop}
          >
            <HeaderImgStyle src={logoUrl} alt="" />
          </HeaderButton>
        )}
        {(!logoUrl || !isMobile) && (
          <HeaderLogoMakeStyle>
            <HeaderBetaStyle>{i18n.t('sidebar.exp')}</HeaderBetaStyle>
            <LogoMakeStyle focusable="false" aria-hidden />
          </HeaderLogoMakeStyle>
        )}
      </HeaderLogosContainerStyle>
    </HeaderContainerStyle>
  );
};
