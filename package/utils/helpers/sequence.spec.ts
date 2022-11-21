import { DemographicDataType, ProposalType } from '@make.org/types';
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
        true,
        introCardParam,
        false
      );
      expect(cards.length).toBe(1);
      expect(cards).toEqual([
        {
          index: 0,
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
        true,
        introCardParam,
        false
      );
      expect(cards.length).toBe(1);
      expect(cards).toEqual([
        {
          index: 0,
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
        true,
        introCardParam,
        false
      );
      expect(cards.length).toBe(1);
      expect(cards).toEqual([
        {
          index: 0,
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
        true,
        introCardParam,
        false
      );

      expect(cards.length).toBe(2);
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
      const canPropose = true;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        canPropose,
        true,
        false,
        pushProposalParam
      );
      expect(cards.length).toBe(1);
      expect(cards).toEqual([
        {
          index: 0,
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
      const canPropose = true;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        canPropose,
        true,
        false,
        pushProposalParam
      );
      expect(cards.length).toBe(1);
      expect(cards).toEqual([
        {
          index: 0,
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
      const canPropose = true;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        canPropose,
        true,
        false,
        pushProposalParam
      );
      expect(cards.length).toBe(1);
      expect(cards).toEqual([
        {
          index: 0,
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
      const canPropose = true;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        canPropose,
        true,
        false,
        pushProposalParam
      );

      expect(cards.length).toBe(2);
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
      const canPropose = false;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        canPropose,
        true,
        false,
        pushProposalParam
      );

      expect(cards.length).toBe(1);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
          configuration: undefined,
          state: {
            votes: [],
          },
        },
      ]);
    });
  });

  describe('isPushProposalCard', () => {
    it('with push proposal', () => {
      const pushProposal = helpers.isPushProposalCard({
        index: 0,
        type: CARD.CARD_TYPE_EXTRASLIDE_PUSH_PROPOSAL,
        configuration: undefined,
        state: {
          votes: [],
        },
      });
      expect(pushProposal).toEqual(true);
    });

    it('without push proposal', () => {
      const pushProposal = helpers.isPushProposalCard({
        index: 0,
        type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
        configuration: undefined,
        state: {
          votes: [],
        },
      });
      expect(pushProposal).toEqual(false);
    });
  });

  describe('isStandardSequence', () => {
    it('sequence is standard ', () => {
      expect(helpers.isStandardSequence(SEQUENCE.KIND_STANDARD)).toEqual(true);
    });

    it('sequence is not standard ', () => {
      expect(helpers.isStandardSequence(SEQUENCE.KIND_CONTROVERSY)).toEqual(
        false
      );
    });
  });

  describe('get sequence title by kind', () => {
    it('title from controversy kind', () => {
      const specialTitle = helpers.getSequenceTitleBySequenceKind(
        SEQUENCE.KIND_CONTROVERSY
      );
      expect(specialTitle).toEqual('sequence_zone.controversial_title');
    });

    it('title from consensus kind', () => {
      const specialTitle = helpers.getSequenceTitleBySequenceKind(
        SEQUENCE.KIND_CONSENSUS
      );
      expect(specialTitle).toEqual('sequence_zone.popular_title');
    });

    it('title from unknown kind', () => {
      const specialTitle = helpers.getSequenceTitleBySequenceKind('foo');
      expect(specialTitle).toEqual(null);
    });
  });

  describe('get no proposal card title by kind', () => {
    it('title from controversy kind', () => {
      const specialTitle = helpers.getNoProposalCardTitleBySequenceKind(
        SEQUENCE.KIND_CONTROVERSY
      );
      expect(specialTitle).toEqual('no_proposal_card.title.controversial');
    });

    it('title from consensus kind', () => {
      const specialTitle = helpers.getNoProposalCardTitleBySequenceKind(
        SEQUENCE.KIND_CONSENSUS
      );
      expect(specialTitle).toEqual('no_proposal_card.title.popular');
    });

    it('title from unknown kind', () => {
      const specialTitle = helpers.getNoProposalCardTitleBySequenceKind('foo');
      expect(specialTitle).toEqual('no_proposal_card.title.regular');
    });
  });

  describe('get Sequence Size', () => {
    it('with intro card', () => {
      const extraSlidesConfig = {
        introCard: { enabled: true },
      };
      const sequenceSize = helpers.getSequenceSize(
        10,
        extraSlidesConfig,
        true,
        false,
        true
      );
      expect(sequenceSize).toEqual(12);
    });

    it('with push proposal card', () => {
      const extraSlidesConfig = {
        pushProposalCard: { enabled: true },
      };
      const sequenceSize = helpers.getSequenceSize(
        10,
        extraSlidesConfig,
        true,
        false,
        undefined
      );
      expect(sequenceSize).toEqual(12);
    });

    it('with demographics', () => {
      const extraSlidesConfig = {
        introCard: { enabled: false },
        pushProposalCard: { enabled: false },
      };
      const sequenceSize = helpers.getSequenceSize(
        10,
        extraSlidesConfig,
        true,
        true
      );
      expect(sequenceSize).toEqual(12);
    });
  });

  describe('Add demographics data to extra slides config', () => {
    const defaultDemographcis: DemographicDataType = {
      id: 'fooId',
      name: 'fooName',
      layout: 'OneColumnRadio',
      title: 'fooTitle',
      parameters: [
        {
          label: 'foo',
          value: 'foo',
        },
        {
          label: 'bar',
          value: 'bar',
        },
      ],
      token: 'fooToken',
    };

    it('with demographics', () => {
      const extraSlidesConfig = {
        introCard: { enabled: false },
        pushProposalCard: { enabled: false },
      };
      const extraSlidesWithDemographics =
        helpers.addDemographicsToSequenceConfig(
          extraSlidesConfig,
          true,
          defaultDemographcis
        );
      expect(extraSlidesWithDemographics).toEqual({
        ...extraSlidesConfig,
        demographics: defaultDemographcis,
      });
    });

    it('without demographics', () => {
      const extraSlidesConfig = {
        introCard: { enabled: false },
        pushProposalCard: { enabled: false },
      };
      const extraSlidesWithDemographics =
        helpers.addDemographicsToSequenceConfig(
          extraSlidesConfig,
          false,
          undefined
        );
      expect(extraSlidesWithDemographics).toEqual(extraSlidesConfig);
    });
  });

  describe('Handle no proposals card depending on context', () => {
    it('with keyword', () => {
      const noProposalsWithKeyword = {
        type: CARD.CARD_TYPE_NO_PROPOSAL_CARD,
        configuration: {
          title: 'no_proposal_card.title.keyword',
          description: 'no_proposal_card.description.special',
        },
        index: 0,
      };
      const CardWithKeyword = helpers.setNoProposalsCard('foo');
      expect(CardWithKeyword).toEqual(noProposalsWithKeyword);
    });

    it('without keyword', () => {
      const noProposalsWithoutKeyword = {
        type: CARD.CARD_TYPE_NO_PROPOSAL_CARD,
        configuration: {
          title: 'no_proposal_card.title.regular',
          description: 'no_proposal_card.description.special',
        },
        index: 0,
      };
      const CardWithKeyword = helpers.setNoProposalsCard();
      expect(CardWithKeyword).toEqual(noProposalsWithoutKeyword);
    });
  });
});

// TEST getMetalTitleBySequenceKind
