import styled from 'styled-components';
import { MiddleColumnStyle } from '@make.org/ui/elements/FlexElements';
import { Layouts, Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';

export const AuthSucceededCardContainerStyle = styled(MiddleColumnStyle)`
  position: relative;
  width: 100%;
  height: inherit;
  display: flex;
  flex: 1;
  max-width: ${intToPx(Layouts.ContainerWithPadding)};
  margin: 0 auto;
  padding: 0 ${spacings.m};
  &.widget {
    background-color: #f2f2f2;
    padding: 0px ${spacings.sm} ${spacings.sm};
    @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
      padding: 0px ${spacings.m} ${spacings.m};
    }
  }
`;

export const AuthSucceededCardContentStyle = styled(MiddleColumnStyle)`
  width: 100%;
  flex: 1;
`;

export const AuthSucceededCardTitleStyle = styled.p`
  font-family: ${typography.FontFamily.Highlight};
  font-size: ${typography.FontSize.PetiteCouronne};
  margin-bottom: 5px;
`;

export const AuthSucceededCardTextStyle = styled.p`
  font-family: ${typography.FontFamily.Default};
  font-size: ${typography.FontSize.Arrondissement};
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 20px;
`;

export const AuthSucceededCardLinkStyle = styled.a`
  font-family: ${typography.FontFamily.Default};
  font-size: ${typography.FontSize.Arrondissement};
  color: rgba(0, 0, 0, 0.65);
`;

export const AuthSucceededCheckboxContainerStyle = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const AuthSucceededCardButtonStyle = styled(RedButtonStyle)`
  font-family: ${typography.FontFamily.Highlight};
  font-size: ${typography.FontSize.Arrondissement};
`;
