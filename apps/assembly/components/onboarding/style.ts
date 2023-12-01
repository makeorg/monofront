import styled, { createGlobalStyle } from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';

export const UIOnboardingModalStyle = createGlobalStyle`
  .modal-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00000063;
    overflow: auto;
  }

  .modal-dialog {
    position: relative;
    display: flex;
    flex-direction: column;
    outline: none;
    padding: ${spacings.m};
    width: 100%;
    height: 100%;
    background-color: white;
    overflow-y: auto;

    @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
      min-height: 540px;
      max-width: 940px;
      max-height: 80%;
      height: auto;
      border-radius: 10px;
      margin: ${spacings.m};
    }
  }
`;

export const OnboardingClose = styled.button`
  min-width: 35px;
  min-height: 35px;
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
  min-height: 35px;
  color: white;
  border-radius: 10px;
  border-style: none;
  background-color: #4c41ab;
  margin: auto auto ${spacings.m};
`;

export const OnboardingTitle = styled.h2`
  font-size: ${typography.FontSize.Title.Europe};
`;

export const OnboardingSubTitle = styled.h3`
  font-size: ${typography.FontSize.Title.Arrondissement};
  margin-top: ${spacings.l};
`;

export const OnboardingText = styled.p`
  font-size: ${typography.FontSize.Text.RueDeLappe};
  margin-top: ${spacings.s};
  color: #5f5f5f;
`;

export const OnboardingContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: ${spacings.m};
  margin-bottom: ${spacings.m};
`;

export const OnboardingBlocksContainer = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${spacings.xl};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const OnboardingBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: 250px;
`;

export const OnboardingImg = styled.img`
  width: 100%;
  max-width: 360px;
`;
