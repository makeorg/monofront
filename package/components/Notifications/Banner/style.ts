import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import {
  Breakpoints,
  Layouts,
  DefaultPadding,
} from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import {
  CloseButtonStyle,
  WhiteButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { ColumnToRowElementStyle } from '@make.org/ui/elements/FlexElements';
import { Link } from 'react-router-dom';
import { colors } from '@make.org/designsystem/tokens/colors';
import { shadows } from '@make.org/designsystem/tokens/shadows';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const NotificationWrapperStyle = styled.aside`
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  top: 0;
  z-index: 3;
  width: 100%;
  padding: ${intToPx(DefaultPadding.Mobile)};
  box-shadow: ${shadows.s10};
  background-color: ${colors.Background.Alert.Infos};
  box-shadow: ${shadows.s10};
  margin-top: -${spacings.xs};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 25px ${intToPx(DefaultPadding.Desktop)};
  }
`;

export const NotificationContentStyle = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  font-size: ${typography.FontSize.Arrondissement};
  max-width: ${intToPx(Layouts.ContainerWidth)};
  padding-right: ${intToPx(DefaultPadding.Mobile)};
  color: ${colors.Content.Interface.Light};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    align-items: center;
  }
`;

export const NotificationCloseButtonStyle = styled(CloseButtonStyle)`
  .tofill {
    fill: ${colors.Content.Interface.Light};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    top: ${spacings.sm};
    right: ${spacings.sm};
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
  margin-top: ${spacings.sm};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-top: 0;
    margin-left: ${spacings.sm};
  }
`;

export const WhiteLink = styled(Link)`
  font-size: ${typography.FontSize.Arrondissement};
  color: ${colors.Content.Interface.Light};
  text-decoration: underline;
  margin: 0 ${spacings.xs};
  &:hover,
  &:focus {
    color: ${colors.Content.Interface.Light};
  }
`;
