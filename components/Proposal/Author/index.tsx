import React from 'react';
import i18n from 'i18next';
import { ProposalType } from '@make.org/types';
import {
  getOrganisationProfileLink,
  getPersonalityProfileLink,
} from '@make.org/utils/helpers/url';
import { Avatar } from '@make.org/ui/components/Avatar';
import { RedLinkStyle } from '@make.org/ui/elements/LinkElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { trackClickPublicProfile } from '@make.org/utils/services/Tracking';
import { USER } from '@make.org/types/enums';

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
  isSequence?: boolean;
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
  const { country, source } = state.appConfig;
  const { author } = proposal;

  const isWidget = source === 'widget';
  const isOrganisation = author.userType === USER.TYPE_ORGANISATION;
  const isPersonality = author.userType === USER.TYPE_PERSONALITY;
  const isBasicUser = author.userType === USER.TYPE_USER;

  let className = '';

  if (isSequence && isWidget) {
    className = 'sequence widget';
  }

  if (isSequence) {
    className = 'sequence';
  }

  if (isWidget) {
    className = 'widget';
  }

  return (
    <>
      <ScreenReaderItemStyle>
        {i18n.t('proposal_card.author.from')}
      </ScreenReaderItemStyle>
      <InfosWrapperStyle className={className}>
        {isOrganisation &&
          (isWidget ? (
            formatOrganisationName(author.organisationName || '')
          ) : (
            <>
              <RedLinkStyle
                onClick={() => trackClickPublicProfile(USER.TYPE_ORGANISATION)}
                to={getOrganisationProfileLink(
                  country,
                  author.organisationSlug || ''
                )}
              >
                {formatOrganisationName(author.organisationName || '')}
              </RedLinkStyle>
              <CertifiedIconStyle aria-hidden focusable="false" />
            </>
          ))}
        {isPersonality &&
          (isWidget ? (
            formatAuthorName(author.firstName || '')
          ) : (
            <>
              <RedLinkStyle
                onClick={() => trackClickPublicProfile(USER.TYPE_PERSONALITY)}
                to={getPersonalityProfileLink(country, proposal.userId)}
              >
                {formatAuthorName(author.firstName || '')}
              </RedLinkStyle>
              <CertifiedIconStyle aria-hidden focusable="false" />
            </>
          ))}
        {isBasicUser && formatAuthorName(author.firstName || '')}
        <ProposalAuthorAge age={author.age} />
      </InfosWrapperStyle>
    </>
  );
};

const setAvatarSize = (
  isMobile: boolean,
  isSequence: boolean,
  isWidget: boolean
) => {
  if (!isMobile && isWidget) {
    return 40;
  }

  if (!isMobile && isSequence) {
    return 50;
  }

  if (isMobile && isWidget) {
    return 32;
  }

  return 36;
};

export const ProposalAuthor: React.FC<Props> = ({
  proposal,
  isSequence = false,
}) => {
  const { state } = useAppContext();
  const { author } = proposal;
  const { device, source } = state.appConfig;
  const isWidget = source === 'widget';
  const isMobile = matchMobileDevice(device);
  const avatarSize = setAvatarSize(isMobile, isSequence, isWidget);

  return (
    <AuthorInfosStyle className={isWidget ? 'widget' : ''}>
      <Avatar
        avatarUrl={author.avatarUrl || ''}
        isSequence
        avatarSize={avatarSize}
      />
      <ProposalAuthorInformations proposal={proposal} isSequence={isSequence} />
    </AuthorInfosStyle>
  );
};
