/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC, useState, useEffect } from 'react';
import { SvgClose } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import {
  getBrowseConsultationsLink,
  getBrowseResultsLink,
  getNewsLinkByCountry,
  getWebflowDynamicLink,
} from '@make.org/utils/helpers/url';
import { useLocation } from 'react-router';
import { scrollToTop } from '@make.org/utils/helpers/styled';
import { URL } from '@make.org/types/enums';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { getCountryWithConsultations } from '@make.org/utils//helpers/countries';
import { getCountriesTransMap } from '@make.org/front/client/helpers/translationsMap';
import {
  isBrowseConsultationsPage,
  isBrowseResultsPage,
  ROUTE_WHOAREWE,
  ROUTE_PARTNERSHIP,
} from '@make.org/utils/routes';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { useAppContext } from '@make.org/store';
import { setPanelContent } from '@make.org/store/actions/panel';
import { SwitchCountryLanguage } from '../../SwitchCountryLanguage';
import {
  MenuPanelStyle,
  MenuCloseTriggerStyle,
  MenuInnerStyle,
  MenuNavStyle,
  MenuItemTitleStyle,
  MenuItemStyle,
  MenuInternalLinkStyle,
  MenuExternalLinkStyle,
  MenuNewWindowIconStyle,
  MenuItemCountryLanguageLinkStyle,
  MenuItemCountryLanguageIconStyle,
  MenuBulletPointStyle,
} from './style';

type Props = {
  isExpanded: boolean;
  toggleExpansion: () => void;
};

export const MenuPanel: FC<Props> = ({ isExpanded, toggleExpansion }) => {
  const location = useLocation();
  const { state, dispatch } = useAppContext();
  const [countriesTransMap, setCountriesTransMap] = useState(
    getCountriesTransMap()
  );

  const { country, language, countriesWithConsultations } = state.appConfig;
  const browseConsultationsLink =
    country && getBrowseConsultationsLink(country);
  const browseResultsLink = country && getBrowseResultsLink(country);
  const onBrowseConsultationsPage = isBrowseConsultationsPage(
    location.pathname
  );
  const onBrowseResultsPage = isBrowseResultsPage(location.pathname);
  const displayExtraNavLinks = country === 'DE' || country === 'FR';
  const isFR = country === 'FR';
  const isDE = country === 'DE';
  const countryHasConsultations = getCountryWithConsultations(
    country,
    countriesWithConsultations
  );

  const handleInternalNavigation = () => {
    scrollToTop();
    toggleExpansion();
  };

  useEffect(() => {
    setCountriesTransMap(getCountriesTransMap());
  }, [country, language]);

  return (
    <MenuPanelStyle
      aria-hidden={!isExpanded}
      className={isExpanded ? 'expanded' : ''}
      data-cy-container="mobile-header-menu"
    >
      <MenuCloseTriggerStyle
        onClick={toggleExpansion}
        disabled={!isExpanded}
        data-cy-button="mobile-header-close-menu"
        type="button"
      >
        <SvgClose aria-hidden focusable="false" />
        <ScreenReaderItemStyle>
          {i18n.t('header.close_menu')}
        </ScreenReaderItemStyle>
      </MenuCloseTriggerStyle>
      <MenuInnerStyle>
        <MenuNavStyle
          aria-label={i18n.t('header.main_navigation') || undefined}
        >
          <UnstyledListStyle>
            <MenuItemStyle>
              <MenuItemTitleStyle>
                {i18n.t('browse.page_title')}
              </MenuItemTitleStyle>
              <UnstyledListStyle>
                {!!browseConsultationsLink && countryHasConsultations && (
                  <MenuItemStyle className="white">
                    <MenuInternalLinkStyle
                      className={onBrowseConsultationsPage ? 'current' : ''}
                      to={browseConsultationsLink}
                      onClick={handleInternalNavigation}
                    >
                      {i18n.t('browse.nav_consultations_desktop')}
                    </MenuInternalLinkStyle>
                  </MenuItemStyle>
                )}
                {!!browseResultsLink && (
                  <MenuItemStyle className="white">
                    <MenuInternalLinkStyle
                      className={onBrowseResultsPage ? 'current' : ''}
                      to={browseResultsLink}
                      onClick={handleInternalNavigation}
                    >
                      {i18n.t('browse.nav_results_desktop')}
                    </MenuInternalLinkStyle>
                  </MenuItemStyle>
                )}
              </UnstyledListStyle>
            </MenuItemStyle>
            <MenuItemStyle className="extra-margin-top">
              <MenuExternalLinkStyle
                target="_blank"
                rel="noopener"
                href={getWebflowDynamicLink(language, ROUTE_WHOAREWE)}
              >
                {i18n.t('main_footer.whoarewe')}
                <> </>
                <MenuNewWindowIconStyle aria-hidden focusable="false" />
                <ScreenReaderItemStyle>
                  {i18n.t('common.open_new_window')}
                </ScreenReaderItemStyle>
              </MenuExternalLinkStyle>
            </MenuItemStyle>
            {displayExtraNavLinks && (
              <MenuItemStyle>
                <MenuExternalLinkStyle
                  target="_blank"
                  rel="noopener"
                  href={getWebflowDynamicLink(language, ROUTE_PARTNERSHIP)}
                >
                  {i18n.t('homepage.partnership.subtitle')}
                  <> </>
                  <MenuNewWindowIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </MenuExternalLinkStyle>
              </MenuItemStyle>
            )}
            <MenuItemStyle>
              <MenuExternalLinkStyle
                target="_blank"
                rel="noopener"
                href={getNewsLinkByCountry(country)}
              >
                {i18n.t('main_footer.news')}
                <> </>
                <MenuNewWindowIconStyle aria-hidden focusable="false" />
                <ScreenReaderItemStyle>
                  {i18n.t('common.open_new_window')}
                </ScreenReaderItemStyle>
              </MenuExternalLinkStyle>
            </MenuItemStyle>
            {(isFR || isDE) && (
              <MenuItemStyle>
                <MenuExternalLinkStyle
                  target="_blank"
                  rel="noopener"
                  href={isFR ? URL.JOBS_LINK : URL.JOBS_LINK_DE}
                >
                  {i18n.t('main_footer.jobs')}
                  <> </>
                  <MenuNewWindowIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </MenuExternalLinkStyle>
              </MenuItemStyle>
            )}
          </UnstyledListStyle>
        </MenuNavStyle>
        <MenuItemCountryLanguageLinkStyle
          as={UnstyledButtonStyle}
          onClick={() => dispatch(setPanelContent(<SwitchCountryLanguage />))}
          data-cy-button="country-switch-nav-panel"
          type="button"
        >
          <MenuItemCountryLanguageIconStyle aria-hidden focusable="false" />
          <> </>
          {countriesTransMap.get(country)}
          <MenuBulletPointStyle>&nbsp;{`\u2022`}&nbsp;</MenuBulletPointStyle>
          {language.charAt(0).toUpperCase() + language.slice(1)}
        </MenuItemCountryLanguageLinkStyle>
      </MenuInnerStyle>
    </MenuPanelStyle>
  );
};
