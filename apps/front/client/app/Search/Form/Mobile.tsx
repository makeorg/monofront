import React, { useState } from 'react';
import { SvgSearch } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import {
  removeAriaHiddenByClass,
  addAriaHiddenByClass,
} from '@make.org/utils/helpers/a11y';
import { SEARCH } from '@make.org/types/enums';
import {
  SearchFormWrapperStyle,
  SearchFormTriggerStyle,
  SearchFormCancelTriggerStyle,
} from './style';
import { SearchForm } from './Form';

export const MobileSearchInput: React.FC = () => {
  const [isExpanded, expandForm] = useState<boolean>(false);

  const toggleMobileExpansion = (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (isExpanded) {
      removeAriaHiddenByClass(SEARCH.SEARCH_ARIA_CLASS);
      removeAriaHiddenByClass(SEARCH.SEARCH_ELEMENT_ARIA_CLASS);
      return expandForm(!isExpanded);
    }

    addAriaHiddenByClass(SEARCH.SEARCH_ARIA_CLASS);
    addAriaHiddenByClass(SEARCH.SEARCH_ELEMENT_ARIA_CLASS);
    return expandForm(!isExpanded);
  };

  return (
    <>
      <SearchFormTriggerStyle
        className={SEARCH.SEARCH_ELEMENT_ARIA_CLASS}
        aria-label={i18n.t('search.form.open_panel')}
        type="button"
        onClick={toggleMobileExpansion}
        disabled={isExpanded}
        data-cy-button="mobile-search"
      >
        <SvgSearch aria-hidden focusable="false" />
      </SearchFormTriggerStyle>
      <SearchFormWrapperStyle
        aria-hidden={!isExpanded && true}
        className={isExpanded ? 'expanded' : ''}
      >
        <SearchForm />
        <SearchFormCancelTriggerStyle
          className="close-trigger"
          type="button"
          onClick={toggleMobileExpansion}
          disabled={!isExpanded}
          data-cy-button="mobile-header-search-cancel"
        >
          {i18n.t('search.form.cancel')}
        </SearchFormCancelTriggerStyle>
      </SearchFormWrapperStyle>
    </>
  );
};
