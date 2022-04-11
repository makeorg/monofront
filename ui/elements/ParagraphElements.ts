import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { color, typography } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';

export const ParagraphStyle = styled.p`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.greyDark};
`;

export const PlayfairParagraphStyle = styled.p`
  font-family: ${MakeFonts.PlayfairDisplayRegularItalic};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${intToPx(typography.font.fontsize.M.value)};
  }
`;

export const CenterParagraphStyle = styled(ParagraphStyle)`
  text-align: center;
`;

export const InlineParagraphStyle = styled(ParagraphStyle)`
  display: inline;
`;

export const ExtraParagraphStyle = styled(InlineParagraphStyle)`
  margin-top: 15px;
`;

export const ExtraAltParagraphStyle = styled(InlineParagraphStyle)`
  margin-top: 10px;
`;

export const ConditionParagraphStyle = styled(InlineParagraphStyle)`
  width: 100%;
  font-family: ${MakeFonts.CircularStandardBook};
  margin-bottom: 15px;
  a {
    color: ${color.brandSecondary};
  }
`;

export const ConditionParagraphStylePanel = styled(InlineParagraphStyle)`
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  width: 100%;
  margin: 20px 0px;
  a {
    color: ${color.greyDark};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-top: 0px;
  }
`;

export const ConditionParagraphMarginStylePanel = styled(InlineParagraphStyle)`
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  width: 100%;
  margin-bottom: 15px;
  color: ${color.greyDark};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;
