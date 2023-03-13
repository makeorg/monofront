import styled from 'styled-components';
import { typography } from 'athena-design-tokens';
import { Link } from 'react-router-dom';
import { intToPx } from '@make.org/utils/helpers/styled';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { colors } from '@make.org/designsystem/tokens/colors';

export const PagesItemStyle = styled.li`
  display: inline-flex;
  margin-right: 45px;
  &:last-child {
    margin-right: 0;
  }
`;

export const PagesLinkStyle = styled(Link)`
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  text-decoration: none;
  padding-bottom: 14px;
  color: ${colors.Content.Interface.DarkSecondary};
  border-bottom: 2px solid transparent;
  &:hover,
  &:focus {
    color: ${colors.Content.Interface.Dark};
  }
  &.selected,
  &.selected:hover,
  &.selected:focus {
    color: ${colors.Content.Make.Secondary};
    border-bottom: 2px solid ${colors.Content.Make.Secondary};
  }
`;
