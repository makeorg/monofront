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

const linkConsultationArray = [
  {
    title: 'Pourquoi cette consultation ?',
    url: 'zef',
  },
  {
    title: 'Chronologie',
    url: '',
  },
  {
    title: 'Découvrir le CESE',
    url: 'sdf',
  },
];

const linkPanoramicArray = [
  {
    title: 'Possibilités et limites d’Echo',
    url: '',
  },
  {
    title: 'Intégrité et éthique de l’I.A.',
    url: 'sdf',
  },
  {
    title: 'En savoir plus sur Make.org',
    url: '',
  },
];

export const SidebarContent: FC = () => (
  <SidebarContentContainerStyle>
    <SidebarContentBlockStyle>
      <SidebarContentSubtitleStyle>
        {i18n.t('sidebar.know_more')}
      </SidebarContentSubtitleStyle>
      <SidebarContentListStyle>
        {linkConsultationArray.map(link => (
          <SidebarContentListItemStyle key={link.title}>
            <SidebarContentLinkStyle
              href={link.url}
              target="_blank"
              rel="noopener"
            >
              {link.title}
              {link.url.length > 0 && <SidebarSvgExternalStyle />}
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
            <SidebarContentLinkStyle
              href={link.url}
              target="_blank"
              rel="noopener"
            >
              {link.title}
              {link.url.length > 0 && <SidebarSvgExternalStyle />}
            </SidebarContentLinkStyle>
          </SidebarContentListItemStyle>
        ))}
      </SidebarContentListStyle>
    </SidebarContentBlockStyle>
  </SidebarContentContainerStyle>
);
