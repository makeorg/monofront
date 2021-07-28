// @flow
import React from 'react';
import {
  type TypeControversialsProposals,
  type RejectedProposalsType,
} from 'Shared/types/question';
import { i18n } from 'Shared/i18n';
import { ScreenReaderItemStyle } from 'Client/ui/Elements/AccessibilityElements';
import { formatAuthorName } from 'Shared/helpers/stringFormatter';
import { useSelector } from 'react-redux';
import { matchMobileDevice } from 'Shared/helpers/styled';
import { AvatarImageStyle } from 'Client/ui/Avatar/style';
import { SvgEmptyAvatar } from 'Client/ui/Svg/elements';
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
  proposals: TypeControversialsProposals[] | RejectedProposalsType[],
  isRejected?: boolean,
  question: QuestionType,
};

export const ProposalsResults = ({
  proposals,
  question,
  isRejected,
}: Props) => {
  const setAvatarSize = (isMobile: boolean) => {
    if (!isMobile) {
      return 38;
    }

    return 31;
  };
  const { device } = useSelector((state: StateRoot) => state.appConfig);
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
          <ResultsProposalContentStyle as="p" lang={question.language}>
            {proposal.content}
          </ResultsProposalContentStyle>
          {isRejected ? (
            <ResultsStyle>
              <ResultsNoWayStyle>
                {i18n.t('consultation.results.proposals.rejected_results', {
                  disagree: proposal.disagree,
                  no_way: proposal.no_way,
                })}
              </ResultsNoWayStyle>
            </ResultsStyle>
          ) : (
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
          )}
        </ResultsProposalListItemStyle>
      ))}
    </ResultsProposalsListStyle>
  );
};
