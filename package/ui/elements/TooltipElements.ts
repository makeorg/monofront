import styled, { StyledComponent } from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { UnstyledButtonStyle } from './ButtonsElements';
import { SvgClose, SvgInfos } from '../Svg/elements';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TooltipStyle = styled.div<{ as: StyledComponent<'div', any> }>`
  min-width: 70px;
  position: absolute;
  padding: ${spacings.xs} ${spacings.s};
  z-index: 1;
  background-color: ${colors.Background.Alert.Infos};
  color: ${colors.Content.Interface.Light};
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

const VerticalToolptipStyle = styled(TooltipStyle)`
  transform: translate(-50%, 0);
  left: 50%;
  &:after {
    right: 50%;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    transform: translate(50%, 0);
  }
`;

const HorizontalTooltipStyle = styled(TooltipStyle)`
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
  bottom: calc(100% + ${spacings.s});
  &:after {
    top: 100%;
    border-top: 5px solid ${colors.Border.Interface.Darker};
  }
`;

export const BottomTooltipStyle = styled(VerticalToolptipStyle)`
  top: calc(100% + ${spacings.s});
  &:after {
    bottom: 100%;
    border-bottom: 5px solid ${colors.Border.Interface.Darker};
  }
`;

export const LeftTooltipStyle = styled(HorizontalTooltipStyle)`
  right: calc(100% + ${spacings.s});
  &:after {
    left: 100%;
    border-left: 5px solid ${colors.Border.Interface.Darker};
  }
`;

export const RightTooltipStyle = styled(HorizontalTooltipStyle)`
  left: calc(100% + ${spacings.s});
  &:after {
    right: 100%;
    border-right: 5px solid ${colors.Border.Interface.Darker};
  }
`;

const ProposalTooltipCommonStyle = `
  background-color: ${colors.Background.Alert.Infos};
  z-index: 1;
  border-radius: 2px;
  color: ${colors.Content.Interface.Light};
`;

export const ProposalTooltipWrapperStyle = styled.div`
  position: relative;
`;

export const ProposalTooltipDescriptionStyle = styled.div`
  ${ProposalTooltipCommonStyle}
  position: absolute;
  display: flex;
  align-self: center;
  top: 45px;
  font-size: 14px;
  line-height: 21px;
  text-align: left;
  padding: ${spacings.xs} 0px ${spacings.xs} ${spacings.s};
  display: flex;
  left: 50%;
  transform: translate(-50%);
  width: 315px;
`;

export const ProposalTooltipLabelStyle = styled(UnstyledButtonStyle)`
  ${ProposalTooltipCommonStyle}
  display: flex;
  align-self: center;
  font-size: 12px;
  text-align: center;
  padding: ${spacings.xs} ${spacings.s};
  height: 28px;
  &:after {
    content: '';
    position: absolute;
  }
`;

export const ProposalTooltipInfoIconStyle = styled(SvgInfos)`
  margin: ${spacings.xs} 0px ${spacings.s} ${spacings.s};
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
  margin: 0px ${spacings.s};
  background-color: transparent;
  .tofill {
    fill: ${colors.Content.Interface.Light};
  }
`;

export const ProposalTooltipVerticalSeparatorStyle = styled.div`
  border: 0.5px solid ${colors.Border.Interface.Lighter};
  background-color: ${colors.Background.Interface.Lighter};
  opacity: 0.3;
  height: 84px;
  margin-left: ${spacings.s};
`;

export const ProposalTriangleUpStyle = styled.div`
  position: absolute;
  display: flex;
  align-self: center;
  top: 35px;
  left: 50%;
  transform: translate(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0px 7px 10px 7px;
  border-color: transparent transparent ${colors.Border.Alert.Infos} transparent;
`;
