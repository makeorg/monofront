// @flow
import React from 'react';
import i18n from 'i18next';
import { ProposalType } from '@make.org/types';
import { DateHelper } from '@make.org/utils/helpers/date';
import { Avatar } from '@make.org/ui/components/Avatar';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { DATE_CAPITALIZE_LL_FORMAT } from '@make.org/utils/constants/date';
import { useAppContext } from '@make.org/store';
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
  /** Specifc design for sequence avatar */
  isSequence?: boolean;
};

export const DeprecatedProposalAuthor: React.FC<Props> = ({
  proposal,
  withAvatar = false,
  withCreationDate = false,
  formattedProposalStatus = false,
  isSequence = false,
}) => {
  const { author } = proposal;
  const { state } = useAppContext();
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  return (
    <AuthorDescriptionStyle>
      <AuthorInfosStyle as="div" isSequence={isSequence}>
        {withAvatar && (
          <>
            {isSequence && (
              <Avatar
                avatarUrl={author.avatarUrl}
                isSequence={isSequence}
                avatarSize={isMobile ? 30 : 50}
              />
            )}
            {!isSequence && <Avatar avatarUrl={author.avatarUrl} />}
          </>
        )}
        <ProposalAuthorInformations
          proposal={proposal}
          isSequence={isSequence}
        />
        {withCreationDate && !!proposal.createdAt && (
          <>
            &nbsp;&bull;&nbsp;
            <ScreenReaderItemStyle>
              {i18n.t('proposal_card.author.date')}
            </ScreenReaderItemStyle>
            <time dateTime={proposal.createdAt}>
              {DateHelper.localizedAndFormattedDate(
                proposal.createdAt,
                DATE_CAPITALIZE_LL_FORMAT
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
