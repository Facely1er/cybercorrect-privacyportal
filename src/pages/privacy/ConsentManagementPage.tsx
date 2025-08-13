import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Search,
  Filter,
  Plus,
  Download,
  Mail,
  Calendar,
  AlertTriangle,
  Eye,
  Edit,
  RefreshCw
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { localStorageService } from '../../services/localStorageService';

export function ConsentManagementPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedConsentType, setSelectedConsentType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Get real data from localStorage
  const [consentRecords, setConsentRecords] = useState(() => 
    localStorageService.getConsentRecords()
  );

  // Refresh data when component mounts
  React.useEffect(() => {
    setConsentRecords(localStorageService.getConsentRecords());
  }, []);

  const consentTypes = [
    { id: 'directory_information', name: 'Directory Information', regulation: 'FERPA' },
    { id: 'edtech_usage', name: 'Educational Technology', regulation: 'COPPA/FERPA' },
    { id: 'photo_video_consent', name: 'Photo/Video Consent', regulation: 'FERPA' },
    { id: 'biometric_data', name: 'Biometric Data', regulation: 'BIPA' },
    { id: 'data_sharing', name: 'Data Sharing', regulation: 'Multiple' },
    { id: 'marketing_communications', name: 'Marketing Communications', regulation: 'CCPA' },
    { id: 'research_participation', name: 'Research Participation', regulation: 'FERPA/IRB' }
  ];

  const filteredConsent = consentRecords.filter(record => {
    const matchesType = selectedConsentType === 'all' || record.consentType === selectedConsentType;
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    return matchesType && matchesStatus;
  });

  // Calculate metrics
  const totalConsent = consentRecords.length;
  const activeConsent = consentRecords.filter(r => r.status === 'active').length;
  const withdrawnConsent = consentRecords.filter(r => r.status === 'withdrawn').length;
  const renewalRequired = consentRecords.filter(r => r.renewalRequired).length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'withdrawn':
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'expired':
        return <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge className={
        status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
        status === 'withdrawn' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
        status === 'expired' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300' :
        'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
      }>
        {status}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Consent Management</h1>
        <p className="text-muted-foreground">
          Track and manage parental consent and student privacy preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="consent">Consent Records</TabsTrigger>
          <TabsTrigger value="forms">Consent Forms</TabsTrigger>
          <TabsTrigger value="renewal">Renewals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-2xl font-bold">{totalConsent}</span>
              </div>
              <h3 className="font-semibold mb-1">Total Records</h3>
              <p className="text-sm text-muted-foreground">All consent records</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {activeConsent}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Active Consent</h3>
              <p className="text-sm text-muted-foreground">Currently valid</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {withdrawnConsent}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Withdrawn</h3>
              <p className="text-sm text-muted-foreground">Consent revoked</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <RefreshCw className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {renewalRequired}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Need Renewal</h3>
              <p className="text-sm text-muted-foreground">Require updates</p>
            </div>
          </div>

          {/* Consent by Type */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Consent by Type</h2>
            <div className="space-y-4">
              {consentTypes.map((type) => {
                const typeRecords = consentRecords.filter(r => r.consentType === type.id);
                const activeTypeRecords = typeRecords.filter(r => r.status === 'active').length;
                const total = typeRecords.length;
                const percentage = total > 0 ? Math.round((activeTypeRecords / total) * 100) : 0;
                
                return (
                  <div key={type.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{type.name}</span>
                        <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {type.regulation}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {activeTypeRecords}/{total} ({percentage}% active)
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

          {/* Recent Consent Activity */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Consent Activity</h2>
            <div className="space-y-4">
              {consentRecords.slice(0, 5).map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(record.status)}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{record.studentName}</h3>
                      <p className="text-xs text-muted-foreground">
                        {record.consentType.replace('_', ' ')} - {record.serviceProvider}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(record.status)}
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="consent" className="space-y-6">
          {/* Filters */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedConsentType}
                  onChange={(e) => setSelectedConsentType(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  <option value="all">All Consent Types</option>
                  {consentTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="withdrawn">Withdrawn</option>
                  <option value="expired">Expired</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Consent
                </Button>
              </div>
            </div>
          </div>

          {/* Consent Records Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">All Consent Records</h2>
            </div>
            
            <div className="divide-y">
              {filteredConsent.map((record) => (
                <div key={record.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{record.studentName}</h3>
                        <span className="text-xs text-muted-foreground">ID: {record.studentId}</span>
                        {getStatusBadge(record.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>{record.consentType.replace('_', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{record.parentGuardianName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {record.consentGiven ? `Granted: ${record.consentDate}` : 
                             record.withdrawalDate ? `Withdrawn: ${record.withdrawalDate}` : 'Pending'}
                          </span>
                        </div>
                      </div>

                      {/* Service Provider */}
                      <div className="mb-3">
                        <span className="text-sm font-medium">Service Provider: </span>
                        <span className="text-sm text-muted-foreground">{record.serviceProvider}</span>
                      </div>

                      {/* Applicable Regulations */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {record.applicableRegulations.map(reg => (
                          <Badge key={reg} variant={reg as any}>
                            {reg.toUpperCase()}
                          </Badge>
                        ))}
                      </div>

                      {/* Renewal Notice */}
                      {record.renewalRequired && record.status === 'active' && (
                        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-3">
                          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                            <RefreshCw className="h-4 w-4" />
                            <span className="text-sm font-medium">Renewal Required</span>
                          </div>
                          <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                            This consent expires on {record.expiryDate} and requires renewal
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forms" className="space-y-6">
          {/* Consent Form Templates */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Consent Form Templates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {consentTypes.map((type) => (
                <div key={type.id} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">{type.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Required under {type.regulation}
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Form
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Management */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Form Management</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Digital Consent Forms</h3>
                  <p className="text-sm text-muted-foreground">Online forms with digital signatures</p>
                </div>
                <Button variant="outline">
                  Configure Forms
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Automated Reminders</h3>
                  <p className="text-sm text-muted-foreground">Email reminders for consent renewals</p>
                </div>
                <Button variant="outline">
                  Set Up Reminders
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Multi-Language Support</h3>
                  <p className="text-sm text-muted-foreground">Consent forms in multiple languages</p>
                </div>
                <Button variant="outline">
                  Manage Languages
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="renewal" className="space-y-6">
          {/* Renewal Dashboard */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Consent Renewals</h2>
            <div className="space-y-4">
              {consentRecords
                .filter(r => r.renewalRequired || (r.expiryDate && new Date(r.expiryDate) <= new Date(new Date().setMonth(new Date().getMonth() + 2))))
                .map((record) => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{record.studentName}</h3>
                          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                            Renewal Required
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Consent Type:</span>
                            <div>{record.consentType.replace('_', ' ')}</div>
                          </div>
                          <div>
                            <span className="font-medium">Parent/Guardian:</span>
                            <div>{record.parentGuardianName}</div>
                          </div>
                          <div>
                            <span className="font-medium">Expires:</span>
                            <div className="text-amber-600 dark:text-amber-400">
                              {record.expiryDate || 'Annual renewal'}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Reminder
                        </Button>
                        <Button size="sm">
                          Process Renewal
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Bulk Renewal Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start" title="Send automated renewal reminders to parents">
                <Mail className="h-4 w-4 mr-2" />
                Send Renewal Reminders
              </Button>
              <Button variant="outline" className="justify-start" title="Export consent renewal list for review">
                <Download className="h-4 w-4 mr-2" />
                Export Renewal List
              </Button>
              <Button variant="outline" className="justify-start" title="Automatically renew eligible consent records">
                <RefreshCw className="h-4 w-4 mr-2" />
                Auto-Renew Eligible
              </Button>
              <Link to="/resources/tools-templates" title="Generate renewal forms using templates">
                <Button variant="outline" className="justify-start w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Renewal Forms
                </Button>
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}