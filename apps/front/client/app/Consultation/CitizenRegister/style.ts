import styled from 'styled-components';
import { typography } from 'athena-design-tokens';
import { intToPx, pxToPercent } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import { TitleS } from '@make.org/designsystem/components/Titles';
import { BodyMDefault } from '@make.org/designsystem/components/Body';
import { colors } from '@make.org/designsystem/tokens/colors';

export const CitizenRegisterContentStyle = styled(FlexElementStyle)`
  justify-content: flex-start;
  justify-items: flex-start;
  flex-flow: column;
  padding: 30px 0 40px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    width: ${pxToPercent(750, 1140)};
  }
`;

export const CitizenRegisterTitleStyle = styled(TitleS)`
  text-transform: none;
  margin: 15px 0 10px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
    margin: 15px 0;
  }
`;

export const CitizenRegisterSubtitleStyle = styled(BodyMDefault)`
  width: 100%;
  margin: 15px 0 10px;
  color: ${colors.Content.Interface.DarkSecondary};
`;

export const SocialCitizenRegisterWrapperStyle = styled(FlexElementStyle)`
  margin: 15px 0 10px;
  flex-flow: column wrap;
  align-content: flex-start;
`;
