/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useEffect } from 'react';
import { SvgSearch, SvgDisconnect } from '@make.org/ui/Svg/elements';
import { FORM } from '@make.org/types/enums';
import { throttle } from '@make.org/utils/helpers/throttle';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { useHistory, useLocation } from 'react-router';
import { trackClickSubmitSearch } from '@make.org/utils/services/Tracking';
import { getRouteSearch } from '@make.org/utils/routes';
import { useAppContext } from '@make.org/store';
import {
  SearchLabelStyle,
  SearchFormStyle,
  SearchInputStyle,
  SearchButtonStyle,
  SearchInputWrapperStyle,
} from './style';

type Props = {
  isExpanded?: boolean;
  handleFocus?: () => void;
};

export const SearchForm: React.FC<Props> = ({ isExpanded, handleFocus }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const term = params.get('query');
  const history = useHistory();
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const [searchTerm, setSearchTerm] = useState<string>(term || '');
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [hasSubmit, setHasSubmit] = useState<boolean>(!!term);

  const flushSearchValue = () => {
    setSearchTerm('');
    setCanSubmit(false);
    setHasSubmit(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setHasSubmit(false);
    setCanSubmit(false);
    setSearchTerm(value);
    if (value.length > 2 && value.length <= 140) {
      setCanSubmit(true);
    }
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    trackClickSubmitSearch();
    setHasSubmit(true);
    history.push(getRouteSearch(country, searchTerm));
  };

  const handleFlush = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    flushSearchValue();
    history.push(getRouteSearch(country, ''));
  };

  useEffect(() => {
    if (!location.pathname.includes('search')) {
      flushSearchValue();
    }
  }, [location.pathname]);

  return (
    <SearchFormStyle
      id={FORM.SEARCH_FORMNAME}
      className={isExpanded ? 'expanded' : ''}
      onSubmit={throttle(handleSubmit)}
    >
      <ScreenReaderItemStyle as="div">
        {i18n.t('search.form.introduction', {
          context: searchTerm ? 'searched' : '',
        })}
      </ScreenReaderItemStyle>
      <SearchInputWrapperStyle as="span">
        <SearchLabelStyle
          className={searchTerm.length > 0 ? 'hide' : ''}
          htmlFor="search_input"
        >
          {i18n.t('search.form.placeholder')}
        </SearchLabelStyle>
        <> </>
        <SearchInputStyle
          type="text"
          name="search"
          id="search_input"
          value={searchTerm}
          minLength={3}
          maxLength={140}
          onChange={handleChange}
          onFocus={handleFocus}
          data-cy-field="search"
        />
      </SearchInputWrapperStyle>
      <> </>
      {hasSubmit ? (
        <SearchButtonStyle
          aria-label={i18n.t('search.form.flush')}
          type="button"
          onClick={handleFlush}
          data-cy-button="search-clear"
        >
          <SvgDisconnect aria-hidden focusable="false" />
        </SearchButtonStyle>
      ) : (
        <SearchButtonStyle
          type="submit"
          disabled={!canSubmit}
          data-cy-button="search-submit"
        >
          <SvgSearch aria-hidden focusable="false" />
          <ScreenReaderItemStyle>
            {i18n.t('search.form.submit')}
          </ScreenReaderItemStyle>
        </SearchButtonStyle>
      )}
    </SearchFormStyle>
  );
};
