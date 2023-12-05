import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';

export const PromptContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
  width: 100%;
  margin: auto auto 0 auto;
  padding: ${spacings.m};
  max-width: ${intToPx(Breakpoints.LargeDesktop)};
`;

export const GeneratedButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
`;

export const GeneratedButtons = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
  padding: 10px;
  border-style: none;
  border-radius: 10px;
  width: 100%;
  background-color: white;
  box-shadow: 0px 4px 18px 0px #0000002b;
`;

export const GeneratedButtonsTitle = styled.span`
  text-transform: capitalize;
  align-items: center;
  justify-content: center;
  display: flex;
  font-weight: 600;
  font-size: 10px;
  color: white;
  min-width: 60px;
  padding: 0 10px;
  border-radius: 20px;
  height: 15px;
`;

export const GeneratedButtonText = styled.p`
  font-size: 14px;
  color: #575757;
  text-align: left;
`;
