import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { SvgAlert, SvgCheck, SvgInfos } from '@make.org/ui/Svg/elements';
import styled from 'styled-components';

export const NotificationInfosStyle = styled(SvgInfos)<{
  className?: string;
  focusable?: string;
}>`
  min-width: 19px;
  margin-right: ${spacings.s};
  &.tip {
    width: 12px;
    height: 12px;
    margin: 0px 7px 0px;
  }
`;

export const NotificationSuccessStyle = styled(SvgCheck)<{
  className?: string;
  focusable?: string;
}>`
  fill: ${colors.Content.Alert.Positive};
  min-width: 22px;
  margin-right: ${spacings.s};
  &.tip {
    width: 12px;
    height: 12px;
    margin: 0px 7px 0px;
  }
`;

export const NotificationAlertStyle = styled(SvgAlert)<{
  className?: string;
  focusable?: string;
}>`
  min-width: 19px;
  margin-right: ${spacings.s};
  &.tip {
    width: 12px;
    height: 12px;
    margin: 0px 7px 0px;
  }
`;
