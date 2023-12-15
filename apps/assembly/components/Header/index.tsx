import React, { FC, useState } from 'react';
import i18n from 'i18next';
import client from '../../assets/Client_logos.png';
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

export const Header: FC = () => {
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
        <HeaderImgStyle src={client} alt="" />
        <HeaderLogoMakeStyle>
          <HeaderBetaStyle>{i18n.t('header.beta')}</HeaderBetaStyle>
          <HeaderMakeStyle> {i18n.t('header.make')}</HeaderMakeStyle>
        </HeaderLogoMakeStyle>
      </HeaderLogosContainerStyle>
    </HeaderContainerStyle>
  );
};
