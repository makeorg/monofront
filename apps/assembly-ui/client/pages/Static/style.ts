import { typography } from '@make.org/designsystem/tokens/typography';
import styled from 'styled-components';

export const LegalPagesContainerStyle = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const LegalPagesContentStyle = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0px auto;
  padding: 20px;
`;

export const LegalPagesMaintTitleStyle = styled.h1`
  font-size: ${typography.FontSize.Title.Europe};
  font-weight: 600;
  margin-bottom: 30px;
`;

export const LegalPagesSubtitleStyle = styled.h2`
  font-size: ${typography.FontSize.Title.IleDeFrance};
  font-weight: 600;
  margin: 30px 0;
`;

export const LegalPagesTextStyle = styled.p`
  font-size: ${typography.FontSize.Text.Arrondissement};
  margin-bottom: 15px;
`;

export const LegalTableStyle = styled.div`
  p {
    font-size: ${typography.FontSize.Text.Arrondissement};
    margin-bottom: 15px;
    margin-bottom: 15px;
  }
`;

export const LegalPagesTableHeaderStyle = styled.th`
  font-size: ${typography.FontSize.Text.Arrondissement};
  font-weight: 600;
  text-align: left;
  padding: 10px;
`;

export const LegalPagesTableTextStyle = styled.td`
  font-size: ${typography.FontSize.Text.Arrondissement};
  padding: 10px;
  vertical-align: top;
`;

export const LegalPagesListStyle = styled.li`
  font-size: ${typography.FontSize.Text.Arrondissement};
`;
