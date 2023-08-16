import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { TextXSStyle } from '@make.org/designsystem/components/Typography/Text/style';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const DisclaimerSubtitleStyle = styled(TextXSStyle).attrs({
  as: 'h4',
})`
  color: ${colors.Content.Interface.Dark};
  text-transform: none;
  margin-bottom: ${spacings.xs};
  &.margin-top {
    margin-top: ${spacings.m};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const OpinionCardListItemStyle = styled.li`
  margin-bottom: ${spacings.m};
  &:last-child {
    margin-bottom: 0;
  }
`;
