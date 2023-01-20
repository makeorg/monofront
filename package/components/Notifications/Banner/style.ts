import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import {
  Breakpoints,
  Layouts,
  DefaultPadding,
} from '@make.org/assets/vars/Breakpoints';
import { ShadowColors } from '@make.org/assets/vars/Colors';
import { intToPx } from '@make.org/utils/helpers/styled';
import {
  CloseButtonStyle,
  WhiteButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { ColumnToRowElementStyle } from '@make.org/ui/elements/FlexElements';
import { Link } from 'react-router-dom';

export const NotificationWrapperStyle = styled.aside`
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  top: 0;
  z-index: 3;
  width: 100%;
  padding: ${intToPx(DefaultPadding.Mobile)};
  box-shadow: 0 2px 4px 0 ${ShadowColors.BlackZeroFiveOpacity};
  background-color: ${color.infos};
  box-shadow: 0 -2px 4px 0 ${ShadowColors.BlackZeroOneOpacity};
  margin-top: -5px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 25px ${intToPx(DefaultPadding.Desktop)};
  }
`;

export const NotificationContentStyle = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  max-width: ${intToPx(Layouts.ContainerWidth)};
  padding-right: ${intToPx(DefaultPadding.Mobile)};
  color: ${color.white};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    align-items: center;
  }
`;

export const NotificationCloseButtonStyle = styled(CloseButtonStyle)`
  .tofill {
    fill: ${color.white};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    top: 15px;
    right: 15px;
  }
`;

export const SecuredExpirationStyle = styled.span`
  flex: 1;
`;

export const VoteOnlyMessageStyle = styled(ColumnToRowElementStyle)`
  align-items: flex-start;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    align-items: center;
  }
`;

export const VoteOnlyButtonStyle = styled(WhiteButtonStyle)`
  white-space: nowrap;
  margin-top: 15px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-top: 0;
    margin-left: 15px;
  }
`;

export const WhiteLink = styled(Link)`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.white};
  text-decoration: underline;
  margin: 0 5px;
  &:hover,
  &:focus {
    color: ${color.white};
  }
`;
