import React, { FC, useEffect, useRef, useState } from 'react';
import { useSlider } from '@make.org/utils/hooks/useSlider';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { SliderParamsType } from '@make.org/types';
import { useTracking } from '../Tracking/useTracking';
import { useAssemblyContext } from '../../store/context';
import {
  AnswerContainerStyle,
  TempTemoignageDiscoverStyle,
  TemoignageButtonStyle,
  TemoignageTextStyle,
  TemoignageBoldTextStyle,
  TemoignageContainerStyle,
  TemoignageBlockStyle,
  TemoignageArrowsStyle,
  TemoignageRightScrollButtonStyle,
  TemoignageLeftScrollButtonStyle,
} from './style';
import { BonhommeYellowLogoSvg } from '../../assets/CitizenVoice_bubble';

const temoignages = [
  'Il faut une fin de vie digne avant une mort digne.',
  `J'ai vu mon père souffrir pendant des mois d'un cancer des poumons avec métastases dans les os et au cerveau. Les médecins le disaient "perdu" mais ils l'ont laissé souffrir jusqu'à la fin. Cette fin de vie horrible continue à me faire très mal car je l'aimais.`,
  `Certaines douleurs physiques ou morales demeurent réfractaires à tout traitement et il n'est pas possible de refuser une aide à mourir dans ce cas. C'est un acte d'humanité, mais elle ne doit pas devenir la normalité.`,
  `Je trouve que, d'un point de vue philosophique, dans la mesure où l'on ne décide pas de venir au monde, on devrait avoir le droit de ne pas vivre, quelle qu'en soit la raison et quel que soit l'âge, à condition cependant d'être adulte, en pleine possession de ses facultés mentales et que ce soit un choix mûrement réfléchi.`,
  `Infirmière en soins palliatifs, la plupart des personnes demandant l’euthanasie en arrivant chez nous n’en parlent plus lorsqu’elles sont confortables. Pour moi la réponse à cette souffrance ne devrait pas être l’euthanasie, mais la formation au soulagement de la souffrance et à la culture palliative.`,
  `Aujourd’hui je suis heureux de voir qu’enfin la France s’ouvre à ce débat, pour plus d’humanité, pour plus de respect de l’intime de la vie… Du moins, je l’espère.`,
  `La maladie se révèle être un incroyable exhausteur de goût. Chaque petit plaisir prend une saveur folle. Mais si c'est trop dur, je veux pouvoir dire stop, et je veux pouvoir le faire en France.`,
  `Je suis devenu totalement dépendant, nourri par sonde gastrique, avec un besoin d'assistance 24h/24. Je m'y suis résigné, parfois avec colère. Mais, pour moi, il n'y a pas de déchéance tant qu'il y a de la vie. Je ne juge pas les malades qui le font, mais je suis scandalisé de voir que des personnes choisissent le suicide assisté ou l'euthanasie par crainte de devenir des boulets pour leur entourage. Cela dénote notre incapacité à accompagner la vie des personnes dépendantes.`,
  `Dès que j'ai été diagnostiquée, il y a quatre ans, j'ai rédigé mes directives anticipées, pour qu'on puisse connaître mes volontés quand je ne pourrai plus les exprimer. J'y ai inscrit mon souhait, si cela devient légal en France, de bénéficier d'une euthanasie.`,
  `La maladie de ma maman durait depuis des années et elle savait que la fin approchait. Elle s’est installée chez moi et elle a été remarquablement prise en charge par les soins palliatifs à domicile. C’est aussi ça mourir dans la dignité, ce n’est pas forcément être euthanasié.`,
  `Quand viendra le moment de m'en aller, j'aimerais une euthanasie ou un suicide assisté. Au début, je pensais sauter d'un pont, ce qui aurait été horrible pour mes proches. Mais j'ai découvert qu'en Belgique, avec une simple injection, on part quand on le souhaite, entouré de ses proches, sans stress. J'imagine un moment joyeux, libérateur.`,
  `Avec Parkinson, je me suis déjà retrouvée complètement bloquée, incapable de bouger, obligée d'attendre de l'aide. C'est terrible. J'en pleurais. Si c'est pour me retrouver tout le temps bloquée, je ne vois pas l'intérêt. Ce n'est pas une vie. Je préférerais qu'on m'endorme et ne plus me réveiller.`,
];

