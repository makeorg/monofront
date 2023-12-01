import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';

export const WelcomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  max-width: ${intToPx(Breakpoints.LargeDesktop)};
  margin: 0 auto;
  padding: ${spacings.m};
`;

export const WelcomeTitle = styled.h1`
  font-size: ${typography.FontSize.Title.Europe};
  max-width: 800px;
`;

export const WelcomeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f9f8ffcf;
  border-radius: 10px;
  padding: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    flex-direction: row;
  }
`;

export const WelcomeContentTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const WelcomeContentText = styled.p`
  font-size: ${typography.FontSize.Text.RueDeLappe};
`;

export const WelcomeContentIcon = styled.img`
  height: 20px;
  width: 20px;
`;
