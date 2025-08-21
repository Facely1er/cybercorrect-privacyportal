# Production Deployment Guide

This guide covers the complete process for deploying the Privacy Self-Service Portal to production.

## Pre-Deployment Checklist

### Environment Setup
- [ ] Environment variables configured in `.env`
- [ ] Supabase project created and configured
- [ ] Database migrations applied
- [ ] SSL certificates configured
- [ ] Domain DNS configured
- [ ] CDN configured (if applicable)

### Security Checklist
- [ ] Security headers configured in deployment platform
- [ ] Content Security Policy (CSP) properly set
- [ ] HTTPS enforced
- [ ] Sensitive data not exposed in client-side code
- [ ] API keys and secrets properly secured
- [ ] Rate limiting configured
- [ ] CORS properly configured

### Performance Checklist
- [ ] Bundle size optimized (< 1MB for main bundle)
- [ ] Images optimized and properly sized
- [ ] Fonts optimized
- [ ] Caching headers configured
- [ ] Compression enabled (gzip/brotli)
- [ ] Critical resources preloaded

### Quality Assurance
- [ ] All tests passing
- [ ] Accessibility tests passed (WCAG 2.1 AA)
- [ ] Performance tests passed (Lighthouse score > 80)
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified
- [ ] Brand customization working correctly

## Deployment Platforms

### Netlify Deployment

#### Prerequisites
```bash
npm install -g netlify-cli
netlify login
```

#### Manual Deployment
```bash
# Build the application
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### Environment Variables (Netlify)
Configure in Netlify Dashboard > Site Settings > Environment Variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_URL=https://yourdomain.com
VITE_ENVIRONMENT=production
# Add all other brand customization variables
```

### Vercel Deployment

#### Prerequisites
```bash
npm install -g vercel
vercel login
```

#### Manual Deployment
```bash
# Build and deploy
vercel --prod
```

#### Environment Variables (Vercel)
Configure in Vercel Dashboard > Project Settings > Environment Variables.

### Custom Server Deployment

#### Using Docker
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Using Traditional Server
```bash
# On your server
git clone <repository-url>
cd <project-directory>
npm ci
npm run build

# Serve with nginx, apache, or your preferred web server
```

## Environment Configuration

### Required Environment Variables

```env
# Core Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_URL=https://yourdomain.com
VITE_ENVIRONMENT=production

# Brand Customization
VITE_BRAND_NAME=YourBrand
VITE_BRAND_FULL_NAME=YourBrand™ Privacy Portal
VITE_BRAND_TAGLINE=Privacy Portal
VITE_BRAND_DESCRIPTION=Your custom description

# Contact Information
VITE_SUPPORT_EMAIL=support@yourdomain.com
VITE_PRIVACY_EMAIL=privacy@yourdomain.com
VITE_LEGAL_EMAIL=legal@yourdomain.com
VITE_SUPPORT_PHONE=(555) 123-4567
VITE_COMPANY_ADDRESS=Your Address, City, State 12345

# Legal Information
VITE_COMPANY_NAME=Your Company Name
VITE_COMPANY_COUNTRY=United States
VITE_COMPANY_STATE=Your State

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_OFFLINE=true
VITE_ENABLE_PWA=true
VITE_ENABLE_SUPABASE=true
```

### Optional Environment Variables

```env
# Monitoring and Analytics
VITE_SENTRY_DSN=your-sentry-dsn
VITE_GA_TRACKING_ID=your-ga-tracking-id
VITE_POSTHOG_API_KEY=your-posthog-api-key

# Customization
VITE_ENABLE_CUSTOM_CSS=true
VITE_CUSTOM_CSS_URL=https://yourdomain.com/custom.css
VITE_CUSTOM_JS_URL=https://yourdomain.com/custom.js

# Social Media
VITE_BRAND_WEBSITE=https://yourdomain.com
VITE_BRAND_TWITTER=https://twitter.com/yourbrand
VITE_BRAND_LINKEDIN=https://linkedin.com/company/yourbrand
```

