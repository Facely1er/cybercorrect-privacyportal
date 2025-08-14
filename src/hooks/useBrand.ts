// Simple brand hook to prevent deployment issues
import { useMemo } from 'react';

export function useBrand() {
  const brand = useMemo(() => ({
    brandName: 'CyberCorrect',
    fullBrandName: 'CyberCorrect™ Privacy Portal',
    tagline: 'Privacy Portal',
    description: 'Privacy self-service portal empowering stakeholders to exercise data rights and manage privacy compliance',
    productNameWithTM: 'CyberCorrect™ Privacy Portal',
    companyName: 'CyberCorrect',
    companyNameWithTM: 'CyberCorrect™',
    productName: 'CyberCorrect Privacy Portal',
    shortDescription: 'Privacy self-service portal empowering stakeholders',
    fullDescription: 'Privacy self-service portal empowering stakeholders to exercise data rights and manage privacy compliance',
    logo: {
      primary: '/cybercorrect.png',
      icon: '/cybercorrect.png',
      alt: 'CyberCorrect Logo'
    },
    colors: {
      primary: '#1E40AF',
      accent: '#1E3A8A',
      background: '#F8FAFF',
      text: '#0B1220'
    },
    contact: {
      supportEmail: 'support@cybercorrect.com',
      privacyEmail: 'privacy@cybercorrect.com',
      legalEmail: 'legal@cybercorrect.com',
      phone: '(240) 599-0102',
      address: 'Gaithersburg, MD 20877'
    },
    legal: {
      companyName: 'CyberCorrect',
      registeredAddress: 'Gaithersburg, MD 20877',
      country: 'United States',
      state: 'Maryland'
    },
    social: {
      website: 'https://cybercorrect.com'
    }
  }), []);

  return { brand };
}