import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';

export const OnboardingCloseStyle = styled.button`
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

export const OnboardingCrossStyle = styled.span`
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

export const OnboardingCloseButtonStyle = styled.button`
  max-width: 340px;
  width: 100%;
  min-height: 35px;
  color: white;
  border-radius: 10px;
  border-style: none;
  background-color: #4c41ab;
  margin: auto auto ${spacings.m};
`;

export const OnboardingTitleStyle = styled.h2`
  font-size: ${typography.FontSize.Title.Europe};
`;

export const OnboardingSubTitleStyle = styled.h3`
  font-size: ${typography.FontSize.Title.Arrondissement};
  margin-top: ${spacings.l};
`;

export const OnboardingTextStyle = styled.p`
  font-size: ${typography.FontSize.Text.RueDeLappe};
  margin-top: ${spacings.s};
  color: #5f5f5f;
`;

export const OnboardingContentContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: ${spacings.m};
  margin-bottom: ${spacings.m};
`;

export const OnboardingBlocksContainerStyle = styled.div`
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

export const OnboardingBlockStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const OnboardingImgContainerStyle = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100px;
  width: 100%;
  max-width: 270px;
`;

export const OnboardingImgStyle = styled.img`
  max-width: 100%;
  height: auto;
`;
