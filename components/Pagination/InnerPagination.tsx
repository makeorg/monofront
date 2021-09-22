import React, { FC } from 'react';

type Props = {
  intPageId: number;
  pagesTotal: number;
  scrollToId?: string;
  questionSlug?: string;
};

export const InnerPagination: FC<Props> = ({
  intPageId,
  pagesTotal,
  scrollToId,
  questionSlug,
}) => (
  // const isFirstPartPagination = intPageId <= 5;
  // const isLastPartPagination = (intPageId > (pagesTotal - 5));
  // const previousPage = intPageId - 1;
  // const nextPage = intPageId + 1;

  <div>
    <div>
      {/* 
    //corner case for pagesTotal <= 7
    pagesTotal.map(page => <ItemBlocPage>{pageNumber}</ItemBlocPage>)

    //if pagesTotal > 7 && isFirstPartPagination
    {isFirstPartPagination && (
      (page => <ItemBlocPage>{pageNumber}</ItemBlocPage>)
      <SmallDotsStyle/>
      <ItemBlocPage>{pagesTotal}</ItemBlocPage>
    )}

    //if pagesTotal > 7 && isLastPartPagination
    {isLastPartPagination && (
      <ItemBlocPage>1</ItemBlocPage>
      <SmallDotsStyle/>
      lastPage.map(page => <ItemBlocPage>{pagesTotal}</ItemBlocPage>)
    )}

    //Dans tous les autres cas
    { !pagesTotal <=7 && (!isFirstPartPagination || !isLastPartPagination) (
    <>
      <ItemBlocPage>{1}</ItemBlocPage>
      <SmallDotsStyle/>
      <ItemBlocPage>{previousPage}</ItemBlocPage>
      <ItemBlocPage>{pageNumber}</ItemBlocPage>
      <ItemBlocPage>{nextPage}</ItemBlocPage>
      <SmallDotsStyle/>
      <ItemBlocPage>{pagesTotal}</ItemBlocPage>
    </>
    )
    }

  */}
    </div>
  </div>
);
