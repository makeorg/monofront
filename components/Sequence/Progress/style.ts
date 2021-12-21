import styled from 'styled-components';
import { SvgPreviousArrowLeft } from '@make.org/ui/Svg/elements';
import { color, typography } from 'athena-design-tokens';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { QuestionThemeType } from '@make.org/types';

export const ProgressPreviousButtonStyle = styled(UnstyledButtonStyle)`
  flex: 0;
  padding: 2px 12px;
  border-radius: 20px;
  background-color: ${color.white};
  border-radius: 20px;
  &:disabled .tofill {
    fill: ${color.grey};
  }
`;

export const ProgressIconStyle = styled(SvgPreviousArrowLeft)`
  width: 13px;
  &.widget {
    width: 10px;
  }
`;

export const ProgressCounterStyle = styled.span<{
  disabled?: boolean;
}>`
  align-self: center;
  flex: 0;
  color: ${color.greyDark};
  padding: 0 10px;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  line-height: 1;
  &:disabled {
    margin: 0 12px;
    border-radius: 20px;
    background-color: ${color.greyLighter};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
    line-height: 1.5;
    padding: 0 25px;
    &.widget {
      padding: 0 10px;
      font-size: ${intToPx(typography.font.fontsize.X2S.value)};
      line-height: 1;
    }
  }
`;

export const ProgressBarWrapperStyle = styled.div`
  position: relative;
  flex: 1;
  border-radius: 12.5px;
  overflow: hidden;
  background-color: ${color.white};
  border: 1px solid ${color.grey};
`;

export const ProgressBarStyle = styled.div<{
  theme: QuestionThemeType;
  percentWidth?: number | string;
}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ percentWidth }) => percentWidth};
  background-color: ${({ theme }) => theme.color};
  transition: width ease-in 0.5s;
`;
