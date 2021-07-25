export const debounce = (func: () => void, wait: number): (() => void) => {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
