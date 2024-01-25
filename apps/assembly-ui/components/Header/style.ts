import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';

export const HeaderContainerStyle = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const HeaderImgStyle = styled.img`
  height: 35px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    height: 45px;
  }
`;

export const HeaderButton = styled.button`
  border: none;
  background: none;
`;

export const HeaderSvgStyle = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  min-width: 37px;
  height: 37px;
  background-color: #f4f4f4;
  border-radius: 5px;
  margin-left: 20px;
  cursor: pointer;
  @media (min-width: 1260px) {
    position: absolute;
  }
`;

export const HeaderLogosContainerStyle = styled.div`
  display: flex;
  width: 100%;
  margin: 0;
  padding: ${spacings.m};
  max-width: ${intToPx(Breakpoints.LargeDesktop)};
  justify-content: space-between;

  @media (min-width: 1260px) {
    margin: auto;
  }
  &.end {
    justify-content: flex-end;
  }
`;

export const HeaderLogoMakeStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 35px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    height: 45px;
  }
`;

export const HeaderBetaStyle = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 17px;
  font-size: 10px;
  border: 1px solid black;
  border-radius: 3px;
  text-transform: uppercase;
  font-weight: 600;
`;

export const HeaderMakeStyle = styled.p`
  width: 75px;
  text-transform: uppercase;
  font-size: 10px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    width: 90px;
    font-size: ${typography.FontSize.Text.RueDeLappe};
  }
`;