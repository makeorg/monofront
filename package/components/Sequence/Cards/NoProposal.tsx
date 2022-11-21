import React, { useEffect } from 'react';
import i18n from 'i18next';
import { LinkAsRedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import { QuestionType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { SimpleLinkAsRedButton } from '@make.org/ui/elements/LinkElements';
import { trackDisplayNoProposalSequence } from '@make.org/utils/services/Tracking';
import { Sharing } from '../../Sharing';
import {
  SequenceMainTitleStyle,
  SequenceParagraphStyle,
  FinalCardSeparatorStyle,
} from './style';

export type Props = {
  /** Object with Dynamic properties used to configure the Sequence (questionId, country, ...) */
  question: QuestionType;
  title: string;
  description: string;
};

export const NoProposal: React.FC<Props> = ({
  question,
  title,
  description,
}) => {
  const { state } = useAppContext();
  const { device, country, source } = state.appConfig;
  const isWidget = source === 'widget';
  const isDesktop = matchDesktopDevice(device);

  useEffect(() => {
    trackDisplayNoProposalSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SequenceMainTitleStyle className={isWidget ? 'widget' : ''}>
        {title}
      </SequenceMainTitleStyle>
      <SequenceParagraphStyle>{description}</SequenceParagraphStyle>
      {isWidget ? (
        <SimpleLinkAsRedButton
          href={`https://make.org${getParticipateLink(country, question.slug)}`}
          target="__blank"
        >
          <>{i18n.t('no_proposal_card.link_text')}</>
        </SimpleLinkAsRedButton>
      ) : (
        <LinkAsRedButtonStyle
          to={getParticipateLink(country, question.slug)}
          data-cy-link="go-participate-page"
        >
          <>{i18n.t('no_proposal_card.link_text')}</>
        </LinkAsRedButtonStyle>
      )}
      {isDesktop && !isWidget && (
        <>
          <FinalCardSeparatorStyle />
          <SequenceParagraphStyle>
            <>{i18n.t('no_proposal_card.sharing')}</>
          </SequenceParagraphStyle>
          <Sharing />
        </>
      )}
    </>
  );
};
