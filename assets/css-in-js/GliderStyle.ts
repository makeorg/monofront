import { createGlobalStyle } from 'styled-components';

export const GliderStylesheet = createGlobalStyle`
  .glider-contain {
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
  .glider {
    margin: 0 auto;
    position: relative;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    transform: translateZ(0);
  }
  .glider-track {
    transform: translateZ(0);
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    z-index: 1;
  }
  .glider.draggable {
    user-select: none;
    cursor: -webkit-grab;
    cursor: grab;
  }
  .glider.draggable .glider-slide img {
    user-select: none;
    pointer-events: none;
  }
  .glider.drag {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
  .glider-slide {
    user-select: none;
    justify-content: center;
    align-content: center;
    width: 100%;
  }
  .glider-slide img {
    max-width: 100%;
  }
  .glider::-webkit-scrollbar {
    opacity: 0;
    height: 0;
  }
  .glider-next.disabled,
  .glider-prev.disabled,
  .glider-hide {
    visibility: hidden;
  }
`;
