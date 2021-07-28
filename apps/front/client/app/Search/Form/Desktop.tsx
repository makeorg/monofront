import React, { useState } from 'react';
import i18n from 'i18next';
import { SearchFormCancelTriggerStyle } from './style';
import { SearchForm } from './Form';
import { addSearchDesktopHidden, removeSearchDesktopHidden } from './Animation';

export const DesktopSearchInput: React.FC = () => {
  const [isExpanded, expandForm] = useState<boolean>(false);

  const expandDesktop = () => {
    expandForm(true);
    return addSearchDesktopHidden();
  };

  const collapseDesktop = () => {
    expandForm(false);
    return removeSearchDesktopHidden();
  };

  return (
    <>
      <SearchForm handleFocus={expandDesktop} />
      {isExpanded && (
        <SearchFormCancelTriggerStyle
          className="close-trigger"
          type="button"
          onClick={collapseDesktop}
        >
          {i18n.t('search.form.cancel')}
        </SearchFormCancelTriggerStyle>
      )}
    </>
  );
};
