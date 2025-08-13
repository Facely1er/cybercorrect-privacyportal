import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const location = useLocation();
  
  // Generate breadcrumbs from current path if no items provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const generatedItems = [{ label: 'Home', href: '/' }];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      // Build current path
      currentPath += `/${segment}`;
      
      // Convert segment to readable label
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      if (segment === 'assessments') label = 'Assessments';
      if (segment === 'administrator') label = 'Administrator';
      if (segment === 'teacher') label = 'Teacher';
      if (segment === 'it-staff') label = 'IT Staff';
      if (segment === 'student') label = 'Student';
      if (segment === 'dashboard') label = 'Dashboard';
      if (segment === 'resources') label = 'Resources';
      if (segment === 'training') label = 'Professional Guides';
      if (segment === 'contact') label = 'Contact';
      if (segment === 'role') label = 'Role Hub';
      if (segment === 'integration') label = 'Integration';
      if (segment === 'faq') label = 'FAQ';
      if (segment === 'learning-paths') label = 'Learning Paths';
      if (segment === 'privacy') label = 'Privacy Portal';
      if (segment === 'data-rights') label = 'Data Rights';
      if (segment === 'obligations') label = 'Compliance Obligations';
      if (segment === 'incidents') label = 'Privacy Incidents';
      if (segment === 'vendors') label = 'Vendor Assessments';
      if (segment === 'consent') label = 'Consent Management';
      if (segment === 'stakeholders') label = 'Stakeholder Management';
      if (segment === 'automation') label = 'Automation';
      if (segment === 'analytics') label = 'Analytics';
      if (segment === 'reports') label = 'Reports';
      if (segment === 'privacy-regulations') label = 'Privacy Regulations';
      if (segment === 'professional-guides') label = 'Professional Guides';
      if (segment === 'tools-templates') label = 'Tools & Templates';
      
      // Special handling for assessment role pages
      let href = index === pathSegments.length - 1 ? undefined : currentPath;
      
      // Special handling for "assessments" segment - always link to /assessment (singular)
      if (segment === 'assessments') {
        href = '/assessment';
      }
      
      // If this is a role segment and the previous segment was 'assessment' (singular)
      // redirect to the correct assessments (plural) page
      else if (index > 0 && pathSegments[index - 1] === 'assessment' && 
          ['administrator', 'teacher', 'it-staff', 'student'].includes(segment)) {
        href = `/assessments/${segment}`;
      }
      
      // Special handling for "role" segment - always link to dashboard
      else if (segment === 'role') {
        href = '/dashboard';
      }
      
      generatedItems.push({
        label,
        href
      });
    });
    
    return generatedItems;
  };

  let breadcrumbItems = items || generateBreadcrumbs();
  breadcrumbItems = breadcrumbItems.map(item => {
    // Process role pages and convert to human-readable format
    if (item.label.toLowerCase() === 'role') {
      return { ...item, label: 'Role Hub', href: '/dashboard' };
    }
    
    // Convert role IDs to user-friendly names in breadcrumb labels
    if (item.href?.startsWith('/role/')) {
      let roleLabel = item.label;
      
      // Capitalize role name and replace hyphens with spaces
      roleLabel = roleLabel.charAt(0).toUpperCase() + roleLabel.slice(1);
      roleLabel = roleLabel.replace(/-/g, ' ');
      
      return { ...item, label: roleLabel };
    }
    
    return item;
  });

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {item.href ? (
            <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link 
                to={item.href} 
                className="hover:text-foreground transition-colors flex items-center"
                itemProp="item"
              >
                {index === 0 && <Home className="h-4 w-4 mr-1" />}
                <span itemProp="name">{item.label}</span>
              </Link>
              <meta itemProp="position" content={String(index + 1)} />
            </span>
          ) : (
            <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-foreground font-medium flex items-center" itemProp="name">
                {index === 0 && <Home className="h-4 w-4 mr-1" />}
                {item.label}
              </span>
              <meta itemProp="position" content={String(index + 1)} />
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}