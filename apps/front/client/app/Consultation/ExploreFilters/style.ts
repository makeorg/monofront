import styled from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import { shadows } from '@make.org/designsystem/tokens/shadows';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
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
import { TitleXXS } from '@make.org/designsystem/components/Titles';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const FiltersWrapperStyle = styled(ColumnElementStyle)`
  width: 100%;
  justify-content: space-between;
  margin-bottom: 40px;
  margin-top: 45px;
`;

export const FilterBlockStyle = styled.div`
  padding: ${spacings.m} ${spacings.m} ${spacings.l};
  background-color: ${colors.Background.Interface.Lighter};
  border-radius: 8px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: ${spacings.l};
    margin-bottom: ${spacings.l};
  }
`;

export const FiltersAndSortTitleStyle = styled(TitleXXS)`
  display: inline-flex;
  align-items: center;
  text-transform: none;
  letter-spacing: 0.14px;
  margin-bottom: ${spacings.m};
`;

export const KeywordsListWrapperStyle = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding: 0px;
  gap: ${spacings.sm};
`;

export const TransparentButtonFilterStyle = styled.button`
  display: flex;
  justify-content: center;
  padding: ${spacings.s} ${spacings.m};
  border-radius: 8px;
  line-height: 1.31;
  border: solid 1px ${colors.Border.Interface.DarkMain};
  background-color: transparent;
  font-family: ${typography.FontFamily.Default};
  font-size: ${typography.FontSize.Arrondissement};
  color: ${colors.Content.Interface.Dark};
  &.selected {
    background-color: ${colors.Content.Make.Primary};
    color: ${colors.Content.Interface.Light};
    font-family: ${typography.FontFamily.Hightlight};
    font-weight: bold;
  }
  &:hover,
  &:focus {
    border: solid 1px ${colors.Content.Make.Primary};
  }
`;

export const RadioListWrapperStyle = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  text-decoration: none;
  padding: ${spacings.xs};
  background-color: ${colors.Background.Interface.DarkSecondary};
  border-radius: 8px;
`;

export const RadioItemWrapperStyle = styled.li`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 8px;
  font-size: ${typography.FontSize.Arrondissement};
  padding: ${spacings.sm} ${spacings.m};
  text-decoration: none;
  :last-child {
    margin-bottom: 0px;
  }
  &.selected {
    background-color: ${colors.Background.Interface.Lighter};
    box-shadow: ${shadows.s40};
  }
`;

export const RadioAsTransparentButtonLabelStyle = styled.label`
  display: inline-flex;
  align-items: center;
  font-family: ${typography.FontFamily.Default};
  font-weight: normal;
  color: ${colors.Content.Interface.DarkSecondary};
  font-size: ${typography.FontSize.Arrondissement};
  width: 100%;
  text-align: center;
  &.selected,
  &:hover,
  &:focus {
    font-family: ${typography.FontFamily.Hightlight};
    font-weight: bold;
    color: ${colors.Content.Interface.Dark};
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
    margin-bottom: ${spacings.s};
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
  margin-right: ${spacings.s};
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
  margin-right: ${spacings.sm};
`;

export const SvgPopular = styled(SvgLike)`
  width: 20px;
  height: 20px;
  margin-right: ${spacings.sm};
  fill: #de1a42;
`;

export const SvgControversial = styled(SvgLightning)`
  width: 13px;
  height: 20px;
  margin-right: ${spacings.sm};
  fill: #f7b500;
`;
export const CloseApplyStyle = styled.button`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  font-size: 14px;
  width: 100%;
  color: ${colors.Content.Interface.DarkSecondary};
  border: none;
  background: transparent;
  padding: ${spacings.m} 0px 0px ${spacings.m};
  padding-right: ${spacings.m};
`;

export const FiltersAndSortRedButtonStyle = styled(RedButtonStyle)`
  display: flex;
  justify-content: center;
  margin: ${spacings.m} auto 0;
`;

export const SvgCloseApplyArrow = styled(SvgRightGreyArrow)`
  margin-left: ${spacings.s};
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
