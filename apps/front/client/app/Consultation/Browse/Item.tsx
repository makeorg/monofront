import React, { FC } from 'react';
import { HomeQuestionType } from '@make.org/types';
import { DateHelper } from '@make.org/utils/helpers/date';
import i18n from 'i18next';
import {
  useScreenMobileContainerWidth,
  useTablet,
} from '@make.org/utils/hooks/useMedia';
import { formatMillionToText } from '@make.org/utils/helpers/numberFormatter';
import {
  getSixteenPerNineRatioHeight,
  matchDesktopDevice,
} from '@make.org/utils/helpers/styled';
import { DATE } from '@make.org/types/enums';
import { useAppContext } from '@make.org/store';
import {
  ConsultationElementPictureStyle,
  ConsultationElementSubtitleStyle,
  ConsultationElementTitleStyle,
  ConsultationElementParagraphStyle,
  ClockIconStyle,
  ConsultationArticleStyle,
  ConsultationPeopleIconStyle,
  ConsultationLightIconStyle,
  ConsultationItemStyle,
  ConsultationActionIconStyle,
} from './style';
import { ConsultationLink } from './Link';

type Props = {
  question: HomeQuestionType;
  resultsContext: boolean;
  itemsCount: number;
};

export const getHomepageRatio = (
  height: number,
  itemsCount: number
): number => {
  switch (itemsCount) {
    case 4:
      return (height * 255) / 248;
    case 3:
      return (height * 353) / 248;
    default: {
      return (height * 275) / 124;
    }
  }
};

export const ConsultationItem: FC<Props> = ({
  question,
  resultsContext,
  itemsCount,
}) => {
  const {
    descriptionImage,
    descriptionImageAlt,
    featured,
    startDate,
    endDate,
    resultsLink,
    participantsCount,
    proposalsCount,
    language,
    actions,
  } = question;
  const hasTopIdeas =
    resultsContext && resultsLink && resultsLink.value === 'top-ideas';
  const hasInternalResults =
    resultsContext && resultsLink && resultsLink.value === 'results';
  const hasExternalResults =
    resultsContext && resultsLink && resultsLink.kind === 'external';
  const hasContributors = participantsCount > 0;
  const hasProposals = proposalsCount > 0;

  let linkText = i18n.t('browse.consultations.participate');

  if (resultsContext) {
    linkText = i18n.t('browse.results.coming_results');
  }

  if (hasTopIdeas) {
    linkText = i18n.t('browse.results.see_topideas');
  }

  if (hasInternalResults || hasExternalResults) {
    linkText = i18n.t('browse.results.see_results');
  }

  const isTabletViewport = useTablet();
  const { state } = useAppContext();
  const { device } = state.appConfig;
  let containerWidth = useScreenMobileContainerWidth();
  const isDesktopInState = matchDesktopDevice(device);

  if (!containerWidth) {
    containerWidth = 0;
  }

  let imageWidth = containerWidth;
  let imageHeight = getSixteenPerNineRatioHeight(containerWidth);

  if (isDesktopInState) {
    imageWidth = getHomepageRatio(248, itemsCount);
    imageHeight = 248;
  }

  if (isTabletViewport && !isDesktopInState) {
    imageWidth = containerWidth / 2;
    imageHeight = getSixteenPerNineRatioHeight(containerWidth / 2);
  }

  return (
    <ConsultationArticleStyle>
      <ConsultationElementPictureStyle
        src={descriptionImage || ''}
        alt={descriptionImageAlt || ''}
        width={imageWidth}
        height={imageHeight}
        crop
      />
      {featured && (
        <ConsultationElementSubtitleStyle>
          {i18n.t('browse.initiative')}
        </ConsultationElementSubtitleStyle>
      )}
      <ConsultationElementTitleStyle lang={question.language}>
        {question.question}
      </ConsultationElementTitleStyle>
      <ConsultationElementParagraphStyle>
        {hasContributors && (
          <ConsultationItemStyle>
            <ConsultationPeopleIconStyle aria-hidden focusable="false" />
            <> </>
            {formatMillionToText(participantsCount, language)}
            <> </>
            {` ${i18n.t('browse.consultations.contributors', {
              count: participantsCount,
            })}`}
          </ConsultationItemStyle>
        )}
        {hasProposals && (
          <ConsultationItemStyle>
            <ConsultationLightIconStyle aria-hidden focusable="false" />
            <> </>
            {formatMillionToText(proposalsCount, language)}
            <> </>
            {` ${i18n.t('browse.consultations.proposals', {
              count: proposalsCount,
            })}`}
          </ConsultationItemStyle>
        )}
        {actions && (
          <ConsultationItemStyle className="red">
            <ConsultationActionIconStyle aria-hidden focusable="false" />
            <> </>
            {actions}
          </ConsultationItemStyle>
        )}
        <ConsultationItemStyle>
          <ClockIconStyle aria-hidden focusable="false" />
          <> </>
          {i18n.t('browse.date', {
            startDate: DateHelper.localizedAndFormattedDate(
              startDate,
              DATE.DATE_CAPITALIZE_LL_FORMAT
            ),
            endDate: DateHelper.localizedAndFormattedDate(
              endDate,
              DATE.DATE_CAPITALIZE_LL_FORMAT
            ),
          })}
        </ConsultationItemStyle>
      </ConsultationElementParagraphStyle>
      <ConsultationLink question={question} label={linkText} />
    </ConsultationArticleStyle>
  );
};
