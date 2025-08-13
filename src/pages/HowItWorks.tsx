import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Database,
  Users,
  ArrowRight,
  CheckCircle,
  Target,
  FileText,
  Calendar,
  Mail,
  Eye,
  UserCheck,
  BarChart3,
  Building,
  AlertTriangle,
  Settings
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useBrand } from '../hooks/useBrand';

export function HowItWorksPage() {
  const { brand } = useBrand();

  const features = [
    {
      icon: Eye,
      title: 'Data Rights Exercise',
      description: 'Self-service portal for submitting and tracking data access, correction, deletion, and portability requests under FERPA, CCPA, GDPR, and other regulations.',
      link: '/data-rights'
    },
    {
      icon: UserCheck,
      title: 'Privacy Duties Management',
      description: 'Role-specific guidance and checklists for administrators, staff, and privacy officers on their privacy responsibilities and compliance obligations.',
      link: '/stakeholder-duties'
    },
    {
      icon: Database,
      title: 'Privacy Compliance Dashboard',
      description: 'Comprehensive overview of institutional privacy compliance status, metrics, and key performance indicators across all applicable regulations.',
      link: '/privacy/dashboard'
    },
    {
      icon: Building,
      title: 'Vendor Privacy Oversight',
      description: 'Tools for assessing and monitoring third-party vendors for privacy compliance, data processing agreements, and ongoing risk management.',
      link: '/privacy/vendors'
    },
    {
      icon: AlertTriangle,
      title: 'Incident Response Management',
      description: 'Streamlined workflows for reporting, investigating, and managing privacy incidents and data breaches with proper notification procedures.',
      link: '/privacy/incidents'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Advanced analytics and automated reporting capabilities for privacy program performance, compliance metrics, and regulatory reporting.',
      link: '/privacy/analytics'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Stakeholder Identification',
      description: 'Identify your role and understand your specific privacy rights and duties within the educational institution.',
      icon: Users,
      features: ['Role-based access control', 'Stakeholder verification', 'Rights identification', 'Duty assignment']
    },
    {
      step: 2,
      title: 'Rights Exercise & Duty Fulfillment',
      description: 'Use self-service tools to exercise data rights or fulfill privacy duties through guided workflows.',
      icon: Eye,
      features: ['Data rights requests', 'Privacy duty checklists', 'Compliance tracking', 'Progress monitoring']
    },
    {
      step: 3,
      title: 'Compliance Management',
      description: 'Monitor compliance status, track obligations, and manage ongoing privacy responsibilities.',
      icon: Shield,
      features: ['Compliance dashboards', 'Obligation tracking', 'Deadline management', 'Performance metrics']
    },
    {
      step: 4,
      title: 'Continuous Improvement',
      description: 'Analyze privacy program performance and implement improvements through analytics and reporting.',
      icon: BarChart3,
      features: ['Performance analytics', 'Compliance reporting', 'Risk assessment', 'Optimization recommendations']
    }
  ];

  const stakeholderJourneys = [
    {
      role: 'Students & Families',
      icon: <Users className="h-6 w-6 text-blue-600" />,
      steps: [
        'Access the data rights portal',
        'Submit data access or correction requests',
        'Track request status and responses',
        'Manage privacy settings and preferences'
      ],
      outcome: 'Complete control over personal data and privacy preferences'
    },
    {
      role: 'Staff & Teachers',
      icon: <UserCheck className="h-6 w-6 text-green-600" />,
      steps: [
        'Review privacy duties for your role',
        'Complete daily privacy checklists',
        'Report privacy incidents or concerns',
        'Manage consent records for your area'
      ],
      outcome: 'Confident compliance with privacy responsibilities'
    },
    {
      role: 'Administrators',
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      steps: [
        'Monitor institutional compliance dashboard',
        'Process data rights requests',
        'Manage stakeholder access and permissions',
        'Generate compliance reports for leadership'
      ],
      outcome: 'Complete institutional privacy program oversight'
    },
    {
      role: 'Privacy Officers',
      icon: <Database className="h-6 w-6 text-red-600" />,
      steps: [
        'Oversee all privacy operations',
        'Investigate privacy incidents',
        'Coordinate vendor assessments',
        'Ensure regulatory compliance'
      ],
      outcome: 'Expert-level privacy program management'
    }
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="container mx-auto px-4 py-8">

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            How the Privacy Portal Works
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {brand.fullBrandName} simplifies educational privacy compliance by providing self-service tools for stakeholders to understand their duties and exercise their data rights.
          </p>
        </div>

        {/* Overview Section */}
      </div>
    
      {/* Full-width Overview Section */}
      <section className="bg-muted/30 py-16 mb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Approach</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Understand & Identify</h3>
              <p className="text-muted-foreground">
                Identify your role and understand your specific privacy rights and duties within the educational institution.
              </p>
              <div className="mt-4">
                <Link to="/stakeholder-duties" title="Learn about your privacy duties">
                  <Button variant="outline" size="sm">
                    View my duties
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Eye className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Exercise & Fulfill</h3>
              <p className="text-muted-foreground">
                Use self-service tools to exercise data rights or fulfill privacy duties through guided workflows.
              </p>
              <div className="mt-4">
                <Link to="/data-rights" title="Exercise your data rights">
                  <Button variant="outline" size="sm">
                    Exercise rights
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <BarChart3 className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Monitor & Improve</h3>
              <p className="text-muted-foreground">
                Track compliance status, monitor privacy program performance, and implement continuous improvements.
              </p>
              <div className="mt-4">
                <Link to="/privacy/dashboard" title="Access privacy management dashboard">
                  <Button variant="outline" size="sm">
                    View dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stakeholder Journeys */}
      </div>
      
      {/* Stakeholder Journeys - Full Width Section */}
      <section className="w-full bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Stakeholder Journeys</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {stakeholderJourneys.map((journey, index) => (
              <div key={index} className="group bg-card rounded-xl border hover:border-primary/30 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8">
                  {journey.icon}
                </div>
                
                <div className="flex items-center mb-8 relative z-10">
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {journey.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">{journey.role}</h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mt-1"></div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8 relative z-10">
                  {journey.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-4 group/step">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover/step:scale-110 transition-transform duration-200">
                          <span className="text-sm font-bold">{stepIndex + 1}</span>
                        </div>
                        {stepIndex < journey.steps.length - 1 && (
                          <div className="absolute top-8 left-1/2 w-px h-6 bg-gradient-to-b from-primary/50 to-transparent transform -translate-x-1/2"></div>
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <span className="text-sm leading-relaxed group-hover/step:text-primary transition-colors duration-200">{step}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20 relative z-10 group-hover:from-primary/10 group-hover:via-primary/15 group-hover:to-primary/10 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="font-bold text-primary-800 dark:text-primary-300">Outcome</h4>
                  </div>
                  <p className="text-sm text-primary-700 dark:text-primary-400 leading-relaxed font-medium">{journey.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Core Features Section */}
      </div>
    
      {/* Full-width Core Features Section */}
      <section className="w-full bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Privacy Portal Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <feature.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <h3 className="font-semibold text-xl mb-2 text-center">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 text-center">{feature.description}</p>
                <Link to={feature.link} className="block" title={`Learn more about ${feature.title}`}>
                  <Button variant="outline" className="w-full">
                    Explore {feature.title} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width CTA Section */}
      <section className="w-full bg-primary-600 dark:bg-primary-700 py-16">
        <div className="container mx-auto px-4 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto">
            Join educational institutions worldwide that trust {brand.fullBrandName} to simplify compliance, protect student data, and empower stakeholders to exercise their privacy rights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/data-rights">
              <Button size="lg" className="font-medium bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-sm">
                Exercise Data Rights <Eye className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/privacy">
              <Button size="lg" variant="outline" className="font-medium border-white/50 text-white hover:bg-white/10 hover:border-white/70">
                Access Privacy Portal <Database className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}