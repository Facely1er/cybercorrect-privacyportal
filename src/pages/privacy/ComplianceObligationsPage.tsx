import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Users,
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  ExternalLink,
  Target,
  BarChart3,
  AlertCircle,
  Zap
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';

import { northAmericanRegulations } from '../../data/northAmericanRegulations';
import { localStorageService } from '../../services/localStorageService';

export function ComplianceObligationsPage() {
  const location = useLocation();
  const [selectedRegulation, setSelectedRegulation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Initialize tab from URL query parameter
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    return tab && ['dashboard', 'obligations', 'calendar', 'automation'].includes(tab) ? tab : 'dashboard';
  });

  // Update tab when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['dashboard', 'obligations', 'calendar', 'automation'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  // Get real data from localStorage
  const [complianceObligations, setComplianceObligations] = useState(() => 
    localStorageService.getComplianceObligations()
  );

  // Refresh data when component mounts
  React.useEffect(() => {
    setComplianceObligations(localStorageService.getComplianceObligations());
  }, []);

  const filteredObligations = complianceObligations.filter(obligation => {
    const matchesRegulation = selectedRegulation === 'all' || obligation.regulation === selectedRegulation;
    const matchesStatus = selectedStatus === 'all' || obligation.status === selectedStatus;
    return matchesRegulation && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Low</Badge>;
      default:
        return <Badge variant="general">{priority}</Badge>;
    }
  };

  const getRegulationBadge = (regulation: string) => {
    const reg = northAmericanRegulations.find(r => r.id === regulation);
    return (
      <Badge variant={regulation as any}>
        {reg?.name || regulation.toUpperCase()}
      </Badge>
    );
  };

  // Calculate dashboard metrics
  const totalObligations = complianceObligations.length;
  const completedObligations = complianceObligations.filter(o => o.status === 'completed').length;
  const overdueObligations = complianceObligations.filter(o => 
    new Date(o.dueDate) < new Date() && o.status !== 'completed'
  ).length;
  const upcomingObligations = complianceObligations.filter(o => {
    const dueDate = new Date(o.dueDate);
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);
    return dueDate >= now && dueDate <= thirtyDaysFromNow && o.status !== 'completed';
  }).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Compliance Obligations</h1>
        <p className="text-muted-foreground">
          Track and manage privacy compliance obligations across all applicable regulations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="obligations">All Obligations</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-2xl font-bold">{totalObligations}</span>
              </div>
              <h3 className="font-semibold mb-1">Total Obligations</h3>
              <p className="text-sm text-muted-foreground">Across all regulations</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {completedObligations}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Completed</h3>
              <p className="text-sm text-muted-foreground">This quarter</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {upcomingObligations}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Due Soon</h3>
              <p className="text-sm text-muted-foreground">Next 30 days</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {overdueObligations}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Overdue</h3>
              <p className="text-sm text-muted-foreground">Requires immediate attention</p>
            </div>
          </div>

          {/* High Priority Items */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-red-500" />
              High Priority Obligations
            </h2>
            <div className="space-y-4">
              {complianceObligations
                .filter(o => o.priority === 'critical' || o.priority === 'high')
                .slice(0, 5)
                .map((obligation) => (
                  <div key={obligation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(obligation.status)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{obligation.title}</h3>
                        <p className="text-xs text-muted-foreground">{obligation.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          {getRegulationBadge(obligation.regulation)}
                          <span className="text-xs text-muted-foreground">Due: {obligation.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getPriorityBadge(obligation.priority)}
                      <div className="text-right">
                        <div className="text-sm font-medium">{obligation.completionPercentage}%</div>
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                          <div 
                            className="bg-primary-500 h-1 rounded-full"
                            style={{ width: `${obligation.completionPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Compliance by Regulation */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
              Compliance Status by Regulation
            </h2>
            <div className="space-y-4">
              {['ferpa', 'coppa', 'ccpa', 'bipa', 'shield'].map((reg) => {
                const regObligations = complianceObligations.filter(o => o.regulation === reg);
                const completed = regObligations.filter(o => o.status === 'completed').length;
                const total = regObligations.length;
                const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
                
                return (
                  <div key={reg} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getRegulationBadge(reg)}
                        <span className="font-medium">{northAmericanRegulations.find(r => r.id === reg)?.fullName}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {completed}/{total} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="obligations" className="space-y-6">
          {/* Filters */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Regulation</label>
                <select
                  value={selectedRegulation}
                  onChange={(e) => setSelectedRegulation(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="all">All Regulations</option>
                  {northAmericanRegulations.map(reg => (
                    <option key={reg.id} value={reg.id}>{reg.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Obligation
                </Button>
              </div>
            </div>
          </div>

          {/* Obligations List */}
          <div className="space-y-4">
            {filteredObligations.map((obligation) => (
              <div key={obligation.id} className="bg-white dark:bg-gray-900 rounded-lg border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{obligation.title}</h3>
                      {getRegulationBadge(obligation.regulation)}
                      <div className={`h-4 w-4 ${
                        obligation.status === 'completed' ? 'text-green-500' :
                        obligation.status === 'in_progress' ? 'text-blue-500' :
                        'text-amber-500'
                      }`}>
                        {getStatusIcon(obligation.status)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{obligation.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Due: {obligation.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Owner: {obligation.responsibleRole}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <Badge variant={obligation.regulation as any}>
                          {obligation.regulation.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={
                      obligation.priority === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                      obligation.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                      obligation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }>
                      {obligation.priority}
                    </Badge>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{obligation.completionPercentage}%</div>
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${obligation.completionPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evidence Required */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Evidence Required:</h4>
                  <div className="flex flex-wrap gap-2">
                    {obligation.evidenceRequired.map((evidence, index) => (
                      <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {evidence}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External Dependencies */}
                {obligation.externalDependencies.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-sm mb-2">Dependencies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {obligation.externalDependencies.map((dep, index) => (
                        <span key={index} className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-1 rounded">
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  {obligation.automationPossible && (
                    <Link to="/privacy/automation" title="Set up automation for this obligation">
                      <Button variant="outline" size="sm">
                        <Zap className="h-4 w-4 mr-2" />
                        Automate
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm">
                    Update Progress
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          {/* Calendar View */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Compliance Calendar</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Link to="/calendar" title="View the full compliance calendar">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Full calendar
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Calendar integration would go here */}
            <div className="text-center p-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Calendar Integration</h3>
              <p className="text-muted-foreground mb-4">
                View all compliance deadlines in an interactive calendar format.
              </p>
              <Link to="/calendar" title="Access the full compliance calendar">
                <Button>
                  View compliance calendar
                </Button>
              </Link>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          {/* Redirect to automation page */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <div className="text-center p-8">
              <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-4">Compliance Automation</h2>
              <p className="text-muted-foreground mb-6">
                Automate routine compliance tasks and notifications to improve efficiency and reduce manual effort.
              </p>
              <Link to="/privacy/automation" title="Configure compliance automation">
                <Button>
                  Configure automation
                </Button>
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}