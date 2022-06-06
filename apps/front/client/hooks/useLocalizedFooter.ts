import { useEffect, useState } from 'react';
import {
  FooterLinkType,
  setCommonExtraLinks,
  setCommonInternalLinks,
} from '../app/Footer/localized/Common';
import { setDEExternalLinks } from '../app/Footer/localized/DE';
import { setFRExternalLinks } from '../app/Footer/localized/FR';
import {
  setINTExternalLinks,
  setINTExtraLinks,
} from '../app/Footer/localized/INT';

export const useInternalLinks = (
  country: string,
  language: string
): FooterLinkType[] => {
  const [internalLinks, setInternaLinks] = useState<FooterLinkType[]>(
    setCommonInternalLinks(country, language)
  );

  useEffect(() => {
    const commonInternalLinks = setCommonInternalLinks(country, language);
    if (language === 'fr' || language === 'de') {
      const extraInternalLinks = setCommonExtraLinks(country, language);
      const links = commonInternalLinks.concat(extraInternalLinks);
      setInternaLinks(links);
    }

    if (country === 'en') {
      const extraINTInternalLinks = setINTExtraLinks(country);
      const INTLinks = commonInternalLinks.concat(extraINTInternalLinks);
      setInternaLinks(INTLinks);
    }
  }, [country, language]);

  return internalLinks;
};

export const useExternalLinks = (
  country: string,
  language: string,
  isDesktop: boolean
): FooterLinkType[] => {
  const [externalLinks, setExternalLinks] =
    useState<FooterLinkType[]>(setINTExternalLinks);

  useEffect(() => {
    if (language === 'fr') {
      setExternalLinks(setFRExternalLinks(isDesktop));
    }

    if (language === 'de') {
      setExternalLinks(setDEExternalLinks(isDesktop));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, language]);

  return externalLinks;
};
