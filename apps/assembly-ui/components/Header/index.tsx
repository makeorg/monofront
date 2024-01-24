import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { scrollToTop } from '@make.org/utils/helpers/styled';
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
  HeaderButton,
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
        <HeaderLogoMakeStyle>
          <HeaderBetaStyle>{i18n.t('header.beta')}</HeaderBetaStyle>
          <HeaderMakeStyle> {i18n.t('header.make')}</HeaderMakeStyle>
        </HeaderLogoMakeStyle>
      </HeaderLogosContainerStyle>
    </HeaderContainerStyle>
  );
};
