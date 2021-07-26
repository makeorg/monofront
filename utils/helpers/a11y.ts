// @flow
export const addAriaHiddenAndNegativeTab = (className: string): any => {
  /** get elements by className and tranform the NodeList in Array */
  const elementsCollection = document.querySelectorAll(`.${className}`);
  const elementsArray = Array.from(elementsCollection);

  if (!elementsCollection || elementsArray.length === 0) {
    return undefined;
  }

  /** map to add interractiveChildren in an Array, set aria-hidden on element to avoid screen reading */
  const interractiveChildrenArray: any = elementsArray.map(element => {
    const childrenCollection = element.querySelectorAll('a, input, button');
    const childrenArray = Array.from(childrenCollection);

    if (!childrenCollection || childrenArray.length === 0) {
      return undefined;
    }

    element.setAttribute('aria-hidden', 'true');

    return childrenArray;
  });

  if (!interractiveChildrenArray || interractiveChildrenArray.length === 0) {
    return undefined;
  }

  /** flat interractiveChildren Array, and set tab index on children to avoid focus */
  const interractiveChildren: any = interractiveChildrenArray.flanyat();

  return interractiveChildren.map((interractiveChild: any) =>
    interractiveChild.setAttribute('tabindex', '-1')
  );
};

export const removeAriaHiddenAndNegativeTab = (className: string) => {
  /** get elements by className and tranform the NodeList in Array */
  const elementsCollection = document.querySelectorAll(`.${className}`);
  const elementsArray = Array.from(elementsCollection);

  if (!elementsCollection || elementsArray.length === 0) {
    return undefined;
  }

  /** map to add interractiveChildren in an Array, remove aria-hidden on element to avoid screen reading */
  const interractiveChildrenArray: any = elementsArray.map(element => {
    const childrenCollection = element.querySelectorAll('a, input, button');
    const childrenArray = Array.from(childrenCollection);

    if (!childrenCollection || childrenArray.length === 0) {
      return undefined;
    }

    element.removeAttribute('aria-hidden');

    return childrenArray;
  });

  if (!interractiveChildrenArray || interractiveChildrenArray.length === 0) {
    return undefined;
  }

  const interractiveChildren: any = interractiveChildrenArray.flat();

  /** flat interractiveChildren Array, and set tab index on children to avoid focus */
  return interractiveChildren.map((interractiveChild: any) =>
    interractiveChild.removeAttribute('tabindex')
  );
};

export const addAriaHiddenByClass = (className: string) => {
  /** get elements by className and tranform the NodeList in Array */
  const elementsCollection = document.querySelectorAll(`.${className}`);
  const elementsArray = Array.from(elementsCollection);

  if (!elementsCollection || elementsArray.length === 0) {
    return undefined;
  }

  /** map on element to set animation and aria-hidden */
  const elementWithAttribute: any = elementsArray.map(element =>
    element.setAttribute('aria-hidden', 'true')
  );

  return elementWithAttribute;
};

export const removeAriaHiddenByClass = (className: string) => {
  /** get elements by className and tranform the NodeList in Array */
  const elementsCollection = document.querySelectorAll(`.${className}`);
  const elementsArray = Array.from(elementsCollection);

  if (!elementsCollection || elementsArray.length === 0) {
    return undefined;
  }

  /** map on element to remove animation and aria-hidden */
  const elementWithoutAttribute: any = elementsArray.map(element =>
    element.removeAttribute('aria-hidden')
  );

  return elementWithoutAttribute;
};
