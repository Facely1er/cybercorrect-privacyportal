import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield,
  FileText,
  Users,
  Building,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  TrendingUp,
  ArrowRight,
  Calendar,
  Database,
  Lock,
  Eye,
  Info,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { northAmericanRegulations } from '../../data/northAmericanRegulations';
import { DataExportImport } from '../../components/common/DataExportImport';
import { localStorageService } from '../../services/localStorageService';

export function PrivacyDashboardPage() {
  // Get real data from localStorage
  const dataRightsRequests = localStorageService.getDataRightsRequests();
  const privacyIncidents = localStorageService.getPrivacyIncidents();
  const vendorAssessments = localStorageService.getVendorAssessments();
  const consentRecords = localStorageService.getConsentRecords();
  const complianceObligations = localStorageService.getComplianceObligations();
  
  const dashboardMetrics = {
    overallComplianceScore: complianceObligations.length > 0 
      ? Math.round(complianceObligations.filter(o => o.status === 'completed').length / complianceObligations.length * 100)
      : 0,
    activeDataSubjectRequests: dataRightsRequests.filter(r => r.status !== 'completed').length,
    openPrivacyIncidents: privacyIncidents.filter(i => i.status !== 'resolved').length,
    vendorsUnderReview: vendorAssessments.filter(v => v.complianceStatus === 'review_needed').length,
    complianceObligationsDue: complianceObligations.filter(o => o.status === 'pending').length,
    dataProcessingActivities: vendorAssessments.length,
    consentRecords: consentRecords.length,
    stakeholdersWithAccess: 1 // This would come from user management system
  };

  const complianceByRegulation = [
    { regulation: 'ferpa', score: 85, trend: '+5%', color: 'blue' },
    { regulation: 'coppa', score: 72, trend: '+3%', color: 'amber' },
    { regulation: 'ccpa', score: 68, trend: '+12%', color: 'purple' },
    { regulation: 'shield', score: 91, trend: '+2%', color: 'slate' },
    { regulation: 'bipa', score: 45, trend: '-8%', color: 'emerald' }
  ];

  // Calculate upcoming deadlines from compliance obligations
  const upcomingDeadlines = complianceObligations
    .filter(o => o.dueDate && o.status !== 'completed')
    .map(o => {
      const dueDate = new Date(o.dueDate);
      const now = new Date();
      const daysUntil = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        title: o.title || 'Compliance Obligation',
        regulation: o.regulation || 'general',
        dueDate: o.dueDate,
        daysUntil,
        priority: daysUntil < 30 ? 'critical' : daysUntil < 60 ? 'high' : 'medium'
      };
    })
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 4);

  // Generate recent activity from actual data
  const recentActivity = [
    ...dataRightsRequests.slice(0, 2).map(req => ({
      type: 'data_request',
      title: `Data ${req.type} Request`,
      description: `Request for ${req.studentName || 'student records'}`,
      timestamp: formatTimestamp(req.submittedAt),
      status: req.status
    })),
    ...privacyIncidents.slice(0, 2).map(incident => ({
      type: 'incident',
      title: incident.title,
      description: incident.description,
      timestamp: formatTimestamp(incident.discoveryDate),
      status: incident.status
    })),
    ...vendorAssessments.slice(0, 1).map(vendor => ({
      type: 'vendor',
      title: `${vendor.vendorName} Assessment`,
      description: `Compliance assessment updated`,
      timestamp: formatTimestamp(vendor.lastAssessmentDate),
      status: vendor.complianceStatus
    }))
  ].slice(0, 4);

  // Generate alerts from real data
  const alertsAndNotifications = [
    ...vendorAssessments
      .filter(v => v.riskLevel === 'high' || v.complianceStatus === 'non_compliant')
      .slice(0, 1)
      .map(v => ({
        type: 'critical',
        title: `${v.vendorName} Requires Review`,
        description: `Vendor scored ${v.assessmentScore}/100 on privacy assessment`,
        action: 'Review vendor assessment'
      })),
    ...upcomingDeadlines
      .filter(d => d.daysUntil < 30)
      .slice(0, 1)
      .map(d => ({
        type: 'warning',
        title: 'Upcoming Compliance Deadline',
        description: `${d.title} due in ${d.daysUntil} days`,
        action: 'View obligations'
      })),
    ...privacyIncidents
      .filter(i => i.status === 'in_progress')
      .slice(0, 1)
      .map(i => ({
        type: 'info',
        title: 'Active Privacy Incident',
        description: i.title,
        action: 'View incident details'
      }))
  ].slice(0, 3);

  function formatTimestamp(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  }

  const quickActions = [
    {
      title: 'Submit Data Rights Request',
      description: 'Process access, deletion, or correction requests',
      icon: <FileText className="h-6 w-6" />,
      link: '/privacy/data-rights',
      color: 'blue'
    },
    {
      title: 'Report Privacy Incident',
      description: 'Report data breaches or privacy violations',
      icon: <AlertTriangle className="h-6 w-6" />,
      link: '/privacy/incidents',
      color: 'red'
    },
    {
      title: 'Assess New Vendor',
      description: 'Evaluate third-party privacy compliance',
      icon: <Building className="h-6 w-6" />,
      link: '/privacy/vendors',
      color: 'green'
    },
    {
      title: 'Manage Consent Records',
      description: 'Track and update consent documentation',
      icon: <Users className="h-6 w-6" />,
      link: '/privacy/consent',
      color: 'purple'
    },
    {
      title: 'Stakeholder Management',
      description: 'Manage portal access and permissions',
      icon: <Users className="h-6 w-6" />,
      link: '/privacy/stakeholders',
      color: 'indigo'
    },
    {
      title: 'Automation & Analytics',
      description: 'Configure automation and view insights',
      icon: <BarChart3 className="h-6 w-6" />,
      link: '/privacy/analytics',
      color: 'cyan'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 dark:text-red-400';
      case 'high':
        return 'text-orange-600 dark:text-orange-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDaysUntil = (days: number) => {
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days < 30) return `${days} days`;
    if (days < 365) return `${Math.round(days / 30)} months`;
    return `${Math.round(days / 365)} years`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Privacy Management Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive privacy compliance management for your educational institution
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {dashboardMetrics.overallComplianceScore}%
            </span>
          </div>
          <h3 className="font-semibold mb-1">Compliance Score</h3>
          <p className="text-sm text-muted-foreground">Overall privacy compliance</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-2xl font-bold">{dashboardMetrics.activeDataSubjectRequests}</span>
          </div>
          <h3 className="font-semibold mb-1">Data Rights Requests</h3>
          <p className="text-sm text-muted-foreground">Active requests</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
              {dashboardMetrics.openPrivacyIncidents}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Open Incidents</h3>
          <p className="text-sm text-muted-foreground">Require attention</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Building className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {dashboardMetrics.vendorsUnderReview}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Vendors Under Review</h3>
          <p className="text-sm text-muted-foreground">Privacy assessments needed</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:border-primary-500 transition-colors"
                  title={`${action.title}: ${action.description}`}
                >
                  <div className={`p-3 bg-${action.color}-100 dark:bg-${action.color}-900/30 rounded-lg`}>
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Need help getting started with privacy management?
              </p>
              <div className="flex flex-wrap gap-2">
                <Link to="/how-it-works" title="Learn about our privacy management approach">
                  <Button variant="outline" size="sm">
                    How it works
                  </Button>
                </Link>
                <Link to="/training" title="Access privacy training modules">
                  <Button variant="outline" size="sm">
                    Training guides
                  </Button>
                </Link>
                <Link to="/resources" title="Download privacy policy templates and tools">
                  <Button variant="outline" size="sm">
                    Privacy resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Compliance by Regulation */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
              Compliance Status by Regulation
            </h2>
            <div className="space-y-4">
              {complianceByRegulation.map((item) => {
                const regulation = northAmericanRegulations.find(r => r.id === item.regulation);
                return (
                  <div key={item.regulation} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="info">
                          {regulation?.name || item.regulation.toUpperCase()}
                        </Badge>
                        <span className="font-medium">{regulation?.fullName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.score}%</span>
                        <span className={`text-sm ${
                          item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.trend}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full bg-${item.color}-500 transition-all duration-300`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {activity.type === 'data_request' ? <FileText className="h-5 w-5" /> :
                     activity.type === 'incident' ? <AlertTriangle className="h-5 w-5" /> :
                     activity.type === 'vendor' ? <Building className="h-5 w-5" /> :
                     <Users className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{activity.title}</h3>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                  <div className="flex-shrink-0">
                    {activity.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Alerts & Notifications */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Alerts & Notifications</h2>
            <div className="space-y-3">
              {alertsAndNotifications.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  alert.type === 'critical' ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800' :
                  alert.type === 'warning' ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' :
                  'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800'
                }`}>
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{alert.title}</h3>
                      <p className="text-xs text-muted-foreground">{alert.description}</p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs mt-1">
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Deadlines
            </h2>
            <div className="space-y-3">
              {upcomingDeadlines.slice(0, 4).map((deadline, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{deadline.title}</h3>
                    <Badge variant="info">
                      {deadline.regulation.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Due: {deadline.dueDate}</span>
                    <span className={getPriorityColor(deadline.priority)}>
                      {formatDaysUntil(deadline.daysUntil)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/privacy/obligations">
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Obligations
              </Button>
            </Link>
          </div>

          {/* Data Overview */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Data Overview
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Processing Activities</span>
                <span className="font-medium">{dashboardMetrics.dataProcessingActivities}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Consent Records</span>
                <span className="font-medium">{dashboardMetrics.consentRecords.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Stakeholder Access</span>
                <span className="font-medium">{dashboardMetrics.stakeholdersWithAccess}</span>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <Link to="/privacy/data-rights" title="Submit and manage data rights requests">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Submit data rights request
                </Button>
              </Link>
              <Link to="/privacy/consent" title="Track and manage consent records">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Manage consent records
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="mt-8">
        <DataExportImport showDemoControls={true} />
      </div>
    </div>
  );
}