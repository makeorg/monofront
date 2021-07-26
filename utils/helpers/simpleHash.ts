export const simpleHash = (str: string): string => {
  let hash = 0;
  [...str].forEach(char => {
    // eslint-disable-next-line no-bitwise
    hash = parseInt((hash << 5) - hash + char, 10);
    // eslint-disable-next-line no-bitwise
    hash &= hash;
  });

  return new Uint32Array([hash])[0].toString(36);
};
