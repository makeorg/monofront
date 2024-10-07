import React, { FC, useEffect } from 'react';
import { TempTemoignageDiscoverStyle } from '../style';
import { SvgCitizenVoice } from '../../../assets/CitizenVoice';
import {
  CitizenVoiceIntroStyle,
  CitizenVoiceDescriptionStyle,
  ToldButtonStyle,
} from './style';
import { useTracking } from '../../Tracking/useTracking';
import { useAssemblyContext } from '../../../store/context';

export const CitizenVoice: FC = () => {
  const tracker = useTracking();
  const { state } = useAssemblyContext();
  const { event, language, visitorId } = state;

  useEffect(() => {
    tracker.track('DISPLAY-MODULE', {
      language,
      event_slug: event.slug,
      visitor_id: visitorId,
    });
  }, []);

  const handleClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    tracker.track('ACTION-OPEN-MODULE', {
      language,
      event_slug: event.slug,
      visitor_id: visitorId,
    });
  };

  return (
    <TempTemoignageDiscoverStyle>
      <SvgCitizenVoice />
      <CitizenVoiceIntroStyle>
        Devenez acteur du changement !
      </CitizenVoiceIntroStyle>
      <CitizenVoiceDescriptionStyle>
        Votre voix compte ! Quelles actions menez-vous pour protéger la planète
        ? <br />
        Connaissez-vous des initiatives locales ou des solutions simples à
        adopter ? <br />
        Partagez vos idées et inspirez des milliers d&apos;autres à agir.
        Ensemble, nous pouvons faire la différence !
      </CitizenVoiceDescriptionStyle>
      <ToldButtonStyle onClick={handleClick} className="click-citizen-voice">
        Je partage mes idées !
      </ToldButtonStyle>
    </TempTemoignageDiscoverStyle>
  );
};
