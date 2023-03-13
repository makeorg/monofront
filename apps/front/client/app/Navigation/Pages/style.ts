import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Link } from 'react-router-dom';
import { colors } from '@make.org/designsystem/tokens/colors';

export const PagesItemStyle = styled.li`
  display: inline-flex;
  margin-right: 45px;
  &:last-child {
    margin-right: 0;
  }
`;

export const PagesLinkStyle = styled(Link)`
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  font-size: ${typography.FontSize.Arrondissement};
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
