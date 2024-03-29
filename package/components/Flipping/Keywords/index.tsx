import React, { FC, useEffect, useState } from 'react';
import { QuestionService } from '@make.org/utils/services/Question';
import i18n from 'i18next';
import { KEYWORD_THRESHOLD } from '@make.org/utils/constants/config';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { getSequenceKeywordLink } from '@make.org/utils/helpers/url';
import { trackOpenSequence } from '@make.org/utils/services/Tracking';
import { TRACKING } from '@make.org/types/enums';
import {
  ParticipateCardStyle,
  ParticipateCardTitleStyle,
  ParticipateCardDescriptionStyle,
} from '@make.org/ui/elements/CardsElements';
import { SvgAngleArrowRight, SvgArrowUp } from '@make.org/ui/Svg/elements';
import { QuestionKeywordType, QuestionType } from '@make.org/types';
import { setSequenceLabel } from '@make.org/store/actions/sequence';
import { useAppContext } from '@make.org/store';
import {
  KeywordsListWrapperStyle,
  KeywordListItemStyle,
  KeywordItemLinkStyle,
} from './style';

type Props = {
  question: QuestionType;
  isKeywordActive: boolean;
};

export const Keywords: FC<Props> = ({ question, isKeywordActive }) => {
  const { state, dispatch } = useAppContext();
  const { country } = state.appConfig;
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState<QuestionKeywordType[]>([]);

  const getQuestionKeywords = async () => {
    setIsLoading(true);
    const response = await QuestionService.getQuestionKeywords(
      question.questionId,
      KEYWORD_THRESHOLD
    );

    if (response) {
      setKeywords(response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuestionKeywords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isKeywordActive) {
    return null;
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <ParticipateCardStyle
      className="desktop-half margin-bottom no-padding-bottom"
      isKeywordActive={isKeywordActive}
    >
      <SvgArrowUp
        fill="#253186"
        aria-hidden
        width={26}
        height={29}
        focusable="false"
      />
      <ParticipateCardTitleStyle>
        {i18n.t('consultation.cards.keywords.title')}
      </ParticipateCardTitleStyle>
      <ParticipateCardDescriptionStyle>
        {i18n.t('consultation.cards.keywords.description')}
      </ParticipateCardDescriptionStyle>
      <KeywordsListWrapperStyle>
        {keywords.map(keyword => (
          <KeywordListItemStyle key={keyword.key}>
            <KeywordItemLinkStyle
              to={getSequenceKeywordLink(
                country,
                question.slug,
                encodeURI(keyword.key),
                {
                  introCard: false,
                  pushProposal: false,
                }
              )}
              onClick={() => {
                dispatch(setSequenceLabel(keyword.label));
                trackOpenSequence(TRACKING.COMPONENT_PARAM_SEQUENCE_KEYWORD);
              }}
            >
              {keyword.label}
              <SvgAngleArrowRight width={17} height={17} />
            </KeywordItemLinkStyle>
          </KeywordListItemStyle>
        ))}
      </KeywordsListWrapperStyle>
    </ParticipateCardStyle>
  );
};
