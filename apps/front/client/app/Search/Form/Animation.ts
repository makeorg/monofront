import { SEARCH } from '@make.org/types/enums';

export const addSearchDesktopHidden = (
  animationTiming = 250
): number | (() => void)[] | undefined => {
  const menuItemsCollection = document.querySelectorAll(
    `.${SEARCH.SEARCH_DESKTOP_EXPANDED}`
  );
  const menuItemsArray = Array.from(menuItemsCollection);
  const searchForm = document.querySelector(`#search`);

  if (!menuItemsCollection || menuItemsArray.length === 0 || !searchForm) {
    return undefined;
  }

  const menuItemsWithAttribute: (() => void)[] | number = menuItemsArray.map(
    menuItems => {
      menuItems.classList.add(SEARCH.ADD_SEARCH_DESKTOP_ANIMATION);
      const timer = setTimeout(() => {
        menuItems.setAttribute('aria-hidden', 'true');
        searchForm.classList.add('expanded');
      }, animationTiming);
      return () => clearTimeout(timer);
    }
  );

  return menuItemsWithAttribute;
};

export const removeSearchDesktopHidden = (
  animationTiming = 250
): (() => void)[] | number | undefined => {
  const menuItemsCollection = document.querySelectorAll(
    `.${SEARCH.SEARCH_DESKTOP_EXPANDED}`
  );
  const menuItemsArray = Array.from(menuItemsCollection);
  const searchForm = document.querySelector(`#search`);

  if (!menuItemsCollection || menuItemsArray.length === 0 || !searchForm) {
    return undefined;
  }

  const menuItemsWithoutAttribute = menuItemsArray.map(menuItems => {
    searchForm.classList.remove('expanded');
    menuItems.classList.remove(SEARCH.ADD_SEARCH_DESKTOP_ANIMATION);
    menuItems.classList.add(SEARCH.REMOVE_SEARCH_DESKTOP_ANIMATION);
    const firstTimer = setTimeout(() => null, animationTiming);
    const secondTimer = setTimeout(() => {
      menuItems.removeAttribute('aria-hidden');
    }, animationTiming * 2);
    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
    };
  });

  return menuItemsWithoutAttribute;
};
