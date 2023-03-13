import styled from 'styled-components';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { typography } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { BodyXSHighlight } from '@make.org/designsystem/components/Body';
import { colors } from '@make.org/designsystem/tokens/colors';

export const QualificationDataItemStyle = styled(UnstyledListStyle)`
  margin-top: 10px;
`;

export const QualificationLabelStyle = styled(BodyXSHighlight).attrs({
  as: 'span',
})`
  color: ${props => props.color};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const QualificationContentStyle = styled.span`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${colors.Content.Interface.DarkSecondary};
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
