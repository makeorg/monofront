import { spacings } from '@make.org/designsystem/tokens/spacings';
import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';

export const QueriesContainerStyle = styled.div`
  display: grid;
  gap: ${spacings.s};
  grid-template-columns: repeat(3, 1fr);
`;

export const QueriesButtonsListStyle = styled.li`
  border-radius: 10px;
  margin: 0 5px;
  border: 1px solid #0000002b;

  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    box-shadow: 0px 4px 18px 0px #0000002b;
    border: none;
  }
`;

export const QueriesButtonsStyle = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${spacings.xs};
  padding: ${spacings.s};
  border-style: none;
  width: 100%;
  min-width: 220px;
  background-color: white;
  border-radius: ${spacings.s};
  &.theme {
    background: linear-gradient(
        91.5deg,
        rgba(76, 65, 171, 0.144) 15.68%,
        rgba(255, 218, 185, 0.2) 63.78%,
        rgba(248, 178, 188, 0.2) 96.13%
      ),
      linear-gradient(0deg, #ffffff, #ffffff);
  }
`;

export const QueriesTitleStyle = styled.span`
  text-transform: capitalize;
  align-items: center;
  justify-content: center;
  display: flex;
  font-weight: 600;
  font-size: 10px;
  color: white;
  min-width: 60px;
  padding: 0 ${spacings.s};
  border-radius: 20px;
  height: 15px;
`;

export const QueriesTextStyle = styled.p`
  font-size: 14px;
  color: #575757;
  text-align: left;
`;
