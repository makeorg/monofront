import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { useIsSmallDevice } from '@make.org/utils/hooks/useIsSmallDevice';
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
  HeaderSidebarLogoContainerStyle,
  HeaderButton,
} from './style';
import { useAssemblyContext } from '../../store/context';

export const Header: FC = () => {
  const { state } = useAssemblyContext();
  const { logoUrl } = state.event;
  const [openSidebar, setOpenSidebar] = useState(false);
  const { isSmallDevice } = useIsSmallDevice();

  return (
    <HeaderContainerStyle>
      {openSidebar && (
        <SidebarModal open={openSidebar} close={() => setOpenSidebar(false)} />
      )}

      <HeaderLogosContainerStyle>
        <HeaderSidebarLogoContainerStyle>
          <HeaderSvgStyle
            type="button"
            aria-label={i18n.t('modal.openLabel')}
            aria-expanded="false"
            onClick={() => setOpenSidebar(true)}
          >
            <SidebarLogo />
          </HeaderSvgStyle>
          {logoUrl && (
            <HeaderButton
              type="button"
              title={i18n.t('header.top')}
              onClick={scrollToTop}
            >
              <HeaderImgStyle src={logoUrl} alt="" />
            </HeaderButton>
          )}
        </HeaderSidebarLogoContainerStyle>

        {(!logoUrl || !isSmallDevice) && (
          <HeaderLogoMakeStyle>
            <HeaderBetaStyle>{i18n.t('sidebar.exp')}</HeaderBetaStyle>
            <LogoMakeStyle focusable="false" aria-hidden />
          </HeaderLogoMakeStyle>
        )}
      </HeaderLogosContainerStyle>
    </HeaderContainerStyle>
  );
};
