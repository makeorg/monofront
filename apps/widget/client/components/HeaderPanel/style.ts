import { typography, color } from 'athena-design-tokens';
import { RedButtonAsLinkStyle } from '@make.org/ui/elements/ButtonsElements';
import {
  SvgSmallLogo,
  SvgControversy,
  SvgPopular,
} from '@make.org/ui/Svg/elements';
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
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
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
  align-self: flex-start;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    align-self: auto;
  }
`;

export const KindLabelWrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const KindLabelStyle = styled.div`
  border-radius: 8px;
  background-color: ${color.greyLighter};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 0;
  }
`;

export const KindLabelTextStyle = styled.span`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: ${intToPx(typography.font.fontsize.XS.value)};
  font-weight: 700;
  padding: 8px;
  letter-spacing: 0.22px;
`;

export const KindLabelControversyIconStyle = styled(SvgControversy)`
  width: 20px;
  height: 24px;
  margin-left: 8px;
`;

export const KindLabelPopularIconStyle = styled(SvgPopular)`
  width: 20px;
  height: 24px;
  margin-left: 8px;
`;
