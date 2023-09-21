export const handleSearchParams = (
  search: string,
  language?: string
): string => {
  const urlParams = new URLSearchParams(search);
  const returnedParams = new URLSearchParams();
  const searchTerm = urlParams.get('query');

  // accept only query param for search
  if (searchTerm) {
    returnedParams.append('query', searchTerm);
  }

  if (language) {
    returnedParams.append('lang', language);
  }

  if (returnedParams.toString() === '') {
    return '';
  }

  return `?${returnedParams.toString()}`;
};
