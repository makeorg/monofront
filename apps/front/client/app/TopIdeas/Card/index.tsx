import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  SvgAngleArrowRight,
  SvgAngleArrowBottom,
  SvgAngleArrowTop,
  SvgChat,
} from '@make.org/ui/Svg/elements';
import { AvatarRows } from '@make.org/ui/components/AvatarRows';
import { RedLinkStyle } from '@make.org/ui/elements/LinkElements';
import { TopIdeaType } from '@make.org/types';
import { getTopIdeaDetailsLink } from '@make.org/utils/helpers/url';
import { useAppContext } from '@make.org/store';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { TopIdeaScore } from '../Score';
import {
  TopIdeaCardHeaderStyle,
  TopIdeaLinkStyle,
  ProposalsAssociatedStyle,
  ProposalsAssociatedTextStyle,
  PositionStyle,
  PositionContentStyle,
  TopIdeaCardContentStyle,
  TopIdeaCollapseWrapperStyle,
  TopIdeaCollapseTriggerStyle,
  TopIdeaCollapseContentStyle,
  ScoringContainerStyle,
  SvgLikeStyle,
  SvgThumbsUpStyle,
  SvgIdeaStyle,
  TopIdeaContentStyle,
  TopIdeaCollapseIconStyle,
  TopIdeaCardStyle,
} from './style';

type Props = {
  position?: number;
  topIdea: TopIdeaType;
  withDetails?: boolean;
};

export const TopIdeaCard: FC<Props> = ({
  position = 0,
  topIdea,
  withDetails = false,
}) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const { currentQuestion } = state;
  const { question } = state.questions[currentQuestion];
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const hasAvatars = topIdea.avatars && topIdea.avatars.length > 0;

  return (
    <TopIdeaCardStyle>
      <TopIdeaCardHeaderStyle aria-hidden>
        <span>{topIdea.label}</span>
        {withDetails && (
          <TopIdeaLinkStyle
            to={getTopIdeaDetailsLink(country, question.slug, topIdea.id)}
            onClick={scrollToTop}
          >
            {i18n.t('idea_card.link')}
            <SvgAngleArrowRight />
          </TopIdeaLinkStyle>
        )}
      </TopIdeaCardHeaderStyle>
      <ProposalsAssociatedStyle as="div">
        {hasAvatars && <AvatarRows avatars={topIdea.avatars} />}
        <ProposalsAssociatedTextStyle>
          {i18n.t('idea_card.associated_proposals', {
            count: topIdea.proposalsCount,
          })}
        </ProposalsAssociatedTextStyle>
      </ProposalsAssociatedStyle>
      <TopIdeaCardContentStyle>
        <ScreenReaderItemStyle>
          {i18n.t('idea_card.content')}
        </ScreenReaderItemStyle>
        <TopIdeaContentStyle
          id={`idea_content_${position}`}
          to={getTopIdeaDetailsLink(country, question.slug, topIdea.id)}
          onClick={scrollToTop}
          lang={question.returnedLanguage}
        >
          {topIdea.name}
        </TopIdeaContentStyle>
      </TopIdeaCardContentStyle>
      {topIdea.commentsCount > 0 && (
        <PositionStyle>
          <SvgChat aria-hidden focusable="false" />
          <PositionContentStyle>
            <RedLinkStyle
              to={getTopIdeaDetailsLink(country, question.slug, topIdea.id)}
              onClick={scrollToTop}
              lang={question.returnedLanguage}
            >
              {i18n.t('idea_card.position', {
                count: topIdea.commentsCount,
              })}
            </RedLinkStyle>
            {i18n.t('idea_card.candidate', {
              count: topIdea.commentsCount,
            })}
          </PositionContentStyle>
        </PositionStyle>
      )}
      <TopIdeaCollapseWrapperStyle>
        <TopIdeaCollapseTriggerStyle
          onClick={() => setIsOpened(!isOpened)}
          aria-expanded={isOpened}
        >
          {isOpened ? (
            <>
              {i18n.t('idea_card.close')}
              <ScreenReaderItemStyle>
                {i18n.t('idea_card.collapse')}
              </ScreenReaderItemStyle>
              <SvgAngleArrowTop
                aria-hidden
                style={TopIdeaCollapseIconStyle}
                focusable="false"
              />
            </>
          ) : (
            <>
              {i18n.t('idea_card.open')}
              <ScreenReaderItemStyle>
                {i18n.t('idea_card.expand')}
              </ScreenReaderItemStyle>
              <SvgAngleArrowBottom
                aria-hidden
                style={TopIdeaCollapseIconStyle}
                focusable="false"
              />
            </>
          )}
        </TopIdeaCollapseTriggerStyle>
        <TopIdeaCollapseContentStyle
          className={isOpened ? 'open' : ''}
          aria-hidden={!isOpened}
        >
          <ScoringContainerStyle>
            <TopIdeaScore
              icon={<SvgIdeaStyle aria-hidden focusable="false" />}
              percentage={topIdea.scores.totalProposalsRatio}
              text={i18n.t('idea_card.vote_proposals')}
            />
            <TopIdeaScore
              icon={<SvgThumbsUpStyle aria-hidden focusable="false" />}
              percentage={topIdea.scores.agreementRatio}
              text={i18n.t('idea_card.vote_positives')}
            />
            <TopIdeaScore
              icon={<SvgLikeStyle aria-hidden focusable="false" />}
              percentage={topIdea.scores.likeItRatio}
              text={i18n.t('idea_card.vote_heart')}
            />
          </ScoringContainerStyle>
        </TopIdeaCollapseContentStyle>
      </TopIdeaCollapseWrapperStyle>
    </TopIdeaCardStyle>
  );
};
