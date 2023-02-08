import React, { useMemo } from 'react';
import i18n from 'i18next';
import { ProposalType } from '@make.org/types';
import { DateHelper } from '@make.org/utils/helpers/date';
import { Avatar } from '@make.org/ui/components/Avatar';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { DATE } from '@make.org/types/enums';
import { ReportOptionsButton } from '../../ReportOptions/Button';
import {
  AuthorDescriptionStyle,
  AuthorInfosStyle,
  ProposalStatusStyle,
  AuthorReportButton,
  AuthorContainerStyle,
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
  switchProposalContent?: () => void;
  showOriginal?: boolean;
};

export const DeprecatedProposalAuthor: React.FC<Props> = ({
  proposal,
  withAvatar = false,
  withCreationDate = false,
  formattedProposalStatus = '',
  switchProposalContent,
  showOriginal,
}) => {
  const { author } = proposal;

  const transMapStatus = useMemo(
    () =>
      new Map([
        ['accepted', i18n.t('proposal_card.status.accepted')],
        ['refused', i18n.t('proposal_card.status.refused')],
        ['postponed', i18n.t('proposal_card.status.postponed')],
        ['pending', i18n.t('proposal_card.status.pending')],
      ]),
    [i18n.language]
  );

  return (
    <AuthorContainerStyle>
      <AuthorDescriptionStyle>
        <AuthorInfosStyle as="div">
          {withAvatar && <Avatar avatarUrl={author.avatarUrl} />}
          <ProposalAuthorInformations proposal={proposal} />
          {withCreationDate && !!proposal.createdAt && (
            <>
              &nbsp;&bull;&nbsp;
              <ScreenReaderItemStyle>
                <>{i18n.t('proposal_card.author.date')}</>
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
              <>{i18n.t('proposal_card.status.title')}</>
            </ScreenReaderItemStyle>
            {transMapStatus.get(formattedProposalStatus) || ''}
          </ProposalStatusStyle>
        )}
      </AuthorDescriptionStyle>
      {!!proposal.translatedContent &&
        switchProposalContent &&
        typeof showOriginal !== 'undefined' && (
          <AuthorReportButton>
            <ReportOptionsButton
              switchProposalContent={switchProposalContent}
              showOriginal={showOriginal}
              proposalId={proposal.id}
              translationLanguage={proposal.translatedLanguage}
            />
          </AuthorReportButton>
        )}
    </AuthorContainerStyle>
  );
};
