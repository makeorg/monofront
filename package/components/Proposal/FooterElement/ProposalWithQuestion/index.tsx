import React from 'react';
import i18n from 'i18next';
import { QuestionType } from '@make.org/types';
import { RedLinkStyle } from '@make.org/ui/elements/LinkElements';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { ProposalFooterStyle, PostedInLabelStyle } from '../Styled';

type Props = {
  question: QuestionType;
  consultationLink: string;
};

export const ProposalFooterWithQuestionElement: React.FC<Props> = ({
  question,
  consultationLink,
}) => (
  <ProposalFooterStyle>
    <PostedInLabelStyle as="span">
      <>{i18n.t('proposal_card.posted_label')}</>
    </PostedInLabelStyle>
    <RedLinkStyle
      to={consultationLink}
      onClick={scrollToTop}
      lang={question.returnedLanguage}
    >
      {question.wording.question}
    </RedLinkStyle>
  </ProposalFooterStyle>
);
