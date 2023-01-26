import { color } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { Elements } from '@make.org/assets/vars/Elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { TitleXXS } from '@make.org/designsystem/components/Titles';
import { BodyMDefault } from '@make.org/designsystem/components/Body';

export const ResultCardSidebarStyle = styled.section<{ isContext: boolean }>`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background-color: ${color.white};
  border-radius: ${intToPx(Elements.BorderRadius)};
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
  color: ${color.greyDark};
  padding-top: 10px;
  padding-bottom: 15px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-top: 20px;
  }
`;
