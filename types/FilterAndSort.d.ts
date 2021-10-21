export type TypeFilterAndSortValues = {
  keywords?: string;
  sortAlgorithm?: string;
  sort?: string;
  isNotVoted?: boolean;
  userType?: string;
};

export type StateFilterAndSort = {
  readonly keywords?: string;
  readonly sortAlgorithm?: string;
  readonly sort?: string;
  readonly isNotVoted?: boolean;
  readonly userType?: string;
};
