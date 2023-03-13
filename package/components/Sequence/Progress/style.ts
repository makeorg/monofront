import styled from 'styled-components';
import { SvgPreviousArrowLeft } from '@make.org/ui/Svg/elements';
import { typography } from '@make.org/designsystem/tokens/typography';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { QuestionThemeType } from '@make.org/types';
import { colors } from '@make.org/designsystem/tokens/colors';

export const ProgressPreviousButtonStyle = styled(UnstyledButtonStyle)`
  flex: 0;
  padding: 2px 12px;
  border-radius: 20px;
  background-color: ${colors.Background.Interface.Lighter};
  border-radius: 20px;
  &:disabled .tofill {
    fill: ${colors.Background.Interface.DarkMain};
  }
`;

export const ProgressIconStyle = styled(SvgPreviousArrowLeft)`
  width: 13px;
  &.widget {
    width: 10px;
  }
`;

export const ProgressCounterStyle = styled.span`
  align-self: center;
  flex: 0;
  color: ${colors.Content.Interface.DarkSecondary};
  padding: 0 10px;
  font-size: ${typography.FontSize.RueDeLappe};
  line-height: 1;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Arrondissement};
    line-height: 1.5;
    padding: 0 25px;
    &.widget {
      padding: 0 10px;
      font-size: ${typography.FontSize.RueDeLappe};
      line-height: 1;
    }
  }
`;

export const ProgressBarWrapperStyle = styled.div`
  position: relative;
  flex: 1;
  border-radius: 12.5px;
  overflow: hidden;
  background-color: ${colors.Background.Interface.Lighter};
  border: 1px solid ${colors.Border.Interface.DarkMain};
  &.disabled {
    margin-left: 24px;
  }
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
