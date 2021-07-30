import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { Breakpoints, Layouts } from '@make.org/assets/vars/Breakpoints';

export const TeasingHeaderContainerStyle = styled.div`
  background-color: ${color.white};
  padding: 18px;
`;

export const TeasingHeaderWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${MakeFonts.CircularStandardBook};

  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-direction: row;
    max-width: ${intToPx(Layouts.ContainerWidth)};
    margin: 0 auto;
  }
`;

export const TeasingHeaderCenterStyle = styled.div`
  flex: 1;
  text-align: center;
  padding: 20px;

  &:nth-child(2) {
    border-top: 1px solid ${color.greyLighter};
  }

  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex: 1;
    &:nth-child(1) {
      flex: 2;
    }
    &:nth-child(2) {
      flex: 1;
      border-top: 0;
      border-left: 1px solid ${color.greyLighter};
    }
  }
`;

export const TeasingHeaderTextStyle = styled.p`
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  text-transform: uppercase;
  color: ${color.black};
`;

export const TeasingHeaderSubTextStyle = styled.p`
  color: ${color.greyDark};
  margin-top: 5px;
  a {
    font-family: ${MakeFonts.CircularStandardBold};
    color: ${color.brandSecondary};
  }
`;
