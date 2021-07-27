import React from 'react';
import { RouterProps } from 'react-router';
import { trackClickSearchReturn } from '@make.org/utils/services/Tracking';
import { getRouteSearch } from '@make.org/utils/routes';
import i18n from 'i18next';
import { SvgAngleArrowLeft } from '@make.org/ui/Svg/elements';
import { useAppContext } from '@make.org/store';
import { SearchBackArrowStyle, SearchBackStyle } from './Styled';

type Props = RouterProps & {
  term: string;
};
export const SearchBackButton: React.FC<Props> = ({ term, history }) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;

  const handleReturn = () => {
    trackClickSearchReturn();
    history.push(getRouteSearch(country, term));
  };

  return (
    <SearchBackStyle onClick={() => handleReturn()}>
      <SvgAngleArrowLeft
        aria-hidden
        style={SearchBackArrowStyle}
        focusable="false"
      />
      {i18n.t('common.back')}
    </SearchBackStyle>
  );
};
