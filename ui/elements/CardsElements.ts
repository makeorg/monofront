import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { ShadowColors } from '@make.org/assets/vars/Colors';
import {
  Breakpoints,
  Layouts,
  DefaultPadding,
} from '@make.org/assets/vars/Breakpoints';
import { Elements } from '@make.org/assets/vars/Elements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { Link } from 'react-router-dom';
import { FlexElementStyle } from './FlexElements';
import { ParagraphStyle } from './ParagraphElements';
import { SvgExternalLink, SvgLock } from '../Svg/elements';
import { LinkAsRedButtonStyle, RedButtonStyle } from './ButtonsElements';

export const CardStyle = styled.article`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  width: 100%;
  flex: 1 1 auto;
  max-width: ${intToPx(Layouts.ContainerWidth)};
  padding: ${intToPx(DefaultPadding.Mobile)};
  background-color: ${color.white};
  box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    border-radius: ${intToPx(Elements.BorderRadius)};
  }
`;

export const TallCardStyle = styled(CardStyle)`
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    max-height: 550px;
    padding: ${intToPx(DefaultPadding.Desktop)};
  }
`;

export const ParticipateCardTitleStyle = styled.h4`
  font-family: ${MakeFonts.CircularStandardBold};
  text-transform: none;
  font-size: ${intToPx(typography.font.fontsize.L.value)};
  margin: 15px 0 10px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
    margin: 15px 0;
  }
`;

export const ParticipateCardAltTitleStyle = styled.h4`
  font-family: ${MakeFonts.CircularStandardBold};
  text-transform: none;
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  margin-bottom: 10px;
`;

export const ParticipateCardDescriptionStyle = styled(ParagraphStyle)`
  margin-bottom: 25px;
`;

export const ParticipateCardAltDescriptionStyle = styled(ParagraphStyle)`
  margin-bottom: 15px;
`;

export const ParticipateCardButtonStyle = styled(RedButtonStyle)`
  align-self: flex-start;
`;

export const ParticipateCardLinkAsButtonStyle = styled(LinkAsRedButtonStyle)`
  align-self: flex-start;
`;

export const ParticipateCardLinkStyle = styled(Link)`
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  text-decoration: none;
  text-transform: uppercase;
  color: ${color.black};
  border: solid ${color.black} 1px;
  border-radius: 50px;
  width: max-content;
  height: 35px;
  padding: 15px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ParticipateCardExternalLinkStyle = styled.a`
  display: flex;
  align-items: center;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.black};
`;

export const ParticipateCardSoonStyle = styled(FlexElementStyle)`
  align-items: center;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.greyDark};
`;

export const ParticipateCardSoonIconStyle = styled(SvgLock)`
  margin-right: 10px;
`;

export const ParticipateCardExternalIconStyle = styled(SvgExternalLink)`
  width: 12px;
  height: 12px;
  margin-left: 5px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 14px;
    height: 14px;
  }
`;

export const ParticipateCardStyle = styled.section<{
  isKeywordActive?: boolean;
}>`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background-color: ${color.white};
  border-radius: ${intToPx(Elements.BorderRadius)};
  padding: 30px;
  &.no-padding-bottom {
    padding-bottom: 0px;
  }
  &.margin-bottom {
    margin-bottom: 20px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    &.desktop-half {
      width: 50%;
    }

    &.desktop-padding-left {
      margin-left: ${props => (props.isKeywordActive ? '0px' : '10px')};
    }
    &.desktop-padding-right {
      margin-right: ${props => (props.isKeywordActive ? '0px' : '10px')};
    }
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    &.margin-bottom {
      margin-bottom: 30px;
    }
    &.desktop-padding-left {
      margin-left: ${props => (props.isKeywordActive ? '0px' : '15px')};
    }
    &.desktop-padding-right {
      margin-right: ${props => (props.isKeywordActive ? '0px' : '15px')};
    }
  }
`;
