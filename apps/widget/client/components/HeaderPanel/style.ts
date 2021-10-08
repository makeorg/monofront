import { typography } from 'athena-design-tokens';
import { BasicColors } from '@make.org/assets/vars/Colors';
import { RedButtonAsLinkStyle } from '@make.org/ui/elements/ButtonsElements';
import { SvgSmallLogo } from '@make.org/ui/Svg/elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';

export const PanelContainer = styled.div`
  background-color: ${BasicColors.PureWhite};
  padding: 20px;
  width: 100%;
  height: 175px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-evenly;
`;

export const MainTitleStyle = styled.h1`
  line-height: 20px;
  margin-bottom: 10px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 20px;
  }
`;

export const LogoStyle = styled(SvgSmallLogo)`
  width: 41px;
  height: 20px;
`;

export const ProposeButtonStyle = styled(RedButtonAsLinkStyle)`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: ${intToPx(typography.font.fontsize.XS.value)};
  margin-top: 15px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-top: 20px;
  }
`;
