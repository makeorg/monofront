import styled from 'styled-components';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { color, typography } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';

export const QualificationDataItemStyle = styled(UnstyledListStyle)`
  margin-top: 10px;
`;

export const QualificationLabelStyle = styled.span`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  font-family: ${MakeFonts.CircularStandardBold};
  color: ${props => props.color};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const QualificationContentStyle = styled.span`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.greyDark};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const CounterStyle = styled.span<{ isWidget?: boolean }>`
  font-size: ${props =>
    props.isWidget
      ? intToPx(typography.font.fontsize.X2S.value)
      : intToPx(typography.font.fontsize.XS.value)};
  margin-left: 10px;
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${props =>
      props.isWidget
        ? intToPx(typography.font.fontsize.X2S.value)
        : intToPx(typography.font.fontsize.S.value)};
  }
`;

export const QualifyButtonWrapperStyle = styled(UnstyledListStyle)`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  grid-gap: 5px;
`;
