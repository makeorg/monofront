import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';

export const PromptContainerStyle = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  gap: 12px;
  bottom: 0;
  background-color: white;
  z-index: 100;
  width: 100%;
  margin: auto auto 0 auto;
  padding: ${spacings.m};
  max-width: ${intToPx(Breakpoints.LargeDesktop)};
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1) 15%
  );
`;

export const GeneratedButtonsStyleContainerStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacings.xs};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${spacings.m};
  }
`;

export const GeneratedButtonsStyle = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${spacings.xs};
  padding: ${spacings.s};
  border-style: none;
  border-radius: 10px;
  width: 100%;
  background-color: white;
  box-shadow: 0px 4px 18px 0px #0000002b;

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

export const GeneratedButtonsStyleTitle = styled.span`
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

export const GeneratedButtonTextStyle = styled.p`
  font-size: 14px;
  color: #575757;
  text-align: left;
`;

export const PromptFormContainerStyle = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const PromptFormInputStyle = styled.input`
  width: 100%;
  height: 50px;
  background-color: white;
  border-radius: 30px;
  border: 1px solid rgba(191, 191, 191, 1);
  padding: 0 100px 0 ${spacings.sm};
`;

export const PromptFormButtonsContainerStyle = styled.div`
  position: absolute;
  display: flex;
  gap: ${spacings.xs};
  margin-right: ${spacings.xs};
`;

export const PromptFormSubmitStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
`;

export const PromptFormButtonArrowStyle = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
