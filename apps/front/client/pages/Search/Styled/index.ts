import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { Breakpoints, Layouts } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import {
  RedButtonStyle,
  UnstyledButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { SecondLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';

export const SearchPageWrapperStyle = styled.div`
  width: 100%;
  max-width: ${intToPx(Layouts.ContainerWithPadding)};
  margin: 0 auto;
  padding: 20px 0;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 40px 20px;
  }
`;

export const SearchPageContentStyle = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    flex-flow: row;
    justify-content: space-between;
  }
`;

export const ContentElementStyle = styled(ColumnElementStyle)`
  width: 100%;
`;

export const SearchPageResultsStyle = styled(ContentElementStyle)`
  margin-bottom: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0 20px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 0;
    margin-bottom: 0;
    max-width: 750px;
  }
`;

export const SearchPageSidebarStyle = styled(ContentElementStyle)`
  padding: 0 20px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    position: sticky;
    top: 0;
    z-index: 2;
    order: 1;
    max-width: 360px;
    padding: 0;
    margin-left: 20px;
  }
`;

export const SearchPageTitleStyle = styled(SecondLevelTitleStyle)`
  padding: 0 20px;
  margin-bottom: 30px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 0;
    margin-bottom: 35px;
  }
`;

export const SearchBackStyle = styled(UnstyledButtonStyle)`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
  margin-left: 0;
  color: ${color.brandSecondary};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  padding: 0;
  text-decoration: underline;
  &:hover,
  &:focus {
    color: ${color.brandSecondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const SearchBackArrowStyle = {
  fontSize: '11px',
  marginRight: '4px',
  fill: color.brandSecondary,
};

export const SearchResultsProposalListStyle = styled(UnstyledListStyle)`
  padding: 0 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0;
  }
`;

export const SearchResultsProposalItemStyle = styled.li`
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SearchMoreProposalsButtonStyle = styled(RedButtonStyle)`
  margin: 20px auto 0;
`;
