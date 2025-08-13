import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  CheckCircle, 
  Clock, 
  FileText, 
  AlertTriangle,
  Eye,
  Lock,
  Building,
  Mail,
  Calendar,
  Target,
  ArrowRight,
  HelpCircle,
  Book,
  Info,
  TrendingUp,
  User,
  GraduationCap,
  Award,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Star,
  BookOpen,
  Download,
  ExternalLink,
  Zap,
  Settings,
  BarChart3
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { localStorageService } from '../services/localStorageService';
import { ProgressTracker } from '../common/ProgressTracker';

export function StakeholderDutiesPage() {
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [dutyProgress, setDutyProgress] = useState<Record<string, number>>({});
  const [completedDuties, setCompletedDuties] = useState<string[]>([]);
  const [activeDuty, setActiveDuty] = useState<string | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorageService.getItem('duty_progress', {});
    const savedCompleted = localStorageService.getItem('completed_duties', []);
    setDutyProgress(savedProgress);
    setCompletedDuties(savedCompleted);
  }, []);

  // Save progress to localStorage
  const updateDutyProgress = (dutyId: string, progress: number) => {
    const newProgress = { ...dutyProgress, [dutyId]: progress };
    setDutyProgress(newProgress);
    localStorageService.setItem('duty_progress', newProgress);
    
    // Mark as completed if 100%
    if (progress === 100 && !completedDuties.includes(dutyId)) {
      const newCompleted = [...completedDuties, dutyId];
      setCompletedDuties(newCompleted);
      localStorageService.setItem('completed_duties', newCompleted);
    }
  };

  const stakeholderDuties = {
    administrator: {
      title: 'Administrator Privacy Duties',
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      color: 'blue',
      description: 'Lead institutional privacy compliance and policy oversight',
      estimatedTime: '2-4 hours per week',
      duties: [
        {
          id: 'policy-oversight',
          title: 'Privacy Policy Development & Oversight',
          description: 'Create, maintain, and update comprehensive institutional privacy policies and procedures',
          category: 'Policy Management',
          frequency: 'Annual review, updates as needed',
          deadline: 'August 15, 2025',
          status: 'pending',
          priority: 'critical',
          estimatedHours: 8,
          actions: [
            'Review current privacy policies for gaps and updates needed',
            'Research regulatory changes affecting educational institutions',
            'Update policies to reflect current regulations and best practices',
            'Obtain legal review and approval from institutional counsel',
            'Communicate policy updates to all stakeholders',
            'Train staff on policy changes and implementation'
          ],
          regulations: ['FERPA', 'COPPA', 'CCPA', 'General'],
          resources: [
            { title: 'Privacy Policy Template', type: 'template', url: '/resources/privacy-policy-template' },
            { title: 'FERPA Compliance Guide', type: 'guide', url: '/resources/ferpa-guide' },
            { title: 'Policy Update Training', type: 'training', url: '/training/policy-updates' }
          ],
          dependencies: ['Legal review', 'Stakeholder consultation', 'Board approval']
        },
        {
          id: 'staff-training',
          title: 'Privacy Training Program Management',
          description: 'Ensure all staff receive appropriate privacy training and maintain compliance awareness',
          category: 'Training & Education',
          frequency: 'Annual, with updates as needed',
          deadline: 'September 1, 2025',
          status: 'in-progress',
          priority: 'high',
          estimatedHours: 12,
          actions: [
            'Assess current staff privacy knowledge and training needs',
            'Develop role-specific training curricula and materials',
            'Schedule and coordinate training sessions for all staff',
            'Track training completion rates and effectiveness',
            'Update training materials for regulatory changes',
            'Maintain training records for compliance documentation'
          ],
          regulations: ['FERPA', 'COPPA', 'General'],
          resources: [
            { title: 'Staff Training Modules', type: 'training', url: '/training/staff-privacy' },
            { title: 'Training Tracking Template', type: 'template', url: '/resources/training-tracker' },
            { title: 'Compliance Documentation Guide', type: 'guide', url: '/resources/documentation-guide' }
          ],
          dependencies: ['Training budget approval', 'Staff availability', 'Training materials']
        },
        {
          id: 'compliance-monitoring',
          title: 'Institutional Compliance Monitoring',
          description: 'Monitor overall institutional privacy compliance and report to leadership',
          category: 'Compliance Oversight',
          frequency: 'Quarterly reporting, ongoing monitoring',
          deadline: 'March 31, 2025',
          status: 'upcoming',
          priority: 'high',
          estimatedHours: 6,
          actions: [
            'Generate comprehensive compliance status reports',
            'Review key privacy metrics and performance indicators',
            'Identify areas for improvement and risk mitigation',
            'Present compliance status to institutional leadership',
            'Coordinate with legal counsel on compliance matters',
            'Document compliance activities for audit purposes'
          ],
          regulations: ['All Applicable'],
          resources: [
            { title: 'Compliance Dashboard', type: 'tool', url: '/privacy/dashboard' },
            { title: 'Quarterly Report Template', type: 'template', url: '/resources/quarterly-report' },
            { title: 'Leadership Presentation Guide', type: 'guide', url: '/resources/presentation-guide' }
          ],
          dependencies: ['Data collection', 'Stakeholder input', 'Leadership schedule']
        },
        {
          id: 'incident-oversight',
          title: 'Privacy Incident Response Oversight',
          description: 'Lead institutional response to privacy incidents and ensure proper protocols',
          category: 'Incident Management',
          frequency: 'As needed, immediate response',
          deadline: 'Immediate when incidents occur',
          status: 'active',
          priority: 'critical',
          estimatedHours: 4,
          actions: [
            'Establish incident response protocols and procedures',
            'Lead incident response team coordination',
            'Ensure proper notification of authorities and stakeholders',
            'Oversee incident investigation and resolution',
            'Document lessons learned and process improvements',
            'Update incident response procedures based on experience'
          ],
          regulations: ['FERPA', 'CCPA', 'GDPR', 'SHIELD'],
          resources: [
            { title: 'Incident Response Plan', type: 'template', url: '/resources/incident-response' },
            { title: 'Notification Requirements Guide', type: 'guide', url: '/resources/notification-guide' },
            { title: 'Incident Response Training', type: 'training', url: '/training/incident-response' }
          ],
          dependencies: ['Legal counsel', 'IT security team', 'Communication team']
        }
      ]
    },
    'privacy-officer': {
      title: 'Privacy Officer Duties',
      icon: <Lock className="h-6 w-6 text-purple-600" />,
      color: 'purple',
      description: 'Specialized privacy management and data protection oversight',
      estimatedTime: '6-8 hours per week',
      duties: [
        {
          id: 'data-rights-processing',
          title: 'Data Subject Rights Request Processing',
          description: 'Process and respond to stakeholder data rights requests within regulatory timeframes',
          category: 'Data Rights Management',
          frequency: 'Ongoing, as requests are received',
          deadline: 'Within 30-45 days of request receipt',
          status: 'active',
          priority: 'critical',
          estimatedHours: 3,
          actions: [
            'Review and validate incoming data rights requests',
            'Verify requester identity and authority',
            'Coordinate with relevant departments to collect requested information',
            'Prepare and deliver responses within regulatory deadlines',
            'Document request processing for compliance records',
            'Follow up with requesters to ensure satisfaction'
          ],
          regulations: ['FERPA', 'CCPA', 'GDPR'],
          resources: [
            { title: 'Data Rights Request Portal', type: 'tool', url: '/privacy/data-rights' },
            { title: 'Request Processing Guide', type: 'guide', url: '/resources/request-processing' },
            { title: 'Identity Verification Procedures', type: 'procedure', url: '/resources/identity-verification' }
          ],
          dependencies: ['Requester cooperation', 'Department coordination', 'Technical support']
        },
        {
          id: 'privacy-impact-assessments',
          title: 'Privacy Impact Assessment Coordination',
          description: 'Conduct and oversee privacy impact assessments for new projects and systems',
          category: 'Risk Assessment',
          frequency: 'For each new project or system',
          deadline: 'Before project implementation',
          status: 'active',
          priority: 'high',
          estimatedHours: 6,
          actions: [
            'Identify projects requiring privacy impact assessments',
            'Coordinate PIA completion with project teams',
            'Review and approve privacy impact assessments',
            'Ensure recommendations are implemented',
            'Maintain PIA documentation and records',
            'Update PIA procedures based on regulatory changes'
          ],
          regulations: ['GDPR', 'CCPA', 'General'],
          resources: [
            { title: 'PIA Template', type: 'template', url: '/resources/pia-template' },
            { title: 'Risk Assessment Guide', type: 'guide', url: '/resources/risk-assessment' },
            { title: 'PIA Training Module', type: 'training', url: '/training/privacy-impact' }
          ],
          dependencies: ['Project team cooperation', 'Technical specifications', 'Legal guidance']
        },
        {
          id: 'vendor-oversight',
          title: 'Third-Party Vendor Privacy Assessment',
          description: 'Assess and monitor third-party vendors for privacy compliance and data protection',
          category: 'Vendor Management',
          frequency: 'Annual assessment, ongoing monitoring',
          deadline: 'June 30, 2025',
          status: 'upcoming',
          priority: 'high',
          estimatedHours: 10,
          actions: [
            'Review existing vendor agreements for privacy provisions',
            'Conduct comprehensive privacy assessments of vendors',
            'Update data processing agreements and contracts',
            'Monitor ongoing vendor compliance and performance',
            'Coordinate vendor security audits and reviews',
            'Document vendor assessment results and recommendations'
          ],
          regulations: ['FERPA', 'COPPA', 'CCPA'],
          resources: [
            { title: 'Vendor Assessment Tool', type: 'tool', url: '/privacy/vendors' },
            { title: 'DPA Template', type: 'template', url: '/resources/dpa-template' },
            { title: 'Vendor Security Standards', type: 'guide', url: '/resources/vendor-security' }
          ],
          dependencies: ['Vendor cooperation', 'Contract renewal schedules', 'Legal review']
        }
      ]
    },
    staff: {
      title: 'Staff Privacy Duties',
      icon: <Users className="h-6 w-6 text-green-600" />,
      color: 'green',
      description: 'Daily privacy practices and data handling responsibilities',
      estimatedTime: '30 minutes per week',
      duties: [
        {
          id: 'data-protection',
          title: 'Student Data Protection in Daily Activities',
          description: 'Protect student information in all daily activities and communications',
          category: 'Data Handling',
          frequency: 'Daily awareness and practice',
          deadline: 'Ongoing',
          status: 'active',
          priority: 'critical',
          estimatedHours: 1,
          actions: [
            'Follow established data handling procedures in all activities',
            'Secure physical and digital student records appropriately',
            'Verify identity before sharing student information',
            'Use approved communication channels for sensitive information',
            'Report suspicious activities or potential security threats',
            'Participate in privacy training and awareness programs'
          ],
          regulations: ['FERPA', 'COPPA'],
          resources: [
            { title: 'Data Handling Quick Reference', type: 'guide', url: '/resources/data-handling' },
            { title: 'Secure Communication Guidelines', type: 'procedure', url: '/resources/secure-communication' },
            { title: 'Privacy Awareness Training', type: 'training', url: '/training/privacy-awareness' }
          ],
          dependencies: ['Administrative support', 'Technology tools', 'Clear procedures']
        },
        {
          id: 'incident-reporting',
          title: 'Privacy Incident Recognition & Reporting',
          description: 'Recognize and report potential privacy incidents or security concerns promptly',
          category: 'Incident Response',
          frequency: 'As needed, immediate reporting',
          deadline: 'Immediate upon discovery',
          status: 'active',
          priority: 'critical',
          estimatedHours: 0.5,
          actions: [
            'Learn to recognize potential privacy incidents and violations',
            'Report incidents to privacy officer immediately upon discovery',
            'Document circumstances and details of observed incidents',
            'Cooperate fully with incident investigation procedures',
            'Follow containment procedures while awaiting guidance',
            'Participate in post-incident review and improvement processes'
          ],
          regulations: ['FERPA', 'SHIELD', 'General'],
          resources: [
            { title: 'Incident Reporting Portal', type: 'tool', url: '/privacy/incidents' },
            { title: 'Incident Recognition Guide', type: 'guide', url: '/resources/incident-recognition' },
            { title: 'Emergency Contact Information', type: 'reference', url: '/resources/emergency-contacts' }
          ],
          dependencies: ['Clear reporting channels', 'Management support', 'Investigation procedures']
        },
        {
          id: 'consent-compliance',
          title: 'Consent and Authorization Verification',
          description: 'Ensure proper consent and authorization before collecting or sharing student data',
          category: 'Consent Management',
          frequency: 'Per activity requiring data collection/sharing',
          deadline: 'Before each data collection or sharing activity',
          status: 'active',
          priority: 'high',
          estimatedHours: 2,
          actions: [
            'Verify consent status before sharing student information',
            'Check directory information opt-out preferences',
            'Document consent basis for data collection activities',
            'Respect and honor consent withdrawal requests',
            'Maintain current knowledge of consent requirements',
            'Coordinate with privacy office for consent questions'
          ],
          regulations: ['FERPA', 'COPPA', 'CCPA'],
          resources: [
            { title: 'Consent Management Portal', type: 'tool', url: '/privacy/consent' },
            { title: 'Consent Verification Checklist', type: 'checklist', url: '/resources/consent-checklist' },
            { title: 'Directory Information Guidelines', type: 'guide', url: '/resources/directory-guidelines' }
          ],
          dependencies: ['Consent tracking system', 'Parent communication', 'Clear procedures']
        }
      ]
    },
    student: {
      title: 'Student Privacy Rights & Responsibilities',
      icon: <GraduationCap className="h-6 w-6 text-amber-600" />,
      color: 'amber',
      description: 'Understanding and exercising your privacy rights as a student',
      estimatedTime: '1-2 hours initially, then as needed',
      duties: [
        {
          id: 'rights-awareness',
          title: 'Understanding Your Privacy Rights Under FERPA',
          description: 'Learn about your rights regarding personal and educational data as a student',
          category: 'Rights Education',
          frequency: 'Initial learning, annual review',
          deadline: 'Knowledge-based, no specific deadline',
          status: 'active',
          priority: 'medium',
          estimatedHours: 2,
          actions: [
            'Learn about your FERPA rights as a student (18+)',
            'Understand what constitutes directory information',
            'Know how to inspect and review your education records',
            'Understand the process for requesting record corrections',
            'Learn about your right to file privacy complaints',
            'Understand how to control directory information disclosure'
          ],
          regulations: ['FERPA', 'CCPA'],
          resources: [
            { title: 'Student Rights Guide', type: 'guide', url: '/resources/student-rights' },
            { title: 'FERPA Rights Overview', type: 'training', url: '/training/ferpa-rights' },
            { title: 'Data Rights Exercise Portal', type: 'tool', url: '/data-rights' }
          ],
          dependencies: ['Educational materials', 'Access to records office', 'Privacy office support']
        },
        {
          id: 'digital-privacy',
          title: 'Digital Privacy and Online Safety Management',
          description: 'Manage your digital footprint and online privacy settings effectively',
          category: 'Digital Safety',
          frequency: 'Monthly review and updates',
          deadline: 'Monthly check recommended',
          status: 'pending',
          priority: 'medium',
          estimatedHours: 1,
          actions: [
            'Review and adjust social media privacy settings regularly',
            'Manage educational app permissions and data sharing',
            'Understand how your data is collected and used online',
            'Protect personal information in digital communications',
            'Use strong passwords and enable two-factor authentication',
            'Report concerns about online privacy or safety'
          ],
          regulations: ['General Privacy', 'COPPA'],
          resources: [
            { title: 'Digital Privacy Checklist', type: 'checklist', url: '/resources/digital-privacy' },
            { title: 'Online Safety Training', type: 'training', url: '/training/online-safety' },
            { title: 'Privacy Settings Guide', type: 'guide', url: '/resources/privacy-settings' }
          ],
          dependencies: ['Technology access', 'Digital literacy', 'Support resources']
        },
        {
          id: 'data-rights-exercise',
          title: 'Exercising Your Data Privacy Rights',
          description: 'Learn how to exercise your rights to access, correct, or control your personal data',
          category: 'Rights Exercise',
          frequency: 'As needed',
          deadline: 'No deadline, available when needed',
          status: 'available',
          priority: 'medium',
          estimatedHours: 1,
          actions: [
            'Learn how to submit data access requests',
            'Understand the process for requesting data corrections',
            'Know how to opt-out of directory information disclosure',
            'Understand data portability and deletion rights (where applicable)',
            'Learn about complaint processes and procedures',
            'Practice using the data rights request portal'
          ],
          regulations: ['FERPA', 'CCPA', 'GDPR'],
          resources: [
            { title: 'Data Rights Request Portal', type: 'tool', url: '/data-rights' },
            { title: 'Request Submission Guide', type: 'guide', url: '/resources/request-guide' },
            { title: 'Rights Exercise Training', type: 'training', url: '/training/rights-exercise' }
          ],
          dependencies: ['Portal access', 'Understanding of rights', 'Support when needed']
        }
      ]
    }
  };

  const allDuties = Object.values(stakeholderDuties).flatMap((role, roleIndex) => 
    role.duties.map((duty, dutyIndex) => ({ 
      ...duty, 
      roleTitle: role.title, 
      roleColor: role.color,
      roleDescription: role.description,
      roleEstimatedTime: role.estimatedTime,
      roleIndex,
      dutyIndex
    }))
  );

  const filteredDuties = selectedRole === 'all' ? allDuties : 
    stakeholderDuties[selectedRole as keyof typeof stakeholderDuties]?.duties.map((duty, index) => ({
      ...duty,
      roleTitle: stakeholderDuties[selectedRole as keyof typeof stakeholderDuties].title,
      roleColor: stakeholderDuties[selectedRole as keyof typeof stakeholderDuties].color,
      roleDescription: stakeholderDuties[selectedRole as keyof typeof stakeholderDuties].description,
      roleEstimatedTime: stakeholderDuties[selectedRole as keyof typeof stakeholderDuties].estimatedTime,
      roleIndex: 0,
      dutyIndex: index
    })) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'active':
        return <Eye className="h-4 w-4 text-purple-500" />;
      case 'available':
        return <Target className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge className={
        status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
        status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
        status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
        status === 'active' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
        status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
        'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
      }>
        {status === 'in-progress' ? 'In Progress' : 
         status === 'available' ? 'Available' :
         status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    return (
      <Badge className={
        priority === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
        priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
        priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      }>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'template':
        return <FileText className="h-3 w-3" />;
      case 'guide':
        return <BookOpen className="h-3 w-3" />;
      case 'training':
        return <GraduationCap className="h-3 w-3" />;
      case 'tool':
        return <Target className="h-3 w-3" />;
      case 'checklist':
        return <CheckCircle className="h-3 w-3" />;
      case 'procedure':
        return <Settings className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  const startDuty = (dutyId: string) => {
    setActiveDuty(dutyId);
    updateDutyProgress(dutyId, 10); // Start with 10% progress
  };

  const markDutyComplete = (dutyId: string) => {
    updateDutyProgress(dutyId, 100);
    setActiveDuty(null);
  };

  // Calculate overall progress for selected role
  const calculateRoleProgress = () => {
    if (selectedRole === 'all') return 0;
    const roleDuties = stakeholderDuties[selectedRole as keyof typeof stakeholderDuties]?.duties || [];
    const totalProgress = roleDuties.reduce((sum, duty) => sum + (dutyProgress[duty.id] || 0), 0);
    return Math.round(totalProgress / roleDuties.length) || 0;
  };

  const roleProgress = calculateRoleProgress();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Privacy Duties & Responsibilities</h1>
        <p className="text-muted-foreground">
          Understand and fulfill your privacy responsibilities. Select your role to view specific duties and compliance requirements.
        </p>
      </div>

      {/* Role Selection and Progress Overview */}
      <div className="bg-primary/5 rounded-lg border border-primary/20 p-6 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <Info className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-foreground mb-1">Your Privacy Duties</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Everyone in an educational institution has privacy responsibilities. Select your role below to see your specific duties under FERPA, COPPA, and other applicable regulations.
            </p>
            
            {/* Role Progress */}
            {selectedRole !== 'all' && (
              <div className="bg-card/50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">Role Progress</span>
                  <span className="text-sm text-primary">{roleProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${roleProgress}%` }}
                  />
                </div>
                <p className="text-xs text-primary mt-2">
                  {filteredDuties.filter(d => completedDuties.includes(d.id)).length} of {filteredDuties.length} duties completed
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Role Selection Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant={selectedRole === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedRole('all')}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            All Roles
          </Button>
          {Object.entries(stakeholderDuties).map(([roleKey, role]) => (
            <Button
              key={roleKey}
              variant={selectedRole === roleKey ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRole(roleKey)}
              className="flex items-center gap-2"
            >
              {role.icon}
              <span className="hidden sm:inline">{role.title}</span>
              <span className="sm:hidden">{role.title.split(' ')[0]}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Role Overview (when specific role selected) */}
      {selectedRole !== 'all' && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-3 bg-${stakeholderDuties[selectedRole as keyof typeof stakeholderDuties].color}-100 dark:bg-${stakeholderDuties[selectedRole as keyof typeof stakeholderDuties].color}-900/30 rounded-lg`}>
              {stakeholderDuties[selectedRole as keyof typeof stakeholderDuties].icon}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">
                {stakeholderDuties[selectedRole as keyof typeof stakeholderDuties].title}
              </h2>
              <p className="text-muted-foreground mb-3">
                {stakeholderDuties[selectedRole as keyof typeof stakeholderDuties].description}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Estimated time: {stakeholderDuties[selectedRole as keyof typeof stakeholderDuties].estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span>{filteredDuties.length} duties</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span>{roleProgress}% complete</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Tracker for Role */}
          <ProgressTracker
            steps={filteredDuties.map(duty => ({
              id: duty.id,
              title: duty.title,
              description: duty.category,
              status: completedDuties.includes(duty.id) ? 'completed' : 
                     activeDuty === duty.id ? 'current' : 'upcoming',
              progress: dutyProgress[duty.id] || 0
            }))}
            orientation="horizontal"
            showProgress={true}
          />
        </div>
      )}

      {/* Duties List */}
      <div className="space-y-6">
        {filteredDuties.map((duty) => (
          <div key={duty.id} className="bg-white dark:bg-gray-900 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
            {/* Duty Header */}
            <div className="p-6 border-b">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{duty.title}</h3>
                    {selectedRole === 'all' && (
                      <Badge className={`bg-${duty.roleColor}-100 text-${duty.roleColor}-800 dark:bg-${duty.roleColor}-900/30 dark:text-${duty.roleColor}-300`}>
                        {duty.roleTitle}
                      </Badge>
                    )}
                    {getStatusBadge(duty.status)}
                    {getPriorityBadge(duty.priority)}
                  </div>
                  <p className="text-muted-foreground mb-4">{duty.description}</p>
                  
                  {/* Duty Metadata */}
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Frequency:</span>
                        <div className="text-muted-foreground">{duty.frequency}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Deadline:</span>
                        <div className="text-muted-foreground">{duty.deadline}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Category:</span>
                        <div className="text-muted-foreground">{duty.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium">Est. Time:</span>
                        <div className="text-muted-foreground">{duty.estimatedHours}h</div>
                      </div>
                    </div>
                  </div>

                  {/* Applicable Regulations */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {duty.regulations.map(reg => (
                      <Badge key={reg} variant={reg.toLowerCase() as any}>
                        {reg}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Progress Circle */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
                      <circle
                        cx="16"
                        cy="16"
                        r="12"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="16"
                        cy="16"
                        r="12"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 12}`}
                        strokeDashoffset={`${2 * Math.PI * 12 * (1 - (dutyProgress[duty.id] || 0) / 100)}`}
                        className="text-primary-600 dark:text-primary-400 transition-all duration-300"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium">{dutyProgress[duty.id] || 0}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">Progress</span>
                </div>
              </div>
            </div>

            {/* Duty Content */}
            <div className="p-6">
              {/* Required Actions */}
              <div className="mb-6">
                <h4 className="font-medium text-sm mb-4 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Required Actions ({duty.actions.length} steps)
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {duty.actions.map((action, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium">{index + 1}</span>
                      </div>
                      <span className="text-sm">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dependencies */}
              {duty.dependencies && duty.dependencies.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-sm mb-3 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                    Dependencies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {duty.dependencies.map((dep, index) => (
                      <span key={index} className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              <div className="mb-6">
                <h4 className="font-medium text-sm mb-3 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                  Resources & Tools
                </h4>
                <div className="grid md:grid-cols-3 gap-3">
                  {duty.resources.map((resource, index) => (
                    <Link key={index} to={resource.url} className="block">
                      <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          {getResourceIcon(resource.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-xs">{resource.title}</h5>
                          <p className="text-xs text-muted-foreground capitalize">{resource.type}</p>
                        </div>
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {!completedDuties.includes(duty.id) ? (
                  <>
                    {activeDuty !== duty.id ? (
                      <Button 
                        size="sm" 
                        onClick={() => startDuty(duty.id)}
                        className="flex items-center gap-2"
                      >
                        <Play className="h-4 w-4" />
                        Start Task
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        onClick={() => markDutyComplete(duty.id)}
                        className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Mark Complete
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateDutyProgress(duty.id, Math.min((dutyProgress[duty.id] || 0) + 25, 100))}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Update Progress
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Completed</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const newCompleted = completedDuties.filter(id => id !== duty.id);
                        setCompletedDuties(newCompleted);
                        localStorageService.setItem('completed_duties', newCompleted);
                        updateDutyProgress(duty.id, 75);
                      }}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                )}
                
                <Link to={`/training?topic=${duty.category.toLowerCase().replace(' ', '-')}`}>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Training
                  </Button>
                </Link>
                
                <Button variant="outline" size="sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Get Help
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Progress Summary */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
          Privacy Duties Progress Summary
        </h2>
        
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {Object.entries(stakeholderDuties).map(([roleKey, role]) => {
            const roleDuties = role.duties;
            const roleCompleted = roleDuties.filter(d => completedDuties.includes(d.id)).length;
            const roleProgressPercent = Math.round((roleCompleted / roleDuties.length) * 100) || 0;
            
            return (
              <div key={roleKey} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className={`p-3 bg-${role.color}-100 dark:bg-${role.color}-900/30 rounded-lg w-fit mx-auto mb-3`}>
                  {role.icon}
                </div>
                <h3 className="font-medium text-sm mb-1">{role.title}</h3>
                <div className="text-2xl font-bold mb-1">{roleProgressPercent}%</div>
                <div className="text-xs text-muted-foreground">
                  {roleCompleted}/{roleDuties.length} duties
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2">
                  <div 
                    className={`bg-${role.color}-500 h-1 rounded-full transition-all duration-300`}
                    style={{ width: `${roleProgressPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievement Badges */}
        <div className="flex flex-wrap gap-3 justify-center">
          {completedDuties.length >= 5 && (
            <div className="flex items-center gap-2 bg-gold-100 dark:bg-yellow-900/30 text-gold-800 dark:text-yellow-300 px-3 py-2 rounded-full">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Privacy Champion</span>
            </div>
          )}
          {completedDuties.length >= 10 && (
            <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-2 rounded-full">
              <Award className="h-4 w-4" />
              <span className="text-sm font-medium">Compliance Expert</span>
            </div>
          )}
          {Object.values(stakeholderDuties).every(role => 
            role.duties.every(duty => completedDuties.includes(duty.id))
          ) && (
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-2 rounded-full">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Privacy Master</span>
            </div>
          )}
        </div>
      </div>

      {/* Support Resources */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border p-8">
        <h2 className="text-xl font-semibold mb-4">Need Help with Your Privacy Duties?</h2>
        <p className="text-muted-foreground mb-6">
          Access comprehensive training materials, templates, and expert support to help you fulfill your privacy responsibilities effectively and confidently.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Link to="/training">
            <Button variant="outline" className="w-full justify-start h-auto py-3">
              <GraduationCap className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Training Library</div>
                <div className="text-xs text-muted-foreground">Interactive courses</div>
              </div>
            </Button>
          </Link>
          <Link to="/resources/tools-templates">
            <Button variant="outline" className="w-full justify-start h-auto py-3">
              <FileText className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Templates & Tools</div>
                <div className="text-xs text-muted-foreground">Ready-to-use resources</div>
              </div>
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="w-full justify-start h-auto py-3">
              <Mail className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Expert Support</div>
                <div className="text-xs text-muted-foreground">Get personalized help</div>
              </div>
            </Button>
          </Link>
          <Link to="/privacy/dashboard">
            <Button variant="outline" className="w-full justify-start h-auto py-3">
              <Shield className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Privacy Portal</div>
                <div className="text-xs text-muted-foreground">Full management suite</div>
              </div>
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-4 border-t">
          <h3 className="font-medium mb-3">Quick Links</h3>
          <div className="flex flex-wrap gap-2">
            <Link to="/faq">
              <Button variant="outline" size="sm">
                <HelpCircle className="h-4 w-4 mr-2" />
                Privacy FAQ
              </Button>
            </Link>
            <Link to="/privacy/obligations">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Compliance Calendar
              </Button>
            </Link>
            <Link to="/privacy/incidents">
              <Button variant="outline" size="sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Incident
              </Button>
            </Link>
            <Link to="/data-rights">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Exercise Rights
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}