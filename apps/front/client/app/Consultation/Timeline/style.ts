import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import { intToPx } from '@make.org/utils/helpers/styled';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';
import { TitleS } from '@make.org/designsystem/components/Titles';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import {
  BodyXSCondensed,
  BodyLHighLight,
  BodyMDefault,
} from '@make.org/designsystem/components/Body';

export const TimelineWrapperStyle = styled(FlexElementStyle)`
  background-color: ${colors.Background.Interface.Lighter};
`;

export const TimelineContentStyle = styled.div`
  ${ContainerWithPadding}
`;

export const TimelineListWrapperStyle = styled.ul`
  display: grid;
  list-style-type: none;
  grid-template-columns: repeat(1, 1fr);
  padding: 0;
  grid-gap: 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: ${spacings.sm} ${spacings.l};
  }
`;

export const TimelineTitleStyle = styled(TitleS)`
  text-transform: none;
  margin: 40px 0;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.IleDeFrance};
  }
`;

export const TimelineItemWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 40px;
`;

export const TimelineItemTitleStyle = styled(BodyXSCondensed)`
  color: ${colors.Content.Interface.DarkSecondary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TimelineItemMarkerIsCurrent = styled.span`
  height: 7px;
  width: 7px;
  border-radius: 50%;
  background-color: ${colors.Content.Make.Secondary};
  margin-left: ${spacings.xs};
`;

export const TimelineItemDateStyle = styled(BodyLHighLight).attrs({
  as: 'span',
})`
  color: ${colors.Content.Interface.Dark};
  margin: 8px 0;
  &:first-letter {
    text-transform: capitalize;
  }
`;

export const TimelineItemTextStyle = styled(BodyMDefault)`
  color: ${colors.Content.Interface.DarkSecondary};
`;

export const TimelineWorkshopLinkStyle = styled.a`
  font-size: ${typography.FontSize.Arrondissement};
  color: ${colors.Content.Interface.Dark};
`;
