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
import { ClosedConsultationTitleStyle } from '../../style';
import { HeaderPanel } from '../HeaderPanel';

type Props = {
  dataCyClientLoaded: boolean;
};

export const ClosedConsultation: FC<Props> = ({ dataCyClientLoaded }) => {
  const { state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);

  return (
    <div data-cy-client-loaded={dataCyClientLoaded}>
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
          </SequenceCardStyle>
          <SequenceProgress disabled />
        </SequenceContentStyle>
      </SequenceContainerStyle>
    </div>
  );
};
