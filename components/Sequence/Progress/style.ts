import styled from 'styled-components';
import { SvgPreviousArrowLeft } from '@make.org/ui/Svg/elements';
import { color, typography } from 'athena-design-tokens';
import {
  RedStyle,
  UnstyledButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { QuestionThemeType } from '@make.org/types';

const ProgressWidgetStyle = `
  &:disabled {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &:disabled svg {
    fill: rgba(0, 0, 0, 0.15);
  }
`;
export const ProgressPreviousButtonStyle = styled(UnstyledButtonStyle)`
  flex: 0;
  padding: 5px 15px;
  border-radius: 20px;
  background-color: ${color.white};
  border-radius: 20px;
  &:disabled .tofill {
    fill: ${color.grey};
  }
  &.widget {
    ${ProgressWidgetStyle}
    margin-right: 9px;
  }
`;

export const ProgressNextButtonStyle = styled(ProgressPreviousButtonStyle)`
  ${RedStyle}
  ${ProgressWidgetStyle}
`;

export const ProgressIconStyle = styled(SvgPreviousArrowLeft)`
  width: 13px;
  &.widget {
    width: 24px;
  }
`;
export const ProgressNextIconStyle = styled(SvgPreviousArrowLeft)`
  width: 13px;
  transform: scale(-1, -1);
  &.widget {
    width: 24px;
  }
`;

export const ProgressCounterStyle = styled.span<{
  disabled?: boolean;
  isWidget?: boolean;
}>`
  align-self: center;
  flex: 0;
  color: ${color.greyDark};
  font-size: ${props =>
    props.isWidget
      ? intToPx(typography.font.fontsize.X2S.value)
      : intToPx(typography.font.fontsize.XS.value)};
  padding: ${({ disabled }) => (disabled ? '9px 12px' : '0 5px')};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: ${({ disabled }) => (disabled ? '9px 12px' : '0 25px')};
  }
  &:disabled {
    margin: 0 12px;
    border-radius: 20px;
    background-color: ${color.greyLighter};
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
