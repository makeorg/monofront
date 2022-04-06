import { typography, color } from 'athena-design-tokens';
import { RedButtonAsLinkStyle } from '@make.org/ui/elements/ButtonsElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { Image } from '@make.org/ui/components/Image';
import { SvgSmallLogo } from '@make.org/ui/Svg/elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';

export const PanelContainer = styled.div`
  background-color: ${color.greyLighter};
  padding: 15px 15px 5px;
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

export const InnerPanelWrapperStyle = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
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
  align-self: center;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    align-self: auto;
  }
`;

export const KindLabelWrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${color.greyLighter};
  margin: 15px 0;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    margin: 0;
  }
`;

export const KindLabelTextStyle = styled.span`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  line-height: ${intToPx(typography.font.fontsize.XS.value)};
  font-family: ${MakeFonts.CircularStandardBold};
  padding: 8px;
  letter-spacing: 0.12px;
`;

export const KindLabelControversyIconStyle = styled(Image)`
  width: 20px;
  height: 24px;
  margin-left: 8px;
`;

export const KindLabelPopularIconStyle = styled(Image)`
  width: 24px;
  height: 24px;
  margin-left: 8px;
`;
