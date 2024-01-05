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
    title: 'Possibilités et limites d’Echo',
    url: '#',
  },
  {
    title: 'Intégrité et éthique de l’I.A.',
    url: '#',
  },
  {
    title: 'En savoir plus sur Make.org',
    url: '#',
  },
];

export const SidebarContent: FC = () => {
  const { state } = useAssemblyContext();
  const { links } = state.event;

  return (
    <SidebarContentContainerStyle>
      <SidebarContentBlockStyle>
        <SidebarContentSubtitleStyle>
          {i18n.t('sidebar.know_more')}
        </SidebarContentSubtitleStyle>
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
              <SidebarContentLinkStyle href={link.url}>
                {link.title}
              </SidebarContentLinkStyle>
            </SidebarContentListItemStyle>
          ))}
        </SidebarContentListStyle>
      </SidebarContentBlockStyle>
    </SidebarContentContainerStyle>
  );
};
