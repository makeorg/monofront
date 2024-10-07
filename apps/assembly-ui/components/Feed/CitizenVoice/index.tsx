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
      <CitizenVoiceIntroStyle>Partager votre expérience</CitizenVoiceIntroStyle>
      <CitizenVoiceDescriptionStyle>
        Comment le changement climatique impacte votre quotidien ?<br />
        Nous avons besoin de vous pour éclairer nos résultats, en répondant à
        cette question et en partageant votre expérience.
      </CitizenVoiceDescriptionStyle>
      <ToldButtonStyle onClick={handleClick} className="click-citizen-voice">
        Je participe
      </ToldButtonStyle>
    </TempTemoignageDiscoverStyle>
  );
};
