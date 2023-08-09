import React, { useEffect } from 'react';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import {
  trackClickOperationPage,
  trackDisplayFinalCard,
} from '@make.org/utils/services/Tracking';
import { resetSequenceVotedProposals } from '@make.org/store/actions/sequence';
import { useAppContext } from '@make.org/store';
import {
  RedUppercaseLinkElementStyle,
  RedUppercaseHTMLLinkElementStyle,
} from '@make.org/ui/elements/LinkElements';
import { FinalCardConfigType } from '@make.org/types';
import { SequenceMainTitleStyle, SequenceParagraphStyle } from './style';

type Props = {
  questionSlug: string;
  configuration: FinalCardConfigType;
};

export const SpecialFinalCard: React.FC<Props> = ({
  configuration,
  questionSlug,
}) => {
  const { dispatch, state } = useAppContext();
  const { country, source } = state.appConfig;
  const isWidget = source === 'widget';

  useEffect(() => {
    trackDisplayFinalCard();
    return () => dispatch(resetSequenceVotedProposals(questionSlug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SequenceMainTitleStyle
        className={isWidget ? 'widget' : ''}
        data-cy-container="final-card-title"
      >
        {configuration.isSessionBindingMode
          ? i18n.t('special_final_card.title_binding_mode')
          : i18n.t('special_final_card.title')}
      </SequenceMainTitleStyle>
      <SequenceParagraphStyle>
        {i18n.t('special_final_card.subtitle')}
      </SequenceParagraphStyle>
      {isWidget ? (
        <RedUppercaseHTMLLinkElementStyle
          href={`https://make.org${getParticipateLink(country, questionSlug)}`}
          target="__blank"
        >
          {i18n.t('special_final_card.cta_text')}
        </RedUppercaseHTMLLinkElementStyle>
      ) : (
        <RedUppercaseLinkElementStyle
          to={getParticipateLink(country, questionSlug)}
          onClick={() => trackClickOperationPage()}
        >
          {i18n.t('special_final_card.cta_text')}
        </RedUppercaseLinkElementStyle>
      )}
    </>
  );
};
