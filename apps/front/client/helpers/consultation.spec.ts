import { IDS } from '@make.org/types/enums';
import { getCurrentContainer } from './consultation';

describe('Current container helper', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('returns top idea container', () => {
    const currentContainer = getCurrentContainer(IDS.RESULTS_TOP_IDEAS);
    expect(currentContainer).toBe('top-ideas');
  });

  it('returns controversials container', () => {
    const currentContainer = getCurrentContainer(IDS.RESULTS_CONTROVERSIALS);
    expect(currentContainer).toBe('proposals-controversials');
  });

  it('returns cartography container', () => {
    const currentContainer = getCurrentContainer(IDS.RESULTS_CARTOGRAPHY);
    expect(currentContainer).toBe('cartography');
  });

  it('returns participants container', () => {
    const currentContainer = getCurrentContainer(IDS.RESULTS_PARTICIPATION);
    expect(currentContainer).toBe('participants-chart');
  });

  it('returns null if no id', () => {
    const currentContainer = getCurrentContainer('');
    expect(currentContainer).toBe('');
  });
});
