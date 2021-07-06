import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';

export const FormSuccessMessageStyle = styled.p`
  display: flex;
  align-content: center;
  margin-top: 10px;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
`;

export const FormSuccessSvgStyle = {
  display: 'inline-flex',
  fontSize: '16px',
  marginRight: '5px',
  fill: color.success,
};
