const elementInView = (element: Element, scrollOffset = 0) => {
  const elementTop = element.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) - scrollOffset
  );
};

const scrollOffset = 100;

const displayScrollElement = (element: Element) => {
  element.classList.add('scrolled');
};

const hideScrollElement = (element: Element) => {
  element.classList.remove('scrolled');
};

export const handleScrollAnimation = (): void => {
  const scrollElements = document.querySelectorAll('.js-scroll');

  scrollElements.forEach(el => {
    if (elementInView(el, scrollOffset)) {
      displayScrollElement(el);
    } else {
      hideScrollElement(el);
    }
  });
};
