import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import i18n from 'i18next';
import { getOrganisationProfileLink } from '@make.org/utils/helpers/url';
import { OrganisationType, OrganisationsType } from '@make.org/types';
import { trackDisplaySearchOragnisationsResult } from '@make.org/utils/services/Tracking';
import { OrganisationService } from '@make.org/utils/services/Organisation';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';

import { Avatar } from '@make.org/ui/components/Avatar';
import {
  ProfileContentWrapperStyle,
  ProfileTitleStyle,
  ProfileAvatarLayoutStyle,
  ProfileAvatarStyle,
} from '@make.org/ui/elements/ProfileElements';
import { CertifiedIconStyle } from '@make.org/components/Proposal/DeprecatedAuthor/Styled';
import { formatOrganisationName } from '@make.org/utils/helpers/stringFormatter';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import { MetaTags } from '../../app/MetaTags';
import {
  SearchPageContentStyle,
  SearchPageResultsStyle,
  SearchPageTitleStyle,
  SearchPageWrapperStyle,
} from './style';
import { SearchBackButton } from '../../app/Search/BackButton';
import {
  SearchOrganisationItemStyle,
  SearchOrganisationsListItemStyle,
  SearchOrganisationsListStyle,
} from '../../app/Search/MainResults/Organisations/style';
import { SearchRegister } from '../../app/Search/Register';

export const SearchOrganisations: React.FC<RouteComponentProps> = ({
  history,
  location,
}) => {
  const { state } = useAppContext();
  const { country, device } = state.appConfig;
  const params = new URLSearchParams(location.search);
  const term = params.get('query') || '';
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState<number>(0);
  const [organisations, setOrganisations] = useState<OrganisationType[]>([]);
  const isDesktop = matchDesktopDevice(device);

  const initOrganisations = async () => {
    setIsLoading(true);
    const organisationsResponse: OrganisationsType | null =
      await OrganisationService.searchOrganisations(country, term);

    if (organisationsResponse) {
      const { results, total } = organisationsResponse;
      setOrganisations(results);
      setCount(total);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    initOrganisations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  useEffect(() => {
    trackDisplaySearchOragnisationsResult();
  }, []);

  return (
    <SearchPageWrapperStyle>
      <MetaTags
        title={i18n.t('meta.search.organisations', {
          term,
        })}
      />

      <SearchBackButton term={term} history={history} />
      <SearchPageTitleStyle>
        {isLoading
          ? i18n.t('search.titles.loading')
          : i18n.t('search.titles.organisations', {
              term,
              count,
            })}
      </SearchPageTitleStyle>
      <SearchPageContentStyle>
        <SearchPageResultsStyle>
          <SearchOrganisationsListStyle>
            {organisations.map(organisation => (
              <SearchOrganisationsListItemStyle
                key={organisation.organisationId}
              >
                <SearchOrganisationItemStyle
                  className="mobile-radius"
                  as={Link}
                  to={getOrganisationProfileLink(country, organisation.slug)}
                >
                  <ProfileAvatarLayoutStyle>
                    <ProfileAvatarStyle avatarSize={80}>
                      <Avatar
                        avatarSize={80}
                        avatarUrl={organisation.avatarUrl}
                      />
                    </ProfileAvatarStyle>
                    <ProfileContentWrapperStyle>
                      <ProfileTitleStyle>
                        <ScreenReaderItemStyle>
                          {i18n.t('profile.common.labels.organisation')}
                        </ScreenReaderItemStyle>
                        {formatOrganisationName(organisation.organisationName)}
                        <CertifiedIconStyle aria-hidden focusable="false" />
                      </ProfileTitleStyle>
                    </ProfileContentWrapperStyle>
                  </ProfileAvatarLayoutStyle>
                </SearchOrganisationItemStyle>
              </SearchOrganisationsListItemStyle>
            ))}
          </SearchOrganisationsListStyle>
        </SearchPageResultsStyle>
        {isDesktop && <SearchRegister />}
      </SearchPageContentStyle>
    </SearchPageWrapperStyle>
  );
};
