const cdnPath = 'https://assets.make.org/assets/home/partners';

export const labelsPartnerPublic = [
  `homepage.positioning_1.label_1`,
  `homepage.positioning_1.label_2`,
  `homepage.positioning_1.label_3`,
  `homepage.positioning_1.label_4`,
];

export const imagesPartnerPublic = [
  {
    url: `${cdnPath}/cor.png`,
    alt: 'European Committee of the Regions',
    width: 70,
    height: 65,
  },
  {
    url: `${cdnPath}/eu.png`,
    alt: 'European Parliament',
    width: 115,
    height: 90,
  },
  {
    url: `${cdnPath}/nato.png`,
    alt: 'Nato - Otan',
    width: 118,
    height: 51,
  },
  {
    url: `${cdnPath}/wwf.png`,
    alt: 'WWF',
    width: 43,
    height: 64,
  },
];

export const imagesPartnerPublicFR = [
  {
    url: `${cdnPath}/gouvernement.svg`,
    alt: 'Gouvernement - Liberté, Égalité, Fraternité',
    width: 97,
    height: 50,
  },
  {
    url: `${cdnPath}/paris.png`,
    alt: 'Ville de Paris',
    width: 59,
    height: 56,
  },
  {
    url: `${cdnPath}/eu.png`,
    alt: 'European Parliament',
    width: 115,
    height: 90,
  },
  {
    url: `${cdnPath}/nato.png`,
    alt: 'Nato - Otan',
    width: 118,
    height: 51,
  },
  {
    url: `${cdnPath}/radiofrance.png`,
    alt: 'Radio France',
    width: 116,
    height: 23,
  },
  {
    url: `${cdnPath}/cese.svg`,
    alt: 'CESE - Conseil économique social et environnemental',
    width: 50,
    height: 60,
  },
];

export const imagesPartnerPublicDE = [
  {
    url: `${cdnPath}/bertelsmann.svg`,
    alt: 'Bertelsmann Siftung',
    width: 130,
    height: 90,
  },
  {
    url: `${cdnPath}/bmi.svg`,
    alt: 'Bundesministerium des Innern und für Heimat',
    width: 130,
    height: 70,
  },
  {
    url: `${cdnPath}/auswartiges.svg`,
    alt: 'Auswärtiges Amt',
    width: 130,
    height: 75,
  },
  {
    url: `${cdnPath}/bw.svg`,
    alt: 'Baden-Wüttemberg',
    width: 130,
    height: 84,
  },
  {
    url: `${cdnPath}/berlin.svg`,
    alt: 'Berlin',
    width: 97,
    height: 36,
  },
  {
    url: `${cdnPath}/nw.png`,
    alt: 'Die Landesregierung Nordrhein-Westfalen',
    width: 98,
    height: 34,
  },
];

export const labelsPartnerBusiness = [
  `homepage.positioning_2.label_1`,
  `homepage.positioning_2.label_2`,
  `homepage.positioning_2.label_3`,
  `homepage.positioning_2.label_4`,
];

export const imagesPartnerBusiness = [
  {
    url: `${cdnPath}/pg.png`,
    alt: 'P&G',
    width: 94,
    height: 33,
  },
  {
    url: `${cdnPath}/westfield.svg`,
    alt: 'Unibail-Rodamco-Westfield',
    width: 120,
    height: 41,
  },
  {
    url: `${cdnPath}/accor.png`,
    alt: 'Accor',
    width: 70,
    height: 60,
  },
  {
    url: `${cdnPath}/roche-posay.png`,
    alt: 'La Roche Posay',
    width: 100,
    height: 42,
  },
];

export const imagesPartnerBusinessFR = [
  {
    url: `${cdnPath}/axa.svg`,
    alt: 'Axa',
    width: 60,
    height: 60,
  },
  {
    url: `${cdnPath}/orange.png`,
    alt: 'Orange',
    width: 56,
    height: 54,
  },
  {
    url: `${cdnPath}/loreal.png`,
    alt: "L'Oréal",
    width: 108,
    height: 19,
  },
  {
    url: `${cdnPath}/laposte.png`,
    alt: 'La Poste',
    width: 91,
    height: 44,
  },
  {
    url: `${cdnPath}/klesia.png`,
    alt: 'Klésia - Protection et innonvation sociales',
    width: 100,
    height: 33,
  },
  {
    url: `${cdnPath}/ca.png`,
    alt: 'CA - Crédit Agricole',
    width: 101,
    height: 81,
  },
];

export const imagesPartnerBusinessDE = [
  {
    url: `${cdnPath}/lvmh.png`,
    alt: 'lvmh',
    width: 94,
    height: 33,
  },
  {
    url: `${cdnPath}/microsoft.svg`,
    alt: '',
    width: 60,
    height: 60,
  },
  {
    url: `${cdnPath}/lidl.svg`,
    alt: 'Lidl',
    width: 60,
    height: 60,
  },
  {
    url: `${cdnPath}/schneider_electric.svg`,
    alt: 'Schneider Electric',
    width: 114,
    height: 34,
  },
  {
    url: `${cdnPath}/axa.svg`,
    alt: 'Axa',
    width: 60,
    height: 60,
  },
  {
    url: `${cdnPath}/germany_finance.png`,
    alt: 'Germany Finance',
    width: 100,
    height: 62,
  },
];

export const labelsPartnerAI = [
  `homepage.positioning_3.label_1`,
  `homepage.positioning_3.label_2`,
  `homepage.positioning_3.label_3`,
  `homepage.positioning_3.label_4`,
];

export const imagesPartnerAI = [
  {
    url: `${cdnPath}/sciencespo.svg`,
    alt: 'Sciences Po',
    width: 124,
    height: 19,
  },
  {
    url: `${cdnPath}/cnrs.png`,
    alt: 'CNRS',
    width: 52,
    height: 50,
  },
  {
    url: `${cdnPath}/sorbonne.png`,
    alt: 'Sorbonne Université',
    width: 102,
    height: 41,
  },
];

export const getPublicPartners = (
  country: string
): Array<{ url: string; alt: string; width: number; height: number }> => {
  switch (country) {
    case 'FR':
      return imagesPartnerPublicFR;
    case 'DE':
      return imagesPartnerPublicDE;
    default:
      return imagesPartnerPublic;
  }
};

export const getBusinessPartners = (
  country: string
): Array<{ url: string; alt: string; width: number; height: number }> => {
  switch (country) {
    case 'FR':
      return imagesPartnerBusinessFR;
    case 'DE':
      return imagesPartnerBusinessDE;
    default:
      return imagesPartnerBusiness;
  }
};