## Database Setup (Supabase)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### 2. Run Migrations
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 3. Configure Row Level Security (RLS)
Ensure RLS is enabled for all tables containing sensitive data.

## SSL Configuration

### Automatic SSL (Recommended)
- Netlify: Automatic with Let's Encrypt
- Vercel: Automatic SSL
- Cloudflare: Automatic with Cloudflare SSL

### Manual SSL Configuration
If using custom server:
```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    
    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

## Monitoring Setup

### Error Monitoring
1. Set up Sentry account
2. Configure `VITE_SENTRY_DSN` environment variable
3. Monitor error rates and performance

### Analytics
1. Configure Google Analytics or PostHog
2. Set appropriate environment variables
3. Ensure GDPR compliance

### Uptime Monitoring
1. Set up uptime monitoring (UptimeRobot, Pingdom, etc.)
2. Monitor key endpoints:
   - `/` (homepage)
   - `/privacy` (privacy portal)
   - `/data-rights` (data rights page)

## Performance Optimization

### CDN Configuration
- Use CDN for static assets
- Configure proper cache headers
- Enable compression (gzip/brotli)

### Caching Strategy
```
HTML files: no-cache
JS/CSS files: 1 year cache with hash-based versioning
Images: 1 year cache
Fonts: 1 year cache
```

### Bundle Analysis
```bash
# Analyze bundle size
npm run build:analyze

# Check for unused code
npx webpack-bundle-analyzer dist/stats.html
```

## Security Hardening

### Content Security Policy
Ensure CSP headers are properly configured in your deployment platform.

### Security Headers
Verify all security headers are set:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

### Rate Limiting
Implement rate limiting at the CDN/proxy level:
- API requests: 100 requests per 15 minutes per IP
- Form submissions: 5 requests per minute per IP

## Backup and Recovery

### Database Backups
- Supabase: Automatic daily backups (paid plans)
- Manual exports: Use Supabase dashboard or CLI

### Code Backups
- Git repository with proper branching strategy
- Regular releases tagged in Git
- Build artifacts stored in CI/CD

### Disaster Recovery Plan
1. Database restore from Supabase backup
2. Deploy latest stable release
3. Update DNS if necessary
4. Verify all services are operational

## Post-Deployment Verification

### Health Checks
```bash
# Basic availability
curl -f https://yourdomain.com

# API endpoints
curl -f https://yourdomain.com/privacy
curl -f https://yourdomain.com/data-rights

# Health check endpoint (if implemented)
curl -f https://yourdomain.com/health
```

### Performance Verification
- Run Lighthouse audit
- Check Core Web Vitals
- Verify page load times < 3 seconds

### Security Verification
- SSL Labs test: https://www.ssllabs.com/ssltest/
- Security headers test: https://securityheaders.com/
- OWASP ZAP scan

### Functionality Testing
- Test key user flows
- Verify form submissions
- Check email notifications
- Test mobile responsiveness

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and rebuild
npm run clean
npm ci
npm run build
```

#### Environment Variable Issues
- Verify all required variables are set
- Check variable naming (VITE_ prefix required)
- Ensure no sensitive data in client-side variables

#### Performance Issues
- Check bundle size
- Analyze network waterfall
- Verify CDN configuration
- Check for memory leaks

#### Database Connection Issues
- Verify Supabase URL and key
- Check RLS policies
- Monitor connection limits

### Support Contacts
- Technical Support: support@cybercorrect.com
- Security Issues: security@cybercorrect.com
- General Inquiries: info@cybercorrect.com

## Maintenance

### Regular Tasks
- Monitor error rates and performance
- Update dependencies monthly
- Review security advisories
- Check SSL certificate expiration
- Monitor database usage and performance

### Updates and Patches
- Test updates in staging environment
- Use blue-green deployment for zero downtime
- Maintain rollback capability
- Document all changes

### Scaling Considerations
- Monitor traffic patterns
- Plan for peak usage periods
- Consider CDN optimization
- Database connection pooling
- Horizontal scaling if needed