import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import {
  DefaultPadding,
  Layouts,
  Breakpoints,
} from '@make.org/assets/vars/Breakpoints';
import {
  SecondLevelTitleStyle,
  ThirdLevelTitleStyle,
  FourthLevelTitleStyle,
} from '@make.org/ui/elements/TitleElements';
import { SmallSeparatorStyle } from '@make.org/ui/elements/SeparatorsElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import {
  SvgExternalLink,
  SvgBigCheck,
  SvgThumbsUp,
} from '@make.org/ui/Svg/elements';
import { StartColumnStyle } from '@make.org/ui/elements/FlexElements';
import { TitleM } from '@make.org/designsystem/components/Titles';
import { BodyXSDefault } from '@make.org/designsystem/components/Body';
import { colors } from '@make.org/designsystem/tokens/colors';

export const StaticPageWrapperStyle = styled.div`
  width: 100%;
  flex: 1 1 auto;
  padding: ${intToPx(DefaultPadding.Mobile)};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: ${intToPx(DefaultPadding.Desktop)} 20px;
  }
  max-width: ${intToPx(Layouts.ContainerWithPadding)};
  margin: 30px auto;
`;

export const FocusBlockWrapperStyle = styled(StartColumnStyle)`
  margin: 30px 0 15px;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${colors.Background.Interface.Lighter};
  padding: 20px;
  border-radius: 8px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 30px 40px;
  }
`;

export const FocusBlockTitleStyle = styled(TitleM).attrs({ as: 'strong' })`
  margin-bottom: 10px;
  letter-spacing: 0.5px;
  color: ${colors.Content.Interface.Dark};
`;

export const FocusBlockParagraphStyle = styled.p`
  color: ${colors.Content.Interface.DarkSecondary};
  font-size: ${typography.FontSize.Arrondissement};
  margin-bottom: 20px;
  line-height: 1.5;
  letter-spacing: 0.14px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-bottom: 20px;
  }
  &.no-margin {
    margin-bottom: 0;
  }
`;

export const FocusBlockCheckIconStyle = styled(SvgBigCheck)`
  width: 20px;
  height: 20px;
  margin-bottom: 15px;
`;

export const StaticSecondLevelTitleStyle = styled(SecondLevelTitleStyle)`
  text-align: center;
  margin: 0 0 30px;
`;

export const StaticThirdLevelTitleStyle = styled(ThirdLevelTitleStyle)`
  display: inline-flex;
  margin: 30px 0 5px;
`;

export const StaticFourthLevelTitleStyle = styled(FourthLevelTitleStyle)`
  display: flex;
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  text-transform: uppercase;
  text-transform: none;
  margin: 15px 0 5px;
  font-size: ${typography.FontSize.RueDeLappe};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
  padding-left: 40px;
`;

export const StaticFourthLevelBisTitleStyle = styled(
  StaticFourthLevelTitleStyle
)`
  margin: 15px 0 5px;
  padding-left: 0px;
`;

export const StaticListTitleStyle = styled(BodyXSDefault).attrs({ as: 'h5' })`
  text-transform: none;
  margin: 15px 0 0;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const StaticTitleExtra = styled.div`
  display: block;
  font-family: ${typography.FontFamily.Italic};
  text-transform: none;
  font-size: ${typography.FontSize.RueDeLappe};
  line-height: 2;
  color: ${colors.Content.Interface.DarkSecondary};
  text-align: center;
  margin-top: -30px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const StaticParagraphStyle = styled.p`
  margin: 0 0 15px;
  font-size: ${typography.FontSize.RueDeLappe};
  line-height: 2;
  color: ${colors.Content.Interface.DarkSecondary};
  white-space: pre-line;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
  &.custom {
    padding-left: 40px;
    & + h4 {
      margin-top: 30px;
    }
    & + ul {
      margin-left: 40px;
      & + h4 {
        margin-top: 30px;
      }
    }
  }
`;

export const StaticPhoneLinkStyle = styled.a`
  text-decoration: none;
  color: ${colors.Content.Interface.DarkSecondary};
`;

export const StaticStrongStyle = styled.strong`
  font-family: ${typography.FontFamily.Hightlight};
`;

export const StaticPrimaryUnorderedListStyle = styled.ol`
  margin: 15px 0 0;
  padding: 0;
`;

export const StaticPrimaryUnorderedListItemStyle = styled.li`
  list-style-type: none;
`;

export const StaticPrimaryOrderedListStyle = styled.ol`
  margin: 15px 0 0;
  padding: 0;
  counter-reset: articles;
`;

export const StaticPrimaryOrderedListItemStyle = styled.li`
  list-style-type: none;
  counter-increment: articles;
  &:before {
    content: counter(articles) '.';
    font-family: ${typography.FontFamily.Condensed};
    font-size: ${typography.FontSize.Arrondissement};
    margin-right: 10px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    &:before {
      font-size: ${typography.FontSize.Paris};
    }
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    &:before {
      font-size: ${typography.FontSize.PetiteCouronne};
    }
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    &:before {
      font-size: ${typography.FontSize.GrandeCouronne};
    }
  }
`;

export const StaticSecondaryOrderedListStyle = styled.ol`
  margin: 0;
  counter-reset: reset-articles;
`;

