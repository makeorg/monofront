import { QuestionExtraSlidesConfigType } from '@make.org/types';
import { transformExtraSlidesConfigFromQuery } from './query.helper';

describe('query helper', () => {
  describe('transformExtraSlidesConfigFromQuery', () => {
    it('wihtout extra cards', () => {
      const extraSlidesConfig: QuestionExtraSlidesConfigType = {
        introCard: {
          enabled: true,
          title: 'fooTitle',
          description: 'fooDescription',
        },
        pushProposalCard: {
          enabled: true,
        },
        demographics: [],
        isDemographicsSessionBindingMode: false,
      };
      const extraSlides = transformExtraSlidesConfigFromQuery(
        extraSlidesConfig,
        true,
        true
      );
      expect(extraSlides).toMatchObject({});
    });

    it('Disable intro card', () => {
      const extraSlidesConfig: QuestionExtraSlidesConfigType = {
        introCard: {
          enabled: true,
          title: 'fooTitle',
          description: 'fooDescription',
        },
        pushProposalCard: {
          enabled: true,
        },
        demographics: [],
        isDemographicsSessionBindingMode: false,
      };

      const extraSlides = transformExtraSlidesConfigFromQuery(
        extraSlidesConfig,
        true,
        false
      );
      expect(extraSlides).toMatchObject({
        pushProposalCard: extraSlidesConfig.pushProposalCard,
      });
    });

    it('Disable push proposal card', () => {
      const extraSlidesConfig: QuestionExtraSlidesConfigType = {
        introCard: {
          enabled: true,
          title: 'fooTitle',
          description: 'fooDescription',
        },
        pushProposalCard: {
          enabled: true,
        },
        demographics: [],
        isDemographicsSessionBindingMode: false,
      };
      const extraSlides = transformExtraSlidesConfigFromQuery(
        extraSlidesConfig,
        false,
        true
      );
      expect(extraSlides).toMatchObject({
        introCard: extraSlidesConfig.introCard,
      });
    });
  });
});
