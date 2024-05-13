import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { LinkAsRedButton } from '@make.org/ui/elements/LinkElements';
import styled from 'styled-components';
import { TitleXXSStyle } from '@make.org/designsystem/components/Typography/Titles/style';
import { TextMStyle } from '@make.org/designsystem/components/Typography/Text/style';

export const ResultCardReportButtonStyle = styled(LinkAsRedButton)`
  width: fit-content;
`;

export const ResultCardSidebarStyle = styled.section<{ isContext: boolean }>`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background-color: ${colors.Background.Interface.Lighter};
  border-radius: ${intToPx(BorderRadius)};
  padding: ${props => (props.isContext ? '25px 25px 0px' : '25px')};
  margin-bottom: ${props => (props.isContext ? '0px' : `${spacings.l}`)};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: ${spacings.l};
    margin-bottom: ${spacings.l};
  }
`;

export const ResultCardSidebarTitleStyle = styled(TitleXXSStyle).attrs({
  as: 'h4',
})`
  text-transform: none;
  letter-spacing: 0.12px;
`;

export const ResultCardSidebarParagraphStyle = styled(TextMStyle)`
  letter-spacing: 0.14px;
  color: ${colors.Content.Interface.DarkSecondary};
  padding-top: ${spacings.s};
  padding-bottom: ${spacings.sm};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-top: ${spacings.m};
  }
`;
