import React, { FC, useState } from 'react';
import { WelcomeThemesBlockStyle, WelcomeThemesButtonStyle } from './style';
import { TRANSCRIPT } from '../Feed';
import { disableFeedStreaming } from '../../store/feed/actions';
import { StreamLLM } from '../Prompt/Stream';

import { useAssemblyContext } from '../../store/context';

const colors = [
  '#F8B2BC',
  '#A6C7EA',
  '#DFCDE5',
  '#D0F8F8',
  '#FFF8DC',
  '#B5E9CD',
  '#F8C3B2',
  '#FADDEC',
  '#CEEEFF',
  '#E6E6C6',
];

type ButtonsProps = {
  title: string;
  value: string;
  handleClick: () => void;
  color: number;
};

export const Buttons: FC<ButtonsProps> = ({
  title,
  value,
  handleClick,
  color,
}) => {
  const { state } = useAssemblyContext();
  const { isStreaming } = state.feed;

  return (
    <WelcomeThemesButtonStyle
      key={value}
      type="button"
      style={{ backgroundColor: `${colors[color]}` }}
      onClick={handleClick}
      disabled={isStreaming}
    >
      {title}
    </WelcomeThemesButtonStyle>
  );
};

export const Themes: FC = () => {
  const { state, dispatch } = useAssemblyContext();
  const { termQueries } = state;
  const [question, setQuestion] = useState<string>('');
  const themes = termQueries.filter(termQuery => termQuery.type === 'THEME');

  const { setStartStream } = StreamLLM(question, TRANSCRIPT);

  const handleThemeQuestion = (value: string) => {
    setQuestion(value);
    dispatch(disableFeedStreaming());
    setStartStream(true);
  };

  return (
    <WelcomeThemesBlockStyle>
      {themes.map((theme, index) => (
        <Buttons
          key={theme.value}
          handleClick={() => handleThemeQuestion(theme.value)}
          value={theme.value}
          title={theme.title}
          color={index}
        />
      ))}
    </WelcomeThemesBlockStyle>
  );
};
