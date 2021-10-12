import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { SvgCheckedSymbol } from '@make.org/ui/Svg/elements';
import { TextColors } from '@make.org/assets/vars/Colors';

export const AuthorInfosStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  letter-spacing: 0.12px;
  color: ${color.greyDark};
  &.widget {
    font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  }
`;

export const InfosWrapperStyle = styled.span`
  display: inline-flex;
  align-items: center;
  &.sequence {
    margin: 50px auto 5px;
  }
  &.sequence.widget,
  &.widget {
    margin: 40px auto 15px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    &.sequence {
      margin: 75px auto 20px;
    }
    &.sequence.widget,
    &.widget {
      margin: 50px auto 15px;
    }
  }
`;

export const CertifiedIconStyle = styled(SvgCheckedSymbol)`
  margin-left: 5px;
  .tofill {
    fill: ${TextColors.Blue};
  }
`;
