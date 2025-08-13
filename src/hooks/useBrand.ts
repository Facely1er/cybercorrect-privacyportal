// React hook for accessing brand configuration
import { useState, useEffect } from 'react';
import { brandService, type BrandConfig } from '../services/brandService';

interface UseBrandReturn {
  brand: ReturnType<typeof brandService.getBrandedProps>;
  config: BrandConfig;
  updateBrand: (updates: Partial<BrandConfig>) => boolean;
  isLoading: boolean;
}

export function useBrand(): UseBrandReturn {
  const [brand, setBrand] = useState(() => brandService.getBrandedProps());
  const [config, setConfig] = useState(() => brandService.getWhiteLabelConfig());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize brand service
    brandService.initialize();
    
    // Update state with current brand configuration
    setBrand(brandService.getBrandedProps());
    setConfig(brandService.getWhiteLabelConfig());
    setIsLoading(false);
  }, []);

  const updateBrand = (updates: Partial<BrandConfig>): boolean => {
    const success = brandService.updateBrandConfig(updates);
    if (success) {
      setBrand(brandService.getBrandedProps());
      setConfig(brandService.getWhiteLabelConfig());
    }
    return success;
  };

  return {
    brand,
    config,
    updateBrand,
    isLoading
  };
}

// Hook for accessing specific brand elements
export function useBrandElement<T extends keyof ReturnType<typeof brandService.getBrandedProps>>(
  element: T
): ReturnType<typeof brandService.getBrandedProps>[T] {
  const { brand } = useBrand();
  return brand[element];
}

// Hook for feature flags
export function useFeatureFlag(flag: keyof BrandConfig['features']): boolean {
  const { config } = useBrand();
  return config.features[flag];
}

// Hook for brand colors (useful for dynamic styling)
export function useBrandColors() {
  const { brand } = useBrand();
  return brand.colors;
}

// Hook for contact information
export function useContactInfo() {
  const { brand } = useBrand();
  return brand.contact;
}

// Hook for legal information
export function useLegalInfo() {
  const { brand } = useBrand();
  return brand.legal;
}