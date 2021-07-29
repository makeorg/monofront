import React, { FC } from 'react';
import { isGreatCause } from '@make.org/utils/helpers/question';
import { QuestionType } from '@make.org/types';
import i18n from 'i18next';
import { DateHelper } from '@make.org/utils/helpers/date';
import { Image } from '@make.org/ui/components/Image';
import { DATE_CAPITALIZE_LL_FORMAT } from '@make.org/utils/constants/date';
import {
  IntroBannerTitleStyle,
  GreatCauseIntroLabelStyle,
  GreatCauseIntroBannerTitleStyle,
  IntroWrapperStyle,
  DefaultBannerTitleStyle,
  DefaultBannerMainContainer,
  DefaultBannerTimeStyle,
} from '../Styled/IntroBanner';

type Props = {
  question: QuestionType;
};

export const IntroBanner: FC<Props> = ({ question }) =>
  isGreatCause(question.operationKind) ? (
    <IntroWrapperStyle as="header" id="intro">
      {question.consultationImage ? (
        <IntroBannerTitleStyle>
          <GreatCauseIntroLabelStyle>
            {i18n.t('consultation.header.label_great_cause')}
          </GreatCauseIntroLabelStyle>
          <span lang={question.language}>
            <Image
              src={question.consultationImage}
              alt={question.consultationImageAlt || question.wording.question}
              height={88}
            />
          </span>
        </IntroBannerTitleStyle>
      ) : (
        <GreatCauseIntroBannerTitleStyle>
          <GreatCauseIntroLabelStyle>
            {i18n.t('consultation.header.label_great_cause')}
          </GreatCauseIntroLabelStyle>
          <span lang={question.language}>{question.wording.question}</span>
        </GreatCauseIntroBannerTitleStyle>
      )}
    </IntroWrapperStyle>
  ) : (
    <IntroWrapperStyle as="header" id="intro">
      <DefaultBannerMainContainer>
        <DefaultBannerTitleStyle lang={question.language}>
          {question.wording.question}
        </DefaultBannerTitleStyle>
        <DefaultBannerTimeStyle>
          {i18n.t('consultation.tabs.consultation')}
          {i18n.t('consultation.tabs.from')}
          <time dateTime={question.startDate}>
            {DateHelper.localizedAndFormattedDate(
              question.startDate,
              DATE_CAPITALIZE_LL_FORMAT
            )}
          </time>
          {i18n.t('consultation.tabs.to')}
          <time dateTime={question.endDate}>
            {DateHelper.localizedAndFormattedDate(
              question.endDate,
              DATE_CAPITALIZE_LL_FORMAT
            )}
          </time>
        </DefaultBannerTimeStyle>
      </DefaultBannerMainContainer>
    </IntroWrapperStyle>
  );
