import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Building, 
  Users, 
  Shield,
  BarChart3,
  Settings,
  HelpCircle,
  Eye,
  UserCheck,
  ChevronDown,
  ChevronRight,
  Zap,
  Mail,
  Phone,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useBrand } from '../../hooks/useBrand';

interface SidebarSection {
  id: string;
  title: string;
  icon: React.ElementType;
  items: SidebarItem[];
  defaultExpanded?: boolean;
}

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  description: string;
  badge?: {
    text: string;
    variant: 'default' | 'success' | 'warning' | 'error';
  };
  subItems?: {
    title: string;
    href: string;
    description: string;
  }[];
}

export function PrivacyPortalSidebar() {
  const location = useLocation();
  const { brand } = useBrand();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'core': true,
    'management': true,
    'analytics': false,
    'support': false
  });
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const sidebarSections: SidebarSection[] = [
    {
      id: 'core',
      title: 'Core Privacy Tools',
      icon: Shield,
      defaultExpanded: true,
      items: [
        {
          title: 'Privacy Dashboard',
          href: '/privacy',
          icon: LayoutDashboard,
          description: 'Overview of privacy compliance status'
        },
        {
          title: 'Data Rights Portal',
          href: '/privacy/data-rights',
          icon: FileText,
          description: 'Manage data subject access requests',
          subItems: [
            { title: 'Submit Request', href: '/privacy/data-rights?tab=submit', description: 'Submit new data rights request' },
            { title: 'Track Requests', href: '/privacy/data-rights?tab=requests', description: 'Monitor request status' },
            { title: 'Request Help', href: '/privacy/data-rights?tab=help', description: 'Get help with requests' }
          ]
        },
        {
          title: 'Compliance Obligations',
          href: '/privacy/obligations',
          icon: CheckCircle,
          description: 'Track regulatory compliance requirements',
          badge: { text: '8', variant: 'warning' },
          subItems: [
            { title: 'View Calendar', href: '/privacy/obligations?tab=calendar', description: 'Calendar view of deadlines' },
            { title: 'All Obligations', href: '/privacy/obligations?tab=obligations', description: 'Complete list of obligations' },
            { title: 'Automation Setup', href: '/privacy/obligations?tab=automation', description: 'Configure automated reminders' }
          ]
        }
      ]
    },
    {
      id: 'management',
      title: 'Privacy Management',
      icon: Settings,
      defaultExpanded: true,
      items: [
        {
          title: 'Privacy Incidents',
          href: '/privacy/incidents',
          icon: AlertTriangle,
          description: 'Report and manage privacy incidents',
          badge: { text: '2', variant: 'error' },
          subItems: [
            { title: 'Report Incident', href: '/privacy/incidents?tab=report', description: 'Report new privacy incident' },
            { title: 'All Incidents', href: '/privacy/incidents?tab=incidents', description: 'View all incidents' },
            { title: 'Response Plan', href: '/privacy/incidents?tab=response', description: 'Incident response procedures' }
          ]
        },
        {
          title: 'Vendor Assessments',
          href: '/privacy/vendors',
          icon: Building,
          description: 'Evaluate third-party privacy compliance',
          badge: { text: '5', variant: 'warning' },
          subItems: [
            { title: 'All Vendors', href: '/privacy/vendors?tab=vendors', description: 'View vendor assessments' },
            { title: 'Assessment Templates', href: '/privacy/vendors?tab=assessments', description: 'Assessment forms and templates' },
            { title: 'Compliance Status', href: '/privacy/vendors?tab=compliance', description: 'Vendor compliance overview' }
          ]
        },
        {
          title: 'Consent Management',
          href: '/privacy/consent',
          icon: Users,
          description: 'Track parental consent and preferences',
          subItems: [
            { title: 'Consent Records', href: '/privacy/consent?tab=consent', description: 'View all consent records' },
            { title: 'Consent Forms', href: '/privacy/consent?tab=forms', description: 'Manage consent form templates' },
            { title: 'Renewals', href: '/privacy/consent?tab=renewal', description: 'Handle consent renewals' }
          ]
        },
        {
          title: 'Stakeholder Management',
          href: '/privacy/stakeholders',
          icon: Users,
          description: 'Manage stakeholder access and permissions',
          subItems: [
            { title: 'Access Control', href: '/privacy/stakeholders?tab=access', description: 'Manage user permissions' },
            { title: 'User Permissions', href: '/privacy/stakeholders?tab=permissions', description: 'Configure permission groups' },
            { title: 'Activity Logs', href: '/privacy/stakeholders?tab=activity', description: 'View access activity' }
          ]
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Automation',
      icon: BarChart3,
      defaultExpanded: false,
      items: [
        {
          title: 'Privacy Analytics',
          href: '/privacy/analytics',
          icon: BarChart3,
          description: 'View insights and metrics',
          subItems: [
            { title: 'Performance Metrics', href: '/privacy/analytics#metrics', description: 'Key performance indicators' },
            { title: 'Compliance Trends', href: '/privacy/analytics#trends', description: 'Compliance score trends' },
            { title: 'Export Data', href: '/privacy/analytics#export', description: 'Export analytics data' }
          ]
        },
        {
          title: 'Compliance Reports',
          href: '/privacy/reports',
          icon: FileText,
          description: 'Generate compliance reports',
          subItems: [
            { title: 'Generate Report', href: '/privacy/reports#generate', description: 'Create new compliance report' },
            { title: 'Report History', href: '/privacy/reports#history', description: 'View previous reports' },
            { title: 'Schedule Reports', href: '/privacy/reports#schedule', description: 'Automate report generation' }
          ]
        },
        {
          title: 'Automation',
          href: '/privacy/automation',
          icon: Zap,
          description: 'Configure compliance automation',
          subItems: [
            { title: 'Automation Rules', href: '/privacy/automation#rules', description: 'Manage automation rules' },
            { title: 'Workflows', href: '/privacy/automation#workflows', description: 'Configure workflows' },
            { title: 'Notifications', href: '/privacy/automation#notifications', description: 'Setup notifications' }
          ]
        }
      ]
    },
    {
      id: 'support',
      title: 'Support & Resources',
      icon: HelpCircle,
      defaultExpanded: false,
      items: [
        {
          title: 'Help Documentation',
          href: '/faq',
          icon: HelpCircle,
          description: 'Frequently asked questions'
        },
        {
          title: 'Contact Support',
          href: '/contact',
          icon: Mail,
          description: 'Get help from our team'
        }
      ]
    }
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSection = (sectionId: string) => {
    if (!isCollapsed) {
      setExpandedSections(prev => ({
        ...prev,
        [sectionId]: !prev[sectionId]
      }));
    }
  };

  const toggleItem = (itemHref: string) => {
    if (!isCollapsed) {
      setExpandedItems(prev => ({
        ...prev,
        [itemHref]: !prev[itemHref]
      }));
    }
  };

  const isActive = (href: string) => {
    // Special handling for the root privacy dashboard
    if (href === '/privacy') {
      return location.pathname === '/privacy' || location.pathname === '/privacy/dashboard';
    }
    
    return location.pathname === href ||
           (href !== '/privacy/dashboard' && location.pathname.startsWith(href));
  };

  return (
    <div className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    } overflow-y-auto flex-shrink-0`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <img 
                src={brand.logo.icon} 
                alt={brand.logo.alt} 
                className="h-6 w-6"
              />
              <div>
                <h2 className="font-bold text-sm">Privacy Portal</h2>
                <p className="text-xs text-muted-foreground">Self-Service Compliance</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="p-1.5 h-auto"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className={`p-4 ${isCollapsed ? 'px-2' : ''}`}>
        <nav className="space-y-4">
          {sidebarSections.map((section) => {
            const SectionIcon = section.icon;
            const isSectionExpanded = expandedSections[section.id];
            
            return (
              <div key={section.id} className="space-y-1">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`flex items-center w-full p-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    isCollapsed ? 'justify-center' : 'justify-between'
                  }`}
                  title={isCollapsed ? section.title : undefined}
                >
                  <div className="flex items-center gap-2">
                    <SectionIcon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && <span className="truncate">{section.title}</span>}
                  </div>
                  {!isCollapsed && (
                    isSectionExpanded ? (
                      <ChevronDown className="h-3 w-3 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-3 w-3 flex-shrink-0" />
                    )
                  )}
                </button>

                {/* Section Items */}
                {(isSectionExpanded || isCollapsed) && (
                  <div className={`space-y-1 ${isCollapsed ? '' : 'ml-2'}`}>
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);
                      const hasSubItems = item.subItems && item.subItems.length > 0;
                      const itemExpanded = expandedItems[item.href];
                      
                      return (
                        <div key={item.href} className="space-y-1">
                          <div className="flex items-center">
                            <Link
                              to={item.href}
                              className={`flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors flex-1 min-w-0 ${
                                active
                                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                              } ${isCollapsed ? 'justify-center' : ''}`}
                              title={isCollapsed ? `${item.title}: ${item.description}` : undefined}
                            >
                              <Icon className="h-4 w-4 flex-shrink-0" />
                              {!isCollapsed && (
                                <>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium truncate">{item.title}</div>
                                    <div className="text-xs opacity-75 truncate">{item.description}</div>
                                  </div>
                                  {item.badge && (
                                    <Badge 
                                      variant={item.badge.variant === 'error' ? 'error' : item.badge.variant === 'warning' ? 'warning' : 'info'}
                                      className="text-xs flex-shrink-0"
                                    >
                                      {item.badge.text}
                                    </Badge>
                                  )}
                                </>
                              )}
                            </Link>
                            
                            {hasSubItems && !isCollapsed && (
                              <button
                                onClick={() => toggleItem(item.href)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors flex-shrink-0"
                                title={`${itemExpanded ? 'Collapse' : 'Expand'} ${item.title} submenu`}
                              >
                                {itemExpanded ? (
                                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                )}
                              </button>
                            )}
                          </div>

                          {/* Sub-items */}
                          {hasSubItems && itemExpanded && !isCollapsed && (
                            <div className="ml-6 space-y-1">
                              {item.subItems!.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  to={subItem.href}
                                  className="flex items-start gap-2 px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                  title={subItem.description}
                                >
                                  <div className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <div className="font-medium truncate">{subItem.title}</div>
                                    <div className="text-xs opacity-75 truncate">{subItem.description}</div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {!isCollapsed && (
          <>
            {/* Quick Access */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-medium text-sm mb-4">Quick Access</h3>
              <div className="space-y-2">
                <Link to="/data-rights" className="block">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Exercise Data Rights
                  </Button>
                </Link>
                <Link to="/stakeholder-duties" className="block">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <UserCheck className="h-4 w-4 mr-2" />
                    View My Duties
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-medium text-sm mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Compliance Score</span>
                  <span className="font-medium text-green-600">78%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Open Requests</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Active Incidents</span>
                  <span className="font-medium text-amber-600">2</span>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-medium text-sm mb-4">Privacy Support</h3>
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span>{brand.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{brand.contact.privacyEmail}</span>
                  </div>
                </div>
                <Link to="/contact">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Privacy Portal Help
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Collapsed State - Show only essential icons */}
        {isCollapsed && (
          <div className="mt-8 pt-6 border-t space-y-3">
            <Link 
              to="/data-rights" 
              className="flex justify-center"
              title="Exercise Data Rights"
            >
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
            <Link 
              to="/stakeholder-duties" 
              className="flex justify-center"
              title="View My Duties"
            >
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <UserCheck className="h-4 w-4" />
              </Button>
            </Link>
            <Link 
              to="/contact" 
              className="flex justify-center"
              title="Contact Support"
            >
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}