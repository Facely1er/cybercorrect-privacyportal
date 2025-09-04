# Production Deployment Guide

This guide covers the complete process for deploying the Privacy Self-Service Portal to production.

## Pre-Deployment Checklist

### 1. Environment Configuration

Create a `.env` file with the following required variables:

```bash
# Copy the example file
cp .env.example .env

# Edit with your production values
VITE_APP_URL=https://your-domain.com
VITE_ENVIRONMENT=production
VITE_APP_NAME=Your Privacy Portal
VITE_COMPANY_NAME=Your Company

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional: Analytics and Monitoring
VITE_ANALYTICS_ID=your-analytics-id
VITE_SENTRY_DSN=your-sentry-dsn
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_REPORTING=true
```

### 2. Security Configuration

- [ ] Update Content Security Policy headers in `netlify.toml` or `vercel.json`
- [ ] Configure CORS settings for your domain
- [ ] Set up SSL/TLS certificates
- [ ] Configure rate limiting
- [ ] Set up DDoS protection

### 3. Database Setup

- [ ] Configure Supabase production database
- [ ] Set up Row Level Security (RLS) policies
- [ ] Configure database backups
- [ ] Set up monitoring for database performance

### 4. Monitoring Setup

- [ ] Configure error reporting (Sentry, etc.)
- [ ] Set up analytics tracking
- [ ] Configure uptime monitoring
- [ ] Set up log aggregation
- [ ] Configure alerting for critical issues

## Deployment Process

### Option 1: Automated Deployment (Recommended)

```bash
# Run the complete optimization and deployment process
npm run build:deploy
```

This command will:
1. Validate environment variables
2. Run type checking and linting
3. Build the application for production
4. Analyze bundle size and performance
5. Run security checks
6. Generate sitemap and build report
7. Optimize assets

### Option 2: Manual Deployment

```bash
# 1. Install dependencies
npm ci

# 2. Run type checking
npm run type-check

# 3. Run linting
npm run lint

# 4. Build for production
npm run build:prod

# 5. Test the build locally
npm run preview

# 6. Deploy to your hosting platform
# (Follow your hosting platform's deployment instructions)
```

## Hosting Platform Configurations

### Netlify

The `netlify.toml` file is already configured with:
- Security headers
- Cache control
- Redirects for SPA routing
- Build settings

Deploy by connecting your Git repository to Netlify or using the Netlify CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Vercel

The `vercel.json` file is already configured with:
- Security headers
- Cache control
- Rewrites for SPA routing

Deploy using the Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Other Platforms

For other hosting platforms, ensure you configure:
1. Security headers (see `netlify.toml` or `vercel.json` for reference)
2. SPA routing redirects
3. Cache control for static assets
4. HTTPS enforcement

## Post-Deployment Verification

### 1. Health Check

```bash
# Check if the application is running
curl -f https://your-domain.com/api/health.json
```

### 2. Security Headers

Verify security headers are properly set:

```bash
curl -I https://your-domain.com
```

Look for:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `Content-Security-Policy: ...`

### 3. Performance Testing

Test the application performance:

```bash
# Using Lighthouse CLI
npm install -g lighthouse
lighthouse https://your-domain.com --output=html --output-path=./lighthouse-report.html

# Using PageSpeed Insights
# Visit: https://pagespeed.web.dev/
```

### 4. Functionality Testing

- [ ] Test all major user flows
- [ ] Verify authentication works
- [ ] Test form submissions
- [ ] Check error handling
- [ ] Verify responsive design
- [ ] Test accessibility features

## Monitoring and Maintenance

### 1. Error Monitoring

Monitor errors in production:
- Check error reporting dashboard
- Set up alerts for critical errors
- Review error logs regularly

### 2. Performance Monitoring

Monitor application performance:
- Track Core Web Vitals
- Monitor bundle size
- Check loading times
- Monitor API response times

### 3. Security Monitoring

- Monitor for security vulnerabilities
- Check for suspicious activity
- Review access logs
- Update dependencies regularly

### 4. Regular Maintenance

- [ ] Update dependencies monthly
- [ ] Review and update security headers
- [ ] Monitor and optimize performance
- [ ] Backup database regularly
- [ ] Review and update documentation

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables
   - Verify all dependencies are installed
   - Check for TypeScript errors
   - Review linting errors

2. **Runtime Errors**
   - Check browser console for errors
   - Review error reporting dashboard
   - Verify API endpoints are accessible
   - Check CORS configuration

3. **Performance Issues**
   - Analyze bundle size
   - Check for memory leaks
   - Review network requests
   - Optimize images and assets

4. **Security Issues**
   - Verify security headers
   - Check for exposed secrets
   - Review access controls
   - Update vulnerable dependencies

### Getting Help

- Check the application logs
- Review the error reporting dashboard
- Consult the troubleshooting section in the README
- Contact the development team

## Rollback Plan

If issues arise after deployment:

1. **Immediate Rollback**
   - Revert to previous deployment
   - Check health status
   - Notify users if necessary

2. **Investigation**
   - Review error logs
   - Identify the root cause
   - Fix the issue

3. **Re-deployment**
   - Test the fix locally
   - Deploy the fix
   - Monitor for stability

## Security Considerations

### Data Protection

- All data is encrypted in transit (HTTPS)
- Sensitive data is encrypted at rest
- Regular security audits
- Compliance with privacy regulations

### Access Control

- Role-based access control
- Multi-factor authentication
- Regular access reviews
- Audit logging

### Infrastructure Security

- Regular security updates
- Network security monitoring
- DDoS protection
- Backup and disaster recovery

---

For additional support or questions, please refer to the main README or contact the development team.