export const StaticSecondaryOrderedListItemStyle = styled.li`
  list-style-type: none;
  counter-increment: reset-articles;
  &:before {
    font-family: ${typography.FontFamily.Hightlight};
    font-weight: bold;
    font-size: ${typography.FontSize.RueDeLappe};
    line-height: 15px;
    margin-right: 10px;
  }
  &.section5:before {
    content: '5.' counter(reset-articles);
  }
  &.section6:before {
    content: '6.' counter(reset-articles);
  }
  &.section8:before {
    content: '8.' counter(reset-articles);
  }
  &.section9:before {
    content: '9.' counter(reset-articles);
  }
  &.section11:before {
    content: '11.' counter(reset-articles);
  }
  &.section12:before {
    content: '12.' counter(reset-articles);
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    &:before {
      font-size: ${typography.FontSize.Arrondissement};
    }
  }

  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    &:before {
      font-size: ${typography.FontSize.Arrondissement};
      line-height: 32px;
    }
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    &:before {
      font-size: ${typography.FontSize.Paris};
      line-height: 25px;
    }
  }
`;

export const StaticSquareListStyle = styled.ul`
  margin: 10px 0;
  word-break: break-word;
`;

export const StaticSquareListItemStyle = styled.li`
  list-style-type: square;
  font-size: ${typography.FontSize.RueDeLappe};
  line-height: 2;
  color: ${colors.Content.Interface.DarkSecondary};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const NoCookiesSectionStyle = styled.section`
  width: 100%;
  height: 100%;
  max-width: 630px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  justify-items: center;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

export const NoCookiesTitleStyle = styled.h1`
  margin: 0 auto 40px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 40px auto 80px;
  }
`;

export const NoCookiesSeparatorStyle = styled(SmallSeparatorStyle)`
  margin: 10px auto 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 20px auto 30px;
  }
`;

export const NoCookiesParagraphStyle = styled(ParagraphStyle)`
  color: ${colors.Content.Interface.Dark};
  margin-bottom: 15px;
  &.column {
    display: flex;
    flex-flow: column;
    font-family: ${typography.FontFamily.Hightlight};
    font-weight: bold;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-bottom: 30px;
  }
`;

export const NoCookiesAltParagraphStyle = styled.p`
  font-size: ${typography.FontSize.RueDeLappe};
  line-height: 1.5;
  color: rgb(0, 0, 0, 0, 065);
  a,
  a:hover,
  a:focus {
    color: ${colors.Content.Make.Secondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const StaticExternalLinkIconStyle = styled(SvgExternalLink)`
  width: 14px;
  height: 14px;
  margin-left: 5px;
  fill: ${colors.Content.Make.Secondary};
`;

export const ModerationParagraphStyle = styled.p`
  margin: 0 0 15px;
  font-size: ${typography.FontSize.Arrondissement};
  line-height: 2;
  color: ${colors.Content.Interface.DarkSecondary};
  white-space: pre-line;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    text-align: center;
  }
`;

export const StaticCenteredParagraphStyle = styled.p`
  font-size: ${typography.FontSize.Arrondissement};
  color: ${colors.Content.Interface.DarkSecondary};idée n’est pas déjà présente 
  text-align: center;
  padding: 0 20px;
`;

export const StaticSectionTitle = styled(ThirdLevelTitleStyle)`
  display: inline-flex;
  margin: 30px 0 5px;
  color: ${colors.Content.Interface.DarkSecondary};
`;

export const ModerationCharterWrapperStyle = styled(StaticPageWrapperStyle)`
  max-width: 840px;
`;

export const StaticModerationOrderedExamplesStyle = styled.ol`
  padding-left: 0;
  margin: 30px 0;
  &.list-style-inside {
    list-style-position: inside;
  }
  &.list-style-inside li::marker {
    color: ${colors.Content.Interface.Dark};
  }
`;

export const StaticModerationOrderedItemStyle = styled.li`
  align-self: flex-start;
  margin-top: 40px;
  &::marker {
    color: ${colors.Content.Alert.Neutral};
    font-weight: bold;
  }
`;

export const ModerationExampleCardsWrapperStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const ModerationExampleCardStyle = styled.div`
  border-radius: 8px;
  display: flex;
  height: 180px;
  flex: 1 0 300px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.Background.Interface.Lighter};
  &.refused {
    border-top: 5px solid ${colors.Border.Alert.Disagree};
  }
  &.accepted {
    border-top: 5px solid ${colors.Border.Alert.Positive};
  }
  & p {
    text-align: center !important;
  }
`;

export const ModerationExampleCardTitleStyle = styled(ThirdLevelTitleStyle)`
  margin-bottom: 20px;
  &.refused {
    color: ${colors.Content.Alert.Disagree};
  }
  &.accepted {
    color: ${colors.Content.Alert.Positive};
  }
`;

export const ModerationExampleCardTitleIconStyle = styled(SvgThumbsUp)`
  width: 18px;
  height: 18px;
  margin-right: 5px;
  &.refused {
    transform: rotate(180deg) scaleX(-1);
  }
  &.refused .tofill {
    fill: ${colors.Content.Alert.Disagree};
  }
  &.accepted .tofill {
    color: ${colors.Content.Alert.Positive};
  }
`;

export const ModerationFootnotesStyleOrderedListWrapperStyle = styled.ol`
  padding-left: 0;
  list-style-position: inside;
`;

export const ModerationFootnotesStyleOrderedListItemStyle = styled.li`
  color: ${colors.Content.Interface.DarkSecondary};
  font-size: ${typography.FontSize.RueDeLappe};
`;

export const ModerationSectionTitleStyle = styled(StaticSectionTitle)`
  color: ${colors.Content.Interface.Dark};
`;

export const ModerationDisclaimerParagraphStyle = styled(StaticParagraphStyle)`
  margin: 50px 0;
`;
