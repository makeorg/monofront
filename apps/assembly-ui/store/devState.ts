import { AssemblyGlobalStateType } from '../types';

const AssemblyDevState: AssemblyGlobalStateType = {
  customer: {
    id: '18565a9f-170a-485b-80e9-857e3a860b15',
    name: 'CESE',
    slug: 'cese',
  },
  event: {
    customerId: '18565a9f-170a-485b-80e9-857e3a860b15',
    id: 'a6da006f-a0bd-4b6c-baed-787f5aee80aa',
    slug: 'convention-citoyenne-fin-de-vie',
    language: 'fr',
    name: 'Convention citoyenne de la fin de vie',
    introduction: 'La Convention citoyenne vous ouvre ses portes !',
    links: [
      {
        label: 'Pourquoi cette Convention citoyenne ?',
        url: 'https://conventioncitoyennesurlafindevie.lecese.fr/la-convention-citoyenne-sur-la-fin-de-vie-c-est-quoi',
      },
      {
        label: 'Quelles sont les dates clés ?',
        url: 'https://conventioncitoyennesurlafindevie.lecese.fr/travaux',
      },
      {
        label: 'Qu’est ce que le CESE ?',
        url: 'https://www.lecese.fr/decouvrir-cese/cese-en-bref',
      },
    ],
    logoUrl: 'https://assets.make.org/assets/images/convention-fin-de-vie.png',
    summaryTitle: 'Synthèse de la Convention',
    summaryContent:
      'La Convention citoyenne sur la fin de vie, organisée par le CESE sur demande de la Première Ministre, a réuni 184 citoyens français durant 9 sessions de 3 jours afin de répondre à la question "Le cadre d’accompagnement de la fin de vie est-il adapté aux différentes situations rencontrées ou d’éventuels changements devraient-ils être introduits ?"',
  },
  termQueries: [
    {
      title: 'Choix et la volonté du Patient',
      value:
        'Que s’est-il dit autour de la thématique Choix et la volonté du Patient" ?',
      type: 'THEME',
    },
    {
      title: 'Accompagnement à domicile',
      value:
        'Que s’est-il dit autour de la thématique Accompagnement à domicile" ?',
      type: 'THEME',
    },
    {
      title: 'Budget et financement',
      value:
        'Que s’est-il dit autour de la thématique Budget et financement" ?',
      type: 'THEME',
    },
    {
      title: 'Ouvrir les soins palliatifs à tous',
      value:
        'Que s’est-il dit autour de la thématique “Ouvrir les soins palliatifs à tous" ?',
      type: 'THEME',
    },
    {
      title: 'Egalité d’accès',
      value: 'Que s’est-il dit autour de la thématique Egalité d’accès" ?',
      type: 'THEME',
    },
    {
      title: 'Informer le grand public',
      value:
        'Que s’est-il dit autour de la thématique Informer le grand public" ?',
      type: 'THEME',
    },
    {
      title: 'Formation des Professionnels de Santé',
      value:
        'Que s’est-il dit autour de la thématique Formation des Professionnels de Santé" ?',
      type: 'THEME',
    },
    {
      title: 'Améliorer le parcours de Soins',
      value:
        'Que s’est-il dit autour de la thématique Améliorer le parcours de Soins" ?',
      type: 'THEME',
    },
    {
      title: 'La recherche et développement',
      value:
        'Que s’est-il dit autour de la thématique La recherche et développement" ?',
      type: 'THEME',
    },
    {
      title: 'Cadre légal',
      value:
        "Quels garde-fous et mécanismes de contrôle sont suggérés pour les propositions visant à améliorer l'accompagnement en fin de vie ?",
      type: 'SUGGESTION',
    },
    {
      title: 'Recommandations',
      value:
        "Quels sont les modèles de fin de vie qui ont suscité le plus d'adhésion au sein de la convention, et comment sont-ils présentés et discutés dans le cadre des propositions formulées ?",
      type: 'SUGGESTION',
    },
    {
      title: 'Soignants',
      value:
        'Comment les professionnels de santé ont-ils été pris en compte dans les travaux de la Convention et quel cadre légal entoure leur responsabilité envers leurs patients en fin de vie ?',
      type: 'SUGGESTION',
    },
  ],
  feed: {
    isStreaming: false,
    items: [],
  },
  language: 'en',
  sessionId: '',
  visitorId: '',
  documentSources: [],
};

export const initAssemblyDevState = (): AssemblyGlobalStateType =>
  JSON.parse(JSON.stringify(AssemblyDevState));
