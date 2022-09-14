import React, { FC } from 'react';
import { PersonalityOpinionType } from '@make.org/types';
import { AvatarRows } from '@make.org/ui/components/AvatarRows';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import {
  getTopIdeaDetailsLink,
  getTopIdeasLink,
} from '@make.org/utils/helpers/url';
import { useAppContext } from '@make.org/store';
import { ProposalFooterWithQuestionElement } from '@make.org/components/Proposal/FooterElement/ProposalWithQuestion';
import {
  TopIdeaCardStyle,
  TopIdeaCardHeaderStyle,
  ProposalsAssociatedStyle,
  TopIdeaCardContentStyle,
  TopIdeaContentStyle,
} from '../../TopIdeas/Card/style';
import { Commitment } from '../Commitment';

type Props = {
  userId: string;
  opinion: PersonalityOpinionType;
  position?: number;
};

export const OpinionCard: FC<Props> = ({ userId, opinion, position = 0 }) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const { question, topIdea } = opinion;
  const hasAvatars = topIdea.avatars && topIdea.avatars.length > 0;

  return (
    <TopIdeaCardStyle>
      <TopIdeaCardHeaderStyle aria-hidden>
        <span>{topIdea.label}</span>
      </TopIdeaCardHeaderStyle>
      <ProposalsAssociatedStyle as="div">
        {hasAvatars && <AvatarRows avatars={topIdea.avatars} />}
        {i18n.t('idea_card.associated_proposals', {
          count: topIdea.proposalsCount,
        })}
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
        <Commitment
          userId={userId}
          topIdeaId={topIdea.id}
          comment={opinion.comment}
        />
      </TopIdeaCardContentStyle>
      <ProposalFooterWithQuestionElement
        question={question}
        consultationLink={getTopIdeasLink(country, question.slug)}
      />
    </TopIdeaCardStyle>
  );
};
