import React from 'react';
import i18n from 'i18next';
import { ProposalType } from '@make.org/types';
import { DateHelper } from '@make.org/utils/helpers/date';
import { Avatar } from '@make.org/ui/components/Avatar';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { DATE } from '@make.org/types/enums';
import {
  AuthorDescriptionStyle,
  AuthorInfosStyle,
  ProposalStatusStyle,
} from './Styled';
import { ProposalAuthorInformations } from '../Author';

type Props = {
  /** Object with author's properties */
  proposal: ProposalType;
  /** Include avatar */
  withAvatar?: boolean;
  /** Include creation date */
  withCreationDate?: boolean;
  /** Include formatted proposal status */
  formattedProposalStatus?: string;
};

export const DeprecatedProposalAuthor: React.FC<Props> = ({
  proposal,
  withAvatar = false,
  withCreationDate = false,
  formattedProposalStatus = false,
}) => {
  const { author } = proposal;
  return (
    <AuthorDescriptionStyle>
      <AuthorInfosStyle as="div">
        {withAvatar && <Avatar avatarUrl={author.avatarUrl} />}
        <ProposalAuthorInformations proposal={proposal} />
        {withCreationDate && !!proposal.createdAt && (
          <>
            &nbsp;&bull;&nbsp;
            <ScreenReaderItemStyle>
              {i18n.t('proposal_card.author.date')}
            </ScreenReaderItemStyle>
            <time dateTime={proposal.createdAt}>
              {DateHelper.localizedAndFormattedDate(
                proposal.createdAt,
                DATE.PPP_FORMAT
              )}
            </time>
          </>
        )}
      </AuthorInfosStyle>
      {formattedProposalStatus && (
        <ProposalStatusStyle className={`status-${formattedProposalStatus}`}>
          <ScreenReaderItemStyle>
            {i18n.t('proposal_card.status.title')}
          </ScreenReaderItemStyle>
          {i18n.t(`proposal_card.status.${formattedProposalStatus}`)}
        </ProposalStatusStyle>
      )}
    </AuthorDescriptionStyle>
  );
};
