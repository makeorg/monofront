import { generatePath } from 'react-router';
import { UnknownObjectType } from '@make.org/types';

// routes Assembly
export const ROUTE_ASSEMBLY_ROOT = '/';
export const ROUTE_ASSEMBLY_CUSTOMER = '/customer/:customerSlugOrId';
export const ROUTE_ASSEMBLY_EVENT = '/customer/:customerSlug/event/:eventSlug';
export const ROUTE_ASSEMBLY_EVENT_DOCUMENT_SOURCES =
  '/customer/:customerSlug/event/:eventSlug/document-sources';
export const ROUTE_ASSEMBLY_NOT_FOUND = '/not-found';
export const ROUTE_ASSEMBLY_PRIVACY_POLICY = '/privacy-policy';
export const ROUTE_ASSEMBLY_LEGAL = '/legal';
export const ROUTE_ASSEMBLY_COOKIES = '/cookies';
export const ROUTE_ASSEMBLY_ABOUT = '/about';
export const ROUTE_ASSEMBLY_FB_CONVERSION = '/api/conversion-fb';
export const ROUTE_ASSEMBLY_TW_CONVERSION = '/api/conversion-tw';
export const ROUTE_ASSEMBLY_CONSENT = '/api/consent';
export const ROUTE_ASSEMBLY_LOGGER = '/api/logger';

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
export const LLM_PATH = '/api/llm';
export const DOCUMENTS_PATH = '/api/documents';
