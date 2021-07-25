import {
  queryParamIsDisable,
  transformExtraSlidesConfigFromQuery,
} from './query.helper';

describe('query helper', () => {
  describe('queryParamIsDisable', () => {
    it('introCard query must be enabled by default', () => {
      // given
      const query = {};
      // when
      const isDisable = queryParamIsDisable(query, 'introCard');
      // then
      expect(isDisable).toBe(false);
    });

    it('introCard query must be disabled', () => {
      // given
      const query = { introCard: 'false' };
      // when
      const isDisable = queryParamIsDisable(query, 'introCard');
      // then
      expect(isDisable).toBe(true);
    });

    it('introCard query must be enabled', () => {
      // given
      const query = { introCard: 'true' };
      // when
      const isDisable = queryParamIsDisable(query, 'introCard');
      // then
      expect(isDisable).toBe(false);
    });
  });

  describe('transformExtraSlidesConfigFromQuery', () => {
    let extraSlidesConfig;
    beforeEach(() => {
      extraSlidesConfig = {
        introCard: { param: 'unactive' },
      };
    });
    it('introCard query must be enabled by default', () => {
      // given
      const query = {};
      // when
      const extraSlides = transformExtraSlidesConfigFromQuery(
        extraSlidesConfig,
        query
      );
      // then
      expect(extraSlides).toEqual(extraSlidesConfig);
    });

    it('introCard query must be enabled', () => {
      // given
      const query = { introCard: 'true' };
      // when
      const extraSlides = transformExtraSlidesConfigFromQuery(
        extraSlidesConfig,
        query
      );
      // then
      expect(extraSlides).toEqual(extraSlidesConfig);
    });
  });
});
