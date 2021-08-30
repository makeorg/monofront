import React, { FormEvent, Dispatch, SetStateAction, useState } from 'react';
import { throttle } from '@make.org/utils/helpers/throttle';
import { TypeFilterAndSortValues, QuestionKeywordType } from '@make.org/types';
import {
  SORT_POPULAR,
  SORT_RECENT,
  SORT_CONTROVERSY,
  FILTER_ORGANISATION,
} from '@make.org/utils/constants/explore';
import { ResetLinkStyle } from '../../../pages/Consultation/style';

type Props = {
  filterAndSortValues: TypeFilterAndSortValues;
  setFilterAndSortValues: Dispatch<SetStateAction<TypeFilterAndSortValues>>;
  keywords: QuestionKeywordType[];
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
};

const SORT_ITEMS: Array<{ name: string; label: string; value?: string }> = [
  {
    name: SORT_RECENT,
    label: 'Récentes',
    value: undefined,
  },
  {
    name: SORT_POPULAR,
    label: 'Populaires',
    value: SORT_POPULAR,
  },
  {
    name: SORT_CONTROVERSY,
    label: 'Controversées',
    value: SORT_CONTROVERSY,
  },
];

const getUpdatedFilterAndSortValues = (
  currentFilterAndSortValues: TypeFilterAndSortValues,
  name: string,
  value?: string
): TypeFilterAndSortValues => {
  switch (name) {
    case SORT_RECENT:
      return {
        ...currentFilterAndSortValues,
        sort: 'RECENT',
        sortAlgorithm: undefined,
      };
    case SORT_POPULAR:
    case SORT_CONTROVERSY:
      return {
        ...currentFilterAndSortValues,
        sort: undefined,
        sortAlgorithm: value,
      };
    case 'isNotVoted':
      return {
        ...currentFilterAndSortValues,
        isNotVoted: !JSON.parse(value || 'false'),
      };
    case 'userType':
      return {
        ...currentFilterAndSortValues,
        userType:
          currentFilterAndSortValues.userType === 'ORGANISATION'
            ? undefined
            : value,
      };
    case 'keywords':
      return {
        ...currentFilterAndSortValues,
        keywords: value,
      };
    default:
      throw new Error(`Unexpected value : "${name}"`);
  }
};

const checkCurrentSort = (itemName: string, currentSort: string): boolean => {
  if (itemName === currentSort) {
    return true;
  }
  return false;
};

export const FilterAndSort: React.FC<Props> = ({
  filterAndSortValues,
  setFilterAndSortValues,
  keywords,
  handleSubmit,
  handleReset,
}: Props) => {
  const [currentSort, setCurrentSort] = useState<string>(SORT_RECENT);
  const handleChange = (name: string, value?: string) => {
    const newFilterAndSortValues: TypeFilterAndSortValues =
      getUpdatedFilterAndSortValues(filterAndSortValues, name, value);

    setFilterAndSortValues(newFilterAndSortValues);
  };

  return (
    <form onSubmit={throttle(handleSubmit)}>
      <ResetLinkStyle
        type="button"
        onClick={() => {
          handleReset();
          setCurrentSort(SORT_RECENT);
        }}
      >
        Reset les filtres
      </ResetLinkStyle>
      <div>Les sujets qui vous interpellent</div>
      {keywords.length > 1 && (
        <ul>
          {keywords.map(keyword => (
            <li key={keyword.key}>
              <input
                type="button"
                name="keywords"
                value={keyword.key}
                onClick={() => handleChange('keywords', keyword.key)}
              />
            </li>
          ))}
        </ul>
      )}
      {keywords.length === 1 && (
        <input
          type="button"
          onClick={() => handleChange('keywords', keywords[0].key)}
          value={keywords[0].key}
        />
      )}
      <div>Trier par</div>
      <ul>
        {SORT_ITEMS.map(
          (item: { name: string; label: string; value?: string }) => (
            <li key={item.name}>
              <input
                id={item.name}
                type="radio"
                value={item.value}
                name="sort"
                onChange={() => {
                  handleChange(item.name, item.value);
                  setCurrentSort(item.name);
                }}
                checked={checkCurrentSort(item.name, currentSort)}
              />
              <label htmlFor={item.name}>{item.label}</label>
            </li>
          )
        )}
      </ul>
      <div>Filtrer par</div>
      <ul>
        <li>
          <label htmlFor="isNotVoted">
            <input
              type="checkbox"
              id="isNotVoted"
              name="isNotVoted"
              value={JSON.stringify(filterAndSortValues.isNotVoted)}
              checked={filterAndSortValues.isNotVoted}
              onChange={() =>
                handleChange(
                  'isNotVoted',
                  JSON.stringify(filterAndSortValues.isNotVoted)
                )
              }
            />
            Non votées
          </label>
        </li>
        <li>
          <label htmlFor="userType">
            <input
              type="checkbox"
              value={FILTER_ORGANISATION}
              id="userType"
              name="userType"
              checked={filterAndSortValues.userType !== undefined}
              onChange={() => handleChange('userType', FILTER_ORGANISATION)}
            />
            Organisation
          </label>
        </li>
      </ul>
      <button type="submit">Afficher les propositions</button>
    </form>
  );
};
