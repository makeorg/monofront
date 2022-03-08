import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
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
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import { SvgExternalLink, SvgBigCheck } from '@make.org/ui/Svg/elements';
import { StartColumnStyle } from '@make.org/ui/elements/FlexElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';

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
  background-color: ${color.white};
  padding: 20px;
  border-radius: 8px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 30px 40px;
  }
`;

export const FocusBlockTitleStyle = styled.strong`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.XL.value)};
  margin-bottom: 10px;
  line-height: 1.5;
  letter-spacing: 0.5px;
`;

export const FocusBlockParagraphStyle = styled.p`
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
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
  display: inline-flex;
  font-family: ${MakeFonts.CircularStandardBold};
  text-transform: none;
  margin: 15px 0 5px;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const StaticListTitleStyle = styled.h5`
  font-family: ${MakeFonts.CircularStandardBook};
  text-transform: none;
  margin: 15px 0 0;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const StaticTitleExtra = styled.span`
  display: block;
  font-family: ${MakeFonts.PlayfairDisplayRegularItalic};
  text-transform: none;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  line-height: 2;
  color: ${color.greyDark};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const StaticParagraphStyle = styled.p`
  margin: 0 0 15px;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  line-height: 2;
  color: ${color.greyDark};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const StaticPhoneLinkStyle = styled.a`
  text-decoration: none;
  color: ${color.greyDark};
`;

export const StaticStrongStyle = styled.strong`
  font-display: ${MakeFonts.CircularStandardBold};
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
    font-family: ${MakeFonts.TradeGothicBoldCondensed};
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
    margin-right: 10px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    &:before {
      font-size: ${intToPx(typography.font.fontsize.S.value)};
    }
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    &:before {
      font-size: ${intToPx(typography.font.fontsize.M.value)};
    }
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    &:before {
      font-size: ${intToPx(typography.font.fontsize.L.value)};
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
    font-family: ${MakeFonts.CircularStandardBold};
    font-size: ${intToPx(typography.font.fontsize.X2S.value)};
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
      font-size: ${intToPx(typography.font.fontsize.XS.value)};
    }
  }

  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    &:before {
      font-size: ${intToPx(typography.font.fontsize.XS.value)};
      line-height: 32px;
    }
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    &:before {
      font-size: ${intToPx(typography.font.fontsize.S.value)};
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
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  line-height: 2;
  color: ${color.greyDark};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
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
  color: ${color.black};
  margin-bottom: 15px;
  &.column {
    display: flex;
    flex-flow: column;
    font-family: ${MakeFonts.CircularStandardBold};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-bottom: 30px;
  }
`;

export const NoCookiesAltParagraphStyle = styled.p`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  line-height: 1.5;
  color: rgb(0, 0, 0, 0, 065);
  a,
  a:hover,
  a:focus {
    color: ${color.brandSecondary};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const NoCookiesLinkStyle = styled(RedHTMLLinkElementStyle)`
  margin-top: 10px;
`;

export const StaticExternalLinkIconStyle = styled(SvgExternalLink)`
  width: 14px;
  height: 14px;
  margin-left: 5px;
  fill: ${color.brandSecondary};
`;
