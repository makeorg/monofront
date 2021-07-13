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
  margin-bottom: 15px;
  a {
    color: ${color.brandSecondary};
  }
`;
