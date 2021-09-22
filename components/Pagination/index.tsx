import React, { FC } from 'react';
import i18n from 'i18next';
import { getPaginatedRoute } from '@make.org/utils/routes';
import { trackClickPageNumber } from '@make.org/utils/services/Tracking';
import { useParams, useRouteMatch } from 'react-router';
import { scrollToElementId, scrollToTop } from '@make.org/utils/helpers/styled';
import { InnerPagination } from './InnerPagination';
import {
  PaginationNavStyle,
  PaginationLinkStyle,
  PreviousArrowStyle,
  NextArrowStyle,
  PaginationDisabledStyle,
} from './style';

type Props = {
  itemsPerPage: number;
  itemsTotal: number;
  scrollToId?: string;
  questionSlug?: string;
};

export const Pagination: FC<Props> = ({
  itemsPerPage,
  itemsTotal,
  scrollToId,
  questionSlug,
}) => {
  const params: { country: string; pageId: string } = useParams();
  const { country, pageId } = params;
  const { path } = useRouteMatch();
  const intPageId = JSON.parse(pageId);
  const pagesTotal = Math.ceil(itemsTotal / itemsPerPage);
  const previousPageUrl = getPaginatedRoute(
    path,
    country,
    intPageId - 1,
    questionSlug
  );
  const nextPageUrl = getPaginatedRoute(
    path,
    country,
    intPageId + 1,
    questionSlug
  );

  const paginateClick = () => {
    trackClickPageNumber(intPageId);

    if (scrollToId) {
      return scrollToElementId(scrollToId);
    }

    return scrollToTop();
  };

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
      <InnerPagination
        intPageId={intPageId}
        pagesTotal={pagesTotal}
        scrollToId={scrollToId}
        questionSlug={questionSlug}
      />
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
