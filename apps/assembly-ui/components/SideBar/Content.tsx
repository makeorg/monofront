import React, { FC } from 'react';
import i18n from 'i18next';
import { Link } from 'react-router-dom';
import {
  ROUTE_ASSEMBLY_PRIVACY_POLICY,
  ROUTE_ASSEMBLY_COOKIES,
  ROUTE_ASSEMBLY_LEGAL,
  ROUTE_ASSEMBLY_ABOUT,
  getRouteAssemblyEventDocumentSources,
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

type Props = {
  closeModal: () => void;
};

export const SidebarContent: FC<Props> = ({ closeModal }) => {
  const { state } = useAssemblyContext();
  const { event, customer } = state;
  const { links } = event;

  const linkPanoramicArray = [
    {
      title: i18n.t('sidebar.discover'),
      url: ROUTE_ASSEMBLY_ABOUT,
    },
    {
      title: i18n.t('sidebar.policy'),
      url: ROUTE_ASSEMBLY_PRIVACY_POLICY,
    },
    {
      title: i18n.t('sidebar.cookie'),
      url: ROUTE_ASSEMBLY_COOKIES,
    },
    {
      title: i18n.t('sidebar.legal'),
      url: ROUTE_ASSEMBLY_LEGAL,
    },
    {
      title: i18n.t('sidebar.about'),
      url: 'https://make.org/FR',
    },
  ];

  const renderSourcesLink = (customerSlug: string, eventSlug: string) => {
    const linkEventSources = {
      title: i18n.t('sidebar.sources'),
      url: getRouteAssemblyEventDocumentSources(customerSlug, eventSlug),
    };

    return (
      <SidebarContentLinkStyle
        as={Link}
        to={linkEventSources.url}
        onClick={closeModal}
      >
        {linkEventSources.title}
      </SidebarContentLinkStyle>
    );
  };

  return (
    <SidebarContentContainerStyle>
      <SidebarContentBlockStyle>
        <SidebarContentListStyle>
          {customer.slug &&
            event.slug &&
            renderSourcesLink(customer.slug, event.slug)}
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
              <SidebarContentLinkStyle
                href={link.url}
                target="_blank"
                rel="noopener"
              >
                {link.title}
                <SidebarSvgExternalStyle aria-hidden focusable="false" />
              </SidebarContentLinkStyle>
            </SidebarContentListItemStyle>
          ))}
        </SidebarContentListStyle>
      </SidebarContentBlockStyle>
    </SidebarContentContainerStyle>
  );
};
