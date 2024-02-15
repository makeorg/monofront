import { useMemo } from 'react';
import { useLocation } from 'react-router';

type UtmsParamsType = {
  utm_campaign?: string;
  utm_source?: string;
  utm_term?: string;
  utm_content?: string;
};
const utmParams = ['utm_campaign', 'utm_source', 'utm_term', 'utm_content'];

export const useUtms = (): UtmsParamsType => {
  const location = useLocation();
  const result = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const accumulator: { [key: string]: string } = {};
    params.forEach((value, key) => {
      if (utmParams.includes(key)) {
        accumulator[key] = params.getAll(key).join(',');
      }
    });

    return accumulator;
  }, [location.search]);

  return result;
};
