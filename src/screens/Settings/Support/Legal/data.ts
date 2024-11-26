import i18next from "../../../../Translate";

const data = {
  id: 'Legal',
  label: i18next.t('Legal'),
  description: i18next.t('View terms and conditions and privacy policy.'),
  content: false,
};

const legalData = [ {
    id: 'Terms and Conditions',
    label: i18next.t('Terms and Conditions'),
    description: i18next.t('View terms and conditions.'),
    navigation: 'TermsAndConditions',
},
  {
    id: 'Privacy Policy',
    label: i18next.t('Privacy Policy'),
    description: i18next.t('View privacy policy.'),
    navigation: 'PrivacyPolicy',
  },
  // {
  //   id: 'Terms of Service for business:',
  //   label: i18next.t('Terms of Service for business:'),
  //   description: i18next.t('View terms of service for business.'),
  //   navigation: 'TermsOfServiceForBusiness',
  // },
  // {
  //   id: 'Data Protection',
  //   label: i18next.t('Data Protection'),
  //   description: i18next.t('View data protection.'),
  //   navigation: 'DataProtection',
  // },
  {
    id: 'Copyright Policy',
    label: i18next.t('Copyright Policy'),
    description: i18next.t('View copyright policy.'),
    navigation: 'CopyrightPolicy',
  },    
];


export { legalData, data };
