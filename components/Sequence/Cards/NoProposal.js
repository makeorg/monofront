import React from 'react';
import { i18n } from 'Shared/i18n';
import { useSelector } from 'react-redux';
import { LinkAsRedButtonStyle } from 'Client/ui/Elements/Buttons/V2/style';
import { Sharing } from 'Client/features/sharing';
import { matchDesktopDevice } from 'Shared/helpers/styled';
import { getParticipateLink } from 'Shared/helpers/url';
import {
  SequenceMainTitleStyle,
  SequenceParagraphStyle,
  FinalCardSeparatorStyle,
} from './style';

export type Props = {
  /** Object with Dynamic properties used to configure the Sequence (questionId, country, ...) */
  question: QuestionType,
  /** Sequence kind parameter */
  sequenceKind: string,
};

export const NoProposal = ({ question, title, description }) => {
  const { device, country } = useSelector(
    (state: StateRoot) => state.appConfig
  );
  const isDesktop = matchDesktopDevice(device);

  return (
    <>
      <SequenceMainTitleStyle>{title}</SequenceMainTitleStyle>
      <SequenceParagraphStyle>{description}</SequenceParagraphStyle>
      <LinkAsRedButtonStyle to={getParticipateLink(country, question.slug)}>
        {i18n.t('no_proposal_card.link_text')}
      </LinkAsRedButtonStyle>
      {isDesktop && (
        <>
          <FinalCardSeparatorStyle />
          <SequenceParagraphStyle>
            {i18n.t('no_proposal_card.sharing')}
          </SequenceParagraphStyle>
          <Sharing />
        </>
      )}
    </>
  );
};
