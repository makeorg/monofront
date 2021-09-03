import React, { FC } from 'react';
import { ProposalType, QuestionType } from '@make.org/types';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  SequenceContainerStyle,
  SequenceContentStyle,
} from '@make.org/components/Sequence/style';
import { SequenceProgress } from '@make.org/components/Sequence/Progress';
import {
  SequenceCardStyle,
  SequenceMainTitleStyle,
  SequenceParagraphStyle,
} from '@make.org/components/Sequence/Cards/style';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import { trackClickOperationPage } from '@make.org/utils/services/Tracking';
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import { WidgetContainer } from '../../style';
import { SidePanel } from '../SidePanel';

export const ClosedConsultation: FC = () => {
  const { state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);
  const { country } = state.appConfig;
  const proposal: ProposalType | null | undefined =
    question.activeFeatureData.topProposal;

  if (!proposal) {
    return null;
  }

  return (
    <WidgetContainer>
      <MetaTags
        title={i18n.t('meta.sequence.title_standard', {
          question: question.wording.question,
        })}
        description={question.wording.metas.description}
        picture={question.wording.metas.picture}
      />
      <SidePanel />
      <SequenceContainerStyle data-cy-container="sequence" className="widget">
        <SequenceContentStyle>
          <SequenceCardStyle className="center">
            <SequenceMainTitleStyle>
              {i18n.t('unsecure.title')}
            </SequenceMainTitleStyle>
            <SequenceParagraphStyle>
              {i18n.t('unsecure.description')}
            </SequenceParagraphStyle>
            <RedHTMLLinkElementStyle
              href={getParticipateLink(country, question.slug)}
              onClick={() => trackClickOperationPage()}
            >
              {i18n.t('unsecure.link')}
            </RedHTMLLinkElementStyle>
          </SequenceCardStyle>
          <SequenceProgress disabled />
        </SequenceContentStyle>
      </SequenceContainerStyle>
    </WidgetContainer>
  );
};
