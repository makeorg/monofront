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
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.14px;
  color: ${color.greyDark};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const InfosWrapperStyle = styled.span`
  display: inline-flex;
  align-items: center;
`;

export const CertifiedIconStyle = styled(SvgCheckedSymbol)`
  margin-left: 5px;
  .tofill {
    fill: ${TextColors.Blue};
  }
`;
