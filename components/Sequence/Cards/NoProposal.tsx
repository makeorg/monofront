import React from 'react';
import { i18n } from '@make.org/utils/i18n';
import { LinkAsRedButtonStyle } from '@make.org/ui/elements/Buttons/style';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import { QuestionType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import {
  SequenceMainTitleStyle,
  SequenceParagraphStyle,
  FinalCardSeparatorStyle,
} from './style';

// REST TO DO
import { Sharing } from 'Client/features/sharing';

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
  const { device, country } = state.appConfig;
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
