import React, { FC } from 'react';
import { HomeQuestionType } from '@make.org/types';
import { isInProgress } from '@make.org/utils/helpers/date';
import { Link } from 'react-router-dom';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { SvgExternalLink } from '@make.org/ui/Svg/elements';
import { getParticipateLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { useAppContext } from '@make.org/store';
import { FeaturedLinkStyle, FeaturedLinkIconStyle } from './style';

type Props = {
  question: HomeQuestionType;
};

export const FeaturedLink: FC<Props> = ({ question }) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  if (isInProgress(question)) {
    return (
      <FeaturedLinkStyle
        as={Link}
        to={getParticipateLink(country, question.questionSlug)}
        onClick={scrollToTop}
      >
        {question.operationTitle}
        <FeaturedLinkIconStyle aria-hidden focusable="false" />
      </FeaturedLinkStyle>
    );
  }

  return (
    <FeaturedLinkStyle href={question.aboutUrl} target="_blank" rel="noopener">
      {question.operationTitle}
      <> </>
      <FeaturedLinkIconStyle
        as={SvgExternalLink}
        aria-hidden
        focusable="false"
      />
      <ScreenReaderItemStyle>
        {i18n.t('common.open_new_window')}
      </ScreenReaderItemStyle>
    </FeaturedLinkStyle>
  );
};
