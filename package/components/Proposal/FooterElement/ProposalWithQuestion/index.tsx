import React from 'react';
import i18n from 'i18next';
import { QuestionType } from '@make.org/types';
import { RedLinkStyle } from '@make.org/ui/elements/LinkElements';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import { ProposalFooterStyle, PostedInLabelStyle } from '../Styled';

type Props = {
  question: QuestionType;
  consultationLink: string;
};

export const ProposalFooterWithQuestionElement: React.FC<Props> = ({
  question,
  consultationLink,
}) => {
  // @toDo : remove after getting proposal multilanguage update
  const { state } = useAppContext();
  const { language } = state.appConfig;
  const questionLanguage = question.languages.includes(language)
    ? language
    : question.languages[0];
  const questionTitle = question.wording.questions[questionLanguage];

  return (
    <ProposalFooterStyle>
      <PostedInLabelStyle as="span">
        {i18n.t('proposal_card.posted_label')}
      </PostedInLabelStyle>
      <RedLinkStyle
        to={consultationLink}
        onClick={scrollToTop}
        lang={questionLanguage}
      >
        {questionTitle}
      </RedLinkStyle>
    </ProposalFooterStyle>
  );
};
