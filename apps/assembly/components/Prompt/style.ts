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
