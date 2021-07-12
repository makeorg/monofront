import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { pxToRem } from '@make.org/utils/helpers/styled';

export const TooltipStyle = styled.div`
  min-width: 70px;
  position: absolute;
  padding: ${pxToRem('5px')} ${pxToRem('10px')};
  z-ind(props){props => props.zIndex};
  background-color: ${color.infos};
  color: ${color.white};
  font-size: ${pxToRem('12px')};
  text-align: center;
  > :after {
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
  > :after {
    right: 50%;
    border-left: ${pxToRem('5px')} solid transparent;
    border-right: ${pxToRem('5px')} solid transparent;
    transform: translate(50%, 0);
  }
`;

export const HorizontalTooltipStyle = styled(TooltipStyle)`
  transform: translate(0, -50%);
  top: 50%;
  > :after {
    bottom: 50%;
    border-bottom: ${pxToRem('5px')} solid transparent;
    border-top: ${pxToRem('5px')} solid transparent;
    transform: translate(0, 50%);
  }
`;

export const TopTooltipStyle = styled(VerticalTooptipStyle)`
  bottom: calc(100% + ${pxToRem('10px')});
  > :after {
    top: 100%;
    border-top: ${pxToRem('5px')} solid ${color.greyDark};
  }
`;

export const BottomTooltipStyle = styled(VerticalTooptipStyle)`
  top: calc(100% + ${pxToRem('10px')});
  > :after {
    bottom: 100%;
    border-bottom: ${pxToRem('5px')} solid ${color.greyDark};
  }
`;

export const LeftTooltipStyle = styled(HorizontalTooltipStyle)`
  right: calc(100% + ${pxToRem('10px')});
  > :after {
    left: 100%;
    border-left: ${pxToRem('5px')} solid ${color.greyDark};
  }
`;

export const RightTooltipStyle = styled(HorizontalTooltipStyle)`
  left: calc(100% + ${pxToRem('10px')});
  > :after {
    right: 100%;
    border-right: ${pxToRem('5px')} solid ${color.greyDark};
  }
`;
