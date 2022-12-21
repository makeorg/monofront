import { SEQUENCE } from '@make.org/types/enums';
import { getWidgetLocation } from './location';

describe('getCountryWithConsultations function', () => {
  it('standard sequence', () => {
    expect(getWidgetLocation(SEQUENCE.KIND_STANDARD)).toBe('widget');
  });

  it('controversial sequence', () => {
    expect(getWidgetLocation(SEQUENCE.KIND_CONTROVERSY)).toBe(
      'widget-controversial'
    );
  });

  it('popular sequence', () => {
    expect(getWidgetLocation(SEQUENCE.KIND_CONSENSUS)).toBe('widget-popular');
  });
});
