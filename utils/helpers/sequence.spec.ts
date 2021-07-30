import { ProposalType } from '@make.org/types';
import { CARD, SEQUENCE } from '@make.org/types/enums';
import * as helpers from './sequence';

describe('Sequence Helper', () => {
  describe('test buildCards', () => {
    const proposals: ProposalType[] = [];

    it("doesn't contain intro card in API conf and in params", () => {
      const extraSlidesConfig = {
        introCard: { enabled: false },
      };
      const introCardParam = false;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        false,
        false,
        true,
        introCardParam,
        false,
        true
      );
      expect(cards.length).toBe(2);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
        {
          index: 1,
          type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
      ]);
    });

    it('contain intro card in API conf but false in params', () => {
      const extraSlidesConfig = {
        introCard: { enabled: true },
      };
      const introCardParam = false;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        false,
        false,
        true,
        introCardParam,
        false,
        true
      );
      expect(cards.length).toBe(2);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
        {
          index: 1,
          type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
      ]);
    });

    it("doesn't contain intro card in API conf but true in params", () => {
      const extraSlidesConfig = {
        introCard: { enabled: false },
      };
      const introCardParam = true;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        false,
        false,
        true,
        introCardParam,
        false,
        true
      );
      expect(cards.length).toBe(2);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
        {
          index: 1,
          type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
      ]);
    });

    it('contain intro card in API conf and in params', () => {
      const extraSlidesConfig = {
        introCard: { enabled: true },
      };
      const introCardParam = true;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        false,
        false,
        true,
        introCardParam,
        false,
        true
      );

      expect(cards.length).toBe(3);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_INTRO,
          configuration: extraSlidesConfig.introCard,
          state: {
            votes: [],
          },
        },
        {
          index: 1,
          type: CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
        {
          index: 2,
          type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
      ]);
    });

    it("doesn't contain push proposal card in API conf and in params", () => {
      const extraSlidesConfig = {
        pushProposalCard: { enabled: false },
      };
      const pushProposalParam = false;
      const hasProposed = false;
      const canPropose = true;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        hasProposed,
        canPropose,
        true,
        false,
        pushProposalParam,
        true
      );
      expect(cards.length).toBe(2);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
        {
          index: 1,
          type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
      ]);
    });

    it('contain push proposal in API conf but false in params', () => {
      const extraSlidesConfig = {
        pushProposalCard: { enabled: true },
      };
      const pushProposalParam = false;
      const hasProposed = false;
      const canPropose = true;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        hasProposed,
        canPropose,
        true,
        false,
        pushProposalParam,
        true
      );
      expect(cards.length).toBe(2);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
        {
          index: 1,
          type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
      ]);
    });

    it("doesn't contain push proposal in API conf but true in params", () => {
      const extraSlidesConfig = {
        pushProposalCard: { enabled: false },
      };
      const pushProposalParam = true;
      const hasProposed = false;
      const canPropose = true;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        hasProposed,
        canPropose,
        true,
        false,
        pushProposalParam,
        true
      );
      expect(cards.length).toBe(2);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
        {
          index: 1,
          type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
      ]);
    });

    it('contain push proposal in API conf and in params', () => {
      const extraSlidesConfig = {
        pushProposalCard: { enabled: true },
      };
      const pushProposalParam = true;
      const hasProposed = false;
      const canPropose = true;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        hasProposed,
        canPropose,
        true,
        false,
        pushProposalParam,
        true
      );

      expect(cards.length).toBe(3);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_PUSH_PROPOSAL,
          configuration: extraSlidesConfig.pushProposalCard,
          state: {
            votes: [],
          },
        },
        {
          index: 1,
          type: CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
        {
          index: 2,
          type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
      ]);
    });

    it('contain push proposal but has already proposed', () => {
      const extraSlidesConfig = {
        pushProposalCard: { enabled: true },
      };
      const pushProposalParam = true;
      const hasProposed = true;
      const canPropose = true;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        hasProposed,
        canPropose,
        true,
        false,
        pushProposalParam,
        true
      );

      expect(cards.length).toBe(2);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
        {
          index: 1,
          type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
      ]);
    });

    it('contain push proposal but canPropose is disabled', () => {
      const extraSlidesConfig = {
        pushProposalCard: { enabled: true },
      };
      const pushProposalParam = true;
      const hasProposed = false;
      const canPropose = false;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        hasProposed,
        canPropose,
        true,
        false,
        pushProposalParam,
        true
      );

      expect(cards.length).toBe(2);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_DEMOGRAPHICS_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
        {
          index: 1,
          type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
      ]);
    });
  });

  describe('get sequence title by kind', () => {
    it('title from controversy kind', () => {
      const specialTitle = helpers.getSequenceTitleBySequenceKind(
        SEQUENCE.KIND_CONTROVERSY
      );
      // TODO i18next init
      // expect(specialTitle).toEqual('sequence_zone.controversial_title');
    });

    it('title from consensus kind', () => {
      const specialTitle = helpers.getSequenceTitleBySequenceKind(
        SEQUENCE.KIND_CONSENSUS
      );
      // TODO i18next init
      // expect(specialTitle).toEqual('sequence_zone.popular_title');
    });

    it('title from unknown kind', () => {
      const specialTitle = helpers.getSequenceTitleBySequenceKind('foo');
      expect(specialTitle).toEqual(null);
    });
  });
});
