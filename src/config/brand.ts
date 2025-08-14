// Brand configuration for white labelling
export interface BrandConfig {
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  logo: {
    primary: string;
    icon: string;
    alt: string;
  };
  colors: {
    primary: string;
    accent: string;
    background: string;
    text: string;
  };
  contact: {
    supportEmail: string;
    privacyEmail: string;
    legalEmail: string;
    phone: string;
    address: string;
  };
  legal: {
    companyName: string;
    registeredAddress: string;
    country: string;
    state: string;
  };
  features: {
    enableAnalytics: boolean;
    enableSupabase: boolean;
    enableOfflineMode: boolean;
    enablePWA: boolean;
  };
  social: {
    website?: string;
    twitter?: string;
    linkedin?: string;
  };
  customization: {
    enableCustomCSS: boolean;
    customCSSUrl?: string;
    customJSUrl?: string;
  };
}

// Default CyberCorrect brand configuration
const defaultBrandConfig: BrandConfig = {
  name: 'CyberCorrect',
  fullName: 'CyberCorrect™ Privacy Portal',
  tagline: 'Privacy Portal',
  description: 'Privacy self-service portal empowering stakeholders to exercise data rights and manage privacy compliance',
  logo: {
    primary: '/logos/cybercorrect-logo.png',
    icon: '/logos/cybercorrect-logo.png',
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
  features: {
    enableAnalytics: false,
    enableSupabase: true,
    enableOfflineMode: true,
    enablePWA: false
  },
  social: {
    website: 'https://cybercorrect.com'
  },
  customization: {
    enableCustomCSS: false
  }
};

// Environment-based brand configuration override
const getEnvironmentBrandConfig = (): Partial<BrandConfig> => {
  const envConfig: Partial<BrandConfig> = {};

  // Core branding
  if (import.meta.env.VITE_BRAND_NAME) {
    envConfig.name = import.meta.env.VITE_BRAND_NAME;
  }
  if (import.meta.env.VITE_BRAND_FULL_NAME) {
    envConfig.fullName = import.meta.env.VITE_BRAND_FULL_NAME;
  }
  if (import.meta.env.VITE_BRAND_TAGLINE) {
    envConfig.tagline = import.meta.env.VITE_BRAND_TAGLINE;
  }
  if (import.meta.env.VITE_BRAND_DESCRIPTION) {
    envConfig.description = import.meta.env.VITE_BRAND_DESCRIPTION;
  }

  // Logo configuration
  if (import.meta.env.VITE_BRAND_LOGO_PRIMARY || import.meta.env.VITE_BRAND_LOGO_ICON) {
    envConfig.logo = {
      primary: import.meta.env.VITE_BRAND_LOGO_PRIMARY || defaultBrandConfig.logo.primary,
      icon: import.meta.env.VITE_BRAND_LOGO_ICON || defaultBrandConfig.logo.icon,
      alt: import.meta.env.VITE_BRAND_LOGO_ALT || `${envConfig.name || defaultBrandConfig.name} Logo`
    };
  }

  // Color configuration
  if (import.meta.env.VITE_BRAND_PRIMARY_COLOR || import.meta.env.VITE_BRAND_ACCENT_COLOR) {
    envConfig.colors = {
      primary: import.meta.env.VITE_BRAND_PRIMARY_COLOR || defaultBrandConfig.colors.primary,
      accent: import.meta.env.VITE_BRAND_ACCENT_COLOR || defaultBrandConfig.colors.accent,
      background: import.meta.env.VITE_BRAND_BACKGROUND_COLOR || defaultBrandConfig.colors.background,
      text: import.meta.env.VITE_BRAND_TEXT_COLOR || defaultBrandConfig.colors.text
    };
  }

  // Contact information
  if (import.meta.env.VITE_SUPPORT_EMAIL || import.meta.env.VITE_PRIVACY_EMAIL || import.meta.env.VITE_SUPPORT_PHONE) {
    envConfig.contact = {
      supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || defaultBrandConfig.contact.supportEmail,
      privacyEmail: import.meta.env.VITE_PRIVACY_EMAIL || defaultBrandConfig.contact.privacyEmail,
      legalEmail: import.meta.env.VITE_LEGAL_EMAIL || defaultBrandConfig.contact.legalEmail,
      phone: import.meta.env.VITE_SUPPORT_PHONE || defaultBrandConfig.contact.phone,
      address: import.meta.env.VITE_COMPANY_ADDRESS || defaultBrandConfig.contact.address
    };
  }

  // Legal information
  if (import.meta.env.VITE_COMPANY_NAME || import.meta.env.VITE_COMPANY_ADDRESS) {
    envConfig.legal = {
      companyName: import.meta.env.VITE_COMPANY_NAME || defaultBrandConfig.legal.companyName,
      registeredAddress: import.meta.env.VITE_COMPANY_ADDRESS || defaultBrandConfig.legal.registeredAddress,
      country: import.meta.env.VITE_COMPANY_COUNTRY || defaultBrandConfig.legal.country,
      state: import.meta.env.VITE_COMPANY_STATE || defaultBrandConfig.legal.state
    };
  }

  // Feature flags
  if (import.meta.env.VITE_ENABLE_ANALYTICS !== undefined || 
      import.meta.env.VITE_ENABLE_OFFLINE !== undefined ||
      import.meta.env.VITE_ENABLE_PWA !== undefined) {
    envConfig.features = {
      enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
      enableSupabase: import.meta.env.VITE_ENABLE_SUPABASE !== 'false', // Default true
      enableOfflineMode: import.meta.env.VITE_ENABLE_OFFLINE !== 'false', // Default true
      enablePWA: import.meta.env.VITE_ENABLE_PWA === 'true'
    };
  }

  // Social links
  if (import.meta.env.VITE_BRAND_WEBSITE || import.meta.env.VITE_BRAND_TWITTER) {
    envConfig.social = {
      website: import.meta.env.VITE_BRAND_WEBSITE,
      twitter: import.meta.env.VITE_BRAND_TWITTER,
      linkedin: import.meta.env.VITE_BRAND_LINKEDIN
    };
  }

  // Customization options
  if (import.meta.env.VITE_CUSTOM_CSS_URL || import.meta.env.VITE_CUSTOM_JS_URL) {
    envConfig.customization = {
      enableCustomCSS: import.meta.env.VITE_ENABLE_CUSTOM_CSS === 'true',
      customCSSUrl: import.meta.env.VITE_CUSTOM_CSS_URL,
      customJSUrl: import.meta.env.VITE_CUSTOM_JS_URL
    };
  }

  return envConfig;
};

// Merge default config with environment overrides
export const brandConfig: BrandConfig = {
  ...defaultBrandConfig,
  ...getEnvironmentBrandConfig()
};

// Helper functions for accessing brand configuration
export const getBrandName = () => brandConfig.name;
export const getFullBrandName = () => brandConfig.fullName;
export const getBrandTagline = () => brandConfig.tagline;
export const getBrandDescription = () => brandConfig.description;
export const getBrandLogo = () => brandConfig.logo;
export const getBrandColors = () => brandConfig.colors;
export const getContactInfo = () => brandConfig.contact;
export const getLegalInfo = () => brandConfig.legal;
export const getFeatureFlags = () => brandConfig.features;
export const getSocialLinks = () => brandConfig.social;
export const getCustomizationConfig = () => brandConfig.customization;

// Brand-specific utility functions
export const formatCompanyName = (withTrademark = false) => {
  return withTrademark ? `${brandConfig.legal.companyName}™` : brandConfig.legal.companyName;
};

export const formatFullProductName = (withTrademark = false) => {
  const baseName = withTrademark ? `${brandConfig.name}™` : brandConfig.name;
  return `${baseName} ${brandConfig.tagline}`;
};

export const getProductDescription = (short = false) => {
  return short 
    ? brandConfig.description.split('.')[0] + '.'
    : brandConfig.description;
};

// Validation function for brand configuration
export const validateBrandConfig = (config: Partial<BrandConfig>): string[] => {
  const errors: string[] = [];
  
  if (config.name && config.name.length < 2) {
    errors.push('Brand name must be at least 2 characters');
  }
  
  if (config.contact?.supportEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contact.supportEmail)) {
    errors.push('Support email must be a valid email address');
  }
  
  if (config.contact?.phone && !/^[\+]?[\d\s\-\(\)]+$/.test(config.contact.phone)) {
    errors.push('Phone number format is invalid');
  }
  
  if (config.colors?.primary && !/^#[0-9A-F]{6}$/i.test(config.colors.primary)) {
    errors.push('Primary color must be a valid hex color code');
  }
  
  return errors;
};