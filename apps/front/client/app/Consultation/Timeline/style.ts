import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';

export const TimelineWrapperStyle = styled(FlexElementStyle)`
  background-color: ${color.white};
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
    grid-gap: 15px 30px;
  }
`;

export const TimelineTitleStyle = styled.h4`
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  text-transform: none;
  font-size: ${intToPx(typography.font.fontsize.L.value)};
  margin: 40px 0;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
  }
`;

export const TimelineItemWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 40px;
`;

export const TimelineItemTitleStyle = styled.h5`
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.greyDark};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TimelineItemMarkerIsCurrent = styled.span`
  height: 7px;
  width: 7px;
  border-radius: 50%;
  background-color: ${color.brandSecondary};
  margin-left: 5px;
`;

export const TimelineItemDateStyle = styled.span`
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  font-size: ${intToPx(typography.font.fontsize.M.value)};
  font-weight: bold;
  color: ${color.black};
  margin: 8px 0;
  &:first-letter {
    text-transform: capitalize;
  }
`;

export const TimelineItemTextStyle = styled.p`
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.greyDark};
`;

export const TimelineWorkshopLinkStyle = styled.a`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.black};
`;
