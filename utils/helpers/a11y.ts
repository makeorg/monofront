export const addAriaHiddenAndNegativeTab = (className: string): Element[] => {
  /** get elements by className and tranform the NodeList in Array */
  const elementsCollection = document.querySelectorAll(`.${className}`);
  const elementsArray = Array.from(elementsCollection);

  if (!elementsCollection || elementsArray.length === 0) {
    return [];
  }

  /** map to add interractiveChildren in an Array, set aria-hidden on element to avoid screen reading */
  const interractiveChildrenArray = elementsArray.map(element => {
    const childrenCollection = element.querySelectorAll('a, input, button');
    const childrenArray = Array.from(childrenCollection);

    if (!childrenCollection || childrenArray.length === 0) {
      return undefined;
    }

    element.setAttribute('aria-hidden', 'true');

    return childrenArray;
  });

  if (!interractiveChildrenArray || interractiveChildrenArray.length === 0) {
    return [];
  }

  /** flat interractiveChildren Array, and set tab index on children to avoid focus */
  const interractiveChildren = interractiveChildrenArray.flat();

  return interractiveChildren.map((interractiveChild: any) =>
    interractiveChild.setAttribute('tabindex', '-1')
  );
};

export const removeAriaHiddenAndNegativeTab = (className: string): void => {
  /** get elements by className and tranform the NodeList in Array */
  const elementsCollection = document.querySelectorAll(`.${className}`);
  const elementsArray = Array.from(elementsCollection);

  if (!elementsCollection || elementsArray.length === 0) {
    return;
  }

  /** map to add interractiveChildren in an Array, remove aria-hidden on element to avoid screen reading */
  const interractiveChildrenArray = elementsArray.map(element => {
    const childrenCollection = element.querySelectorAll('a, input, button');
    const childrenArray = Array.from(childrenCollection);

    if (!childrenCollection || childrenArray.length === 0) {
      return [];
    }

    element.removeAttribute('aria-hidden');

    return childrenArray;
  });

  if (!interractiveChildrenArray || interractiveChildrenArray.length === 0) {
    return;
  }

  const interractiveChildren: Element[] = interractiveChildrenArray.flat();

  /** flat interractiveChildren Array, and set tab index on children to avoid focus */
  interractiveChildren.map(interractiveChild =>
    interractiveChild.removeAttribute('tabindex')
  );
};

export const addAriaHiddenByClass = (className: string): void => {
  /** get elements by className and tranform the NodeList in Array */
  const elementsCollection = document.querySelectorAll(`.${className}`);
  const elementsArray = Array.from(elementsCollection);

  if (!elementsCollection || elementsArray.length === 0) {
    return;
  }

  /** map on element to set animation and aria-hidden */
  elementsArray.map(element => element.setAttribute('aria-hidden', 'true'));
};

export const removeAriaHiddenByClass = (className: string): void => {
  /** get elements by className and tranform the NodeList in Array */
  const elementsCollection = document.querySelectorAll(`.${className}`);
  const elementsArray = Array.from(elementsCollection);

  if (!elementsCollection || elementsArray.length === 0) {
    return;
  }

  /** map on element to remove animation and aria-hidden */
  elementsArray.map(element => element.removeAttribute('aria-hidden'));
};
