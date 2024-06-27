import React, { FC, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { LLMErrorLimit } from '../Prompt/Stream';
import {
  ContentStyle,
  ContentIconStyle,
  AnswerContainerStyle,
  TempTemoignageDiscoverStyle,
  QuestionStyle,
  ActionsButtonStyle,
} from './style';
import { Temoignage } from './Temoignage';
import { FeedItemType } from '../../types';
import pano from '../../assets/IconPano.png';
import { useAssemblyContext } from '../../store/context';
import { useTracking } from '../Tracking/useTracking';
import { ShowSources } from './Sources/ShowSources';

type Props = { item: FeedItemType };

export const Answer: FC<Props> = ({ item }) => {
  const [isTracked, setIsTracked] = useState(false);
  const [showParole, setShowParole] = useState(false);
  const { state } = useAssemblyContext();
  const { event, language, visitorId } = state;
  const { isStreaming } = state.feed;
  const tracker = useTracking();

  useEffect(() => {
    if (showParole) {
      tracker.track('ACTION-CHECK-INTERACTION', {
        visitor_id: visitorId,
        language,
        event_slug: event.slug,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showParole]);

  useEffect(() => {
    if (!isTracked && item.text && !isStreaming) {
      tracker.track('DISPLAY-PROMPT-ANSWER', {
        submit_id: item.id,
        prompt_result_success: 'success',
        event_slug: event.slug,
        user_query: item.question,
        llm_response: item.text,
      });
      setIsTracked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.text, isStreaming]);

  return (
    <>
      <ContentStyle>
        <ContentIconStyle src={pano} alt="Logo" />
        <AnswerContainerStyle>
          <ReactMarkdown>{item.text}</ReactMarkdown>
          {item.text.trim().length > LLMErrorLimit &&
            item.chunks &&
            item.chunks.length > 0 && <ShowSources chunks={item.chunks} />}
        </AnswerContainerStyle>
      </ContentStyle>
      {item.chunks &&
        item.chunks.length > 0 &&
        item.question === `Aide active` && (
          <>
            <TempTemoignageDiscoverStyle>
              <QuestionStyle>
                Grâce aux témoignages et partages, cette thématique bénéficie
                d’un éclairage citoyen
              </QuestionStyle>
              <ActionsButtonStyle onClick={() => setShowParole(!showParole)}>
                Découvrir l’éclairage citoyen
              </ActionsButtonStyle>
            </TempTemoignageDiscoverStyle>
            {showParole && <Temoignage />}
          </>
        )}
    </>
  );
};
