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
import { SequenceMainTitleStyle, SequenceParagraphStyle } from './style';

type Props = {
  questionSlug: string;
};

export const SpecialFinalCard: React.FC<Props> = ({ questionSlug }) => {
  const { dispatch, state } = useAppContext();
  const { country, source } = state.appConfig;
  const isWidget = source === 'widget';

  useEffect(() => {
    trackDisplayFinalCard();
    return () => dispatch(resetSequenceVotedProposals(questionSlug));
  }, [questionSlug, dispatch]);

  return (
    <>
      <SequenceMainTitleStyle className={isWidget ? 'widget' : ''}>
        {i18n.t('special_final_card.title')}
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
