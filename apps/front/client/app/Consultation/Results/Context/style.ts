import styled from 'styled-components';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { typography } from 'athena-design-tokens';
import { SvgExternalLinkPlain } from '@make.org/ui/Svg/elements';
import { intToPx } from '@make.org/utils/helpers/styled';

const ResultContextLinkStyle = `
display: inline-flex;
font-family: ${MakeFonts.CircularStandardBook};
text-transform: none;
text-decoration: underline;
align-items: center;
font-size: ${intToPx(typography.font.fontsize.XS.value)};
line-height: 1.31;
`;
export const NewWindowIconStyle = styled(SvgExternalLinkPlain)`
  width: 9px;
  height: 9px;
  padding-left: 2px;
`;

export const ResultContextNewWindowLinkStyle = styled.a`
  ${ResultContextLinkStyle}
`;
