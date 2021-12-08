import styled, { StyledComponent } from 'styled-components';
import { color } from 'athena-design-tokens';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TooltipStyle = styled.div<{ as: StyledComponent<'div', any> }>`
  min-width: 70px;
  position: absolute;
  padding: 5px 10px;
  z-index: 1;
  background-color: ${color.infos};
  color: ${color.white};
  font-size: 12px;
  text-align: center;
  &:after {
    content: '';
    position: absolute;
  }
  &[aria-hidden='true'] {
    display: none;
  }
`;

export const VerticalTooptipStyle = styled(TooltipStyle)`
  transform: translate(-50%, 0);
  left: 50%;
  &:after {
    right: 50%;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    transform: translate(50%, 0);
  }
`;

export const HorizontalTooltipStyle = styled(TooltipStyle)`
  transform: translate(0, -50%);
  top: 50%;
  &:after {
    bottom: 50%;
    border-bottom: 5px solid transparent;
    border-top: 5px solid transparent;
    transform: translate(0, 50%);
  }
`;

export const TopTooltipStyle = styled(VerticalTooptipStyle)`
  bottom: calc(100% + 10px);
  &:after {
    top: 100%;
    border-top: 5px solid ${color.greyDark};
  }
`;

export const BottomTooltipStyle = styled(VerticalTooptipStyle)`
  top: calc(100% + 10px);
  &:after {
    bottom: 100%;
    border-bottom: 5px solid ${color.greyDark};
  }
`;

export const LeftTooltipStyle = styled(HorizontalTooltipStyle)`
  right: calc(100% + 10px);
  &:after {
    left: 100%;
    border-left: 5px solid ${color.greyDark};
  }
`;

export const RightTooltipStyle = styled(HorizontalTooltipStyle)`
  left: calc(100% + 10px);
  &:after {
    right: 100%;
    border-right: 5px solid ${color.greyDark};
  }
`;
