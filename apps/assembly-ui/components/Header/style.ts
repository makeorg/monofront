import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { Image } from '@make.org/ui/components/Image';
import { typography } from '@make.org/designsystem/tokens/typography';
import { SidebarLogo } from '../../assets/SidebarSimple';

export const HeaderContainerStyle = styled.header`
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const HeaderImgStyle = styled(Image)`
  max-height: 35px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    max-height: 45px;
  }
`;

export const HeaderButton = styled.button`
  border: none;
  background: none;
`;

export const HeaderSvgStyle = styled.button`
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  outline: none;
  border-style: none;
  display: flex;
  width: 37px;
  height: 37px;
  background-color: #f4f4f4;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;
export const HeaderSvgLogoSidebarStyle = styled(SidebarLogo)`
  width: 100%;
  height: auto;
`;

export const HeaderLogosContainerStyle = styled.div`
  display: flex;
  width: 100%;
  padding: ${spacings.s} ${spacings.m};
  max-width: ${intToPx(Breakpoints.LargeDesktop)};
  justify-content: space-between;

  @media (min-width: 1260px) {
    margin: auto;
  }
`;

export const HeaderLogoMakeStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 5px;
`;

export const HeaderBetaStyle = styled.p`
  font-size: ${typography.FontSize.Text.RueDeLappe};
  color: #5f5f5f;
  font-weight: 600;
`;

export const HeaderSidebarLogoContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;
