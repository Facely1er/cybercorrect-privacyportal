// Brand service for white label configuration management
import { 
  brandConfig, 
  getBrandName, 
  getFullBrandName, 
  getBrandTagline,
  getBrandDescription,
  getBrandLogo,
  getBrandColors,
  getContactInfo,
  getLegalInfo,
  getFeatureFlags,
  getSocialLinks,
  getCustomizationConfig,
  formatCompanyName,
  formatFullProductName,
  getProductDescription,
  validateBrandConfig,
  type BrandConfig
} from '../config/brand';

export class BrandService {
  private static instance: BrandService;
  private config: BrandConfig;
  private customCSS: string | null = null;

  private constructor() {
    this.config = brandConfig;
    this.loadCustomizations();
  }

  public static getInstance(): BrandService {
    if (!BrandService.instance) {
      BrandService.instance = new BrandService();
    }
    return BrandService.instance;
  }

  // Load custom CSS and JS if enabled
  private async loadCustomizations() {
    const customization = getCustomizationConfig();
    
    if (customization.enableCustomCSS && customization.customCSSUrl) {
      try {
        const response = await fetch(customization.customCSSUrl);
        this.customCSS = await response.text();
        this.applyCustomCSS();
      } catch (error) {
        console.warn('Failed to load custom CSS:', error);
      }
    }

    if (customization.customJSUrl) {
      try {
        const script = document.createElement('script');
        script.src = customization.customJSUrl;
        script.async = true;
        document.head.appendChild(script);
      } catch (error) {
        console.warn('Failed to load custom JS:', error);
      }
    }
  }

  private applyCustomCSS() {
    if (this.customCSS) {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = this.customCSS;
      document.head.appendChild(style);
    }
  }

  // Apply brand colors to CSS custom properties
  public applyBrandColors() {
    const colors = getBrandColors();
    const root = document.documentElement;
    
    // Convert hex colors to RGB values for CSS custom properties
    const hexToRgb = (hex: string): string => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return '0 0 0';
      
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      
      return `${r} ${g} ${b}`;
    };

    // Apply colors to CSS custom properties
    root.style.setProperty('--cc-primary', hexToRgb(colors.primary));
    root.style.setProperty('--cc-accent', hexToRgb(colors.accent));
    root.style.setProperty('--cc-bg', hexToRgb(colors.background));
    root.style.setProperty('--cc-text', hexToRgb(colors.text));
    
    // Update standard CSS variables for compatibility
    root.style.setProperty('--primary', hexToRgb(colors.primary));
    root.style.setProperty('--accent', hexToRgb(colors.accent));
  }

  // Update page title and meta tags
  public updatePageMetadata() {
    const fullName = getFullBrandName();
    const description = getBrandDescription();
    const logo = getBrandLogo();

    // Update title
    document.title = fullName;

    // Update meta tags
    this.updateMetaTag('description', description);
    this.updateMetaTag('og:title', fullName);
    this.updateMetaTag('og:description', description);
    this.updateMetaTag('og:image', logo.primary);
    this.updateMetaTag('twitter:title', fullName);
    this.updateMetaTag('twitter:description', description);
    this.updateMetaTag('twitter:image', logo.primary);

    // Update favicon
    this.updateFavicon(logo.icon);
  }

  private updateMetaTag(property: string, content: string) {
    let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement;
    }
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(property.startsWith('og:') || property.startsWith('twitter:') ? 'property' : 'name', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  private updateFavicon(iconUrl: string) {
    let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = iconUrl;
  }

  // Generate branded manifest.json
  public generateManifest(): any {
    const fullName = getFullBrandName();
    const description = getBrandDescription();
    const logo = getBrandLogo();
    const colors = getBrandColors();

    return {
      name: fullName,
      short_name: getBrandName(),
      description: description,
      start_url: '/',
      display: 'standalone',
      background_color: colors.background,
      theme_color: colors.primary,
      orientation: 'portrait-primary',
      scope: '/',
      lang: 'en-US',
      dir: 'ltr',
      icons: [
        {
          src: logo.icon,
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: logo.icon,
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        }
      ],
      categories: ['privacy', 'compliance', 'security'],
      screenshots: [
        {
          src: '/screenshots/privacy-portal.png',
          sizes: '1280x720',
          type: 'image/png',
          label: fullName
        }
      ]
    };
  }

  // Get branded component props
  public getBrandedProps() {
    return {
      brandName: getBrandName(),
      fullBrandName: getFullBrandName(),
      tagline: getBrandTagline(),
      description: getBrandDescription(),
      logo: getBrandLogo(),
      colors: getBrandColors(),
      contact: getContactInfo(),
      legal: getLegalInfo(),
      social: getSocialLinks(),
      companyName: formatCompanyName(),
      companyNameWithTM: formatCompanyName(true),
      productName: formatFullProductName(),
      productNameWithTM: formatFullProductName(true),
      shortDescription: getProductDescription(true),
      fullDescription: getProductDescription(false)
    };
  }

  // Get configuration for white label partners
  public getWhiteLabelConfig(): BrandConfig {
    return this.config;
  }

  // Update configuration at runtime (for white label management)
  public updateBrandConfig(updates: Partial<BrandConfig>): boolean {
    const errors = validateBrandConfig(updates);
    if (errors.length > 0) {
      console.error('Brand configuration validation errors:', errors);
      return false;
    }

    this.config = { ...this.config, ...updates };
    this.applyBrandColors();
    this.updatePageMetadata();
    
    return true;
  }

  // Export configuration for external use
  public exportConfiguration(): string {
    return JSON.stringify(this.config, null, 2);
  }

  // Import configuration from JSON
  public importConfiguration(configJson: string): boolean {
    try {
      const newConfig = JSON.parse(configJson) as Partial<BrandConfig>;
      return this.updateBrandConfig(newConfig);
    } catch (error) {
      console.error('Failed to import brand configuration:', error);
      return false;
    }
  }

  // Initialize brand service
  public initialize() {
    try {
      this.applyBrandColors();
      this.updatePageMetadata();
      
      // Log initialization for debugging
      console.log(`${getBrandName()} brand service initialized`);
    } catch (error) {
      console.error('Brand service initialization error:', error);
      // Continue with default configuration
    }
  }
}

// Export singleton instance
export const brandService = BrandService.getInstance();

// Export convenience functions
export {
  getBrandName,
  getFullBrandName,
  getBrandTagline,
  getBrandDescription,
  getBrandLogo,
  getBrandColors,
  getContactInfo,
  getLegalInfo,
  getFeatureFlags,
  getSocialLinks,
  formatCompanyName,
  formatFullProductName,
  getProductDescription
};