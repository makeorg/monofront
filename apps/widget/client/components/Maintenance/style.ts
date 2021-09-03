import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';
import styled from 'styled-components';

export const MaintenancePageStyle = styled.div`
  ${ContainerWithPadding}
  width: 100%;
  min-height: 365px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  p {
    margin-top: 0px;
    margin-bottom: 20px;
  }
  h2 {
    align-self: center;
  }
`;

export const LogoWrapperStyle = styled.div`
  margin: 20px;
`;
export const TextContainerStyle = styled.div``;
export const MaintenanceImageStyle = styled.img`
  width: 300px;
`;
