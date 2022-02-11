import styled, { StyledComponent } from 'styled-components';
import { color } from 'athena-design-tokens';
import { UnstyledButtonStyle } from './ButtonsElements';
import { SvgClose, SvgInfos } from '../Svg/elements';

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

export const VerticalToolptipStyle = styled(TooltipStyle)`
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

export const TopTooltipStyle = styled(VerticalToolptipStyle)`
  bottom: calc(100% + 10px);
  &:after {
    top: 100%;
    border-top: 5px solid ${color.greyDark};
  }
`;

export const BottomTooltipStyle = styled(VerticalToolptipStyle)`
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

const ProposalTooltipCommonStyle = `
  background-color: ${color.infos};
  position: absolute;
  z-index: 1;
  border-radius: 2px;
  color: ${color.white};
`;

export const ProposalTooltipDescriptionStyle = styled.div`
  ${ProposalTooltipCommonStyle}
  display: flex;
  align-self: center;
  top: 62px;
  font-size: 14px;
  line-height: 21px;
  text-align: left;
  padding: 5px 0px 5px 10px;
  display: flex;
  width: 315px;
`;

export const ProposalTooltipLabelStyle = styled(UnstyledButtonStyle)`
  ${ProposalTooltipCommonStyle}
  display: flex;
  align-self: center;
  font-size: 12px;
  text-align: center;
  padding: 5px 10px;
  &:after {
    content: '';
    position: absolute;
  }
`;

export const ProposalTooltipInfoIconStyle = styled(SvgInfos)`
  margin: 6px 0px 10px 10px;
  width: 15px;
  height: 15px;
`;

export const ProposalTooltipCloseButtonStyle = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  padding: none;
`;

export const ProposalTooltipCloseIconStyle = styled(SvgClose)`
  width: 10px;
  height: 10px;
  margin: 0px 10px;
  background-color: transparent;
  .tofill {
    fill: ${color.white};
  }
`;

export const ProposalTooltipVerticalSeparatorStyle = styled.div`
  border: 0.5px solid ${color.white};
  background-color: ${color.white};
  opacity: 0.3;
  height: 84px;
  margin-left: 10px;
`;

export const ProposalTriangleUpStyle = styled.div`
  position: absolute;
  display: flex;
  align-self: center;
  top: 52px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0px 7px 10px 7px;
  border-color: transparent transparent ${color.infos} transparent;
`;
