import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { SvgExternalLinkPlain } from '../../../Svg/elements';
import { FlexElementStyle } from '../../FlexElements';

const DataPolicyLinkStyle = `
display: inline-flex;
font-family: ${MakeFonts.CircularStandardBook};
color: ${color.brandSecondary};
text-transform: none;
text-decoration: underline;
align-items: center;
font-size: ${intToPx(typography.font.fontsize.XS.value)};
line-height: 1.31;
&:hover,
&:focus {
  color: ${color.brandSecondary};
}
`;

export const CheckboxWrapper = styled(FlexElementStyle)`
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`;

export const CheckboxLabelStyle = styled.label`
  display: inline-flex;
  color: ${(props) => (props.isBlack ? color.black : color.greyDark)};
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${(props) => (props.noFontSizeChange
    ? intToPx(typography.font.fontsize.XS.value)
    : intToPx(typography.font.fontsize.X2S.value))};
  a {
    color: ${color.brandSecondary};
  }
  strong {
    font-family: ${MakeFonts.CircularStandardBold};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const FakeCheckboxInputStyle = styled.div`
  display: inline-flex;
  position: relative;
  width: 14px;
  height: 14px;
  min-width: 14px;
  border: 1px solid ${color.grey};
  margin: 4px 8px 0 0;
  z-index: 0;
  svg {
    fill: ${color.brandSecondary};
    position: absolute;
    bottom: 5%;
    left: 25%;
    z-index: 1;
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const StyledCheckbox = styled(FakeCheckboxInputStyle)`
  svg {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2px ${color.grey};
  }
`;
export const NewWindowIconStyle = styled(SvgExternalLinkPlain)`
  width: 9px;
  height: 9px;
  padding-left: 2px;
  .tofill {
    fill: ${color.brandSecondary};
  }
`;

export const DataPolicyNewWindowLinkStyle = styled.a`
  ${DataPolicyLinkStyle}
`;
