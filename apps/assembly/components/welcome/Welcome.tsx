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
import { useAssemblyContext } from '../../store/context';

export const Welcome: FC = () => {
  const { state } = useAssemblyContext();
  return (
    <WelcomeContainer>
      <YoutubePlayer url={state.event.introMediaUrl} />
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
            optimi adulescentis in tali illum oratione versari. Vellem aliquis
            ex vobis robustioribus hunc male dicendi locum suscepisset;
            aliquanto liberius et fortius et magis more nostro refutaremus istam
            male dicendi licentiam.
          </WelcomeContentText>
          <WelcomeContentText>
            Tecum, Atratine, agam lenius, quod et pudor tuus moderatur orationi
            meae et meum erga te parentemque tuum beneficium tueri debeo.quam
            quidem partem accusationis admiratus sum et moleste tuli potissimum
            esse Atratino datam. Neque enim decebat neque aetas illa postulabat
            neque, id quod animadvertere poteratis, pudor patiebatur optimi
            adulescentis in tali illum oratione versari. Vellem aliquis ex vobis
            robustioribus hunc male dicendi locum suscepisset; aliquanto
            liberius et fortius.
          </WelcomeContentText>
        </WelcomeContentTextContainer>
      </WelcomeContent>
    </WelcomeContainer>
  );
};
