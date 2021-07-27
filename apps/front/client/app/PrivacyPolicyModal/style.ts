import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { typography, color } from 'athena-design-tokens';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import { WhiteButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';

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
    max-height: 356px;
    padding: 20px 30px 30px;
  }
`;

export const DataPolicyTitleStyle = styled.h2`
  display: flex;
  margin-top: 47px;
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  text-transform: none;
  line-height: 1.5;
  letter-spacing: 0.12px;
`;

export const DataPolicyParagraphStyle = styled.p<{ isRefusal?: boolean }>`
  display: inline-block;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: ${props => (props.isRefusal ? '15px 0px 15px' : '15px 0px 30px')};
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 1.5;
  letter-spacing: 0.14px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin: 8px 0px 15px;
  }
`;

export const ButtonWrapperStyle = styled(FlexElementStyle)`
  margin-top: 15px;
  width: 100%;
  flex-flow: row-reverse;
`;

export const RefusalWhiteButtonStyle = styled(WhiteButtonStyle)`
  border: solid 1px ${color.black};
  margin-right: 15px;
`;
