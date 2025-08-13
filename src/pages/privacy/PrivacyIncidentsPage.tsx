import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Users,
  Calendar,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  ExternalLink,
  Phone,
  Mail,
  Building,
  GraduationCap
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { localStorageService } from '../../services/localStorageService';

export function PrivacyIncidentsPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showIncidentForm, setShowIncidentForm] = useState(false);

  // Get real data from localStorage
  const [privacyIncidents, setPrivacyIncidents] = useState(() => 
    localStorageService.getPrivacyIncidents()
  );

  // Refresh data when component mounts
  React.useEffect(() => {
    setPrivacyIncidents(localStorageService.getPrivacyIncidents());
  }, []);

  const incidentTypes = [
    { id: 'data_breach', name: 'Data Breach', color: 'red', icon: <Shield className="h-4 w-4" /> },
    { id: 'unauthorized_access', name: 'Unauthorized Access', color: 'orange', icon: <AlertTriangle className="h-4 w-4" /> },
    { id: 'data_loss', name: 'Data Loss', color: 'amber', icon: <FileText className="h-4 w-4" /> },
    { id: 'privacy_violation', name: 'Privacy Violation', color: 'yellow', icon: <Eye className="h-4 w-4" /> },
    { id: 'consent_violation', name: 'Consent Violation', color: 'blue', icon: <Users className="h-4 w-4" /> },
    { id: 'vendor_incident', name: 'Vendor Incident', color: 'purple', icon: <Building className="h-4 w-4" /> }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const totalIncidents = privacyIncidents.length;
  const openIncidents = privacyIncidents.filter(i => i.status !== 'resolved').length;
  const resolvedIncidents = privacyIncidents.filter(i => i.status === 'resolved').length;
  const highSeverityIncidents = privacyIncidents.filter(i => i.severity === 'high' || i.severity === 'critical').length;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Privacy Incidents</h1>
        <p className="text-muted-foreground">
          Track and manage privacy incidents, data breaches, and compliance violations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="incidents">All Incidents</TabsTrigger>
          <TabsTrigger value="report">Report Incident</TabsTrigger>
          <TabsTrigger value="response">Response Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-2xl font-bold">{totalIncidents}</span>
              </div>
              <h3 className="font-semibold mb-1">Total Incidents</h3>
              <p className="text-sm text-muted-foreground">All time</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {openIncidents}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Open</h3>
              <p className="text-sm text-muted-foreground">Requiring attention</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {resolvedIncidents}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Resolved</h3>
              <p className="text-sm text-muted-foreground">This year</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {highSeverityIncidents}
                </span>
              </div>
              <h3 className="font-semibold mb-1">High Severity</h3>
              <p className="text-sm text-muted-foreground">This year</p>
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Incidents</h2>
            <div className="space-y-4">
              {privacyIncidents.slice(0, 3).map((incident) => (
                <div key={incident.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{incident.title}</h3>
                        <span className="text-xs text-muted-foreground">#{incident.incidentNumber}</span>
                        <Badge className={
                          incident.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          incident.severity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                          incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        }>
                          {incident.severity}
                        </Badge>
                        <Badge className={
                          incident.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          incident.status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                          'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                        }>
                          {incident.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{incident.affectedIndividualsCount} affected</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Discovered: {incident.discoveryDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span>Assigned: {incident.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                  
                  {/* Applicable Regulations */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {incident.applicableRegulations.map(reg => (
                      <Badge key={reg} variant={reg as any}>
                        {reg.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Incident Types Breakdown */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Incident Types (This Year)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {incidentTypes.map((type) => {
                const count = privacyIncidents.filter(i => i.type === type.id).length;
                return (
                  <div key={type.id} className="flex items-center gap-3 p-4 border rounded-lg">
                    <div className={`p-2 bg-${type.color}-100 dark:bg-${type.color}-900/30 rounded-lg`}>
                      {type.icon}
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{count}</div>
                      <div className="text-sm text-muted-foreground">{type.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-6">
          {/* Incidents Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">All Privacy Incidents</h2>
                <Button onClick={() => setShowIncidentForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Report Incident
                </Button>
              </div>
            </div>
            
            <div className="divide-y">
              {privacyIncidents.map((incident) => (
                <div key={incident.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{incident.title}</h3>
                        <span className="text-xs text-muted-foreground">#{incident.incidentNumber}</span>
                        <Badge className={
                          incident.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          incident.severity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                          incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        }>
                          {incident.severity}
                        </Badge>
                        <Badge className={
                          incident.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          incident.status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                          incident.status === 'investigating' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }>
                          {incident.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{incident.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{incident.affectedIndividualsCount} affected</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Discovered: {incident.discoveryDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span>{incident.assignedTo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {incident.reportedToAuthorities ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                          )}
                          <span>
                            {incident.reportedToAuthorities ? 'Reported' : 'Not reported'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Applicable Regulations */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {incident.applicableRegulations.map(reg => (
                          <Badge key={reg} variant={reg as any}>
                            {reg.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="report" className="space-y-6">
          {/* Incident Reporting Form */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-6">Report Privacy Incident</h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Incident Type</label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    <option value="">Select incident type</option>
                    {incidentTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Severity Level</label>
                  <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                    <option value="">Select severity</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Incident Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  placeholder="Brief description of the incident"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Detailed Description</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  placeholder="Provide detailed information about what happened, when it was discovered, and current status..."
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Discovery Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Incident Date (if known)</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Affected Individuals (estimate)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Data Types Affected</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    'Student names', 'Contact information', 'Academic records', 'Behavioral records',
                    'Health records', 'Special education', 'Financial information', 'Biometric data',
                    'Login credentials', 'Communications', 'Assessment results', 'Other'
                  ].map(dataType => (
                    <label key={dataType} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">{dataType}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4">
                <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Important Notice</h4>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  High severity incidents may require immediate notification to authorities and affected individuals. 
                  The privacy office will be automatically notified of all incident reports.
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">
                  Save Draft
                </Button>
                <Button type="submit">
                  Submit Incident Report
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="response" className="space-y-6">
          {/* Incident Response Plan */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Incident Response Plan</h2>
            
            <div className="space-y-6">
              {/* Response Team */}
              <div>
                <h3 className="font-medium mb-3">Response Team Contacts</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Privacy Officer</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>privacy@yourschool.edu</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>(555) 123-4567</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">IT Security Lead</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>security@yourschool.edu</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>(555) 123-4568</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Steps */}
              <div>
                <h3 className="font-medium mb-3">Response Steps</h3>
                <div className="space-y-3">
                  {[
                    { step: 1, title: 'Immediate Response', description: 'Contain the incident and assess scope', timeline: '0-2 hours' },
                    { step: 2, title: 'Investigation', description: 'Investigate cause and determine impact', timeline: '2-24 hours' },
                    { step: 3, title: 'Notification Assessment', description: 'Determine notification requirements', timeline: '24-72 hours' },
                    { step: 4, title: 'External Notifications', description: 'Notify authorities as required', timeline: '72 hours max' },
                    { step: 5, title: 'Individual Notifications', description: 'Notify affected individuals', timeline: 'Without unreasonable delay' },
                    { step: 6, title: 'Resolution & Learning', description: 'Resolve incident and document lessons', timeline: 'Ongoing' }
                  ].map((step) => (
                    <div key={step.step} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{step.step}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{step.title}</h4>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                        <span className="text-xs text-primary-600 dark:text-primary-400">{step.timeline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h3 className="font-medium mb-3">Response Resources</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/resources/tools-templates" title="Download incident response checklist template">
                    <Button variant="outline" className="justify-start w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Incident Response Checklist
                    </Button>
                  </Link>
                  <Link to="/resources/tools-templates" title="Access notification email templates">
                    <Button variant="outline" className="justify-start w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Notification Templates
                    </Button>
                  </Link>
                  <Link to="/contact" title="Get authority contact information">
                    <Button variant="outline" className="justify-start w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Authority Contact List
                    </Button>
                  </Link>
                  <Link to="/resources/privacy-regulations" title="Understand legal notification requirements">
                    <Button variant="outline" className="justify-start w-full">
                      <Shield className="h-4 w-4 mr-2" />
                      Legal Requirements Guide
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-3">Related Resources</h4>
                  <div className="flex flex-wrap gap-2">
                    <Link to="/training" title="Privacy incident response training">
                      <Button variant="outline" size="sm">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Incident Response Training
                      </Button>
                    </Link>
                    <Link to="/privacy/obligations" title="Review compliance notification requirements">
                      <Button variant="outline" size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Notification Obligations
                      </Button>
                    </Link>
                    <Link to="/privacy/vendors" title="Review vendor incident procedures">
                      <Button variant="outline" size="sm">
                        <Building className="h-4 w-4 mr-2" />
                        Vendor Incident Procedures
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}