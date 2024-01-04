import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';

export const WelcomeContainerStyle = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  max-width: ${intToPx(Breakpoints.LargeDesktop)};
  margin: 0 auto;
  padding: ${spacings.m};
`;

export const WelcomeTitleStyle = styled.h1`
  font-size: ${typography.FontSize.Title.Europe};
`;

export const WelcomeIAStyle = styled.p`
  font-size: ${typography.FontSize.Text.Bastille};
  &.bold {
    font-weight: 600;
  }
`;

export const WelcomeBlockContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-direction: row;
  }
`;

export const WelcomeContentBlockContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(248, 248, 248, 1);
  gap: 20px;
  padding: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 50%;
  }
  border-radius: 10px;
`;

export const WelcomeContentBlockTitleStyle = styled.span`
  font-size: ${typography.FontSize.Text.Bastille};
  font-weight: 600;
`;

export const WelcomeContentTextStyle = styled.p`
  font-size: ${typography.FontSize.Text.RueDeLappe};
`;

export const WelcomeThemesBlockStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

export const WelcomeThemesButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.FontSize.Text.RueDeLappe};
  padding: 5px 10px;
  border-radius: 20px;
  border: none;
`;
