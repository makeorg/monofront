export type RegisterFormProfileDataType = {
  firstname: string
  age?: number
  postalcode: string
  profession: string
  legalMinorConsent: boolean
  legalAdvisorApproval: boolean
  approvePrivacyPolicy: boolean
};

export type RegisterFormDataType = {
  email: string
  password: string
  profile: RegisterFormProfileDataType
};
