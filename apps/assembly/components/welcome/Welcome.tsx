import React, { FC } from 'react';
import pano from '../../assets/IconPano.png';
import {
  WelcomeContainer,
  WelcomeTitle,
  WelcomeContent,
  WelcomeContentIcon,
  WelcomeContentText,
  WelcomeContentTextContainer,
} from './style';
import { YoutubePlayer } from '../reactPlayer/YoutubePlayer';

export const Welcome: FC = () => (
  <WelcomeContainer>
    <YoutubePlayer url="https://www.youtube.com/watch?v=TlWYgGyNnJo" />
    <WelcomeTitle>
      Bienvenue au coeur de la Convention Citoyenne sur la fin de vie
    </WelcomeTitle>
    <WelcomeContent>
      <WelcomeContentIcon src={pano} alt="Logo" />
      <WelcomeContentTextContainer>
        <WelcomeContentText>
          Quam quidem partem accusationis admiratus sum et moleste tuli
          potissimum esse Atratino datam. Neque enim decebat neque aetas illa
          postulabat neque, id quod animadvertere poteratis, pudor patiebatur
          optimi adulescentis in tali illum oratione versari. Vellem aliquis ex
          vobis robustioribus hunc male dicendi locum suscepisset; aliquanto
          liberius et fortius et magis more nostro refutaremus istam male
          dicendi licentiam.
        </WelcomeContentText>
        <WelcomeContentText>
          Tecum, Atratine, agam lenius, quod et pudor tuus moderatur orationi
          meae et meum erga te parentemque tuum beneficium tueri debeo.quam
          quidem partem accusationis admiratus sum et moleste tuli potissimum
          esse Atratino datam. Neque enim decebat neque aetas illa postulabat
          neque, id quod animadvertere poteratis, pudor patiebatur optimi
          adulescentis in tali illum oratione versari. Vellem aliquis ex vobis
          robustioribus hunc male dicendi locum suscepisset; aliquanto liberius
          et fortius.
        </WelcomeContentText>
      </WelcomeContentTextContainer>
    </WelcomeContent>
  </WelcomeContainer>
);
