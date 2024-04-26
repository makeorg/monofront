import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { SvgArrowBack } from '../../../assets/ArrowBack';

export const DocumentSourcesPageContainerStyle = styled.div`
  max-width: 1140px;
  width: 100%;
  padding: ${spacings.m};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${spacings.sm};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    gap: ${spacings.l};
  }
`;

export const DocumentSourcesPageMainTitleStyle = styled.h1`
  font-size: ${typography.FontSize.Title.Europe};
`;

export const DocumentSourcesPageSubTitleStyle = styled.h2`
  font-size: ${typography.FontSize.Title.Arrondissement};
`;

export const DocumentSourcesPageUlStyle = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const DocumentSourcesPageButtonStyle = styled.a`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SvgArrowLeftStyle = styled(SvgArrowBack)`
  height: 16px;
`;
