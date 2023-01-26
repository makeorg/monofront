import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { BodyXSHighlight } from '@make.org/designsystem/components/Body';

export const DisclaimerSubtitleStyle = styled(BodyXSHighlight).attrs({
  as: 'h4',
})`
  color: ${color.black};
  text-transform: none;
  margin-bottom: 5px;
  &.margin-top {
    margin-top: 20px;
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const OpinionCardListItemStyle = styled.li`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;
