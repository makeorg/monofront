import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
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
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const InnerProposalStyle = styled(MiddleColumnStyle)`
  width: 100%;
  flex: 1 1 auto;
  position: relative;
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
  color: ${colors.Content.Interface.DarkSecondary};
  > span,
  > a {
    font-family: ${typography.FontFamily.Highlight};
    font-weight: bold;
    color: ${colors.Content.Interface.Dark};
    text-decoration: underline;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    text-align: right;
  }
`;

export const FooterContentSeparatorStyle = styled(SeparatorStyle)`
  max-width: 100px;
  margin: ${spacings.xs} 0 ${spacings.sm};
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
  margin: 0 ${spacings.xs};
  text-align: center;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) and (max-width: ${intToPx(
      Breakpoints.LargeDesktop
    )}) {
    margin: ${spacings.xs} 0;
  }
`;

export const SharingWrapperStyle = styled(MiddleColumnToRowStyle)`
  width: 100%;
  margin: ${spacings.sm} 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: ${spacings.sm} 0;
  }
`;

export const SharingTitleStyle = styled.h2`
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
  margin: 0 0 ${spacings.s};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Paris};
    margin: 0 ${spacings.m};
  }
`;
export const ProposalCardContentStyle = styled.blockquote`
  max-width: 100%;
  font-size: ${typography.FontSize.RueDeLappe};
  line-height: normal;
  font-family: ${typography.FontFamily.Default};
  text-align: center;
  margin-bottom: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.GrandeCouronne};
  }
`;

export const ProposalCardSeparatorStyle = styled(SmallSeparatorStyle)`
  margin: 10px 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: ${spacings.sm} 0 25px;
  }
`;
