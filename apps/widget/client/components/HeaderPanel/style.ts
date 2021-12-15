import { typography, color } from 'athena-design-tokens';
import { RedButtonAsLinkStyle } from '@make.org/ui/elements/ButtonsElements';
import { SvgSmallLogo } from '@make.org/ui/Svg/elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';

export const PanelContainer = styled.div`
  background-color: ${color.greyLighter};
  padding: 15px;
  width: 100%;
  min-height: 125px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 20px;
  }
`;

export const MainTitleStyle = styled.h1`
  line-height: 20px;
  margin-bottom: 15px;
`;

export const LogoStyle = styled(SvgSmallLogo)`
  width: 41px;
  height: 20px;
`;

export const ProposeButtonStyle = styled(RedButtonAsLinkStyle)`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: ${intToPx(typography.font.fontsize.XS.value)};
  margin-top: 15px;
`;
