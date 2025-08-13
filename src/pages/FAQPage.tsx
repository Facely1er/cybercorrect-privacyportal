import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, ArrowLeft, HelpCircle, MessageSquare, Shield, Lock, Laptop, Mail, BookOpen, FileText, Target } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useBrand } from '../hooks/useBrand';

// Interface for FAQ items
interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  category: 'general' | 'account' | 'privacy' | 'technical' | 'compliance';
}

export function FAQPage() {
  const { brand } = useBrand();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Reset expanded state when filters change
  useEffect(() => {
    setExpandedItems({});
  }, [searchTerm, activeCategory]);

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqData: FAQItem[] = [
    // General questions
    {
      id: 'what-is-product-name',
      question: `What is ${brand.productNameWithTM}?`,
      answer: (
        <>
          <p>
            {brand.productNameWithTM} is a comprehensive educational compliance platform designed to help schools and educational
            institutions navigate privacy regulations and protect student data. Our platform offers:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Role-specific privacy assessments</li>
            <li>Interactive training modules</li>
            <li>Compliance tracking tools</li>
            <li>Downloadable resources and templates</li>
            <li>Certification programs</li>
          </ul>
          <p className="mt-2">
            We focus on regulations such as FERPA, COPPA, GDPR, and other privacy laws that impact educational institutions.
          </p>
        </>
      ),
      category: 'general'
    },
    {
      id: 'who-should-use',
      question: `Who should use ${brand.productNameWithTM}?`,
      answer: (
        <>
          <p>{brand.productNameWithTM} is designed for all stakeholders in educational institutions, including:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Administrators:</strong> Principals, superintendents, and other leadership responsible for compliance</li>
            <li><strong>Teachers:</strong> Classroom educators who handle student information</li>
            <li><strong>IT Staff:</strong> Technology personnel managing systems and data security</li>
            <li><strong>Students:</strong> Learners who need to understand their privacy rights</li>
          </ul>
          <p className="mt-2">
            Our platform provides role-specific content tailored to each user's responsibilities and needs.
          </p>
        </>
      ),
      category: 'general'
    },
    {
      id: 'cost',
      question: `How much does ${brand.productNameWithTM} cost?`,
      answer: (
        <>
          <p>
            {brand.productNameWithTM} offers flexible pricing models designed to accommodate educational institutions of all sizes:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Basic:</strong> Free access to limited assessments and resources</li>
            <li><strong>Standard:</strong> Per-user pricing with full access to assessments, training, and resources</li>
            <li><strong>Enterprise:</strong> Custom pricing for district-wide or multi-campus implementation with advanced features</li>
          </ul>
          <p className="mt-2">
            For detailed pricing information, please <Link to="/contact" className="text-primary-600 hover:underline">contact our sales team</Link>.
          </p>
        </>
      ),
      category: 'general'
    },
    
    // Account questions
    {
      id: 'create-account',
      question: 'How do I create an account?',
      answer: (
        <>
          <p>Creating an account with {brand.productNameWithTM} is simple:</p>
          <ol className="list-decimal ml-6 mt-2 space-y-1">
            <li>Click on "Register" in the top navigation bar</li>
            <li>Enter your email address and create a password</li>
            <li>Select your role (Administrator, Teacher, IT Staff, or Student)</li>
            <li>Provide your name and organization (if applicable)</li>
            <li>Review and accept the Terms of Service and Privacy Policy</li>
            <li>Click "Create Account"</li>
          </ol>
          <p className="mt-2">
            You'll receive a verification email to confirm your account. Once verified, you can log in and access all features appropriate for your role.
          </p>
        </>
      ),
      category: 'account'
    },
    {
      id: 'forgot-password',
      question: 'I forgot my password. How do I reset it?',
      answer: (
        <>
          <p>To reset your password:</p>
          <ol className="list-decimal ml-6 mt-2 space-y-1">
            <li>Click on "Login" in the top navigation bar</li>
            <li>Click the "Forgot Password" link below the login form</li>
            <li>Enter your email address and click "Send Reset Link"</li>
            <li>Check your email for a password reset link</li>
            <li>Click the link and create a new password</li>
          </ol>
          <p className="mt-2">
            The reset link expires after 24 hours for security purposes. If you don't receive the email within a few minutes, check your spam folder or contact support.
          </p>
        </>
      ),
      category: 'account'
    },
    {
      id: 'change-role',
      question: 'Can I change my role after registration?',
      answer: (
        <p>
          For security and content integrity reasons, roles cannot be changed directly by users. If you need to change your role (e.g., from Teacher to Administrator), please contact our support team through the <Link to="/contact" className="text-primary-600 hover:underline">Contact page</Link>. We'll verify your request and update your account accordingly.
        </p>
      ),
      category: 'account'
    },
    
    // Privacy questions
    {
      id: 'data-protection',
      question: `How does ${brand.productNameWithTM} protect my data?`,
      answer: (
        <>
          <p>{brand.productNameWithTM} implements robust data protection measures in line with educational privacy requirements:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Encryption:</strong> All data is encrypted at rest and in transit</li>
            <li><strong>Access Controls:</strong> Role-based access controls and least privilege principles</li>
            <li><strong>Data Minimization:</strong> We collect only necessary information for platform functionality</li>
            <li><strong>Regular Security Audits:</strong> Continuous monitoring and security assessments</li>
            <li><strong>Compliance:</strong> FERPA, COPPA, and GDPR compliant infrastructure</li>
          </ul>
          <p className="mt-2">
            For more detailed information, please review our <Link to="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>.
          </p>
        </>
      ),
      category: 'privacy'
    },
    {
      id: 'student-data',
      question: `Does ${brand.productNameWithTM} store student data?`,
      answer: (
        <p>
          {brand.productNameWithTM} primarily collects account information and assessment/training progress data. We do not require or store student educational records unless specifically uploaded by authorized users as part of compliance documentation. Any student data handled by our platform is subject to strict privacy controls and is only accessible to authorized users within your institution. Our platform is designed to help you manage compliance with privacy regulations, not to act as a repository for sensitive student information.
        </p>
      ),
      category: 'privacy'
    },
    {
      id: 'data-deletion',
      question: 'How can I request data deletion?',
      answer: (
        <>
          <p>To request deletion of your account and associated data:</p>
          <ol className="list-decimal ml-6 mt-2 space-y-1">
            <li>Log into your account</li>
            <li>Navigate to Settings → Privacy</li>
            <li>Click on "Request Data Deletion"</li>
            <li>Follow the confirmation process</li>
          </ol>
          <p className="mt-2">
            Alternatively, you can contact our privacy team directly at <a href={`mailto:${brand.contact.privacyEmail}`} className="text-primary-600 hover:underline">{brand.contact.privacyEmail}</a>. For organizational accounts, an administrator must submit the data deletion request.
          </p>
          <p className="mt-2">
            Please note that certain information may be retained for legal and compliance purposes, as detailed in our Privacy Policy.
          </p>
        </>
      ),
      category: 'privacy'
    },
    
    // Technical questions
    {
      id: 'browser-compatibility',
      question: 'Which browsers are supported?',
      answer: (
        <>
          <p>{brand.productNameWithTM} supports the following browsers:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Google Chrome (latest 2 versions)</li>
            <li>Mozilla Firefox (latest 2 versions)</li>
            <li>Microsoft Edge (latest 2 versions)</li>
            <li>Apple Safari (latest 2 versions)</li>
          </ul>
          <p className="mt-2">
            For optimal performance and security, we recommend using the latest version of your preferred browser. Internet Explorer is not supported.
          </p>
        </>
      ),
      category: 'technical'
    },
    {
      id: 'offline-access',
      question: `Can I use ${brand.productNameWithTM} offline?`,
      answer: (
        <p>
          Yes, {brand.productNameWithTM} supports limited offline functionality. Once you've accessed training modules or assessments while online, you can continue to view and interact with this content during temporary internet outages. Your progress will be saved locally and synchronized with our servers when you reconnect. However, features requiring real-time server interaction (like downloading new resources or updating account settings) will be unavailable while offline.
        </p>
      ),
      category: 'technical'
    },
    {
      id: 'mobile-support',
      question: 'Is there a mobile app?',
      answer: (
        <p>
          Currently, {brand.productNameWithTM} is accessible via a responsive web application that works on both desktop and mobile browsers. While we don't offer dedicated mobile apps yet, our platform is fully optimized for mobile devices, allowing you to complete assessments, access training, and view resources on your smartphone or tablet. We're evaluating dedicated mobile apps for future releases based on user feedback.
        </p>
      ),
      category: 'technical'
    },
    
    // Compliance questions
    {
      id: 'compliance-certification',
      question: `Are ${brand.productNameWithTM} certificates recognized for compliance purposes?`,
      answer: (
        <>
          <p>
            {brand.productNameWithTM} certificates demonstrate completion of privacy training and assessments, which can be valuable documentation for your institution's compliance efforts. While our certificates are not government-issued credentials, they provide evidence of:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Staff training on privacy regulations and best practices</li>
            <li>Assessment of privacy knowledge and implementation</li>
            <li>Ongoing professional development in data protection</li>
          </ul>
          <p className="mt-2">
            Many educational institutions include these certificates in their compliance documentation to demonstrate due diligence in privacy protection efforts.
          </p>
        </>
      ),
      category: 'compliance'
    },
    {
      id: 'compliance-updates',
      question: 'How often is compliance content updated?',
      answer: (
        <p>
          We continuously monitor changes in privacy regulations affecting educational institutions. Our compliance content is reviewed monthly and updated whenever significant regulatory changes occur. Major updates to training modules and assessments are released quarterly, while minor updates and refinements occur more frequently. All updates are documented in our change logs, which are available in the platform's compliance resource section. We also send email notifications about significant regulatory changes to administrators.
        </p>
      ),
      category: 'compliance'
    },
    {
      id: 'compliance-audit',
      question: `Can ${brand.productNameWithTM} help with compliance audits?`,
      answer: (
        <>
          <p>Yes, {brand.productNameWithTM} provides several features that support compliance audits:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Compliance Tracking:</strong> Automated tracking of compliance activities and deadlines</li>
            <li><strong>Documentation Repository:</strong> Secure storage for compliance documentation</li>
            <li><strong>Training Records:</strong> Comprehensive records of staff training completion</li>
            <li><strong>Assessment Reports:</strong> Detailed reports of privacy assessments and remediation plans</li>
            <li><strong>Audit Logs:</strong> Records of system access and activity for verification</li>
            <li><strong>Export Capabilities:</strong> Easy export of reports in standard formats for auditors</li>
          </ul>
          <p className="mt-2">
            Our platform helps you demonstrate your institution's ongoing commitment to privacy compliance when undergoing internal or external audits.
          </p>
        </>
      ),
      category: 'compliance'
    }
  ];

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = searchTerm === '' || 
                         faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Count questions by category
  const categoryCounts: Record<string, number> = {
    all: faqData.length,
    general: faqData.filter(faq => faq.category === 'general').length,
    account: faqData.filter(faq => faq.category === 'account').length,
    privacy: faqData.filter(faq => faq.category === 'privacy').length,
    technical: faqData.filter(faq => faq.category === 'technical').length,
    compliance: faqData.filter(faq => faq.category === 'compliance').length
  };

  // Category information with icons
  const categories = [
    { id: 'all', name: 'All Categories', icon: <HelpCircle className="h-5 w-5" /> },
    { id: 'general', name: 'General', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'account', name: 'Account', icon: <Mail className="h-5 w-5" /> },
    { id: 'privacy', name: 'Privacy', icon: <Shield className="h-5 w-5" /> },
    { id: 'compliance', name: 'Compliance', icon: <Lock className="h-5 w-5" /> },
    { id: 'technical', name: 'Technical', icon: <Laptop className="h-5 w-5" /> }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">
              Find answers to common questions about {brand.productNameWithTM} and educational privacy compliance
            </p>
          </div>
          <Link to="/contact">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Support
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for questions or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm"
              />
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
                <Badge 
                  variant={activeCategory === category.id ? 'primary' : 'secondary'}
                  className="ml-1"
                >
                  {categoryCounts[category.id]}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4 mb-8">
        {filteredFAQs.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-12 text-center">
            <HelpCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No matching questions found</h2>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search term or category filter.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setActiveCategory('all');
            }}>
              Clear filters
            </Button>
          </div>
        ) : (
          filteredFAQs.map((faq) => (
            <div 
              key={faq.id} 
              className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                {expandedItems[faq.id] ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              {expandedItems[faq.id] && (
                <div className="px-6 pb-6 text-muted-foreground">
                  <div className="pt-2 pb-4">
                    <Badge variant={
                      faq.category === 'privacy' ? 'ferpa' :
                      faq.category === 'compliance' ? 'coppa' :
                      faq.category === 'technical' ? 'gdpr' : 'general'
                    }>
                      {faq.category}
                    </Badge>
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold mb-4">Didn't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is ready to assist with any questions or issues you may have regarding our platform.
          </p>
          <Link to="/contact" title="Contact our support team for personalized assistance">
            <Button className="bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-sm">
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </Link>
          
          <div className="mt-6 pt-4 border-t">
            <h3 className="font-medium mb-3">Additional Resources</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/how-it-works" title={`Learn how ${brand.productNameWithTM} works`}>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  How CyberCorrect Works
                </Button>
              </Link>
              <Link to="/training" title="Access self-paced training modules">
                <Button variant="outline" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Training Guides
                </Button>
              </Link>
              <Link to="/resources" title="Download helpful templates and guides">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Resource Library
                </Button>
              </Link>
              <Link to="/assessment" title="Test your knowledge with our assessments">
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20">
                  <Target className="h-4 w-4 mr-2" />
                  Contact CyberCorrect Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}