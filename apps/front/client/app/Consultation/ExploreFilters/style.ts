import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import {
  SvgSmallArrowUp,
  SvgArrowGroupUpDown,
  SvgFilter,
  SvgLike,
  SvgLightning,
  SvgSmallClock,
  SvgRightGreyArrow,
} from '@make.org/ui/Svg/elements';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';

export const FiltersWrapperStyle = styled(ColumnElementStyle)`
  width: 100%;
  justify-content: space-between;
  margin-bottom: 40px;
  margin-top: 45px;
`;

export const FilterBlockStyle = styled.div`
  padding: 20px 20px 30px;
  background-color: ${color.white};
  border-radius: 8px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 30px;
    margin-bottom: 30px;
  }
`;

export const FiltersAndSortTitleStyle = styled.h3`
  display: inline-flex;
  align-items: center;
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  font-size: ${intToPx(typography.font.fontsize.S.value)};
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
  gap: 15px;
`;

export const TransparentButtonFilterStyle = styled.button`
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 8px;
  line-height: 1.31;
  border: solid 1px ${color.grey};
  background-color: transparent;
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.black};
  &.selected {
    background-color: ${color.brandPrimary};
    color: ${color.white};
    font-family: ${MakeFonts.CircularStandardBold};
    font-weight: bold;
  }
  &:hover,
  &:focus {
    border: solid 1px ${color.brandPrimary};
  }
`;

export const RadioListWrapperStyle = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  text-decoration: none;
  padding: 5px;
  background-color: ${color.greyLighter};
  border-radius: 8px;
`;

export const RadioItemWrapperStyle = styled.li`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 8px;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  padding: 15px 20px;
  text-decoration: none;
  :last-child {
    margin-bottom: 0px;
  }
  &.selected {
    background-color: ${color.white};
    box-shadow: 0px 8px 12px -4px rgba(37, 49, 134, 0.08);
  }
`;

export const RadioAsTransparentButtonLabelStyle = styled.label`
  display: inline-flex;
  align-items: center;
  font-family: ${MakeFonts.CircularStandardBook};
  font-weight: normal;
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  width: 100%;
  text-align: center;
  &.selected,
  &:hover,
  &:focus {
    font-family: ${MakeFonts.CircularStandardBold};
    font-weight: bold;
    color: ${color.black};
  }
`;

export const FilterByWrapperStyle = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  padding: 0px;
`;

export const FilterByElementStyle = styled.li`
  text-decoration: none;
  :first-child {
    margin-bottom: 10px;
  }
`;
export const SvgArrowUp = styled(SvgSmallArrowUp)`
  width: 14px;
  height: 15px;
  margin-right: 12px;
`;

export const SvgArrowsGroup = styled(SvgArrowGroupUpDown)`
  width: 11px;
  height: 16px;
  margin-right: 11px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 13px;
    height: 22px;
    margin-left: 2px;
  }
`;

export const SvgFilterBy = styled(SvgFilter)`
  width: 16px;
  height: 16px;
  margin-right: 12px;
`;

export const SvgRecent = styled(SvgSmallClock)`
  width: 20px;
  height: 20px;
  margin-right: 14px;
`;

export const SvgPopular = styled(SvgLike)`
  width: 20px;
  height: 20px;
  margin-right: 14px;
  fill: #de1a42;
`;

export const SvgControversial = styled(SvgLightning)`
  width: 13px;
  height: 20px;
  margin-right: 16px;
  fill: #f7b500;
`;

export const CloseApplyStyle = styled.button`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  font-size: 14px;
  width: 100%;
  color: ${color.greyDark};
  border: none;
  background: transparent;
  padding: 20px 0px 0px 20px;
  padding-right: 20px;
`;

export const FiltersAndSortRedButtonStyle = styled(RedButtonStyle)`
  display: flex;
  justify-content: center;
  margin: 20px auto 0;
`;

export const SvgCloseApplyArrow = styled(SvgRightGreyArrow)`
  margin-left: 10px;
`;

export const customModalStyles = {
  content: {
    position: 'relative',
    padding: null,
    borderRadius: '8px',
    border: null,
    zIndex: 10,
    overflow: 'auto',
    inset: 'initial',
    maxWidth: '470px',
    margin: 'auto',
    width: '100%',
  },
};
