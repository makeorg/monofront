import React from 'react';
import ReactModal from 'react-modal';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import {
  modalCloseFilters,
  modalCloseSort,
} from '@make.org/store/actions/modal';
import { CloseApplyStyle, SvgCloseApplyArrow } from './style';
import { SortComponent } from './Sort';
import { FiltersComponent } from './Filter';

// set modal and styles
ReactModal.setAppElement('#app');

export const SortAndFiltersModale: React.FC = () => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: null,
      transform: 'translate(-50%, -50%)',
      borderRadius: '8px',
      border: null,
      zIndex: 10,
      overflow: 'hidden',
      minWidth: '355px',
    },
  };

  const { dispatch, state } = useAppContext();
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const { showSort } = state.modal;
  const isSort = showSort === true;

  if (isMobile) {
    return (
      <ReactModal isOpen style={customStyles} overlayClassName="modal-overlay">
        <>
          <CloseApplyStyle
            onClick={() =>
              isSort
                ? dispatch(modalCloseSort())
                : dispatch(modalCloseFilters())
            }
          >
            <SvgCloseApplyArrow aria-hidden focusable="false" />
            {isSort
              ? i18n.t('consultation.explore.sort_continue')
              : i18n.t('consultation.explore.filters_continue')}
          </CloseApplyStyle>
        </>
        {isSort ? <SortComponent /> : <FiltersComponent />}
      </ReactModal>
    );
  }
  return null;
};
