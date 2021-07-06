import { ProposalType } from './Proposal';

export type PersonalityType = {
  userId: string
  firstName: string
  lastName: string
  politicalParty: string
  avatarUrl: string
  gender: string
};

export type UserType = {
  userId: string
  email: string
  displayName: string
  userType: string
  roles: string[]
  hasPassword: boolean
  enabled: boolean
  emailVerified: boolean
  country: string
  language: string
  avatarUrl: string
};

export type UserProfileType = {
  firstName: string
  lastName: string
  dateOfBirth: string
  avatarUrl: string
  profession: string
  description: string
  postalCode: string
  optInNewsletter: boolean
  website: string
  legalMinorConsent?: boolean
  legalAdvisorApproval?: boolean
};

export type PasswordsType = {
  newPassword: string
  actualPassword: string
};

export type SearchProposalsType = {
  total: number
  seed?: number
  results: ProposalType[]
};

export type UserAuthType = {
  token_type: string
  access_token: string
  expires_in: number
  refresh_token: string
  account_creation: boolean
};
