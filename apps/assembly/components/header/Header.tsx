import React, { FC } from 'react';
import i18n from 'i18next';
import client from '../../assets/Client_logos.png';
import { Sidebar } from '../../assets/SidebarSimple';
import {
  HeaderContainer,
  HeaderImg,
  HeaderLogosContainer,
  HeaderSvg,
  HeaderLogoMake,
  HeaderBeta,
  HeaderMake,
} from './style';

export const Header: FC = () => (
  <HeaderContainer>
    <HeaderSvg>
      <Sidebar />
    </HeaderSvg>

    <HeaderLogosContainer>
      <HeaderImg src={client} alt="" />
      <HeaderLogoMake>
        <HeaderBeta>{i18n.t('header.beta')}</HeaderBeta>
        <HeaderMake> {i18n.t('header.make')}</HeaderMake>
      </HeaderLogoMake>
    </HeaderLogosContainer>
  </HeaderContainer>
);
