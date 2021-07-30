import React, { FC } from 'react';
import { TopIdeaCommentsType } from '@make.org/types';
import { ProposalCardStyle } from '@make.org/ui/elements/ProposalCardElements';
import { Link } from 'react-router-dom';
import { opinionsVoteStaticParams } from '@make.org/utils/constants/opinions';
import i18n from 'i18next';
import { matchMobileDevice, scrollToTop } from '@make.org/utils/helpers/styled';
import { SvgThumbsUp } from '@make.org/ui/Svg/elements';
import {
  MiddleRowStyle,
  FlexElementStyle,
  ColumnElementStyle,
} from '@make.org/ui/elements/FlexElements';
import { getPersonalityProfileLink } from '@make.org/utils/helpers/url';
import { Avatar } from '@make.org/ui/components/Avatar';
import { CertifiedIconStyle } from '@make.org/components/Proposal/DeprecatedAuthor/Styled';
import { trackClickPublicProfile } from '@make.org/utils/services/Tracking';
import { TYPE_PERSONALITY } from '@make.org/utils/constants/user';
import { useAppContext } from '@make.org/store';
import {
  CandidateLinkStyle,
  PoliticalPartyStyle,
} from '../../../custom/municipales/CandidateEngagement/style';
import {
  CommitmentPreviewOpinionsParagraphStyle,
  CommitmentPreviewSeparatorStyle,
  CommitmentPreviewOpinionsIconWrapperStyle,
  CommitmentPreviewBoxStyle,
  CommitmentPreviewOpinionsWrapperStyle,
} from '../Commitment/Preview/style';
import { OpinionCommentAuthorStyle } from '../style';

type Props = {
  comment: TopIdeaCommentsType;
};

const handleClickProfile = () => {
  scrollToTop();
  trackClickPublicProfile(TYPE_PERSONALITY);
};

export const OpinionComment: FC<Props> = ({ comment }) => {
  const { state } = useAppContext();
  const { country, device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const { politicalParty, displayName, personalityId, avatarUrl } =
    comment.personality;

  return (
    <ProposalCardStyle>
      <FlexElementStyle>
        <Link
          to={getPersonalityProfileLink(country, personalityId)}
          onClick={handleClickProfile}
        >
          <Avatar
            avatarUrl={avatarUrl}
            avatarSize={isMobile ? 35 : 50}
            avatarAlt={i18n.t('consultation.partners.profile_link', {
              name: displayName,
            })}
          />
        </Link>
        {isMobile ? (
          <ColumnElementStyle>
            <OpinionCommentAuthorStyle>
              <CandidateLinkStyle
                to={getPersonalityProfileLink(country, personalityId)}
                onClick={handleClickProfile}
              >
                {displayName}
              </CandidateLinkStyle>
              <CertifiedIconStyle aria-hidden focusable="false" />
            </OpinionCommentAuthorStyle>
            <PoliticalPartyStyle>{politicalParty}</PoliticalPartyStyle>
          </ColumnElementStyle>
        ) : (
          <MiddleRowStyle>
            <CandidateLinkStyle
              to={getPersonalityProfileLink(country, personalityId)}
              onClick={handleClickProfile}
            >
              {displayName}
            </CandidateLinkStyle>
            <CertifiedIconStyle aria-hidden focusable="false" />
            {politicalParty && (
              <PoliticalPartyStyle>
                &nbsp;&bull;&nbsp;
                {politicalParty}
              </PoliticalPartyStyle>
            )}
          </MiddleRowStyle>
        )}
      </FlexElementStyle>
      <CommitmentPreviewSeparatorStyle />
      <CommitmentPreviewOpinionsWrapperStyle>
        <CommitmentPreviewOpinionsIconWrapperStyle
          transform={opinionsVoteStaticParams[comment.vote].transform}
          color={opinionsVoteStaticParams[comment.vote].color}
        >
          <SvgThumbsUp aria-hidden focusable="false" />
        </CommitmentPreviewOpinionsIconWrapperStyle>
        <CommitmentPreviewOpinionsParagraphStyle
          color={opinionsVoteStaticParams[comment.vote].color}
          dangerouslySetInnerHTML={{
            __html: comment.qualification
              ? i18n.t(
                  `personality.opinions.preview.${comment.vote}_${comment.qualification}`
                )
              : i18n.t(`personality.opinions.preview.${comment.vote}`),
          }}
        />
      </CommitmentPreviewOpinionsWrapperStyle>
      {comment.comment1 && (
        <CommitmentPreviewBoxStyle>
          {comment.comment1}
        </CommitmentPreviewBoxStyle>
      )}
      {comment.comment2 && (
        <CommitmentPreviewBoxStyle>
          {comment.comment2}
        </CommitmentPreviewBoxStyle>
      )}
      {comment.comment3 && (
        <CommitmentPreviewBoxStyle>
          {comment.comment3}
        </CommitmentPreviewBoxStyle>
      )}
    </ProposalCardStyle>
  );
};
