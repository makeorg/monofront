import { colors } from '@make.org/designsystem/tokens/colors';
import { PieChartDataType } from '@make.org/types';
import { typography } from '@make.org/designsystem/tokens/typography';

const offsetCanvasValue = (canvasValue: number, offset: number) => {
  const value = offset > 0 ? canvasValue / offset : 0;
  return value;
};

export const getItemDeltaX = (
  item: PieChartDataType,
  canvas: HTMLCanvasElement,
  deltaX: number,
  cx: number
): number => {
  const isXAxisAdjusted = item.adjustLabel && item.adjustLabel.xAxis;
  const itemDeltaX = isXAxisAdjusted
    ? deltaX + offsetCanvasValue(canvas.width, isXAxisAdjusted)
    : deltaX + cx;

  return itemDeltaX;
};

export const getPercentDeltaY = (
  item: PieChartDataType,
  canvas: HTMLCanvasElement,
  deltaY: number,
  cy: number
): number => {
  const isYAxisAdjusted = item.adjustLabel && item.adjustLabel.yAxis;
  const percentDeltaY = isYAxisAdjusted
    ? deltaY + offsetCanvasValue(canvas.height, isYAxisAdjusted)
    : deltaY + cy;

  return percentDeltaY;
};

export const getLabelDeltaY = (
  item: PieChartDataType,
  canvas: HTMLCanvasElement,
  deltaY: number,
  labelYOffset: number,
  labelCy: number
): number => {
  const isYAxisAdjusted = item.adjustLabel && item.adjustLabel.yAxis;
  const labelDeltaY = isYAxisAdjusted
    ? deltaY + offsetCanvasValue(canvas.height, isYAxisAdjusted - labelYOffset)
    : deltaY + labelCy;

  return labelDeltaY;
};

export const getSublabelDeltaY = (
  item: PieChartDataType,
  canvas: HTMLCanvasElement,
  deltaY: number,
  sublabelYOffset: number,
  sublabelCy: number
): number => {
  const isYAxisAdjusted = item.adjustLabel && item.adjustLabel.yAxis;
  const sublabelDeltaY = isYAxisAdjusted
    ? deltaY +
      offsetCanvasValue(canvas.height, isYAxisAdjusted - sublabelYOffset)
    : deltaY + sublabelCy;

  return sublabelDeltaY;
};

export const setCanvasStyles = (
  ctx: CanvasRenderingContext2D,
  item: PieChartDataType,
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): void => {
  ctx.fillStyle = item.color;
  ctx.beginPath();

  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radius, startAngle, endAngle, false);
  ctx.lineTo(cx, cy);
  ctx.fill();
  ctx.closePath();
};

export const setPercentAsLabel = (
  ctx: CanvasRenderingContext2D,
  item: PieChartDataType,
  itemDeltaX: number,
  percentDeltaY: number,
  isMobile: boolean
): void => {
  const isTextAlignAdjusted = item.adjustLabel && item.adjustLabel.textAlign;
  const hidePercentLabel = item.adjustLabel && item.adjustLabel.hidePercent;

  ctx.beginPath();
  ctx.font = isMobile
    ? `bold 8px ${typography.FontFamily.Hightlight}`
    : `bold 15px ${typography.FontFamily.Hightlight}`;
  ctx.textAlign = isTextAlignAdjusted || 'center';
  ctx.fillStyle = colors.Content.Interface.Dark;
  ctx.fillText(
    hidePercentLabel ? item.label : `${item.percent}%`,
    itemDeltaX,
    percentDeltaY
  );
};

export const setMainLabel = (
  ctx: CanvasRenderingContext2D,
  item: PieChartDataType,
  itemDeltaX: number,
  labelDeltaY: number,
  isMobile: boolean
): void => {
  const isTextAlignAdjusted = item.adjustLabel && item.adjustLabel.textAlign;
  const hidePercentLabel = item.adjustLabel && item.adjustLabel.hidePercent;

  ctx.beginPath();
  ctx.font = isMobile
    ? `6px ${typography.FontFamily.Default}`
    : `11px ${typography.FontFamily.Default}`;
  ctx.textAlign = isTextAlignAdjusted || 'center';
  ctx.fillStyle = colors.Content.Interface.Dark;
  ctx.fillText(hidePercentLabel ? '' : item.label, itemDeltaX, labelDeltaY);
};

export const setSubLabel = (
  ctx: CanvasRenderingContext2D,
  item: PieChartDataType,
  itemDeltaX: number,
  sublabelDeltaY: number,
  isMobile: boolean
): void => {
  const isTextAlignAdjusted = item.adjustLabel && item.adjustLabel.textAlign;

  ctx.beginPath();
  ctx.font = isMobile
    ? `6px ${typography.FontFamily.Default}`
    : `11px ${typography.FontFamily.Default}`;
  ctx.textAlign = isTextAlignAdjusted || 'center';
  ctx.fillStyle = colors.Content.Interface.Dark;
  ctx.fillText(item.sublabel || '', itemDeltaX, sublabelDeltaY);
};
