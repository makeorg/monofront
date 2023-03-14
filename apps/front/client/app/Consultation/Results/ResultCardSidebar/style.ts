import { colors } from '@make.org/designsystem/tokens/colors';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { TitleXXS } from '@make.org/designsystem/components/Titles';
import { BodyMDefault } from '@make.org/designsystem/components/Body';

export const ResultCardSidebarStyle = styled.section<{ isContext: boolean }>`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background-color: ${colors.Background.Interface.Lighter};
  border-radius: ${intToPx(BorderRadius)};
  padding: ${props => (props.isContext ? '25px 25px 0px' : '25px')};
  margin-bottom: ${props => (props.isContext ? '0px' : '30px')};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 30px;
    margin-bottom: 30px;
  }
`;

export const ResultCardSidebarTitleStyle = styled(TitleXXS).attrs({ as: 'h4' })`
  text-transform: none;
  letter-spacing: 0.12px;
`;

export const ResultCardSidebarParagraphStyle = styled(BodyMDefault)`
  letter-spacing: 0.14px;
  color: ${colors.Content.Interface.DarkSecondary};
  padding-top: 10px;
  padding-bottom: 15px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-top: 20px;
  }
`;
