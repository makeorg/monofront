import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { UnstyledButtonStyle } from '../../Buttons/style';

export const InputIconStyle = styled.span`
  display: flex;
  color: ${color.brandSecondary};
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  margin-right: 5px;
  svg {
    fill: ${color.brandSecondary};
  }
`;

export const CenterInputIconStyle = styled(InputIconStyle)`
  align-items: center;
`;

export const TextAreaIconStyle = styled(InputIconStyle)`
  margin-top: 10px;
`;

export const HidePasswordIconStyle = styled(UnstyledButtonStyle)`
  color: ${color.greyDark};
`;
