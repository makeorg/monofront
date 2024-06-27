import React, { FC, useRef, useEffect, useState } from 'react';
import { useSlider } from '@make.org/utils/hooks/useSlider';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { useIsSmallDevice } from '@make.org/utils/hooks/useIsSmallDevice';
import { useAssemblyContext } from '../../store/context';
import { TermQueryType } from '../../types';
import { disableFeedStreaming } from '../../store/feed/actions';
import { StreamLLM } from './Stream';
import {
  SuggestionsButtonsStyle,
  SuggestionsButtonsListStyle,
  SuggestionsContainerStyle,
} from './style';
import { useTracking } from '../Tracking/useTracking';
import { useUtms } from '../Tracking/useUtms';

type ButtonsProps = {
  title: string;
  value: string;
  handleClick?: () => void;
};

export const ButtonsSuggestion: FC<ButtonsProps> = ({
  title,
  value,
  handleClick,
}) => {
  const { state } = useAssemblyContext();
  const { isStreaming } = state.feed;

  return (
    <SuggestionsButtonsListStyle>
      <SuggestionsButtonsStyle
        type="button"
        onClick={handleClick}
        disabled={isStreaming || !handleClick}
      >
        {title}
      </SuggestionsButtonsStyle>
    </SuggestionsButtonsListStyle>
  );
};

export const Suggestions: FC = () => {
  const { state, dispatch } = useAssemblyContext();
  const { termQueries, event, sessionId, visitorId } = state;
  const { slug: eventSlug, language: eventLanguage, id: eventId } = event;
  const [question, setQuestion] = useState<string>('');
  const sliderRef = useRef<HTMLDivElement>(null);
  const [initSlider, setInitSlider] = useState(false);
  const { isSmallDevice } = useIsSmallDevice();
  const suggestions = termQueries.filter(
    termQuery => termQuery.type === 'SUGGESTION'
  );

  const tracker = useTracking();
  const utms = useUtms();

  const { startStream } = StreamLLM(question);

  const handleSuggestionQuestion = (value: string, title: string) => {
    const feedItemId = startStream();
    tracker.track('ACTION-MAIN', {
      visitor_id: visitorId,
      suggestion_label: title,
      language: eventLanguage,
      event_slug: eventSlug,
      trigger: 'suggestion',
      session_id: sessionId,
      assembly_event_id: eventId,
      submit_id: feedItemId,
      ...utms,
    });
    setQuestion(value);
    dispatch(disableFeedStreaming());
  };

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    setInitSlider(true);
  }, []);

  useSlider(
    sliderRef,
    {
      slidesToScroll: 1,
      slidesToShow: 1.5,
      draggable: true,
    },
    initSlider
  );

  if (isSmallDevice) {
    return (
      <div className="glider-contain">
        <div ref={sliderRef} className="glider">
          <UnstyledListStyle className="glider-track">
            {suggestions.map((suggestion: TermQueryType) => (
              <ButtonsSuggestion
                key={suggestion.value}
                title={suggestion.title}
                value={suggestion.value}
                handleClick={() =>
                  handleSuggestionQuestion(suggestion.value, suggestion.title)
                }
              />
            ))}
          </UnstyledListStyle>
        </div>
      </div>
    );
  }

  return (
    <SuggestionsContainerStyle id="main" as={UnstyledListStyle}>
      {suggestions.map((suggestion: TermQueryType) => (
        <ButtonsSuggestion
          key={suggestion.value}
          title={suggestion.title}
          value={suggestion.value}
          handleClick={() =>
            handleSuggestionQuestion(suggestion.value, suggestion.title)
          }
        />
      ))}
    </SuggestionsContainerStyle>
  );
};
