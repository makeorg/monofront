import React, { FC, useState, useEffect } from 'react';
import i18n from 'i18next';
import {
  GeneratedButtonsStyle,
  GeneratedButtonTextStyle,
  GeneratedButtonsStyleTitle,
  GeneratedButtonsStyleContainerStyle,
} from './style';
import { useAssemblyContext } from '../../store/context';

const colors = ['#5F5F5F', '#72C083', '#4C41AB', '#7990F1'];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const item = colors[randomIndex];

  return item;
};

export const PromptQueries: FC = () => {
  const { state } = useAssemblyContext();
  const { generatedContents } = state;

  const [generatedContent, setGeneratedContent] = useState(generatedContents);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (generatedContent.length < 5) {
      setGeneratedContent(generatedContents);
    }
  }, [generatedContent, generatedContents]);

  const handleClick = (title: string) => {
    setGeneratedContent(
      generatedContent.filter(content => content.title !== title)
    );
    setIsCollapsed(true);
  };

  const contents = isCollapsed
    ? generatedContent.slice(0, 2)
    : generatedContent.slice(0, 5);

  return (
    <GeneratedButtonsStyleContainerStyle id="main">
      {contents.map(content => (
        <GeneratedButtonsStyle
          onClick={() => handleClick(content.title)}
          key={content.title}
        >
          <GeneratedButtonsStyleTitle
            style={{ backgroundColor: getRandomColor() }}
          >
            {content.subtitle}
          </GeneratedButtonsStyleTitle>
          <GeneratedButtonTextStyle>{content.title}</GeneratedButtonTextStyle>
        </GeneratedButtonsStyle>
      ))}
      <GeneratedButtonsStyle className="theme">
        <GeneratedButtonsStyleTitle style={{ backgroundColor: '#4C41AB' }}>
          {i18n.t('prompt.themes')}
        </GeneratedButtonsStyleTitle>
        <GeneratedButtonTextStyle>
          {i18n.t('prompt.themesDiscover')}
        </GeneratedButtonTextStyle>
      </GeneratedButtonsStyle>
    </GeneratedButtonsStyleContainerStyle>
  );
};
