import styled, { createGlobalStyle } from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { intToPx } from '@make.org/utils/helpers/styled';
import { typography } from '@make.org/designsystem/tokens/typography';

export const AppContent = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const UIModalStyle = createGlobalStyle`
  .modal-overlay {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00000063;
    backdrop-filter: blur(5px);
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
      max-width: 1040px;
      max-height: 80%;
      height: auto;
      border-radius: 10px;
      margin: ${spacings.m};
    }
  }

  .sidebar-overlay {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #00000063;
    backdrop-filter: blur(5px);
    overflow: auto;
  }

  @keyframes slidein {
    from {
     transform: translateX(-100%);
    }

    to {
     transform: left: 0;
    }
  
  }
  .sidebar-dialog {
    background-color: white;
    overflow-y: auto;
    animation-duration: 1s;
    animation-name: slidein;
    width: 100%;
    height: 100%;
    @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
      max-width: 300px;
    }
  }
`;

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

export const LegalPagesNumberTextContainerStyle = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: no-wrap;
`;

export const LegalPagesDateStyle = styled.p`
  font-size: ${typography.FontSize.Text.PetiteCouronne};
`;

export const LegalPagesTextStyle = styled.p`
  font-size: ${typography.FontSize.Text.Arrondissement};
  margin-bottom: 15px;
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

export const LegalPagesNumberedArticleStyle = styled.li`
  font-size: ${typography.FontSize.Text.Arrondissement};
  margin-bottom: 15px;
  padding-left: 30px;
`;

export const LegalPagesListStyle = styled.li`
  font-size: ${typography.FontSize.Text.Arrondissement};
`;
