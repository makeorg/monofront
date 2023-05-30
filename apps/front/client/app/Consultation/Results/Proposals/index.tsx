import React, { FC } from 'react';
import { ControversialProposalsType, QuestionType } from '@make.org/types';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { formatAuthorName } from '@make.org/utils/helpers/stringFormatter';
import { useAppContext } from '@make.org/store';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { AvatarImageStyle } from '@make.org/ui/components/Avatar/style';
import { SvgEmptyAvatar } from '@make.org/ui/Svg/elements';
import {
  ResultsProposalsListStyle,
  ResultsProposalListItemStyle,
  ResultsProposalAuthorWrapperStyle,
  ResultsAvatarStyle,
  ResultsProposalContentStyle,
  ResultsStyle,
  ResultsLikeItStyle,
  ResultsNoWayStyle,
  ResultsLightningIconStyle,
} from './style';

type Props = {
  proposals: ControversialProposalsType[];
  question: QuestionType;
};

export const ProposalsResults: FC<Props> = ({ proposals, question }) => {
  const setAvatarSize = (isMobile: boolean) => {
    if (!isMobile) {
      return 38;
    }

    return 31;
  };
  const { state } = useAppContext();
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const avatarSize = setAvatarSize(isMobile);

  return (
    <ResultsProposalsListStyle>
      {proposals.map(proposal => (
        <ResultsProposalListItemStyle key={proposal.author}>
          <ResultsProposalAuthorWrapperStyle>
            <ResultsAvatarStyle isSequence>
              {proposal.avatarUrl ? (
                <AvatarImageStyle
                  src={proposal.avatarUrl}
                  alt=""
                  width={avatarSize}
                  height={avatarSize}
                  avatarSize={avatarSize}
                  crop
                />
              ) : (
                <SvgEmptyAvatar
                  aria-hidden
                  width={avatarSize}
                  height={avatarSize}
                  focusable="false"
                />
              )}
            </ResultsAvatarStyle>
            <ScreenReaderItemStyle>
              {i18n.t('proposal_card.author.from')}
            </ScreenReaderItemStyle>
            {formatAuthorName(proposal.author)}
          </ResultsProposalAuthorWrapperStyle>
          <ScreenReaderItemStyle>
            {i18n.t('proposal_card.content')}
          </ScreenReaderItemStyle>
          <ResultsProposalContentStyle as="p" lang={question.returnedLanguage}>
            {proposal.content}
          </ResultsProposalContentStyle>
          <ResultsStyle>
            <ResultsLikeItStyle>
              {i18n.t('consultation.results.proposals.controversials_agree', {
                count: proposal.agree,
              })}
            </ResultsLikeItStyle>
            <ResultsLightningIconStyle aria-hidden focusable="false" />
            <ResultsNoWayStyle>
              {i18n.t(
                'consultation.results.proposals.controversials_disagree',
                {
                  count: proposal.disagree,
                }
              )}
            </ResultsNoWayStyle>
          </ResultsStyle>
        </ResultsProposalListItemStyle>
      ))}
    </ResultsProposalsListStyle>
  );
};