export const Temoignage: FC = () => {
  const { state } = useAssemblyContext();
  const { event, language, visitorId } = state;
  const tracker = useTracking();
  const sliderRef = useRef<HTMLDivElement>(null);
  const temoignageRef = useRef<HTMLDivElement>(null);
  const [initSlider, setInitSlider] = useState(false);
  const sliderParams: SliderParamsType = {
    slidesToScroll: 1,
    slidesToShow: 1,
    draggable: false,
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next',
    },
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 969,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }
    if (temoignageRef.current) {
      window.scrollTo(0, temoignageRef.current.offsetTop);
    }

    setInitSlider(true);
  }, []);

  useSlider(sliderRef, sliderParams, initSlider);

  const clickOpenShareForm = () =>
    tracker.track('ACTION-SHARE-INTERACTION', {
      visitor_id: visitorId,
      language,
      event_slug: event.slug,
    });

  return (
    <TempTemoignageDiscoverStyle className="yellow" ref={temoignageRef}>
      <BonhommeYellowLogoSvg />
      <AnswerContainerStyle>
        <TemoignageBoldTextStyle className="big">
          Voici un résumé de l’éclairage citoyen :
        </TemoignageBoldTextStyle>
        <TemoignageTextStyle>
          {`La question de l'aide active à mourir en France suscite des réactions passionnées. Pour certains, c'est une question de compassion face à des souffrances insupportables : "Certaines douleurs physiques et/ou morales demeurent réfractaires à tout traitement". D'autres, cependant, redoutent les possibles abus : "Je suis contre une loi qui autoriserait une aide active à mourir à cause de toutes les dérives possibles". Au milieu de ce débat, des voix appellent à repenser la manière dont nous abordons la fin de vie : "Il faut changer notre regard sur la vieillesse qui devrait être davantage valorisée". Malgré les divergences, une aspiration commune émerge : garantir une fin de vie digne pour tous : "Il faut une fin de vie digne avant une mort digne".`}
        </TemoignageTextStyle>
        <TemoignageContainerStyle>
          <TemoignageBoldTextStyle>
            Quelques témoignages de citoyens :
          </TemoignageBoldTextStyle>
          <TemoignageArrowsStyle>
            <TemoignageLeftScrollButtonStyle className="glider-prev" />
            <TemoignageRightScrollButtonStyle className="glider-next" />
          </TemoignageArrowsStyle>
          <div
            className="glider-contain"
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            <div ref={sliderRef} className="glider">
              <UnstyledListStyle
                className="glider-track"
                style={{ gap: '30px' }}
              >
                {temoignages.map(temoignage => (
                  <TemoignageBlockStyle style={{ height: 'fit-content' }}>
                    {temoignage}
                  </TemoignageBlockStyle>
                ))}
              </UnstyledListStyle>
            </div>
          </div>
        </TemoignageContainerStyle>
        <TemoignageBoldTextStyle>
          Et vous, vous êtes touchés ?
        </TemoignageBoldTextStyle>
        <TemoignageTextStyle>
          Si vous avez une expérience personnelle à partager, vous pouvez le
          partager avec d’autres citoyens afin de les aider à se faire un avis
          sur la thématique et les sensibiliser.
        </TemoignageTextStyle>
        <TemoignageButtonStyle
          href="https://d3hcn1arjq6.typeform.com/to/Ror9Qa1b"
          target="_blank"
          rel="noopener noreferrer"
          onClick={clickOpenShareForm}
        >
          Partager son avis
        </TemoignageButtonStyle>
        <TemoignageTextStyle>
          Vous serez redirigé vers un formulaire extérieur.
        </TemoignageTextStyle>
      </AnswerContainerStyle>
    </TempTemoignageDiscoverStyle>
  );
};
