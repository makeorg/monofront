import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import { colors } from '@make.org/designsystem/tokens/colors';

export const SearchFormTriggerStyle = styled(UnstyledButtonStyle)`
  margin-right: 25px;
  svg {
    width: 19px;
  }
  .tofill {
    fill: ${colors.Content.Interface.Dark};
  }
`;

export const SearchFormCancelTriggerStyle = styled(UnstyledButtonStyle)`
  font-size: ${typography.FontSize.Arrondissement};
  color: ${colors.Content.Interface.DarkSecondary};
  text-decoration: underline;
  margin-left: 25px;
  flex-shrink: 0;
`;

export const SearchFormWrapperStyle = styled(FlexElementStyle)`
  position: absolute;
  top: -500px;
  left: 0;
  opacity: 0;
  background-color: ${colors.Background.Interface.Lighter};
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
  background-color: ${colors.Background.Interface.DarkSecondary};
  border: 1px solid ${colors.Border.Interface.DarkSecondary};
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
  color: ${colors.Content.Interface.DarkSecondary};
  font-size: ${typography.FontSize.Arrondissement};
  line-height: 1;
`;

export const SearchLabelStyle = styled.label`
  font-family: ${typography.FontFamily.Default};
  color: ${colors.Content.Interface.DarkSecondary};
  font-size: ${typography.FontSize.Arrondissement};
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
    line-height: 39px;
  }
`;

export const SearchButtonStyle = styled(UnstyledButtonStyle)`
  svg {
    width: 14px;
    .tofill {
      fill: ${colors.Content.Make.Secondary};
    }
  }
  &:disabled {
    .tofill {
      fill: ${colors.Content.Interface.Dark};
    }
  }
`;
