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
import {
  getBusinessPartners,
  getPublicPartners,
  imagesPartnerAI,
  labelsPartnerAI,
  labelsPartnerBusiness,
  labelsPartnerPublic,
} from './List';

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
  const { state } = useAppContext();
  const { country } = state.appConfig;

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
        labels={labelsPartnerPublic}
        images={getPublicPartners(country)}
        direction="left"
      />
      <Section
        sectionNumber={2}
        id={IDS.BUSINESS}
        labels={labelsPartnerBusiness}
        images={getBusinessPartners(country)}
        direction="right"
      />
      <Section
        sectionNumber={3}
        id={IDS.RESEARCH}
        labels={labelsPartnerAI}
        images={imagesPartnerAI}
        direction="left"
      />
    </>
  );
};
