import React, { FC, useEffect, useState } from 'react';
import { SEQUENCE } from '@make.org/types/enums';
import { useAppContext } from '@make.org/store';
import { Sequence } from '@make.org/components/Sequence/Sequence';
import {
  getMetalTitleBySequenceKind,
  isStandardSequence,
} from '@make.org/utils/helpers/sequence';
import { Modal } from '@make.org/components/Modal';
import { Panel } from '@make.org/components/Panel';
import { PrivacyPolicyModal } from '@make.org/components/PrivacyPolicyModal';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { isInProgress } from '@make.org/utils/helpers/date';
import { QuestionType } from '@make.org/types';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { MetaTags } from '@make.org/components/MetaTags';
import i18n from 'i18next';
import { env } from '@make.org/assets/env';
import { HeaderPanel } from '../../components/HeaderPanel';
import { ClosedConsultation } from '../../components/ClosedConsultation';
import { IntroProposal } from '../../components/IntroProposal';
import { WidgetContainerStyle } from '../../style';
import { FirstProposal } from '../../components/FirstProposal';

export const RootPage: FC = () => {
  const { state } = useAppContext();
  const { currentQuestion, appConfig, modal } = state;
  const { sequenceKind, loadFirstProposal } = state.sequence;
  const { unsecure } = appConfig;
  const { showDataPolicy } = modal;
  const isStandardSequenceKind = sequenceKind
    ? isStandardSequence(sequenceKind)
    : true;
  const question: QuestionType = selectCurrentQuestion(state);
  const topProposalIsActive = question.activeFeatureData?.topProposal !== null;
  const [topProposal, disableTopProposal] =
    useState<boolean>(topProposalIsActive);
  const [widgetcards, setWidgetCards] = useState(
    <FirstProposal sequenceKind={sequenceKind || SEQUENCE.KIND_STANDARD} />
  );
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(env.isClientSide());
  }, []);

  useEffect(() => {
    if (topProposal) {
      setWidgetCards(<IntroProposal handleChange={disableTopProposal} />);
      return;
    }

    if (!topProposal && loadFirstProposal) {
      setWidgetCards(
        <FirstProposal sequenceKind={sequenceKind || SEQUENCE.KIND_STANDARD} />
      );
      return;
    }

    setWidgetCards(
      <Sequence sequenceKind={sequenceKind || SEQUENCE.KIND_STANDARD} />
    );
  }, [topProposal, loadFirstProposal, sequenceKind]);

  if (!currentQuestion) {
    return <Spinner />;
  }

  if (!isInProgress(question) || unsecure) {
    return <ClosedConsultation dataCyClientLoaded={isClientSide} />;
  }

  return (
    <WidgetContainerStyle
      isStandardSequenceKind={isStandardSequenceKind}
      data-cy-client-loaded={isClientSide}
    >
      <MetaTags
        title={i18n.t(getMetalTitleBySequenceKind(sequenceKind), {
          question: question.wording.question,
        })}
        description={question.wording.metas.description}
        picture={question.wording.metas.picture}
      />
      <HeaderPanel />
      {widgetcards}
      <Panel />
      <Modal />
      {showDataPolicy && <PrivacyPolicyModal />}
    </WidgetContainerStyle>
  );
};
