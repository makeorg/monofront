import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { SvgIdea, SvgLike, SvgThumbsUp } from '@make.org/ui/Svg/elements';
import { Link } from 'react-router-dom';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { CardStyle } from '@make.org/ui/elements/CardsElements';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

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
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  background-color: ${colors.Background.Interface.DarkMain};
`;

export const TopIdeaLinkStyle = styled(Link)`
  display: flex;
  align-items: center;
  color: ${colors.Content.Interface.Dark};
  font-size: ${typography.FontSize.RueDeLappe};
  &:hover,
  &:focus {
    color: ${colors.Content.Interface.Dark};
  }
  svg {
    fill: ${colors.Content.Interface.Dark};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const TopIdeaContentStyle = styled(Link)`
  width: 100%;
  font-size: ${typography.FontSize.Arrondissement};
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  align-self: flex-start;
  flex: 1 1 auto;
  margin-top: ${spacings.sm};
  text-decoration: none;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Paris};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.PetiteCouronne};
  }
`;

export const ProposalsAssociatedStyle = styled(ParagraphStyle)`
  display: inline-flex;
  align-items: center;
`;

export const ProposalsAssociatedTextStyle = styled(ParagraphStyle)`
  padding-bottom: ${spacings.xs};
`;

export const TopIdeaCardContentStyle = styled.div`
  margin: ${spacings.sm} 0;
`;

export const PositionStyle = styled.div`
  display: flex;
  .tofill {
    fill: ${colors.Content.Make.Secondary};
  }
`;

export const PositionContentStyle = styled(ParagraphStyle)`
  margin-left: ${spacings.s};
`;

export const TopIdeaCollapseWrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: ${spacings.m};
  margin-top: ${spacings.s};
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
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
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
  margin-bottom: ${spacings.l};
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
