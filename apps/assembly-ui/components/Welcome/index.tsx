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

export const Welcome: FC = () => (
  <WelcomeContainerStyle>
    <WelcomeVideo />
    <WelcomeTitleStyle>
      Bienvenue au coeur de la Convention Citoyenne sur la fin de vie
    </WelcomeTitleStyle>
    <WelcomeIAStyle>
      {i18n.t('global.ia')}
      <WelcomeIAStyle className="bold" as="span">
        {i18n.t('global.iaBold')}
      </WelcomeIAStyle>
    </WelcomeIAStyle>

    <WelcomeBlockContainerStyle>
      <WelcomeContentBlockContainerStyle>
        <WelcomeContentBlockTitleStyle>
          {i18n.t('global.resume')}
        </WelcomeContentBlockTitleStyle>
        <WelcomeContentTextStyle>
          Tecum, Atratine, agam lenius, quod et pudor tuus moderatur orationi
          meae et meum erga te parentemque tuum beneficium tueri debeo.quam
          quidem partem accusationis admiratus sum et moleste tuli potissimum
          esse Atratino datam. Neque enim decebat neque aetas illa postulabat
          neque, id quod animadvertere poteratis, pudor patiebatur optimi
          adulescentis in tali illum oratione versari. Vellem aliquis ex vobis
          robustioribus hunc male dicendi locum suscepisset; aliquanto liberius
          et fortius.
        </WelcomeContentTextStyle>
      </WelcomeContentBlockContainerStyle>

      <WelcomeContentBlockContainerStyle>
        <WelcomeContentBlockTitleStyle>
          {i18n.t('prompt.themeAnswer')}
        </WelcomeContentBlockTitleStyle>
        <Themes />
      </WelcomeContentBlockContainerStyle>
    </WelcomeBlockContainerStyle>
  </WelcomeContainerStyle>
);
