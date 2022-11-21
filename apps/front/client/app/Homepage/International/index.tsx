import React, { FC } from 'react';
import { getHomeLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import {
  HomepagePageInnerStyle,
  HomepageSectionStyle,
  HomepageSectionTitleStyle,
} from '../../../pages/Home/style';
import { ConsultationElementSubtitleStyle } from '../../Consultation/Browse/style';
import { HomepageQuestionsButtonStyle } from '../Questions/style';

export const InternationalPlaceholder: FC = () => (
  <HomepageSectionStyle
    as="section"
    aria-labelledby="international_placeholder_title"
    id="international_placeholder"
  >
    <HomepagePageInnerStyle>
      <ConsultationElementSubtitleStyle data-cy-container="international_placeholder_subtitle">
        {i18n.t('homepage.international.subtitle')}
      </ConsultationElementSubtitleStyle>
      <HomepageSectionTitleStyle
        data-cy-container="international_placeholder_title"
        id="international_placeholder_title"
      >
        {i18n.t('homepage.international.title')}
      </HomepageSectionTitleStyle>
      <HomepageQuestionsButtonStyle
        to={getHomeLink('FR')}
        data-cy-link="international-placeholder-link"
      >
        <>{i18n.t('homepage.international.button')}</>
      </HomepageQuestionsButtonStyle>
    </HomepagePageInnerStyle>
  </HomepageSectionStyle>
);
