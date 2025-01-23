import React, { FC, useEffect } from 'react';
import i18n from 'i18next';
import { Image } from '@make.org/ui/components/Image';
import { IDS } from '@make.org/types/enums';
import {
  ExternalLinkIconStyle,
  LinkAnchorStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { useAppContext } from '@make.org/store';
import { handleScrollAnimation } from '@make.org/utils/helpers/animate';
import {
  PartnershipImagesListStyle,
  PartnershipSectionStyle,
  PartnershipSectionLabelStyle,
  PartnershipSectionLabelWrapperStyle,
  PartnershipSectionListItemStyle,
  PartnershipSectionListStyle,
  PartnershipSectionParagraphStyle,
  PartnershipSectionTitleStyle,
} from './style';

type Props = {
  sectionNumber: number;
  id: string;
  labels: string[];
  images: Array<{
    url: string;
    alt: string;
    width: number;
    height: number;
  }>;
  direction: string;
};

const cdnPath = 'https://assets.make.org/assets/home/partners';

const labelsPartner1 = [
  `homepage.positioning_1.label_1`,
  `homepage.positioning_1.label_2`,
  `homepage.positioning_1.label_3`,
  `homepage.positioning_1.label_4`,
];

const imagesPartner1 = [
  {
    url: `${cdnPath}/paris.png`,
    alt: 'Ville de Paris',
    width: 59,
    height: 56,
  },
  {
    url: `${cdnPath}/radiofrance.png`,
    alt: 'Radio France',
    width: 116,
    height: 23,
  },
  {
    url: `${cdnPath}/nato.png`,
    alt: 'Nato - Otan',
    width: 118,
    height: 51,
  },
  {
    url: `${cdnPath}/eu.png`,
    alt: 'European Parliament',
    width: 115,
    height: 90,
  },
  {
    url: `${cdnPath}/gouvernement.svg`,
    alt: 'Gouvernement - Liberté, Égalité, Fraternité',
    width: 97,
    height: 50,
  },
  {
    url: `${cdnPath}/cese.svg`,
    alt: 'CESE - Conseil économique social et environnemental',
    width: 50,
    height: 60,
  },
];

const labelsPartner2 = [
  `homepage.positioning_2.label_1`,
  `homepage.positioning_2.label_2`,
  `homepage.positioning_2.label_3`,
  `homepage.positioning_2.label_4`,
];

const imagesPartner2 = [
  {
    url: `${cdnPath}/engie.png`,
    alt: 'Engie',
    width: 109,
    height: 37,
  },
  {
    url: `${cdnPath}/laposte.png`,
    alt: 'La Poste',
    width: 91,
    height: 44,
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
    url: `${cdnPath}/ca.png`,
    alt: 'CA - Crédit Agricole',
    width: 101,
    height: 81,
  },
];

const labelsPartner3 = [
  `homepage.positioning_3.label_1`,
  `homepage.positioning_3.label_2`,
  `homepage.positioning_3.label_3`,
  `homepage.positioning_3.label_4`,
];

const imagesPartner3 = [
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

const PROJECT_URLS = {
  fr: 'https://about.make.org/fr/commencer-un-projet',
  de: 'https://about.make.org/de/ihr-projekt-starten',
  en: 'https://about.make.org/en/start-a-project',
} as const;

const getStartAProjectLink = (language: string) =>
  PROJECT_URLS[language as keyof typeof PROJECT_URLS] || PROJECT_URLS.en;

const Section: FC<Props> = ({
  sectionNumber,
  id,
  labels,
  images,
  direction,
}) => {
  const { state } = useAppContext();
  const { language } = state.appConfig;

  return (
    <PartnershipSectionStyle
      as="section"
      aria-labelledby={`${id}_title`}
      id={id}
      className={`js-scroll slide-${direction}`}
    >
      <div>
        <PartnershipSectionTitleStyle id={`${id}_title`}>
          <span className="subtitle">
            {i18n.t(`homepage.positioning_${sectionNumber}.subtitle`)}
          </span>
          <span
            className="main-title"
            dangerouslySetInnerHTML={{
              __html: i18n.t(`homepage.positioning_${sectionNumber}.title`),
            }}
          />
        </PartnershipSectionTitleStyle>
        <PartnershipSectionParagraphStyle>
          {i18n.t(`homepage.positioning_${sectionNumber}.description`)}
        </PartnershipSectionParagraphStyle>
      </div>
      <PartnershipImagesListStyle>
        {images.map(image => (
          <li key={image.url}>
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </li>
        ))}
      </PartnershipImagesListStyle>
      <PartnershipSectionLabelWrapperStyle>
        <PartnershipSectionLabelStyle className="label">
          {i18n.t(`homepage.positioning_${sectionNumber}.label_name`)}
        </PartnershipSectionLabelStyle>
        <PartnershipSectionListStyle>
          {labels.map((key: string) => (
            <PartnershipSectionListItemStyle key={key}>
              {i18n.t(key)}
            </PartnershipSectionListItemStyle>
          ))}
        </PartnershipSectionListStyle>
        <LinkAnchorStyle
          as="a"
          href={getStartAProjectLink(language)}
          target="_blank"
          rel="noopener"
        >
          {i18n.t(`homepage.positioning_${sectionNumber}.link_label`)}
          <ExternalLinkIconStyle aria-hidden focusable="false" />
          <ScreenReaderItemStyle>
            {i18n.t('common.open_new_window')}
          </ScreenReaderItemStyle>
        </LinkAnchorStyle>
      </PartnershipSectionLabelWrapperStyle>
    </PartnershipSectionStyle>
  );
};

export const PartnershipSection: FC = () => {
  useEffect(() => {
    const handleScroll = () => handleScrollAnimation();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', () => handleScroll);
  }, []);

  return (
    <>
      <Section
        sectionNumber={1}
        id={IDS.PUBLIC}
        labels={labelsPartner1}
        images={imagesPartner1}
        direction="left"
      />
      <Section
        sectionNumber={2}
        id={IDS.BUSINESS}
        labels={labelsPartner2}
        images={imagesPartner2}
        direction="right"
      />
      <Section
        sectionNumber={3}
        id={IDS.RESEARCH}
        labels={labelsPartner3}
        images={imagesPartner3}
        direction="left"
      />
    </>
  );
};
