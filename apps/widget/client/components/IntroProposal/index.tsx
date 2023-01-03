import React, {
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { ProposalType, QuestionType } from '@make.org/types';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { ShowTranslation } from '@make.org/components/Proposal/ShowTranslationElement';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  SequenceContainerStyle,
  SequenceContentStyle,
} from '@make.org/components/Sequence/style';
import { SequenceProgress } from '@make.org/components/Sequence/Progress';
import {
  IntroProposalRedButtonStyle,
  SequenceCardStyle,
  SequenceProposalStyle,
} from '@make.org/components/Sequence/Cards/style';
import { ReportOptionsButton } from '@make.org/components/ReportOptions/Button';
import { CARD } from '@make.org/types/enums';
import { ProposalAuthor } from '@make.org/components/Proposal/Author';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  trackClickStartSequence,
  trackDisplayChargeIntroCard,
} from '@make.org/utils/services/Tracking';
import { getProposalContent } from '@make.org/utils/helpers/proposal';

type Props = {
  handleChange: Dispatch<SetStateAction<boolean>>;
  switchProposalContent: () => void;
};

export const IntroProposal: FC<Props> = ({
  handleChange,
  switchProposalContent,
}) => {
  const { state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);
  const proposal: ProposalType | null | undefined =
    question.activeFeatureData?.topProposal;
  const [showOriginal, setShowOriginal] = useState<boolean>(false);
  const { proposalContent, proposalLanguage } = getProposalContent(
    showOriginal,
    proposal
  );

  useEffect(() => {
    if (proposal) {
      trackDisplayChargeIntroCard();
    }
  }, [proposal]);

  if (!proposal) {
    return null;
  }

  return (
    <>
      <MetaTags
        title={i18n.t('meta.sequence.title_standard', {
          question: question.wording.question,
        })}
        description={question.wording.metas.description}
        picture={question.wording.metas.picture}
      />
      <SequenceContainerStyle data-cy-container="sequence" className="widget">
        <SequenceContentStyle>
          <SequenceCardStyle
            id="card-top"
            data-cy-card-type={CARD.CARD_TYPE_PROPOSAL}
            data-cy-card-number={0}
            className="widget"
          >
            {!showOriginal && (
              <ReportOptionsButton
                switchProposalContent={switchProposalContent}
              />
            )}
            <ProposalAuthor proposal={proposal} />
            <ScreenReaderItemStyle>
              {i18n.t('top_proposal_card.content')}
            </ScreenReaderItemStyle>
            <SequenceProposalStyle lang={proposalLanguage} className="widget">
              {proposalContent}
            </SequenceProposalStyle>
            {!!proposal.translatedLanguage && (
              <ShowTranslation
                showOriginal={showOriginal}
                onClickAction={() => setShowOriginal(!showOriginal)}
              />
            )}
            <IntroProposalRedButtonStyle
              onClick={() => {
                handleChange(false);
                trackClickStartSequence();
              }}
              id={`start-button-${proposal.id}`}
              data-cy-button="start-sequence"
            >
              {i18n.t('top_proposal_card.start')}
            </IntroProposalRedButtonStyle>
          </SequenceCardStyle>
          <SequenceProgress disabled />
        </SequenceContentStyle>
      </SequenceContainerStyle>
    </>
  );
};
