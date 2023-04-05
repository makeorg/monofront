import styled from 'styled-components';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const OpinionQualificationListStyle = styled(UnstyledListStyle)`
  width: 100%;
  padding-left: ${spacings.xs};
`;

export const OpinionQualificationListItemStyle = styled.li`
  margin-bottom: ${spacings.xs};
  &:last-child {
    margin-bottom: 0;
  }
`;
