import React, { FC } from 'react';
import i18n from 'i18next';
import { ProposalType } from '@make.org/types';
import { useLargeMobile } from '@make.org/utils/hooks/useMedia';
import {
  getOrganisationProfileLink,
  getPersonalityProfileLink,
} from '@make.org/utils/helpers/url';
import { Avatar } from '@make.org/ui/components/Avatar';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { trackClickPublicProfile } from '@make.org/utils/services/Tracking';
import { USER } from '@make.org/types/enums';

import {
  formatAuthorName,
  formatOrganisationName,
} from '@make.org/utils/helpers/stringFormatter';
import { useAppContext } from '@make.org/store';
import {
  AuthorInfosStyle,
  InfosWrapperStyle,
  CertifiedIconStyle,
  AuthorLinkStyle,
} from './style';

type Props = {
  /** Object with author's properties */
  proposal: ProposalType;
};

const ProposalAuthorAge: React.FC<{ age: number | null }> = ({ age }) => {
  if (!age) {
    return null;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{`, ${i18n.t('proposal_card.author.age', { age })}`}</>;
};

export const ProposalAuthorInformations: FC<Props> = ({ proposal }) => {
  const { state } = useAppContext();
  const { country, source } = state.appConfig;
  const { author } = proposal;

  const isWidget = source === 'widget';
  const isOrganisation = author.userType === USER.TYPE_ORGANISATION;
  const isPersonality = author.userType === USER.TYPE_PERSONALITY;
  const isBasicUser = author.userType === USER.TYPE_USER;

  return (
    <>
      <ScreenReaderItemStyle>
        <>{i18n.t('proposal_card.author.from')}</>
      </ScreenReaderItemStyle>
      <InfosWrapperStyle>
        {isOrganisation &&
          (isWidget ? (
            formatOrganisationName(author.organisationName || '')
          ) : (
            <AuthorLinkStyle
              onClick={() => trackClickPublicProfile(USER.TYPE_ORGANISATION)}
              to={getOrganisationProfileLink(
                country,
                author.organisationSlug || ''
              )}
            >
              {formatOrganisationName(author.organisationName || '')}
              <CertifiedIconStyle aria-hidden focusable="false" />
            </AuthorLinkStyle>
          ))}
        {isPersonality &&
          (isWidget ? (
            formatAuthorName(author.firstName || '')
          ) : (
            <>
              <AuthorLinkStyle
                onClick={() => trackClickPublicProfile(USER.TYPE_PERSONALITY)}
                to={getPersonalityProfileLink(country, proposal.userId)}
              >
                {formatAuthorName(author.firstName || '')}
              </AuthorLinkStyle>
              <CertifiedIconStyle aria-hidden focusable="false" />
            </>
          ))}
        {isBasicUser && formatAuthorName(author.firstName || '')}
        {isBasicUser && <ProposalAuthorAge age={author.age} />}
      </InfosWrapperStyle>
    </>
  );
};

const setAvatarSize = (isLargeMobile: boolean) => {
  if (isLargeMobile) {
    return 45;
  }

  return 36;
};

export const ProposalAuthor: FC<Props> = ({ proposal }) => {
  const { author } = proposal;
  const isLargeMobile = useLargeMobile();
  const avatarSize = setAvatarSize(isLargeMobile);

  return (
    <AuthorInfosStyle>
      <Avatar
        avatarUrl={author.avatarUrl || ''}
        isSequence
        avatarSize={avatarSize}
      />
      <ProposalAuthorInformations proposal={proposal} />
    </AuthorInfosStyle>
  );
};
