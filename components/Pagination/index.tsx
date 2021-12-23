import React, { FC, useState, useRef } from 'react';
import i18n from 'i18next';
import { getPaginatedRoute } from '@make.org/utils/routes';
import { trackClickPageNumber } from '@make.org/utils/services/Tracking';
import { useLocation, useParams, useRouteMatch } from 'react-router';
import { scrollToElementId, scrollToTop } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import { QuestionType } from '@make.org/types';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { parse } from 'query-string';
import useOnClickOutside from '@make.org/utils/hooks/useOnClickOutside';
import {
  PaginationNavStyle,
  PaginationTextStyle,
  PaginationLinkStyle,
  PreviousArrowStyle,
  NextArrowStyle,
  PaginationDisabledStyle,
  ListItemStyle,
  ListLinkStyle,
  DropDownListStyle,
  DropDownCurrentStyle,
  DropDownContainerStyle,
} from './style';

type Props = {
  itemsPerPage: number;
  itemsTotal: number;
  scrollToId?: string;
};

export const Pagination: FC<Props> = ({
  itemsPerPage,
  itemsTotal,
  scrollToId,
}) => {
  const ref = useRef(null);
  const { state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);
  const params: { country: string; pageId: string } = useParams();
  const { country, pageId } = params;
  const { path } = useRouteMatch();
  const { search } = useLocation();
  const urlQueryParams = parse(search);
  const intPageId = JSON.parse(pageId);
  const pagesTotal = Math.ceil(itemsTotal / itemsPerPage);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropDown = () => pagesTotal > 2 && setIsOpen(!isOpen);
  const previousPageUrl = getPaginatedRoute(
    path,
    country,
    intPageId - 1,
    question && question.slug,
    urlQueryParams
  );
  const nextPageUrl = getPaginatedRoute(
    path,
    country,
    intPageId + 1,
    question && question.slug,
    urlQueryParams
  );

  const paginateClick = () => {
    trackClickPageNumber(intPageId);
    setIsOpen(false);
    if (scrollToId) {
      return scrollToElementId(scrollToId);
    }

    return scrollToTop();
  };

  const onOptionClicked = (page: number) =>
    getPaginatedRoute(
      path,
      country,
      page,
      question && question.slug,
      urlQueryParams
    );

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= pagesTotal; i += 1) {
      pages.push(
        <ListItemStyle key={i} className={intPageId === i ? 'selected' : ''}>
          <ListLinkStyle to={onOptionClicked(i)} onClick={paginateClick}>
            {i}
          </ListLinkStyle>
        </ListItemStyle>
      );
    }
    return pages;
  };

  const handleClickOutside = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <PaginationNavStyle
      aria-label={i18n.t('common.pagination.title')}
      data-cy-container="pagination"
    >
      {intPageId === 1 ? (
        <PaginationDisabledStyle>
          <PreviousArrowStyle aria-hidden focusable="false" />
        </PaginationDisabledStyle>
      ) : (
        <PaginationLinkStyle
          aria-label={i18n.t('common.pagination.previous')}
          onClick={paginateClick}
          data-cy-link="pagination-previous"
          to={previousPageUrl}
        >
          <PreviousArrowStyle aria-hidden focusable="false" />
        </PaginationLinkStyle>
      )}
      <PaginationTextStyle>
        {i18n.t('common.pagination.page')}
        <DropDownContainerStyle>
          <DropDownCurrentStyle onClick={toggleDropDown}>
            {intPageId}
          </DropDownCurrentStyle>
          {isOpen && (
            <DropDownListStyle ref={ref}>{getPages()}</DropDownListStyle>
          )}
        </DropDownContainerStyle>
        {i18n.t('common.pagination.page_total', {
          total: pagesTotal,
        })}
      </PaginationTextStyle>

      {intPageId === pagesTotal ? (
        <PaginationDisabledStyle>
          <NextArrowStyle aria-hidden focusable="false" />
        </PaginationDisabledStyle>
      ) : (
        <PaginationLinkStyle
          aria-label={i18n.t('common.pagination.next')}
          onClick={paginateClick}
          data-cy-link="pagination-next"
          to={nextPageUrl}
        >
          <NextArrowStyle aria-hidden focusable="false" />
        </PaginationLinkStyle>
      )}
    </PaginationNavStyle>
  );
};
