import React, { FC } from 'react';
import i18n from 'i18next';
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

const linkPanoramicArray = [
  {
    title: 'Politique de données',
    url: '#',
    redirect: false,
  },
  {
    title: 'Gestion des cookies',
    url: '#',
    redirect: false,
  },
  {
    title: 'À propos de Make.org',
    url: 'https://make.org/FR',
    redirect: true,
  },
];

export const SidebarContent: FC = () => {
  const { state } = useAssemblyContext();
  const { links } = state.event;

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
                <SidebarSvgExternalStyle />
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
