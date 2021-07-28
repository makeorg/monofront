import i18n from 'i18next';

export const formatCountWithLanguage = (
  count: number,
  language: string
): string | null => {
  if (!count) {
    return null;
  }

  return count.toLocaleString(language);
};

export const formatMillionToText = (
  count: number,
  language: string
): string | null => {
  if (!count) {
    return null;
  }

  let number = count;
  const oneMillion = 10 ** 6;

  if (number >= oneMillion) {
    number /= oneMillion;

    return `${number.toFixed(1)} ${i18n.t('common.million', {
      count: number,
    })}`;
  }

  return number.toLocaleString(language);
};
