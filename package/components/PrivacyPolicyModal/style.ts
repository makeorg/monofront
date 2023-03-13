import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import { WhiteButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { TitleXXS } from '@make.org/designsystem/components/Titles';
import { BodyMDefault } from '@make.org/designsystem/components/Body';
import { colors } from '@make.org/designsystem/tokens/colors';

export const DataPolicyContentStyle = styled.form`
  display: flex;
  flex-flow: column;
  align-items: start;
  justify-content: space-between;
  padding: 20px 20px 30px;
  width: 315px;
  max-height: 501px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    width: 536px;
    max-height: 366px;
    padding: 20px 30px 30px;
  }
`;

export const DataPolicyTitleStyle = styled(TitleXXS).attrs({ as: 'h2' })`
  display: flex;
  margin-top: 47px;
  text-transform: none;
  letter-spacing: 0.12px;
`;

export const DataPolicyParagraphStyle = styled(BodyMDefault)<{
  isRefusal?: boolean;
}>`
  display: inline-block;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: ${props => (props.isRefusal ? '15px 0px 15px' : '15px 0px 30px')};
  letter-spacing: 0.14px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin: 8px 0px 15px;
  }
`;

export const ButtonWrapperStyle = styled(FlexElementStyle)`
  width: 100%;
  flex-flow: row-reverse;
`;

export const RefusalWhiteButtonStyle = styled(WhiteButtonStyle)`
  border: solid 1px ${colors.Border.Interface.Darker};
  margin-right: 15px;
`;
