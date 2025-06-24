/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC, useState, useEffect } from 'react';
import { SvgClose } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import {
  getNewsLinkByCountry,
  getWebflowDynamicLink,
} from '@make.org/utils/helpers/url';
import { URL } from '@make.org/types/enums';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { getCountriesTransMap } from '@make.org/front/client/helpers/translationsMap';
import {
  ROUTE_WHOAREWE,
  ROUTE_PARTNERSHIP,
  ROUTE_JOIN_GREAT_CAUSE,
} from '@make.org/utils/routes';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { useAppContext } from '@make.org/store';
import { setPanelContent } from '@make.org/store/actions/panel';
import { SwitchCountryLanguage } from '@make.org/front/client/app/SwitchCountryLanguage';
import {
  MenuPanelStyle,
  MenuCloseTriggerStyle,
  MenuInnerStyle,
  MenuNavStyle,
  MenuItemStyle,
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
  const { state, dispatch } = useAppContext();
  const [countriesTransMap, setCountriesTransMap] = useState(
    getCountriesTransMap()
  );

  const { country, language } = state.appConfig;
  const isFR = country === 'FR';
  const isDE = country === 'DE';

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
            <MenuItemStyle className="white">
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
            <MenuItemStyle className="white">
              <MenuExternalLinkStyle
                target="_blank"
                rel="noopener"
                href={getWebflowDynamicLink(language, ROUTE_PARTNERSHIP)}
              >
                {i18n.t('homepage.partnership.start_project')}
                <> </>
                <MenuNewWindowIconStyle aria-hidden focusable="false" />
                <ScreenReaderItemStyle>
                  {i18n.t('common.open_new_window')}
                </ScreenReaderItemStyle>
              </MenuExternalLinkStyle>
            </MenuItemStyle>
            {isFR && (
              <MenuItemStyle className="white">
                <MenuExternalLinkStyle
                  target="_blank"
                  rel="noopener"
                  href={getWebflowDynamicLink('fr', ROUTE_JOIN_GREAT_CAUSE)}
                >
                  {i18n.t('homepage.partnership.join')}
                  <> </>
                  <MenuNewWindowIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </MenuExternalLinkStyle>
              </MenuItemStyle>
            )}
            <MenuItemStyle className="white">
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
              <MenuItemStyle className="white">
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
