import i18n from 'i18next';

export const formatCountWithLanguage = (
  count: number,
  language: string
): string => count.toLocaleString(language);

export const formatMillionToText = (
  count: number,
  language: string
): string => {
  let number = count;
  const oneMillion = 10 ** 6;

  if (number >= oneMillion) {
    number /= oneMillion;

    return `${number.toFixed(1)} ${i18n.t('common.million', {
      count,
    })}`;
  }

  return number.toLocaleString(language);
};
