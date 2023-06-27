import { OrganisationProfileType } from './Organisation';
import { PersonalityProfileType } from './Personality';
import { ProposalType } from './Proposal';

export type CommonUsersProfileType = OrganisationProfileType &
  UserProfileType &
  PersonalityProfileType;

export type PersonalityType = {
  userId: string;
  firstName: string;
  lastName: string;
  politicalParty: string;
  avatarUrl: string;
  gender: string;
  userType: string;
  email: string;
  enabled: boolean;
  emailVerified: boolean;
};

export type CreateUserType = {
  email: string;
  password: string;
  firstName: string | null;
  dateOfBirth: string | null;
  postalCode: string | null;
  country: string;
  language: string;
  crmCountry: string;
  crmLanguage: string;
  questionId: string;
  optIn: boolean;
  legalMinorConsent: boolean;
  legalAdvisorApproval: boolean;
  approvePrivacyPolicy: boolean;
};

export type UserType = {
  userId: string;
  email: string;
  enabled: boolean;
  emailVerified: boolean;
  displayName: string;
  userType: string;
  roles: string[];
  hasPassword: boolean;
  country: string;
  language: string;
  avatarUrl: string;
};

export type UserProfileType = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  avatarUrl: string;
  profession: string;
  description: string;
  postalCode: string;
  optInNewsletter: boolean;
  website: string;
  legalMinorConsent?: boolean;
  legalAdvisorApproval?: boolean;
  crmCountry: string;
  crmLanguage: string;
};

export type PasswordsType = {
  newPassword: string;
  actualPassword: string;
};

export type SearchProposalsType = {
  total: number;
  seed?: number;
  results: ProposalType[];
};

export type UserAuthType = {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  account_creation: boolean;
  created_at: string;
};
