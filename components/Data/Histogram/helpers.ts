export const getHistogramBarHeight = (
  itemValue: number,
  maxValue: number
): number => {
  const checkedMaxValue = maxValue !== 0 ? maxValue : 1;
  const value = (itemValue * 100) / checkedMaxValue;
  return Math.round(value);
};

export const getHistogramBarWidth = (
  parentWidth: number,
  arrayLength: number
): number => {
  if (parentWidth < 1 || arrayLength < 1) {
    return 0;
  }
  const value = parentWidth / arrayLength;
  const barWidth = (value * 100) / parentWidth;
  return Math.floor(barWidth);
};

export const getHistogramBarMargin = (
  parentWidth: number,
  arrayLength: number
): number => {
  if (parentWidth < 1 || arrayLength < 1) {
    return 0;
  }
  const halfMinusOneEighth = 2 - 0.25;
  const barMargin = parentWidth / arrayLength / halfMinusOneEighth;
  return Math.floor(barMargin);
};
