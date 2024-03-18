import styled, { createGlobalStyle } from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { SvgLogo } from '@make.org/ui/Svg/elements';
import { intToPx } from '@make.org/utils/helpers/styled';

export const AppContent = styled.div`
  position: relative;
  height: 100%;
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

export const LogoMakeStyle = styled(SvgLogo)`
  width: 66px;
  height: 33px;
`;
