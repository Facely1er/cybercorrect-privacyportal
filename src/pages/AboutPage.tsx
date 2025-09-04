import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Database, 
  Users, 
  CheckCircle, 
  FileText,
  Lock,
  Eye,
  Target,
  Building,
  UserCheck
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useBrand } from '../hooks/useBrand';

export function AboutPage() {
  const { brand } = useBrand();

  const portalFeatures = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: 'Data Rights Exercise',
      description: 'Self-service portal for students and families to exercise their privacy rights including access, correction, and deletion requests.',
      regulations: ['FERPA', 'CCPA', 'GDPR']
    },
    {
      icon: <UserCheck className="h-8 w-8 text-green-600" />,
      title: 'Stakeholder Duties',
      description: 'Role-specific guidance for administrators, staff, and privacy officers on their privacy responsibilities.',
      regulations: ['FERPA', 'COPPA', 'General']
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: 'Compliance Management',
      description: 'Comprehensive tools for tracking compliance obligations, incidents, and vendor assessments.',
      regulations: ['All Applicable']
    },
    {
      icon: <Building className="h-8 w-8 text-red-600" />,
      title: 'Vendor Oversight',
      description: 'Privacy assessment and monitoring tools for third-party educational technology vendors.',
      regulations: ['FERPA', 'COPPA', 'CCPA']
    }
  ];

  const stakeholderBenefits = [
    {
      role: 'Students & Families',
      icon: <Eye className="h-6 w-6 text-amber-500" />,
      benefits: [
        'Easy access to education records',
        'Simple data correction requests',
        'Privacy settings management',
        'Clear rights information'
      ]
    },
    {
      role: 'Staff Members',
      icon: <Users className="h-6 w-6 text-green-500" />,
      benefits: [
        'Clear privacy duty guidance',
        'Incident reporting tools',
        'Consent management support',
        'Daily practice guidelines'
      ]
    },
    {
      role: 'Administrators',
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      benefits: [
        'Institution-wide oversight',
        'Compliance monitoring',
        'Stakeholder management',
        'Privacy analytics and reporting'
      ]
    },
    {
      role: 'Privacy Officers',
      icon: <Lock className="h-6 w-6 text-purple-500" />,
      benefits: [
        'Data rights request processing',
        'Incident investigation tools',
        'Vendor assessment coordination',
        'Compliance tracking'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            About {brand.productNameWithTM}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {brand.fullBrandName} simplifies educational privacy compliance by providing self-service tools for stakeholders to understand their duties and exercise their data rights.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-800/40 rounded-full">
              <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-blue-900 dark:text-blue-300">Our Mission</h2>
              <p className="text-blue-700 dark:text-blue-400 text-lg mb-4">
                CyberCorrect™ empowers educational institutions to transform privacy compliance from a complex burden into a transparent, manageable process that builds trust with all stakeholders.
              </p>
              <p className="text-blue-700 dark:text-blue-400">
                We believe that privacy is a fundamental right, and our portal makes it easy for everyone—from students and families to administrators and staff—to understand their privacy duties and exercise their data rights with confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Portal Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Privacy Portal Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {portalFeatures.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg border p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {feature.regulations.map(reg => (
                    <span key={reg} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {reg}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stakeholder Benefits */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Benefits for Every Stakeholder</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {stakeholderBenefits.map((stakeholder, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {stakeholder.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{stakeholder.role}</h3>
                </div>
                <ul className="space-y-2">
                  {stakeholder.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Approach */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Privacy-First Approach</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full w-fit mx-auto mb-3">
                <Target className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium mb-2">Transparency</h3>
              <p className="text-sm text-muted-foreground">
                Clear communication about data collection, use, and sharing practices
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full w-fit mx-auto mb-3">
                <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium mb-2">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Easy-to-use tools that make privacy management accessible to all stakeholders
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full w-fit mx-auto mb-3">
                <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-medium mb-2">Protection</h3>
              <p className="text-sm text-muted-foreground">
                Robust safeguards to protect personal data and ensure regulatory compliance
              </p>
            </div>
          </div>
        </div>

        {/* Get Started */}
        <div className="text-center bg-gray-50 dark:bg-gray-900 rounded-lg border p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join educational institutions worldwide that trust {brand.productNameWithTM} to simplify compliance, protect student data, and empower stakeholders to exercise their privacy rights.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/privacy">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-sm">
                Access Privacy Portal <Database className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/data-rights">
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400">
                Exercise Data Rights <FileText className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              {brand.productNameWithTM} empowers educational institutions to transform privacy compliance from a complex burden into a transparent, manageable process that builds trust with all stakeholders.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/stakeholder-duties">
                <Button variant="outline" size="sm">
                  View My Duties
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="sm">
                  How It Works
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}