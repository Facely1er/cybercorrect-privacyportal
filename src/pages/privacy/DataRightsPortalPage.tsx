import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Trash2, 
  Edit, 
  Eye, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Search,
  Filter,
  User,
  Mail,
  Calendar,
  ExternalLink,
  GraduationCap,
  HelpCircle
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { localStorageService } from '../../services/localStorageService';

export function DataRightsPortalPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestType, setRequestType] = useState('');

  // Get real data from localStorage
  const [dataRightsRequests, setDataRightsRequests] = useState(() => 
    localStorageService.getDataRightsRequests()
  );

  // Refresh data when component mounts or when returning from form
  React.useEffect(() => {
    setDataRightsRequests(localStorageService.getDataRightsRequests());
  }, [showRequestForm]);

  const requestTypes = [
    {
      id: 'access',
      name: 'Access Request',
      description: 'Request to view or obtain copies of education records',
      icon: <Eye className="h-5 w-5" />,
      regulations: ['FERPA', 'CCPA', 'GDPR'],
      timeline: '45 days (FERPA), 30 days (CCPA/GDPR)'
    },
    {
      id: 'rectification',
      name: 'Correction Request',
      description: 'Request to correct inaccurate or incomplete information',
      icon: <Edit className="h-5 w-5" />,
      regulations: ['FERPA', 'CCPA', 'GDPR'],
      timeline: 'Reasonable time, typically 30-45 days'
    },
    {
      id: 'erasure',
      name: 'Deletion Request',
      description: 'Request to delete personal information',
      icon: <Trash2 className="h-5 w-5" />,
      regulations: ['CCPA', 'GDPR'],
      timeline: '30 days (CCPA), 1 month (GDPR)'
    },
    {
      id: 'portability',
      name: 'Data Portability',
      description: 'Request data in portable format',
      icon: <Download className="h-5 w-5" />,
      regulations: ['GDPR', 'CCPA'],
      timeline: '1 month (GDPR), 45 days (CCPA)'
    },
    {
      id: 'opt_out',
      name: 'Opt-Out Request',
      description: 'Opt-out of sale/sharing of personal information',
      icon: <Shield className="h-5 w-5" />,
      regulations: ['CCPA', 'CPRA'],
      timeline: 'Immediate effect'
    },
    {
      id: 'directory_opt_out',
      name: 'Directory Opt-Out',
      description: 'Opt-out of directory information disclosure (FERPA)',
      icon: <FileText className="h-5 w-5" />,
      regulations: ['FERPA'],
      timeline: 'Takes effect upon request'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'under_review':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">In Progress</Badge>;
      case 'under_review':
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Under Review</Badge>;
      default:
        return <Badge variant="general">Submitted</Badge>;
    }
  };

  const handleNewRequest = (type: string) => {
    setRequestType(type);
    setShowRequestForm(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Data Rights Portal</h1>
        <p className="text-muted-foreground">
          Submit and track requests related to student and personal data rights under privacy regulations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">My Requests</TabsTrigger>
          <TabsTrigger value="submit">Submit Request</TabsTrigger>
          <TabsTrigger value="help">Help & Info</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Dashboard */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-2xl font-bold">
                  {dataRightsRequests.length}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Total Requests</h3>
              <p className="text-sm text-muted-foreground">All data rights requests</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-2xl font-bold">
                  {dataRightsRequests.filter(r => r.status === 'in_progress').length}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Pending</h3>
              <p className="text-sm text-muted-foreground">Awaiting response</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-2xl font-bold">
                  {dataRightsRequests.filter(r => r.status === 'completed').length}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Completed</h3>
              <p className="text-sm text-muted-foreground">Successfully processed</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {requestTypes.slice(0, 6).map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleNewRequest(type.id)}
                  className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex-shrink-0">
                    {type.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">{type.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {type.regulations.slice(0, 2).map(reg => (
                        <span key={reg} className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                          {reg}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {dataRightsRequests.slice(0, 3).map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(request.status)}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{request.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {request.studentName} • Submitted {request.submittedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(request.status)}
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          {/* Requests List */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">My Data Rights Requests</h2>
                <Button onClick={() => setShowRequestForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>
            </div>
            
            <div className="divide-y">
              {dataRightsRequests.map((request) => (
                <div key={request.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{request.title}</h3>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{request.studentName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{request.requesterName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {request.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="submit" className="space-y-6">
          {/* Request Submission Form */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-6">Submit Data Rights Request</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requestTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleNewRequest(type.id)}
                  className="flex flex-col items-start gap-3 p-6 border rounded-lg hover:border-primary-500 transition-colors text-left"
                >
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{type.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {type.regulations.map(reg => (
                          <span key={reg} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {reg}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Timeline: {type.timeline}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Request Form (if showing) */}
          {showRequestForm && (
            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  {requestTypes.find(t => t.id === requestType)?.name || 'New Request'}
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowRequestForm(false)}>
                  <Plus className="h-4 w-4 rotate-45" />
                </Button>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Student Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      placeholder="Enter student name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Relationship to Student</label>
                    <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                      <option value="">Select relationship</option>
                      <option value="parent">Parent</option>
                      <option value="guardian">Legal Guardian</option>
                      <option value="student">Student (18+ or eligible)</option>
                      <option value="representative">Authorized Representative</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Request Details</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="Please provide specific details about your request..."
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Processing Information</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Your request will be processed according to applicable privacy regulations. 
                    Response times vary by request type and regulation (typically 30-45 days).
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowRequestForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Request
                  </Button>
                </div>
              </form>
            </div>
          )}
        </TabsContent>

        <TabsContent value="help" className="space-y-6">
          {/* Help and Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Your Privacy Rights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Under FERPA (Students/Parents):</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Inspect and review education records</li>
                  <li>Request correction of inaccurate records</li>
                  <li>Control disclosure of directory information</li>
                  <li>File complaints with the Department of Education</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Under State Privacy Laws:</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Know what personal information is collected</li>
                  <li>Request deletion of personal information</li>
                  <li>Opt-out of sale or sharing of data</li>
                  <li>Non-discrimination for exercising rights</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h3 className="font-medium mb-3">Learn More About Your Rights</h3>
              <div className="flex flex-wrap gap-2">
                <Link to="/resources/privacy-regulations" title="Understand privacy regulations that protect you">
                  <Button variant="outline" size="sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Privacy Laws Overview
                  </Button>
                </Link>
                <Link to="/training" title="Educational content about data rights">
                  <Button variant="outline" size="sm">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Privacy Education
                  </Button>
                </Link>
                <Link to="/faq" title="Frequently asked questions about data rights">
                  <Button variant="outline" size="sm">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Data Rights FAQ
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Privacy Office</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Email: privacy@yourschool.edu</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Hours: Monday-Friday, 8 AM - 5 PM</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Student Records Office</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Email: records@yourschool.edu</p>
                  <p>Phone: (555) 123-4568</p>
                  <p>Hours: Monday-Friday, 9 AM - 4 PM</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <Link to="/contact" title="Contact our support team for additional help">
                <Button className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact CyberCorrect Support
                </Button>
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}