// @flow
import React from 'react';
import { i18n } from '@make.org/utils/i18n';
import { ProposalType } from '@make.org/types';
import {
  getOrganisationProfileLink,
  getPersonalityProfileLink,
} from '@make.org/utils/helpers/url';
import { Avatar } from '@make.org/ui/components/Avatar';
import { RedLinkRouterStyle } from '@make.org/ui/elements/LinkElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { trackClickPublicProfile } from '@make.org/utils/services/Tracking';
import {
  TYPE_ORGANISATION,
  TYPE_PERSONALITY,
  TYPE_USER,
} from '@make.org/utils/constants/user';
import {
  formatAuthorName,
  formatOrganisationName,
} from '@make.org/utils/helpers/stringFormatter';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import {
  AuthorInfosStyle,
  InfosWrapperStyle,
  CertifiedIconStyle,
} from './style';

type Props = {
  /** Object with author's properties */
  proposal: ProposalType;
  /** Enable sequence context & specials styles */
  isSequence: boolean;
};

export const ProposalAuthorAge: React.FC<{ age: number | null }> = ({
  age,
}) => {
  if (!age) {
    return null;
  }

  return <>{`, ${i18n.t('proposal_card.author.age', { age })}`}</>;
};

export const ProposalAuthorInformations: React.FC<Props> = ({
  proposal,
  isSequence,
}) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const { author } = proposal;

  const isOrganisation = author.userType === TYPE_ORGANISATION;
  const isPersonality = author.userType === TYPE_PERSONALITY;
  const isBasicUser = author.userType === TYPE_USER;

  return (
    <>
      <ScreenReaderItemStyle>
        {i18n.t('proposal_card.author.from')}
      </ScreenReaderItemStyle>
      <InfosWrapperStyle className={isSequence ? 'sequence' : ''}>
        {isOrganisation && (
          <>
            <RedLinkRouterStyle
              onClick={() => trackClickPublicProfile(TYPE_ORGANISATION)}
              to={getOrganisationProfileLink(
                country,
                author.organisationSlug || ''
              )}
            >
              {formatOrganisationName(author.organisationName || '')}
            </RedLinkRouterStyle>
            <CertifiedIconStyle aria-hidden focusable="false" />
          </>
        )}
        {isPersonality && (
          <>
            <RedLinkRouterStyle
              onClick={() => trackClickPublicProfile(TYPE_PERSONALITY)}
              to={getPersonalityProfileLink(country, proposal.userId)}
            >
              {formatAuthorName(author.firstName || '')}
            </RedLinkRouterStyle>
            <CertifiedIconStyle aria-hidden focusable="false" />
          </>
        )}
        {isBasicUser && formatAuthorName(author.firstName || '')}
        <ProposalAuthorAge age={author.age} />
      </InfosWrapperStyle>
    </>
  );
};

const setAvatarSize = (isMobile: boolean, isSequence: boolean) => {
  if (!isMobile && isSequence) {
    return 50;
  }

  return 36;
};

export const ProposalAuthor: React.FC<Props> = ({
  proposal,
  isSequence = false,
}) => {
  const { state } = useAppContext();
  const { author } = proposal;
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const avatarSize = setAvatarSize(isMobile, isSequence);

  return (
    <AuthorInfosStyle>
      <Avatar
        avatarUrl={author.avatarUrl || ''}
        isSequence
        avatarSize={avatarSize}
      />
      <ProposalAuthorInformations proposal={proposal} isSequence={isSequence} />
    </AuthorInfosStyle>
  );
};
