import styled from 'styled-components';

import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import {
  Breakpoints,
  Layouts,
  DefaultPadding,
} from '@make.org/assets/vars/Breakpoints';
import { shadows } from '@make.org/designsystem/tokens/shadows';
import { Link } from 'react-router-dom';
import {
  TitleSStyle,
  TitleXXSStyle,
} from '@make.org/designsystem/components/Typography/Titles/style';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { TitleStyleType } from '@make.org/designsystem/components/Typography/Titles';
import { FlexElementStyle } from './FlexElements';
import { ParagraphStyle } from './ParagraphElements';
import { SvgExternalLink, SvgLock } from '../Svg/elements';
import { LinkAsRedButtonStyle, RedButtonStyle } from './ButtonsElements';

export const BorderRadius = 8;

export const CardStyle = styled.article`
  display: flex;
  flex-flow: column;
  position: relative;
  justify-content: space-between;
  width: 100%;
  flex: 1 1 auto;
  max-width: ${intToPx(Layouts.ContainerWidth)};
  padding: ${intToPx(DefaultPadding.Mobile)};
  background-color: ${colors.Background.Interface.Lighter};
  box-shadow: ${shadows.s10};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    border-radius: ${intToPx(BorderRadius)};
  }
`;

export const TallCardStyle = styled(CardStyle)`
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    max-height: 550px;
    padding: ${intToPx(DefaultPadding.Desktop)};
  }
`;

export const ParticipateCardTitleStyle = styled(TitleSStyle).attrs({
  as: 'h4',
  type: TitleStyleType.highlight,
})`
  text-transform: none;
  margin: ${spacings.sm} 0 ${spacings.s};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.IleDeFrance};
    margin: ${spacings.sm} 0;
  }
`;

export const ParticipateCardAltTitleStyle = styled(TitleXXSStyle).attrs({
  as: 'h3',
})`
  text-transform: none;
  margin-bottom: ${spacings.s};
`;

export const ParticipateCardDescriptionStyle = styled(ParagraphStyle)`
  margin-bottom: 25px;
`;

export const ParticipateCardAltDescriptionStyle = styled(ParagraphStyle)`
  margin-bottom: ${spacings.sm};
`;

export const ParticipateCardButtonStyle = styled(RedButtonStyle)`
  align-self: flex-start;
`;

export const ParticipateCardLinkAsButtonStyle = styled(LinkAsRedButtonStyle)`
  align-self: flex-start;
`;

export const ParticipateCardLinkStyle = styled(Link)`
  font-family: ${typography.FontFamily.Condensed};
  font-size: ${typography.FontSize.Arrondissement};
  text-decoration: none;
  text-transform: uppercase;
  color: ${colors.Content.Interface.Dark};
  border: solid ${colors.Border.Interface.Darker} 1px;
  border-radius: 50px;
  width: max-content;
  height: 35px;
  padding: ${spacings.sm} 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ParticipateCardExternalLinkStyle = styled.a`
  display: flex;
  align-items: center;
  font-size: ${typography.FontSize.Arrondissement};
  color: ${colors.Content.Interface.Dark};
`;

export const ParticipateCardSoonStyle = styled(FlexElementStyle)`
  align-items: center;
  font-size: ${typography.FontSize.Arrondissement};
  color: ${colors.Content.Interface.DarkSecondary};
`;

export const ParticipateCardSoonIconStyle = styled(SvgLock)`
  margin-right: ${spacings.s};
`;

export const ParticipateCardExternalIconStyle = styled(SvgExternalLink)`
  width: 12px;
  height: 12px;
  margin-left: ${spacings.xs};
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
  background-color: ${colors.Background.Interface.Lighter};
  border-radius: ${intToPx(BorderRadius)};
  padding: ${spacings.l};
  &.no-padding-bottom {
    padding-bottom: 0px;
  }
  &.margin-bottom {
    margin-bottom: ${spacings.m};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    &.desktop-half {
      width: 50%;
    }

    &.desktop-padding-left {
      margin-left: ${props =>
        props.isKeywordActive ? '0px' : `${spacings.s}`};
    }
    &.desktop-padding-right {
      margin-right: ${props =>
        props.isKeywordActive ? '0px' : `${spacings.s}`};
    }
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    &.margin-bottom {
      margin-bottom: ${spacings.l};
    }
    &.desktop-padding-left {
      margin-left: ${props =>
        props.isKeywordActive ? '0px' : `${spacings.sm}`};
    }
    &.desktop-padding-right {
      margin-right: ${props =>
        props.isKeywordActive ? '0px' : `${spacings.sm}`};
    }
  }
`;

export const ParticipateCardCantProposalTextStyle = styled.p`
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
  margin-top: ${spacings.sm};
`;
