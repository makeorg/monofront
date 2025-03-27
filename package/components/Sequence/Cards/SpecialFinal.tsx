import React, { useEffect } from 'react';
import i18n from 'i18next';
import { trackDisplayFinalCard } from '@make.org/utils/services/Tracking';
import { resetSequenceVotedProposals } from '@make.org/store/actions/sequence';
import { useAppContext } from '@make.org/store';
import { FinalCardConfigType } from '@make.org/types';
import { SequenceMainTitleStyle } from './style';

type Props = {
  questionSlug: string;
  configuration: FinalCardConfigType;
};

export const SpecialFinalCard: React.FC<Props> = ({
  configuration,
  questionSlug,
}) => {
  const { dispatch, state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  useEffect(() => {
    trackDisplayFinalCard();
    return () => dispatch(resetSequenceVotedProposals(questionSlug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SequenceMainTitleStyle
      className={isWidget ? 'widget' : ''}
      data-cy-container="final-card-title"
    >
      {configuration.isSessionBindingMode
        ? i18n.t('special_final_card.title_binding_mode')
        : i18n.t('special_final_card.title')}
    </SequenceMainTitleStyle>
  );
};
