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
  const [internalLinks, setInternaLinks] = useState<FooterLinkType[]>([]);

  useEffect(() => {
    if (!country) {
      setInternaLinks([]);
    }
    const commonInternalLinks = setCommonInternalLinks(country);

    setCommonInternalLinks(country);
    if (country === 'FR' || country === 'DE') {
      const extraInternalLinks = setCommonExtraLinks(country);
      const links = commonInternalLinks.concat(extraInternalLinks);
      setInternaLinks(links);
    }

    if (country === 'GB') {
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
  const [externalLinks, setExternalLinks] = useState<FooterLinkType[]>([]);

  useEffect(() => {
    if (!country) {
      setExternalLinks([]);
    }
    setExternalLinks(setINTExternalLinks(language));

    if (country === 'FR') {
      setExternalLinks(setFRExternalLinks(isDesktop, language));
    }

    if (country === 'DE') {
      setExternalLinks(setDEExternalLinks(isDesktop, language));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, language]);

  return externalLinks;
};
