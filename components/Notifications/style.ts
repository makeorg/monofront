import { color } from 'athena-design-tokens';
import { SvgAlert, SvgCheck, SvgInfos } from '@make.org/ui/Svg/elements';
import styled from 'styled-components';

export const NotificationInfosStyle = styled(SvgInfos)<{
  className?: string;
  focusable?: string;
}>`
  min-width: 19px;
  margin-right: 10px;
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
  fill: ${color.agree};
  min-width: 22px;
  margin-right: 10px;
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
  margin-right: 10px;
  &.tip {
    width: 12px;
    height: 12px;
    margin: 0px 7px 0px;
  }
`;
