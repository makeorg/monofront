// @ flow
import React from 'react';
import i18n from 'i18next';
import { FourthLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import RegisterBackground from '@make.org/assets/images/search_register.jpg';
import { ThumbsUpIconStyle } from '@make.org/ui/elements/SvgElements';
import { useAppContext } from '@make.org/store';
import { setPanelContent } from '@make.org/store/actions/panel';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import {
  SearchPageSidebarStyle,
  SearchSidebarTileStyle,
  SeachRegisterButtonStyle,
} from './style';

export const SearchRegister: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { isLoggedIn } = state.user.authentication;

  if (isLoggedIn) {
    return null;
  }

  return (
    <SearchPageSidebarStyle>
      <SearchSidebarTileStyle image={RegisterBackground}>
        <FourthLevelTitleStyle as="h3">
          {i18n.t('search.sidebar.register.title')}
        </FourthLevelTitleStyle>
        <SeachRegisterButtonStyle
          onClick={() => dispatch(setPanelContent(PANEL_CONTENT.REGISTER))}
        >
          <ThumbsUpIconStyle aria-hidden focusable="false" />
          {i18n.t('common.register_label')}
        </SeachRegisterButtonStyle>
      </SearchSidebarTileStyle>
    </SearchPageSidebarStyle>
  );
};
