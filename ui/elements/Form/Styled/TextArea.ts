import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import { color, typography } from 'athena-design-tokens';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { intToPx } from '@make.org/utils/helpers/styled';

export const BasicTextAreaStyle = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  background: transparent;
  background-color: transparent;
  font-family: ${MakeFonts.CircularStandardBold};
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  padding: 10px 5px;
  resize: none;
`;

export const TextAreaCounterStyle = styled.div`
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  line-height: 1;
  position: absolute;
  right: 5px;
  bottom: 5px;
`;
