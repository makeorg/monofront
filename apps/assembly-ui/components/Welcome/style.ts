import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import ReactMarkdown from 'react-markdown';

export const WelcomeContainerStyle = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  align-items: center;
  gap: ${spacings.l};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-direction: row;
  }
`;
export const WelcomeBlockVideoContainerStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex: 2;
  order: 1;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    order: 2;
  }
`;

export const WelcomeContentBlockContainerStyle = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  gap: ${spacings.sm};
  order: 2;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    order: 1;
  }
`;

export const WelcomeBlockThemesContainerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(248, 248, 248, 1);
  gap: ${spacings.m};
  padding: ${spacings.m};
  border-radius: 10px;
`;

export const WelcomeContentBlockTitleStyle = styled.h2`
  font-size: ${typography.FontSize.Title.Arrondissement};
  font-weight: 600;
`;

export const WelcomeContentTextStyle = styled(ReactMarkdown)`
  font-size: ${typography.FontSize.Text.Bastille};
`;

export const WelcomeThemesBlockStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacings.m};
`;

export const WelcomeThemesButtonStyle = styled.button<{
  standardStyle?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.FontSize.Text.Bastille};
  padding: ${spacings.s} ${spacings.m};
  border-radius: 20px;
  border: none;
  color: ${props => props.standardStyle && '#121212'};
`;
