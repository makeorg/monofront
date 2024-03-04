import React, { FC } from 'react';
import i18n from 'i18next';
import {
  ROUTE_ASSEMBLY_PRIVACY_POLICY,
  ROUTE_ASSEMBLY_COOKIES,
  ROUTE_ASSEMBLY_LEGAL,
  ROUTE_ASSEMBLY_ABOUT,
} from '../../utils/routes';
import {
  SidebarContentContainerStyle,
  SidebarContentSubtitleStyle,
  SidebarContentBlockStyle,
  SidebarContentLinkStyle,
  SidebarSvgExternalStyle,
  SidebarContentListStyle,
  SidebarContentListItemStyle,
} from './style';
import { useAssemblyContext } from '../../store/context';

export const SidebarContent: FC = () => {
  const { state } = useAssemblyContext();
  const { links } = state.event;

  const linkPanoramicArray = [
    {
      title: i18n.t('sidebar.discover'),
      url: ROUTE_ASSEMBLY_ABOUT,
      redirect: true,
    },
    {
      title: i18n.t('sidebar.policy'),
      url: ROUTE_ASSEMBLY_PRIVACY_POLICY,
      redirect: true,
    },
    {
      title: i18n.t('sidebar.cookie'),
      url: ROUTE_ASSEMBLY_COOKIES,
      redirect: true,
    },
    {
      title: i18n.t('sidebar.legal'),
      url: ROUTE_ASSEMBLY_LEGAL,
      redirect: true,
    },
    {
      title: i18n.t('sidebar.about'),
      url: 'https://make.org/FR',
      redirect: true,
    },
  ];

  return (
    <SidebarContentContainerStyle>
      <SidebarContentBlockStyle>
        <SidebarContentListStyle>
          {links.map(link => (
            <SidebarContentListItemStyle key={link.label}>
              <SidebarContentLinkStyle
                href={link.url}
                target="_blank"
                rel="noopener"
              >
                {link.label}
                <SidebarSvgExternalStyle
                  aria-label={i18n.t('global.open_new_window')}
                />
              </SidebarContentLinkStyle>
            </SidebarContentListItemStyle>
          ))}
        </SidebarContentListStyle>
      </SidebarContentBlockStyle>

      <SidebarContentBlockStyle>
        <SidebarContentSubtitleStyle>
          {i18n.t('sidebar.panoramic')}
        </SidebarContentSubtitleStyle>
        <SidebarContentListStyle>
          {linkPanoramicArray.map(link => (
            <SidebarContentListItemStyle key={link.title}>
              {link.redirect ? (
                <SidebarContentLinkStyle
                  href={link.url}
                  target="_blank"
                  rel="noopener"
                >
                  {link.title}
                  <SidebarSvgExternalStyle aria-hidden focusable="false" />
                </SidebarContentLinkStyle>
              ) : (
                <SidebarContentLinkStyle href={link.url}>
                  {link.title}
                </SidebarContentLinkStyle>
              )}
            </SidebarContentListItemStyle>
          ))}
        </SidebarContentListStyle>
      </SidebarContentBlockStyle>
    </SidebarContentContainerStyle>
  );
};
