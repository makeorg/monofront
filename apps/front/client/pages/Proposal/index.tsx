import React, { FC, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import i18n from 'i18next';
import { ProposalType, QuestionType } from '@make.org/types';
import { useParams } from 'react-router';
import { MiddlePageWrapperStyle } from '@make.org/ui/elements/MainElements';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { SingleProposalCard } from '@make.org/components/Proposal/SingleProposalCard';
import { SingleProposalSharingComponent } from '@make.org/components/Flipping/Sharing/SingleProposal';
import { checkIsFeatureActivated } from '@make.org/utils/helpers/featureFlipping';
import { FEATURE_FLIPPING } from '@make.org/types/enums';
import { isInProgress } from '@make.org/utils/helpers/date';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { trackDisplayProposalPage } from '@make.org/utils/services/Tracking';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { MetaTags } from '@make.org/components/MetaTags';
import { useAppContext } from '@make.org/store';
import { ProposalSkipLinks } from '../../app/SkipLinks/Proposal';

const ProposalPage: FC = () => {
  const { proposalId } = useParams<{ proposalId: string }>();
  const [proposal, setProposal] = useState<ProposalType | undefined>(undefined);
  const { state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);

  useEffect(() => {
    const getProposal = async () => {
      const response = await ProposalService.getProposal(proposalId);
      if (response) {
        setProposal(response);
      }
    };
    getProposal();
    trackDisplayProposalPage();
  }, [proposalId]);

  if (!question) {
    return (
      <MiddlePageWrapperStyle>
        <Spinner />
      </MiddlePageWrapperStyle>
    );
  }
  const isSharingDisabled: boolean = checkIsFeatureActivated(
    FEATURE_FLIPPING.CONSULTATION_SHARE_DISABLE,
    question.activeFeatures
  );

  return (
    <ThemeProvider theme={question.theme}>
      <MiddlePageWrapperStyle>
        <ProposalSkipLinks />
        {proposal && (
          <>
            <MetaTags
              title={i18n.t('meta.proposal.title', {
                proposal: proposal.content,
                question: question.question,
              })}
              description={i18n.t('meta.proposal.description')}
              picture={question.wording.metas.picture}
            />
            <SingleProposalCard proposal={proposal} />
          </>
        )}

        {!isSharingDisabled && isInProgress(question) && (
          <SingleProposalSharingComponent />
        )}
      </MiddlePageWrapperStyle>
    </ThemeProvider>
  );
};

// default export needed for loadable component
export default ProposalPage; // eslint-disable-line import/no-default-export
