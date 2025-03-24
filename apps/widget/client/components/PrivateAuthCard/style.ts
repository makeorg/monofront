import styled from 'styled-components';
import { MiddleColumnStyle } from '@make.org/ui/elements/FlexElements';
import { Layouts, Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';

export const PrivateAuthCardContainerStyle = styled(MiddleColumnStyle)`
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

export const PrivateAuthCardContentStyle = styled(MiddleColumnStyle)`
  width: 100%;
  flex: 1;
`;

export const PrivateAuthCardTitleStyle = styled.p`
  font-family: ${typography.FontFamily.Highlight};
  font-size: ${typography.FontSize.PetiteCouronne};
  margin-bottom: 5px;
`;

export const PrivateAuthCardTextStyle = styled.p`
  font-family: ${typography.FontFamily.Default};
  font-size: ${typography.FontSize.Arrondissement};
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 40px;
`;

export const PrivateAuthCardButtonStyle = styled.button`
  font-family: ${typography.FontFamily.Highlight};
  font-size: ${typography.FontSize.Arrondissement};
  display: flex;
  padding: 10px 20px;
  width: fit-content;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid ${colors.Content.Interface.Dark};
  border-radius: 58px;
`;

export const PrivateAuthCardErrorStyle = styled.p`
  font-family: ${typography.FontFamily.Default};
  font-size: ${typography.FontSize.Arrondissement};
  color: red;
  margin-top: 20px;
`;
