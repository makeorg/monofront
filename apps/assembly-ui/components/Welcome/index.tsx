import React, { FC } from 'react';
import pano from '../../assets/IconPano.png';
import {
  WelcomeContainerStyle,
  WelcomeTitleStyle,
  WelcomeContentStyle,
  WelcomeContentIconStyle,
  WelcomeContentTextStyle,
  WelcomeContentTextContainerStyle,
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
    <WelcomeContentStyle>
      <WelcomeContentIconStyle src={pano} alt="Logo" />
      <WelcomeContentTextContainerStyle>
        <WelcomeContentTextStyle>
          Quam quidem partem accusationis admiratus sum et moleste tuli
          potissimum esse Atratino datam. Neque enim decebat neque aetas illa
          postulabat neque, id quod animadvertere poteratis, pudor patiebatur
          optimi adulescentis in tali illum oratione versari. Vellem aliquis ex
          vobis robustioribus hunc male dicendi locum suscepisset; aliquanto
          liberius et fortius et magis more nostro refutaremus istam male
          dicendi licentiam.
        </WelcomeContentTextStyle>
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
      </WelcomeContentTextContainerStyle>
    </WelcomeContentStyle>
  </WelcomeContainerStyle>
);
