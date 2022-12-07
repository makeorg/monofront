import { LocaleType } from '@make.org/types/enums';
import { useEffect, useState } from 'react';
import {
  FooterLinkType,
  setCommonExtraLinks,
  setCommonInternalLinks,
} from '../app/Footer/localized/Common';
import { setDEExternalLinks } from '../app/Footer/localized/DE';
import { setFRExternalLinks } from '../app/Footer/localized/FR';
import { setINTExternalLinks } from '../app/Footer/localized/INT';

export const useInternalLinks = (
  country: string,
  language: string
): FooterLinkType[] => {
  const [internalLinks, setInternaLinks] = useState<FooterLinkType[]>([]);

  useEffect(() => {
    if (!country || !language) {
      setInternaLinks([]);
    }
    const commonInternalLinks = setCommonInternalLinks(country, language);

    if (language !== [LocaleType.en].toString()) {
      const extraInternalLinks = setCommonExtraLinks(country, language);
      const links = commonInternalLinks.concat(extraInternalLinks);
      setInternaLinks(links);
      return;
    }

    setInternaLinks(commonInternalLinks);
  }, [country, language]);

  return internalLinks;
};

export const useExternalLinks = (
  country: string,
  language: string
): FooterLinkType[] => {
  const [externalLinks, setExternalLinks] = useState<FooterLinkType[]>([]);

  useEffect(() => {
    if (!country) {
      setExternalLinks([]);
    }

    if (country === 'FR') {
      setExternalLinks(setFRExternalLinks(language));
      return;
    }

    if (country === 'DE') {
      setExternalLinks(setDEExternalLinks(language));
      return;
    }

    setExternalLinks(setINTExternalLinks(language));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, language]);

  return externalLinks;
};
