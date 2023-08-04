import { ProposalType } from '@make.org/types';
import { CARD, SEQUENCE } from '@make.org/types/enums';
import * as helpers from './sequence';

describe('Sequence Helper', () => {
  describe('test buildCards', () => {
    const proposals: ProposalType[] = [];

    it("doesn't contain intro card", () => {
      const extraSlidesConfig = {
        introCard: { enabled: false },
        demographics: [],
        isDemographicsSessionBindingMode: false,
      };
      const cards = helpers.buildCards(proposals, extraSlidesConfig, true);
      expect(cards.length).toBe(1);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
          configuration: undefined,
        },
      ]);
    });

    it('contain intro card', () => {
      const extraSlidesConfig = {
        introCard: { enabled: true },
        demographics: [],
        isDemographicsSessionBindingMode: false,
      };
      const cards = helpers.buildCards(proposals, extraSlidesConfig, false);
      expect(cards.length).toBe(2);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_INTRO,
          configuration: { enabled: true },
        },
        {
          index: 1,
          type: CARD.CARD_TYPE_EXTRASLIDE_SPECIAL_FINAL_CARD,
          configuration: undefined,
        },
      ]);
    });

    it("doesn't contain push proposal card", () => {
      const extraSlidesConfig = {
        introCard: { enabled: false },
        demographics: [],
        pushProposalCard: { enabled: false },
        isDemographicsSessionBindingMode: false,
      };
      const canPropose = true;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        canPropose
      );
      expect(cards.length).toBe(1);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
          configuration: undefined,
        },
      ]);
    });

    it('contain push proposal card', () => {
      const extraSlidesConfig = {
        introCard: { enabled: false },
        demographics: [],
        pushProposalCard: { enabled: true },
        isDemographicsSessionBindingMode: false,
      };
      const canPropose = true;
      const cards = helpers.buildCards(
        proposals,
        extraSlidesConfig,
        canPropose
      );
      expect(cards.length).toBe(2);
      expect(cards).toEqual([
        {
          index: 0,
          type: CARD.CARD_TYPE_EXTRASLIDE_PUSH_PROPOSAL,
          configuration: extraSlidesConfig.pushProposalCard,
        },
        {
          index: 1,
          type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
          configuration: undefined,
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
      });
      expect(pushProposal).toEqual(true);
    });

    it('without push proposal', () => {
      const pushProposal = helpers.isPushProposalCard({
        index: 0,
        type: CARD.CARD_TYPE_EXTRASLIDE_FINAL_CARD,
        configuration: undefined,
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
        introCard: { enabled: false },
        demographics: [],
        isDemographicsSessionBindingMode: false,
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
        introCard: { enabled: false },
        demographics: [],
        isDemographicsSessionBindingMode: false,
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
        demographics: [],
        isDemographicsSessionBindingMode: false,
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
