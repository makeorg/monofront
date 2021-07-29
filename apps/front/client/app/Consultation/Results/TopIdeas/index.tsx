import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import React, { FC } from 'react';
import {
  voteStaticParams,
  VOTE_AGREE_KEY,
} from '@make.org/utils/constants/vote';
import i18n from 'i18next';
import { QuestionType } from '@make.org/types';
import { Collapse } from '@make.org/ui/components/Collapse';
import { ColumnToRowElementStyle } from '@make.org/ui/elements/FlexElements';
import { VoteIconStyle } from '@make.org/ui/elements/SvgElements';
import {
  TopIdeaListItemStyle,
  TopIdeaItemTitleStyle,
  ThemeResultsDetailsStyle,
  ThemeAgreeResultsStyle,
  ThemeResultsWrapperStyle,
  ThemeResultsButtonStyle,
  ThemeQualifiedStyle,
} from './style';

type Props = {
  topIdeas: any[];
  question: QuestionType;
};

export const TopIdeas: FC<Props> = ({ topIdeas, question }) => {
  const voteAttributes = voteStaticParams[VOTE_AGREE_KEY];

  return (
    <>
      {topIdeas.map((topIdea, index) => (
        <Collapse
          key={topIdea.name}
          title={i18n.t('consultation.results.top_ideas.axe_title', {
            count: index + 1,
            name: topIdea.name,
          })}
          open={index === 0}
          language={question.language}
        >
          <UnstyledListStyle>
            {topIdea.ideas.map((idea: any) => (
              <TopIdeaListItemStyle key={idea.idea}>
                <TopIdeaItemTitleStyle lang={question.language}>
                  {idea.idea}
                </TopIdeaItemTitleStyle>
                <ThemeResultsWrapperStyle>
                  <ThemeResultsButtonStyle className="agree voted">
                    <VoteIconStyle
                      className="agree"
                      aria-hidden
                      focusable="false"
                    />
                  </ThemeResultsButtonStyle>
                  <ThemeResultsDetailsStyle>
                    <ThemeAgreeResultsStyle
                      as="span"
                      color={voteAttributes.color}
                    >
                      {`${idea.agreement}% ${i18n.t('vote.agree')}`}
                    </ThemeAgreeResultsStyle>
                    <ColumnToRowElementStyle as="span">
                      <span>
                        {i18n.t('qualification.likeIt')}
                        <ThemeQualifiedStyle>
                          {` ${idea.adhesion}% `}
                        </ThemeQualifiedStyle>
                      </span>
                      <span>
                        {i18n.t('qualification.doable')}
                        <ThemeQualifiedStyle>
                          {` ${idea.realistic}% `}
                        </ThemeQualifiedStyle>
                      </span>
                    </ColumnToRowElementStyle>
                  </ThemeResultsDetailsStyle>
                </ThemeResultsWrapperStyle>
              </TopIdeaListItemStyle>
            ))}
          </UnstyledListStyle>
        </Collapse>
      ))}
    </>
  );
};
