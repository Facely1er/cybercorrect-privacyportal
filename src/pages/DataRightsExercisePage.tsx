import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Shield, 
  FileText,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  Calendar,
  ArrowRight,
  Info,
  Lock,
  Users
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { DataRightsForm } from '../components/privacy/DataRightsForm';
import { localStorageService } from '../services/localStorageService';

export function DataRightsExercisePage() {
  const [selectedRequestType, setSelectedRequestType] = useState<string>('');
  const [showRequestForm, setShowRequestForm] = useState(false);

  // Get real data from localStorage
  const [myRequests, setMyRequests] = useState(() => 
    localStorageService.getDataRightsRequests()
  );

  // Refresh data when component mounts or form closes
  React.useEffect(() => {
    setMyRequests(localStorageService.getDataRightsRequests());
  }, [showRequestForm]);

  const dataRights = [
    {
      id: 'access',
      title: 'Right to Access',
      description: 'Request to view or obtain copies of your personal data',
      icon: <Eye className="h-6 w-6" />,
      regulations: ['FERPA', 'CCPA', 'GDPR'],
      timeline: '30-45 days',
      examples: [
        'View your student education records',
        'Get copies of grades and transcripts',
        'Access communication logs',
        'Review disciplinary records'
      ],
      requirements: [
        'Identity verification required',
        'Specific records must be identified',
        'May require in-person pickup',
        'Some fees may apply for copies'
      ]
    },
    {
      id: 'rectification',
      title: 'Right to Correction',
      description: 'Request correction of inaccurate or incomplete information',
      icon: <Edit className="h-6 w-6" />,
      regulations: ['FERPA', 'CCPA', 'GDPR'],
      timeline: '30-45 days',
      examples: [
        'Correct factual errors in records',
        'Update outdated contact information',
        'Fix transcript inaccuracies',
        'Amend misleading information'
      ],
      requirements: [
        'Must specify exact inaccuracies',
        'Provide supporting documentation',
        'May require hearing if denied',
        'Limited to factual corrections'
      ]
    },
    {
      id: 'erasure',
      title: 'Right to Deletion',
      description: 'Request deletion of personal information when legally permissible',
      icon: <Trash2 className="h-6 w-6" />,
      regulations: ['CCPA', 'GDPR'],
      timeline: '30 days',
      examples: [
        'Delete unnecessary personal data',
        'Remove old contact information',
        'Erase marketing preferences',
        'Delete obsolete records'
      ],
      requirements: [
        'Must not conflict with legal obligations',
        'Education records may have retention requirements',
        'Some data cannot be deleted',
        'Verification of identity required'
      ]
    },
    {
      id: 'portability',
      title: 'Right to Data Portability',
      description: 'Request your data in a portable, machine-readable format',
      icon: <Download className="h-6 w-6" />,
      regulations: ['GDPR', 'CCPA'],
      timeline: '30 days',
      examples: [
        'Export learning analytics data',
        'Download assignment history',
        'Get digital portfolio contents',
        'Transfer data to new institution'
      ],
      requirements: [
        'Technical feasibility required',
        'Structured data format provided',
        'May exclude third-party data',
        'Security measures apply'
      ]
    },
    {
      id: 'opt-out',
      title: 'Right to Opt-Out',
      description: 'Opt-out of data sale, sharing, or marketing communications',
      icon: <Shield className="h-6 w-6" />,
      regulations: ['CCPA', 'CPRA'],
      timeline: 'Immediate',
      examples: [
        'Stop data sharing with partners',
        'Opt-out of marketing emails',
        'Disable targeted advertising',
        'Block data sales'
      ],
      requirements: [
        'Must be honored immediately',
        'Cannot discriminate for opting out',
        'Clear opt-out mechanisms required',
        'May affect service functionality'
      ]
    },
    {
      id: 'directory-opt-out',
      title: 'Directory Information Opt-Out',
      description: 'Prevent disclosure of directory information (FERPA-specific)',
      icon: <FileText className="h-6 w-6" />,
      regulations: ['FERPA'],
      timeline: 'Immediate',
      examples: [
        'Remove from public directories',
        'Block name from honor rolls',
        'Prevent yearbook inclusion',
        'Stop media mentions'
      ],
      requirements: [
        'Annual notification provided',
        'Reasonable time to opt-out',
        'Must specify information types',
        'Affects all directory disclosures'
      ]
    }
  ];

  const handleRequestSubmit = (requestType: string) => {
    setSelectedRequestType(requestType);
    setShowRequestForm(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Exercise Your Data Privacy Rights</h1>
        <p className="text-muted-foreground">
          Submit requests to access, correct, delete, or transfer your personal data. Our self-service portal guides you through each type of request under FERPA, CCPA, GDPR, and other regulations.
        </p>
      </div>

      {/* My Rights Overview */}
      <div className="bg-primary/5 rounded-lg border border-primary/20 p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Info className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-foreground">Know Your Privacy Rights</h2>
            <p className="text-muted-foreground mb-4">
              As a student (18+), parent, guardian, or family member, you have specific rights regarding how personal and educational information is collected, used, and shared. These rights are protected by federal and state privacy laws and can be exercised through this portal.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="ferpa">FERPA Protected</Badge>
              <Badge variant="ccpa">CCPA Rights</Badge>
              <Badge variant="gdpr">GDPR Rights</Badge>
            </div>
            <p className="text-sm text-primary">
              📞 Need immediate help? Call our Privacy Office: <strong>(555) 123-PRIV</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Data Rights Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {dataRights.map((right) => (
          <div key={right.id} className="bg-white dark:bg-gray-900 rounded-lg border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                {right.icon}
              </div>
              <div>
                <h3 className="font-semibold">{right.title}</h3>
                <p className="text-sm text-muted-foreground">Response: {right.timeline}</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">{right.description}</p>
            
            {/* Applicable Regulations */}
            <div className="flex flex-wrap gap-2 mb-4">
              {right.regulations.map(reg => (
                <Badge key={reg} variant={reg.toLowerCase() as any}>
                  {reg}
                </Badge>
              ))}
            </div>

            {/* Examples */}
            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2">Examples:</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                {right.examples.slice(0, 3).map((example, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              className="w-full" 
              onClick={() => handleRequestSubmit(right.id)}
            >
              Submit {right.title} Request
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* My Requests */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-green-600" />
          My Data Rights Requests
        </h2>
        
        {myRequests.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium mb-2">No requests submitted</h3>
            <p className="text-muted-foreground mb-4">
              You haven't submitted any data rights requests yet.
            </p>
            <Button onClick={() => setShowRequestForm(true)}>
              Submit Your First Request
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {myRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{request.title}</h3>
                      <Badge className={
                        request.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        request.status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                      }>
                        {request.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Submitted: {request.submittedAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Due: {request.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Form Modal */}
      {showRequestForm && selectedRequestType && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg border w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b sticky top-0 bg-white dark:bg-gray-900 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Submit Data Rights Request</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowRequestForm(false)}>
                  <span className="sr-only">Close</span>
                  <span aria-hidden="true">&times;</span>
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <DataRightsForm
                requestType={selectedRequestType}
                onSuccess={() => {
                  setShowRequestForm(false);
                  // Refresh the page or update state to show new request
                }}
                onCancel={() => setShowRequestForm(false)}
                organizationId="demo-org"
              />
            </div>
          </div>
        </div>
      )}

      {/* Help and Support */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Need Help Understanding Your Rights?</h2>
        <p className="text-muted-foreground mb-4">
          Our support team can help you understand your privacy rights and guide you through the request process.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/help">
            <Button variant="outline">
              <Info className="h-4 w-4 mr-2" />
              Rights Information
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </Link>
          <Link to="/management/stakeholders">
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Stakeholder Portal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}