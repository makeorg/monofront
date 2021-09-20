import {
  DESKTOP_DEVICE,
  MOBILE_DEVICE,
} from '@make.org/utils/constants/config';
import {
  pxToRem,
  pxToPercent,
  intToPx,
  getBarHeight,
  getFullWidthDividedByItems,
  getSixteenPerNineRatioWidth,
  getSixteenPerNineRatioHeight,
  matchDesktopDevice,
  matchMobileDevice,
} from './styled';

jest.mock('@make.org/utils/constants/config');

describe('pxToRem', () => {
  it('convert unit from pixel to rem on default base', () => {
    expect(pxToRem(16)).toEqual('1rem');
  });

  it('convert unit from pixel to rem with modified base', () => {
    expect(pxToRem(14, 14)).toEqual('1rem');
  });
});

describe('pxToPercent', () => {
  it('convert unit from pixel to percent', () => {
    expect(pxToPercent(50, 100)).toEqual('50%');
  });
});

describe('intToPx', () => {
  it('convert an integral to pixel unit', () => {
    expect(intToPx(18)).toEqual('18px');
  });
});

describe('getBarHeight', () => {
  it('convert a percent value to pixels (30px = 100%) to render vote histogram', () => {
    expect(getBarHeight(50, 30)).toEqual('15px');
  });
});

describe('getFullWidthDividedByItems', () => {
  it('return a percent value of 100% divided by number of items', () => {
    expect(getFullWidthDividedByItems(4)).toEqual('25%');
  });
});

describe('getSixteenPerNineRatioWidth', () => {
  it('return a width value from a 16:9 ratio', () => {
    expect(getSixteenPerNineRatioWidth(9)).toEqual(16);
  });
});

describe('getSixteenPerNineRatioHeight', () => {
  it('return a height value from a 16:9 ratio', () => {
    expect(getSixteenPerNineRatioHeight(16)).toEqual(9);
  });
});

describe('matchDesktopDevice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('return value for desktop device value', () => {
    expect(matchDesktopDevice(DESKTOP_DEVICE)).toEqual(true);
  });

  it('return value for other device value', () => {
    expect(matchDesktopDevice('foo')).toEqual(false);
  });
});

describe('matchMobileDevice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('return value for mobile device value', () => {
    expect(matchMobileDevice(MOBILE_DEVICE)).toEqual(true);
  });

  it('return value for other device value', () => {
    expect(matchMobileDevice('foo')).toEqual(false);
  });
});
