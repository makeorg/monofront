import styled, { createGlobalStyle } from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { intToPx } from '@make.org/utils/helpers/styled';

export const UIOnboardingModalStyle = createGlobalStyle`
  .modal-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00000063;
  }

  .modal-dialog {
    position: relative;
    display: flex;
    flex-direction: column;
    outline: none;
    padding: ${spacings.m};
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: white;

    @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
      max-height: 580px;
      max-width: 948px;
      margin: ${spacings.m};
  }
  }
`;

export const OnboardingClose = styled.button`
  width: 35px;
  height: 35px;
  right: 0;
  background-color: #f4f4f4;
  border-radius: 5px;
  outline: none;
  border-style: none;
  margin-left: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OnboardingCross = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  :before,
  :after {
    position: absolute;
    content: ' ';
    height: 20px;
    width: 2px;
    background-color: #333;
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;

export const OnboardingCloseButton = styled.button`
  max-width: 340px;
  width: 100%;
  height: 35px;
  color: white;
  border-radius: 10px;
  border-style: none;
  background-color: #4c41ab;
  margin: auto auto 0px;
`;
