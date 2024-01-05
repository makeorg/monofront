import React, { FC, useState, useMemo } from 'react';
import { WelcomeThemesBlockStyle, WelcomeThemesButtonStyle } from './style';
import { TRANSCRIPT } from '../Feed';
import { disableFeedStreaming } from '../../store/feed/actions';
import { StreamLLM } from '../Prompt/Stream';

import { useAssemblyContext } from '../../store/context';

const colors = [
  'rgba(248, 178, 188, 1)',
  'rgba(166, 199, 234, 1)',
  'rgba(208, 248, 248, 1)',
  'rgba(208, 248, 248, 1)',
  'rgba(208, 248, 248, 1)',
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const item = colors[randomIndex];

  return item;
};

type ButtonsProps = {
  title: string;
  value: string;
  handleClick: () => void;
  isSubmitted: boolean;
};

export const Buttons: FC<ButtonsProps> = ({
  title,
  value,
  handleClick,
  isSubmitted,
}) => {
  const getMemoizedColor = useMemo(() => getRandomColor(), []);

  return (
    <WelcomeThemesButtonStyle
      key={value}
      type="button"
      style={{ backgroundColor: getMemoizedColor }}
      onClick={handleClick}
      disabled={isSubmitted}
    >
      {title}
    </WelcomeThemesButtonStyle>
  );
};

export const Themes: FC = () => {
  const { state, dispatch } = useAssemblyContext();
  const { termQueries } = state;
  const { isSubmitted } = state.feed;
  const [question, setQuestion] = useState<string>('');

  const { setStartStream } = StreamLLM(question, TRANSCRIPT);

  const handleThemeQuestion = (value: string) => {
    setQuestion(value);
    dispatch(disableFeedStreaming());
    setStartStream(true);
  };

  return (
    <WelcomeThemesBlockStyle>
      {termQueries.map(termQuery => (
        <Buttons
          handleClick={() => handleThemeQuestion(termQuery.value)}
          value={termQuery.value}
          title={termQuery.title}
          isSubmitted={isSubmitted}
        />
      ))}
    </WelcomeThemesBlockStyle>
  );
};
