import React, { FC } from 'react';
import { QuestionType } from '@make.org/types';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import i18n from 'i18next';
import {
  SvgFacebookLogoF,
  SvgTwitterLogo,
  SvgInstagramLogo,
  SvgLinkedinLogoIn,
  SvgMegaphone,
} from '@make.org/ui/Svg/elements';
import {
  twitterMakeUrl,
  instagramMakeUrl,
  facebookMakeUrl,
  linkedinMakeUrl,
} from '@make.org/utils/helpers/social';
import {
  trackClickFollowUs,
  trackClickBlog,
} from '@make.org/utils/services/Tracking';
import { TileWithTitle } from '@make.org/ui/components/TileWithTitle';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import {
  RedLinkHTMLElementStyle,
  NewWindowIconStyle,
} from '@make.org/ui/elements/LinkElements';
import { ABOUT_MAKE_LINK } from '@make.org/utils/constants/url';
import { checkIsFeatureActivated } from '@make.org/utils/helpers/featureFlipping';
import { CONSULTATION_FOLLOW_US_ACTIVE } from '@make.org/utils/constants/featureFlipping';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  FollowUsStyle,
  FollowUsIconsStyle,
  FacebookButtonStyle,
  TwitterButtonStyle,
  InstagramButtonStyle,
  LinkedInButtonStyle,
  FollowUsListItemStyle,
} from './style';

type Props = {
  question: QuestionType;
};

export const FollowUs: FC<Props> = ({ question }) => {
  const isFollowUsActive: boolean = checkIsFeatureActivated(
    CONSULTATION_FOLLOW_US_ACTIVE,
    question.activeFeatures
  );

  if (!isFollowUsActive) {
    return null;
  }

  return (
    <TileWithTitle
      icon={<SvgMegaphone style={FollowUsIconsStyle} focusable="false" />}
      title={i18n.t('consultation.followus.title')}
    >
      <ParagraphStyle>
        {i18n.t('consultation.followus.description')}
      </ParagraphStyle>
      <FollowUsStyle as={UnstyledListStyle}>
        <FollowUsListItemStyle>
          <FacebookButtonStyle
            target="_blank"
            rel="noopener"
            as="a"
            href={facebookMakeUrl}
            onClick={() => trackClickFollowUs('facebook')}
          >
            <SvgFacebookLogoF aria-hidden focusable="false" />
            <ScreenReaderItemStyle>
              {i18n.t('consultation.followus.facebook')}
            </ScreenReaderItemStyle>
          </FacebookButtonStyle>
        </FollowUsListItemStyle>
        <FollowUsListItemStyle>
          <TwitterButtonStyle
            target="_blank"
            rel="noopener"
            as="a"
            href={twitterMakeUrl}
            onClick={() => trackClickFollowUs('twitter')}
          >
            <SvgTwitterLogo aria-hidden focusable="false" />
            <ScreenReaderItemStyle>
              {i18n.t('consultation.followus.twitter')}
            </ScreenReaderItemStyle>
          </TwitterButtonStyle>
        </FollowUsListItemStyle>
        <FollowUsListItemStyle>
          <InstagramButtonStyle
            target="_blank"
            rel="noopener"
            as="a"
            href={instagramMakeUrl}
            onClick={() => trackClickFollowUs('instagram')}
          >
            <SvgInstagramLogo aria-hidden focusable="false" />
            <ScreenReaderItemStyle>
              {i18n.t('consultation.followus.instagram')}
            </ScreenReaderItemStyle>
          </InstagramButtonStyle>
        </FollowUsListItemStyle>
        <FollowUsListItemStyle>
          <LinkedInButtonStyle
            target="_blank"
            rel="noopener"
            as="a"
            href={linkedinMakeUrl}
            onClick={() => trackClickFollowUs('linkedin')}
          >
            <SvgLinkedinLogoIn aria-hidden focusable="false" />
            <ScreenReaderItemStyle>
              {i18n.t('consultation.followus.linkedin')}
            </ScreenReaderItemStyle>
          </LinkedInButtonStyle>
        </FollowUsListItemStyle>
      </FollowUsStyle>
      <RedLinkHTMLElementStyle
        target="_blank"
        rel="noopener"
        href={ABOUT_MAKE_LINK}
        onClick={() => trackClickBlog('blog list')}
      >
        {i18n.t('consultation.followus.discover')}
        <> </>
        <NewWindowIconStyle aria-hidden focusable="false" />
        <ScreenReaderItemStyle>
          {i18n.t('common.open_new_window')}
        </ScreenReaderItemStyle>
      </RedLinkHTMLElementStyle>
    </TileWithTitle>
  );
};
