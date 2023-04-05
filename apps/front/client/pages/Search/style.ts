import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints, Layouts } from '@make.org/assets/vars/Breakpoints';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { SecondLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { BodyMHighLight } from '@make.org/designsystem/components/Body';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const SearchPageWrapperStyle = styled.div`
  width: 100%;
  max-width: ${intToPx(Layouts.ContainerWithPadding)};
  margin: 0 auto;
  padding: ${spacings.m} 0;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 40px ${spacings.m};
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

export const MainResultsSectionStyle = styled.section`
  display: flex;
  flex-flow: column;
  margin-bottom: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: ${spacings.l};
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const NoResultsStyle = styled(BodyMHighLight)`
  @media (max-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 0 ${spacings.m};
  }
`;

export const SearchPageResultsStyle = styled(ColumnElementStyle)`
  width: 100%;
  margin-bottom: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0 ${spacings.m};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 0;
    margin-bottom: 0;
    max-width: 750px;
  }
`;

export const SearchPageTitleStyle = styled(SecondLevelTitleStyle)`
  padding: 0 ${spacings.m};
  margin-bottom: ${spacings.l};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 0;
    margin-bottom: 35px;
  }
`;

export const SearchResultsProposalListStyle = styled(UnstyledListStyle)`
  padding: 0 ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0;
  }
`;
