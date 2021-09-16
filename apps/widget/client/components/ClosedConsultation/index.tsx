import React, { FC } from 'react';
import { QuestionType } from '@make.org/types';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  SequenceContainerStyle,
  SequenceContentStyle,
} from '@make.org/components/Sequence/style';
import { SequenceProgress } from '@make.org/components/Sequence/Progress';
import { SequenceCardStyle } from '@make.org/components/Sequence/Cards/style';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import { trackClickOperationPage } from '@make.org/utils/services/Tracking';
import { RedUppercaseHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import {
  ClosedConsultationDescriptionStyle,
  ClosedConsultationTitleStyle,
  WidgetContainer,
} from '../../style';
import { HeaderPanel } from '../HeaderPanel';

export const ClosedConsultation: FC = () => {
  const { state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);
  const { country } = state.appConfig;

  return (
    <WidgetContainer>
      <MetaTags
        title={i18n.t('meta.sequence.title_standard', {
          question: question.wording.question,
        })}
        description={question.wording.metas.description}
        picture={question.wording.metas.picture}
      />
      <HeaderPanel />
      <SequenceContainerStyle data-cy-container="sequence" className="widget">
        <SequenceContentStyle>
          <SequenceCardStyle className="center widget">
            <ClosedConsultationTitleStyle>
              {i18n.t('unsecure.title')}
            </ClosedConsultationTitleStyle>
            <ClosedConsultationDescriptionStyle>
              {i18n.t('unsecure.description')}
            </ClosedConsultationDescriptionStyle>
            <RedUppercaseHTMLLinkElementStyle
              href={`https://make.org${getParticipateLink(
                country,
                question.slug
              )}`}
              onClick={() => trackClickOperationPage()}
              target="_blank"
            >
              {i18n.t('unsecure.link')}
            </RedUppercaseHTMLLinkElementStyle>
          </SequenceCardStyle>
          <SequenceProgress disabled />
        </SequenceContentStyle>
      </SequenceContainerStyle>
    </WidgetContainer>
  );
};
