import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';

export const SearchFormTriggerStyle = styled(UnstyledButtonStyle)`
  margin-right: 25px;
  svg {
    width: 19px;
  }
  .tofill {
    fill: ${color.black};
  }
`;

export const SearchFormCancelTriggerStyle = styled(UnstyledButtonStyle)`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.greyDark};
  text-decoration: underline;
  margin-left: 25px;
  flex-shrink: 0;
`;

export const SearchFormWrapperStyle = styled(FlexElementStyle)`
  position: absolute;
  top: -500px;
  left: 0;
  opacity: 0;
  background-color: ${color.white};
  width: 100%;
  padding: 10px 20px;
  transition: 0.5s ease opacity;
  &.expanded {
    top: 0;
    opacity: 1;
  }
  &[aria-hidden='true'] {
    input,
    button {
      visibility: hidden;
    }
  }
`;

export const SearchFormStyle = styled.form`
  display: flex;
  position: relative;
  width: 100%;
  padding: 6.5px 15px;
  border-radius: 20px;
  background-color: ${color.greyLighter};
  border: 1px solid ${color.greyLighter};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    width: 160px;
    margin-left: 30px;
    transition: 1s ease width;
    &.expanded {
      width: 100%;
    }
  }
`;

export const SearchInputWrapperStyle = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

export const SearchInputStyle = styled.input`
  border: none;
  padding: 0px;
  background-color: transparent;
  width: 100%;
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 1;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const SearchLabelStyle = styled.label`
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 1;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 50%;
  transition: 0.25s ease opacity;
  white-space: nowrap;
  z-index: 1;
  transform: translateY(-50%);
  &.hide {
    opacity: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
    line-height: 39px;
  }
`;

export const SearchButtonStyle = styled(UnstyledButtonStyle)`
  svg {
    width: 14px;
    .tofill {
      fill: ${color.brandSecondary};
    }
  }
  &:disabled {
    .tofill {
      fill: ${color.black};
    }
  }
`;
