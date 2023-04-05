import styled from 'styled-components';
import {
  PageWrapperStyle,
  PageContainerStyle,
} from '@make.org/ui/elements/MainElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { FormCenterAlignStyle } from '@make.org/ui/elements/FormElements';
import { FourthLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const CALC_RECOVERY_HEIGHT_MOBILE: number = 67 + 96 + 20;
export const CALC_RECOVERY_HEIGHT_DESKTOP: number = 75 + 48 + 30;

export const PasswordRecoveryWrapperStyle = styled(PageWrapperStyle)`
  padding-bottom: 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding-bottom: 0;
  }
`;

export const PasswordRecoveryContentStyle = styled(PageContainerStyle)`
  min-height: calc(100vh - ${intToPx(CALC_RECOVERY_HEIGHT_MOBILE)});
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    min-height: calc(100vh - ${intToPx(CALC_RECOVERY_HEIGHT_DESKTOP)});
  }
`;

export const PasswordRecoveryStyle = styled.section`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100px;
  max-width: 697px;
`;

export const PasswordRecoveryFormStyle = styled(FormCenterAlignStyle)`
  max-width: 490px;
`;

export const PasswordRecoveryTitleStyle = styled(FourthLevelTitleStyle)`
  margin-bottom: ${spacings.m};
`;
