# White Label Configuration Guide

This guide explains how to configure the Privacy Self-Service Portal for white label deployment.

## Overview

The platform supports complete white labelling through environment variables and configuration files, allowing partners to:

- Customize branding (name, logo, colors, tagline)
- Configure contact information
- Set legal entity information
- Enable/disable features
- Add custom CSS and JavaScript
- Customize social media links

## Quick Start

1. Copy `.env.example` to `.env`
2. Update the brand configuration variables
3. Replace logo files in `/public/logos/`
4. Build and deploy

## Brand Configuration

### Core Branding

```env
# Basic brand identity
VITE_BRAND_NAME=YourBrand
VITE_BRAND_FULL_NAME=YourBrand™ Privacy Portal
VITE_BRAND_TAGLINE=Privacy Portal
VITE_BRAND_DESCRIPTION=Your custom description

# Visual identity
VITE_BRAND_LOGO_PRIMARY=/logos/your-logo.png
VITE_BRAND_LOGO_ICON=/logos/your-icon.png
VITE_BRAND_LOGO_ALT=Your Brand Logo

# Color scheme (hex codes)
VITE_BRAND_PRIMARY_COLOR=#1E40AF
VITE_BRAND_ACCENT_COLOR=#1E3A8A
VITE_BRAND_BACKGROUND_COLOR=#F8FAFF
VITE_BRAND_TEXT_COLOR=#0B1220
```

### Contact Information

```env
# Support and contact details
VITE_SUPPORT_EMAIL=support@yourdomain.com
VITE_PRIVACY_EMAIL=privacy@yourdomain.com
VITE_LEGAL_EMAIL=legal@yourdomain.com
VITE_SUPPORT_PHONE=(555) 123-4567
VITE_COMPANY_ADDRESS=Your Address, City, State 12345
```

### Legal Information

```env
# Legal entity information
VITE_COMPANY_NAME=Your Company Name
VITE_COMPANY_COUNTRY=United States
VITE_COMPANY_STATE=Your State
```

### Social Media Links

```env
# Optional social media links
VITE_BRAND_WEBSITE=https://yourdomain.com
VITE_BRAND_TWITTER=https://twitter.com/yourbrand
VITE_BRAND_LINKEDIN=https://linkedin.com/company/yourbrand
```

### Feature Configuration

```env
# Feature flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_OFFLINE=true
VITE_ENABLE_PWA=true
VITE_ENABLE_SUPABASE=true
```

### Custom Styling

```env
# Custom CSS and JavaScript
VITE_ENABLE_CUSTOM_CSS=true
VITE_CUSTOM_CSS_URL=https://yourdomain.com/custom.css
VITE_CUSTOM_JS_URL=https://yourdomain.com/custom.js
```

## Logo Assets

Replace the following files in `/public/logos/`:

- `your-brand-logo.png` - Primary logo (recommended: 512x512px)
- `your-brand-icon.png` - App icon (recommended: 192x192px)

Or update the environment variables to point to your hosted logo URLs.

## Advanced Customization

### Custom CSS

Create a CSS file and host it publicly, then set:

```env
VITE_ENABLE_CUSTOM_CSS=true
VITE_CUSTOM_CSS_URL=https://yourdomain.com/brand-styles.css
```

Example custom CSS:

```css
/* Override primary colors */
:root {
  --cc-primary: 25 118 210; /* Your brand blue RGB */
  --cc-accent: 21 101 192;
  --cc-bg: 248 249 250;
}

/* Custom button styling */
.cc-btn {
  border-radius: 8px; /* More rounded */
  font-weight: 600;   /* Bolder text */
}

/* Custom brand elements */
.brand-header {
  background: linear-gradient(45deg, #your-color-1, #your-color-2);
}
```

### Runtime Configuration

The brand service allows runtime configuration changes:

```typescript
import { brandService } from './services/brandService';

// Update brand configuration at runtime
brandService.updateBrandConfig({
  name: 'New Brand Name',
  colors: {
    primary: '#FF0000',
    accent: '#FF3333',
    background: '#FFFFFF',
    text: '#000000'
  }
});
```

## Build Process

The platform includes brand validation during the build process:

1. `npm run prebuild` - Runs brand consistency checks
2. `npm run build` - Builds with current brand configuration
3. `npm run preview` - Preview with brand settings applied

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Logo files replaced/uploaded
- [ ] Custom CSS/JS uploaded (if used)
- [ ] Contact information updated
- [ ] Legal information reviewed
- [ ] Test all pages for brand consistency
- [ ] Verify email addresses work
- [ ] Test mobile responsiveness
- [ ] Check PWA functionality (if enabled)

## Validation

The platform automatically validates brand configuration:

- Email addresses must be valid
- Colors must be valid hex codes
- Required fields must be present
- Logo URLs must be accessible

## Support

For white label deployment support:

- Documentation: Check this guide and code comments
- Technical Issues: Review browser console for errors
- Configuration Problems: Validate environment variables

## Example Configurations

### Healthcare Organization

```env
VITE_BRAND_NAME=HealthGuard
VITE_BRAND_FULL_NAME=HealthGuard™ Privacy Portal
VITE_BRAND_TAGLINE=Health Data Privacy
VITE_BRAND_PRIMARY_COLOR=#2563EB
VITE_SUPPORT_EMAIL=privacy@healthguard.com
VITE_COMPANY_NAME=HealthGuard Systems Inc.
```

### Financial Services

```env
VITE_BRAND_NAME=FinSecure
VITE_BRAND_FULL_NAME=FinSecure™ Privacy Portal
VITE_BRAND_TAGLINE=Financial Privacy
VITE_BRAND_PRIMARY_COLOR=#059669
VITE_SUPPORT_EMAIL=privacy@finsecure.com
VITE_COMPANY_NAME=FinSecure Technologies LLC
```

### Technology Company

```env
VITE_BRAND_NAME=TechShield
VITE_BRAND_FULL_NAME=TechShield™ Privacy Portal
VITE_BRAND_TAGLINE=Data Protection
VITE_BRAND_PRIMARY_COLOR=#7C3AED
VITE_SUPPORT_EMAIL=privacy@techshield.com
VITE_COMPANY_NAME=TechShield Corporation
```

## Migration from Existing Brand

If migrating from existing CyberCorrect deployment:

1. Export current configuration:
   ```typescript
   const currentConfig = brandService.exportConfiguration();
   ```

2. Update environment variables with new brand details

3. Test thoroughly before production deployment

4. Update any external integrations with new contact details

## Troubleshooting

### Brand Not Updating
- Clear browser cache and localStorage
- Verify environment variables are properly set
- Check browser console for validation errors

### Logo Not Loading
- Verify logo file paths and URLs
- Check file permissions and accessibility
- Ensure proper alt text is configured

### Custom CSS Not Applied
- Verify VITE_ENABLE_CUSTOM_CSS=true
- Check CSS URL accessibility
- Review browser console for CSS errors

### Email Links Not Working
- Verify all email addresses are valid
- Test mailto: links in different browsers
- Check spam filters for automated emails