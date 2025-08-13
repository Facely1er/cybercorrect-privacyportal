// Brand provider component for white label support
import React, { createContext, useContext, useEffect } from 'react';
import { brandService } from '../../services/brandService';

interface BrandContextType {
  brandName: string;
  fullBrandName: string;
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
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

interface BrandProviderProps {
  children: React.ReactNode;
}

export function BrandProvider({ children }: BrandProviderProps) {
  const [brandData, setBrandData] = React.useState(() => brandService.getBrandedProps());

  useEffect(() => {
    // Initialize brand service and apply branding
    brandService.initialize();
    setBrandData(brandService.getBrandedProps());
  }, []);

  return (
    <BrandContext.Provider value={brandData}>
      {children}
    </BrandContext.Provider>
  );
}

export const useBrandContext = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrandContext must be used within BrandProvider');
  }
  return context;
};

// Higher-order component for brand-aware components
export function withBrand<P extends object>(
  Component: React.ComponentType<P & { brand: BrandContextType }>
) {
  return function BrandAwareComponent(props: P) {
    const brand = useBrandContext();
    return <Component {...props} brand={brand} />;
  };
}

// Brand-aware link component
interface BrandLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function BrandLink({ href, children, className = '', external = false }: BrandLinkProps) {
  const brand = useBrandContext();
  
  // Replace brand variables in href
  const brandedHref = href
    .replace('{brand.website}', brand.social?.website || '#')
    .replace('{brand.support}', `mailto:${brand.contact.supportEmail}`)
    .replace('{brand.privacy}', `mailto:${brand.contact.privacyEmail}`);
  
  if (external) {
    return (
      <a 
        href={brandedHref} 
        className={className}
        target="_blank" 
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  
  return (
    <a href={brandedHref} className={className}>
      {children}
    </a>
  );
}

// Brand-aware image component
interface BrandImageProps {
  type: 'primary' | 'icon';
  className?: string;
  alt?: string;
}

export function BrandImage({ type, className = '', alt }: BrandImageProps) {
  const brand = useBrandContext();
  const logo = brand.logo;
  
  return (
    <img 
      src={logo[type]} 
      alt={alt || logo.alt} 
      className={className}
      onError={(e) => {
        // Fallback to a generic logo if brand logo fails to load
        (e.target as HTMLImageElement).src = `data:image/svg+xml;base64,${btoa(`
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" fill="${brand.colors.primary}" rx="4"/>
            <text x="16" y="20" font-family="Arial" font-size="14" fill="white" text-anchor="middle">
              ${brand.brandName.charAt(0)}
            </text>
          </svg>
        `)}`;
      }}
    />
  );
}

// Brand-aware text component
interface BrandTextProps {
  type: 'name' | 'fullName' | 'tagline' | 'description' | 'companyName' | 'productName';
  trademark?: boolean;
  short?: boolean;
  className?: string;
}

export function BrandText({ type, trademark = false, short = false, className = '' }: BrandTextProps) {
  const brand = useBrandContext();
  
  const getText = () => {
    switch (type) {
      case 'name':
        return trademark ? `${brand.brandName}™` : brand.brandName;
      case 'fullName':
        return trademark ? `${brand.fullBrandName}™` : brand.fullBrandName;
      case 'tagline':
        return brand.tagline;
      case 'description':
        return short ? brand.shortDescription : brand.fullDescription;
      case 'companyName':
        return trademark ? brand.companyNameWithTM : brand.companyName;
      case 'productName':
        return trademark ? brand.productNameWithTM : brand.productName;
      default:
        return brand.brandName;
    }
  };

  return <span className={className}>{getText()}</span>;
}