import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { color, typography } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import {
  MiddleColumnStyle,
  MiddleColumnToRowStyle,
  FlexElementStyle,
} from '@make.org/ui/elements/FlexElements';
import {
  SeparatorStyle,
  SmallSeparatorStyle,
} from '@make.org/ui/elements/SeparatorsElements';
import { LinkAsRedButton } from '@make.org/ui/elements/LinkElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';

export const InnerProposalStyle = styled(MiddleColumnStyle)`
  width: 100%;
  flex: 1 1 auto;
`;

export const ProposalFooterStyle = styled.footer`
  width: 100%;
`;

export const FooterContentStyle = styled(MiddleColumnToRowStyle)`
  width: 100%;
`;

export const DescriptionStyle = styled(ParagraphStyle)`
  width: 100%;
  max-width: 650px;
  color: ${color.greyDark};
  > span,
  > a {
    font-family: ${MakeFonts.CircularStandardBold};
    color: ${color.black};
    text-decoration: underline;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    text-align: right;
  }
`;

export const FooterContentSeparatorStyle = styled(SeparatorStyle)`
  max-width: 100px;
  margin: 5px 0 15px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    max-width: 2px;
    height: 60px;
    margin: 0 25px;
  }
`;

export const ButtonWrapperStyle = styled(FlexElementStyle)`
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) and (max-width: ${intToPx(
      Breakpoints.LargeDesktop
    )}) {
    flex-flow: column;
  }
`;

export const ButtonStyle = styled(LinkAsRedButton)`
  margin: 0 5px;
  text-align: center;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) and (max-width: ${intToPx(
      Breakpoints.LargeDesktop
    )}) {
    margin: 5px 0;
  }
`;

export const SharingWrapperStyle = styled(MiddleColumnToRowStyle)`
  width: 100%;
  margin: 15px 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 15px 0;
  }
`;

export const SharingTitleStyle = styled.h2`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.greyDark};
  margin: 0 0 10px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
    margin: 0 20px;
  }
`;

export const ProposalCardContentStyle = styled.blockquote`
  max-width: 100%;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  line-height: normal;
  font-family: ${MakeFonts.CircularStandardBook};
  text-align: center;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.L.value)};
  }
`;

export const ProposalCardSeparatorStyle = styled(SmallSeparatorStyle)`
  margin: 10px 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 15px 0 25px;
  }
`;
