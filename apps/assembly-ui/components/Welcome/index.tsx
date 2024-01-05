import React, { FC } from 'react';
import i18n from 'i18next';
import { Themes } from './Themes';
import {
  WelcomeContainerStyle,
  WelcomeTitleStyle,
  WelcomeIAStyle,
  WelcomeBlockContainerStyle,
  WelcomeContentBlockContainerStyle,
  WelcomeContentBlockTitleStyle,
  WelcomeContentTextStyle,
} from './style';
import { YoutubePlayer } from '../ReactPlayer/YoutubePlayer';
import { useAssemblyContext } from '../../store/context';

const WelcomeVideo: FC = () => {
  const { state } = useAssemblyContext();
  const { introMediaUrl } = state.event;

  return <YoutubePlayer url={introMediaUrl} />;
};

export const Welcome: FC = () => {
  const { state } = useAssemblyContext();
  const { introduction } = state.event;
  const { generatedContents } = state;
  const summary = generatedContents[0];

  return (
    <WelcomeContainerStyle>
      <WelcomeVideo />
      <WelcomeTitleStyle>{introduction}</WelcomeTitleStyle>
      <WelcomeIAStyle>
        {i18n.t('global.ia')}
        <WelcomeIAStyle className="bold" as="span">
          {i18n.t('global.iaBold')}
        </WelcomeIAStyle>
      </WelcomeIAStyle>
      <WelcomeBlockContainerStyle>
        {summary && (
          <WelcomeContentBlockContainerStyle>
            <WelcomeContentBlockTitleStyle>
              {summary.name}
            </WelcomeContentBlockTitleStyle>
            <WelcomeContentTextStyle>{summary.content}</WelcomeContentTextStyle>
          </WelcomeContentBlockContainerStyle>
        )}

        <WelcomeContentBlockContainerStyle>
          <WelcomeContentBlockTitleStyle>
            {i18n.t('prompt.themeAnswer')}
          </WelcomeContentBlockTitleStyle>
          <Themes />
        </WelcomeContentBlockContainerStyle>
      </WelcomeBlockContainerStyle>
    </WelcomeContainerStyle>
  );
};
