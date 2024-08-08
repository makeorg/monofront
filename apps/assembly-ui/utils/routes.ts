import { generatePath } from 'react-router';
import { UnknownObjectType } from '@make.org/types';
import configuration from '../configuration.json';

const BASE_PATH = `/${configuration.prefixPath ?? ''}`;

// routes Assembly
export const ROUTE_ASSEMBLY_ROOT = BASE_PATH;
export const ROUTE_ASSEMBLY_CUSTOMER = `${BASE_PATH}/customer/:customerSlugOrId`;
export const ROUTE_ASSEMBLY_EVENT = `${BASE_PATH}/customer/:customerSlug/event/:eventSlug`;
export const ROUTE_ASSEMBLY_EVENT_DOCUMENT_SOURCES = `${BASE_PATH}/customer/:customerSlug/event/:eventSlug/document-sources`;
export const ROUTE_ASSEMBLY_NOT_FOUND = `${BASE_PATH}/not-found`;
export const ROUTE_ASSEMBLY_PRIVACY_POLICY = `${BASE_PATH}/privacy-policy`;
export const ROUTE_ASSEMBLY_LEGAL = `${BASE_PATH}/legal`;
export const ROUTE_ASSEMBLY_COOKIES = `${BASE_PATH}/cookies`;
export const ROUTE_ASSEMBLY_ABOUT = `${BASE_PATH}/about`;
export const ROUTE_ASSEMBLY_FB_CONVERSION = `${BASE_PATH}/api/conversion-fb`;
export const ROUTE_ASSEMBLY_TW_CONVERSION = `${BASE_PATH}/api/conversion-tw`;
export const ROUTE_ASSEMBLY_CONSENT = `${BASE_PATH}/api/consent`;
export const ROUTE_ASSEMBLY_LOGGER = `${BASE_PATH}/api/logger`;

export const getRouteAssemblyEvent = (
  customerSlug: string,
  eventSlug: string,
  params?: UnknownObjectType
): string =>
  generatePath(ROUTE_ASSEMBLY_EVENT, {
    customerSlug,
    eventSlug,
  });

export const getRouteAssemblyEventDocumentSources = (
  customerSlug: string,
  eventSlug: string
): string =>
  generatePath(ROUTE_ASSEMBLY_EVENT_DOCUMENT_SOURCES, {
    customerSlug,
    eventSlug,
  });

// Path
export const LLM_PATH = `${BASE_PATH}/api/llm`;
export const DOCUMENTS_PATH = `${BASE_PATH}/api/documents`;
