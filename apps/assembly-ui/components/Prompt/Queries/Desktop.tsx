import React, { FC, useState, useEffect } from 'react';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { QueriesButtonsListStyle, QueriesContainerStyle } from './style';
import { useAssemblyContext } from '../../../store/context';
import { Buttons, DispatchProps } from '.';

export const DesktopQueries: FC<DispatchProps> = ({
  dispatchGeneratedContent,
}) => {
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
    <QueriesContainerStyle id="main" as={UnstyledListStyle}>
      {contents.map(item => (
        <QueriesButtonsListStyle key={item.title}>
          <Buttons
            title={item.title}
            subtitle={item.subtitle}
            handleClick={() => {
              dispatchGeneratedContent(item.title, item.content);
              handleClick(item.title);
            }}
          />
        </QueriesButtonsListStyle>
      ))}
    </QueriesContainerStyle>
  );
};
