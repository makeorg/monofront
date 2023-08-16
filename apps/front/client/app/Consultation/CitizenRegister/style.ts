import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx, pxToPercent } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import { TitleSStyle } from '@make.org/designsystem/components/Typography/Titles/style';
import { TextMStyle } from '@make.org/designsystem/components/Typography/Text/style';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { TitleStyleType } from '@make.org/designsystem/components/Typography/Titles';

export const CitizenRegisterContentStyle = styled(FlexElementStyle)`
  justify-content: flex-start;
  justify-items: flex-start;
  flex-flow: column;
  padding: ${spacings.l} 0 40px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    width: ${pxToPercent(750, 1140)};
  }
`;

export const CitizenRegisterTitleStyle = styled(TitleSStyle).attrs({
  as: 'h4',
  type: TitleStyleType.highlight,
})`
  text-transform: none;
  margin: ${spacings.sm} 0 ${spacings.s};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.IleDeFrance};
    margin: ${spacings.sm} 0;
  }
`;

export const CitizenRegisterSubtitleStyle = styled(TextMStyle)`
  width: 100%;
  margin: ${spacings.sm} 0 ${spacings.s};
  color: ${colors.Content.Interface.DarkSecondary};
`;

export const SocialCitizenRegisterWrapperStyle = styled(FlexElementStyle)`
  margin: ${spacings.sm} 0 ${spacings.s};
  flex-flow: column wrap;
  align-content: flex-start;
`;
