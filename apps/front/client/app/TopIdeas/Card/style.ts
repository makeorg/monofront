import styled from 'styled-components';
import { typography } from 'athena-design-tokens';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { SvgIdea, SvgLike, SvgThumbsUp } from '@make.org/ui/Svg/elements';
import { Link } from 'react-router-dom';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { CardStyle } from '@make.org/ui/elements/CardsElements';
import { colors } from '@make.org/designsystem/tokens/colors';

export const TopIdeaCardStyle = styled(CardStyle)`
  overflow: hidden;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
`;

export const TopIdeaCardHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  background-color: ${colors.Background.Interface.DarkMain};
`;

export const TopIdeaLinkStyle = styled(Link)`
  display: flex;
  align-items: center;
  color: ${colors.Content.Interface.Dark};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  &:hover,
  &:focus {
    color: ${colors.Content.Interface.Dark};
  }
  svg {
    fill: ${colors.Content.Interface.Dark};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const TopIdeaContentStyle = styled(Link)`
  width: 100%;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  align-self: flex-start;
  flex: 1 1 auto;
  margin-top: 15px;
  text-decoration: none;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.M.value)};
  }
`;

export const ProposalsAssociatedStyle = styled(ParagraphStyle)`
  display: inline-flex;
  align-items: center;
`;

export const ProposalsAssociatedTextStyle = styled(ParagraphStyle)`
  padding-bottom: 5px;
`;

export const TopIdeaCardContentStyle = styled.div`
  margin: 15px 0;
`;

export const PositionStyle = styled.div`
  display: flex;
  .tofill {
    fill: ${colors.Content.Make.Secondary};
  }
`;

export const PositionContentStyle = styled(ParagraphStyle)`
  margin-left: 10px;
`;

export const TopIdeaCollapseWrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  margin-top: 10px;
  border-top: 1px solid ${colors.Border.Interface.DarkSecondary};
`;

export const TopIdeaCollapseContentStyle = styled.div`
  display: block;
  visibility: hidden;
  height: 0;
  width: 100%;
  &.open {
    visibility: visible;
    height: auto;
  }
`;

export const TopIdeaCollapseTriggerStyle = styled(UnstyledButtonStyle)`
  display: flex;
  align-items: center;
  order: 1;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${colors.Content.Interface.DarkSecondary};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
  .tofill {
    fill: ${colors.Content.Make.Secondary};
  }
`;

export const TopIdeaCollapseIconStyle = {
  width: '22px',
  height: '22px',
  marginLeft: '7.5px',
};

export const ScoringContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  justify-content: space-between;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-direction: row;
  }
`;

export const SvgIdeaStyle = styled(SvgIdea)`
  width: 25px;
  height: 25px;
`;

export const SvgLikeStyle = styled(SvgLike)`
  width: 25px;
  height: 25px;
  fill: ${colors.Content.Make.Secondary};
`;

export const SvgThumbsUpStyle = styled(SvgThumbsUp)`
  width: 25px;
  height: 25px;
  .tofill {
    fill: ${colors.Content.Alert.Positive};
  }
`;
