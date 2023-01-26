import styled from 'styled-components';
import { SvgExternalLink } from '@make.org/ui/Svg/elements';

const ResultContextLinkStyle = `
display: inline-flex;
text-transform: none;
text-decoration: underline;
align-items: center;
`;
export const NewWindowIconStyle = styled(SvgExternalLink)`
  width: 9px;
  height: 9px;
  padding-left: 2px;
`;

export const ResultContextNewWindowLinkStyle = styled.a`
  ${ResultContextLinkStyle}
`;
