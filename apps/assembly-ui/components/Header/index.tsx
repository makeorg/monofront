import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { SidebarLogo } from '../../assets/SidebarSimple';
import { SidebarModal } from '../SideBar/Modal';
import {
  HeaderContainerStyle,
  HeaderImgStyle,
  HeaderLogosContainerStyle,
  HeaderSvgStyle,
  HeaderLogoMakeStyle,
  HeaderBetaStyle,
  HeaderMakeStyle,
} from './style';
import { useAssemblyContext } from '../../store/context';

export const Header: FC = () => {
  const { state } = useAssemblyContext();
  const { logoUrl } = state.event;

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <HeaderContainerStyle>
      <HeaderSvgStyle onClick={() => setOpenSidebar(true)}>
        <SidebarLogo />
      </HeaderSvgStyle>

      {openSidebar && (
        <SidebarModal open={openSidebar} close={() => setOpenSidebar(false)} />
      )}

      <HeaderLogosContainerStyle>
        <HeaderImgStyle src={logoUrl} alt="" />
        <HeaderLogoMakeStyle>
          <HeaderBetaStyle>{i18n.t('header.beta')}</HeaderBetaStyle>
          <HeaderMakeStyle> {i18n.t('header.make')}</HeaderMakeStyle>
        </HeaderLogoMakeStyle>
      </HeaderLogosContainerStyle>
    </HeaderContainerStyle>
  );
};
