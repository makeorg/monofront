import React, { FC, useState, useEffect } from 'react';
import i18n from 'i18next';
import { v4 as uuidv4 } from 'uuid';
import {
  GeneratedButtonsStyle,
  GeneratedButtonTextStyle,
  GeneratedButtonsStyleTitle,
  GeneratedButtonsStyleContainerStyle,
} from './style';
import { useAssemblyContext } from '../../store/context';
import { addFeedItem } from '../../store/feed/actions';
import { GENERATED_CONTENT, THEMES } from '../feed';

const colors = ['#5F5F5F', '#242825', '#4C41AB', '#7990F1'];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const item = colors[randomIndex];

  return item;
};

export const PromptQueries: FC = () => {
  const { state, dispatch } = useAssemblyContext();
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

  const dispatchThemes = () => {
    dispatch(
      addFeedItem({
        id: uuidv4(),
        type: THEMES,
        question: 'Quelles sont les thématiques de la convention ?',
        content: '',
      })
    );
  };

  const dispatchGeneratedContent = (subject: string, content: string) => {
    dispatch(
      addFeedItem({
        id: uuidv4(),
        type: GENERATED_CONTENT,
        question: `que s'est-il dit sur : "${subject}"`,
        content,
      })
    );
  };

  return (
    <GeneratedButtonsStyleContainerStyle id="main">
      {contents.map(item => (
        <GeneratedButtonsStyle
          onClick={() => {
            dispatchGeneratedContent(item.title, item.content);
            handleClick(item.title);
          }}
          key={item.title}
        >
          <GeneratedButtonsStyleTitle
            style={{ backgroundColor: getRandomColor() }}
          >
            {item.subtitle}
          </GeneratedButtonsStyleTitle>
          <GeneratedButtonTextStyle>{item.title}</GeneratedButtonTextStyle>
        </GeneratedButtonsStyle>
      ))}
      <GeneratedButtonsStyle className="theme" onClick={dispatchThemes}>
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
