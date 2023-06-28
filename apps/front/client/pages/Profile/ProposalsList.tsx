import React, { FC } from 'react';
import {
  CommonUsersProfileType,
  OrganisationType,
  PersonalityType,
  ProposalType,
  UserType,
} from '@make.org/types';
import { ProfileProposalCard } from '@make.org/components/Proposal/ProfileProposalCard';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  ProfileContentHeaderStyle,
  ProfileHeaderStyle,
  ProfilePageContentStyle,
  ProfilePageContentWrapperStyle,
  ProfileTitleSeparatorStyle,
} from '@make.org/ui/elements/ProfileElements';
import { ThirdLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { Redirect } from 'react-router';
import { useAppContext } from '@make.org/store';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { getRouteProfileOpinions } from '@make.org/utils/routes';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { USER } from '@make.org/types/enums';
import { Pagination } from '@make.org/components/Pagination';
import { PROPOSALS_LISTING_LIMIT } from '@make.org/utils/constants/proposal';
import { UserProfileSkipLinks } from '../../app/SkipLinks/Profile';
import { UserInformations } from '../../app/Profile/UserInformations';
import { ProfileTabs } from './Tabs';

type Props = {
  titles: {
    meta: string;
    section: string;
  };
  proposals: ProposalType[];
  isLoading: boolean;
  proposalsTotal: number;
  placeholder: JSX.Element;
};

export const ProfileProposalsList: FC<Props> = ({
  titles,
  proposals,
  isLoading,
  proposalsTotal,
  placeholder,
}) => {
  const { state } = useAppContext();
  const { user } = selectAuthentication(state);
  const { country } = state.appConfig;
  const isPersonality = user && user.userType === USER.TYPE_PERSONALITY;
  const proposalsLength = proposals.length;
  const renderPlaceholder = !proposalsLength && !isLoading;
  const renderProposals = !!proposalsLength;
  const profileOpinions = getRouteProfileOpinions(country);

  if (!user) {
    return <Redirect to={getHomeLink(country)} />;
  }

  if (isPersonality) {
    return <Redirect to={profileOpinions} />;
  }

  const formattedUserType = user as (
    | UserType
    | PersonalityType
    | OrganisationType
  ) & {
    profile: CommonUsersProfileType;
  };

  return (
    <>
      <UserProfileSkipLinks />
      <MetaTags title={titles.meta} />
      <ProfileHeaderStyle />
      <ProfilePageContentWrapperStyle>
        <UserInformations user={formattedUserType} />
        <ProfilePageContentStyle>
          <ProfileTabs />
          <ProfileContentHeaderStyle>
            <ThirdLevelTitleStyle as="h2">
              {titles.section}
            </ThirdLevelTitleStyle>
            <ProfileTitleSeparatorStyle />
          </ProfileContentHeaderStyle>
          {renderProposals && (
            <section>
              {proposals.map((proposal, index) => (
                <ProfileProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  size={proposalsLength}
                  position={index}
                />
              ))}
            </section>
          )}
          {isLoading && <Spinner />}
          {proposalsTotal > PROPOSALS_LISTING_LIMIT && (
            <Pagination
              itemsPerPage={PROPOSALS_LISTING_LIMIT}
              itemsTotal={proposalsTotal}
            />
          )}
          {renderPlaceholder && placeholder}
        </ProfilePageContentStyle>
      </ProfilePageContentWrapperStyle>
    </>
  );
};
