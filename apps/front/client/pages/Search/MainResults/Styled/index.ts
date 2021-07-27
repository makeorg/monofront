import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { typography } from 'athena-design-tokens';

export const MainResultsSectionStyle = styled.section`
  display: flex;
  flex-flow: column;
  margin-bottom: 20px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const MainResultsContainerStyle = styled.div`
  padding: 0 20px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 0;
  }
`;

export const NoResultsStyle = styled.p`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  @media (max-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 0 20px;
  }
`;
