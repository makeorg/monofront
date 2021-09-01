import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';

export const FiltersWrapperStyle = styled(ColumnElementStyle)`
  width: 100%;
  justify-content: space-between;
`;

export const FilterBlockStyle = styled.div`
  padding: 30px 20px 20px;
  background-color: ${color.white};
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const FiltersTitleStyle = styled.h3`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  text-transform: none;
  line-height: 1.69;
  letter-spacing: 0.14px;
  margin-bottom: 20px;
`;

export const KeywordsListWrapperStyle = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding: 0px;
`;

export const KeywordsItemWrapperStyle = styled.li`
  margin: 0px 15px 15px 0px;
  :last-child {
    margin-bottom: 0px;
  }
`;
export const TransparentButtonFilter = styled.input`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 20px;
  border-radius: 8px;
  line-height: 1.31;
  border: solid 1px ${color.grey};
  background-color: transparent;
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  &.focused {
    outline-style: auto;
  }
  &.selected {
    background-color: ${color.brandPrimary};
  }
  &.selected label {
    color: ${color.white};
    font-family: ${MakeFonts.CircularStandardBold};
  }
`;

export const RadioAsTransparentButtonWrapperStyle = styled.input`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${color.grey};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  padding: 15px 20px;
  text-decoration: none;
  &.focused {
    outline-style: auto;
  }
  &.selected {
    background-color: ${color.white};
  }
  &.selected label {
    color: ${color.black};
    font-family: ${MakeFonts.CircularStandardBold};
    border: 1px solid ${color.black};
  }
`;

export const RadioAsTransparentButtonLabelStyle = styled.label`
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  width: 100%;
  text-align: center;
`;
