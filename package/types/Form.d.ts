export type RegisterFormProfileDataType = {
  firstname: string;
  age: string | number;
  postalcode: string;
  legalMinorConsent: boolean;
  legalAdvisorApproval: boolean;
  approvePrivacyPolicy: boolean;
  optInNewsletter: boolean;
};

export type RegisterFormDataType = {
  email: string;
  password: string;
  profile: RegisterFormProfileDataType;
};
