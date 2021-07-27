// @flow
import React, { useRef } from 'react';
import { SliderParamsType, OrganisationType } from '@make.org/types/';
import { useSlider } from '@make.org/utils/hooks/useSlider';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import { getOrganisationProfileLink } from '@make.org/utils/helpers/url';
import { Avatar } from '@make.org/ui/components/Avatar';

import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  ProfileContentWrapperStyle,
  ProfileTitleStyle,
  ProfileAvatarLayoutStyle,
  ProfileAvatarStyle,
} from '@make.org/ui/elements/ProfileElements';
import { GliderStylesheet } from '@make.org/assets/css-in-js/GliderStyle';
import { formatOrganisationName } from '@make.org/utils/helpers/stringFormatter';
import { CertifiedIconStyle } from '../../../../Proposal/DeprecatedAuthor/Styled';
import { SearchOrganisationItemStyle } from '../../../Styled';
import {
  SearchSliderListStyle,
  SearchSliderListItemStyle,
} from '../../Proposals/Styled';

type Props = {
  organisations: OrganisationType[];
};

const SEARCH_ORGANISATION_SLIDER = 'search-organisation';
const SearchOrganisationsSliderParams: SliderParamsType = {
  slidesToShow: 1.15,
  interactiveChildren: {
    links: true,
  },
};

export const MainResultsOrganisationsMobile: React.FC<Props> = ({
  organisations,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const hasOrganisations = organisations.length > 0;
  useSlider(sliderRef, SearchOrganisationsSliderParams, hasOrganisations);

  return (
    <>
      <GliderStylesheet />
      <div className={`${SEARCH_ORGANISATION_SLIDER} glider-contain`}>
        <div className={`${SEARCH_ORGANISATION_SLIDER} glider`} ref={sliderRef}>
          <SearchSliderListStyle
            className={`${SEARCH_ORGANISATION_SLIDER} glider-track with-avatar`}
          >
            {organisations.map(organisation => (
              <SearchSliderListItemStyle
                key={organisation.slug}
                className={SEARCH_ORGANISATION_SLIDER}
              >
                <SearchOrganisationItemStyle
                  className="mobile-radius"
                  key={organisation.slug}
                  as={Link}
                  to={getOrganisationProfileLink(
                    organisation.country,
                    organisation.slug
                  )}
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
              </SearchSliderListItemStyle>
            ))}
          </SearchSliderListStyle>
        </div>
      </div>
    </>
  );
};
