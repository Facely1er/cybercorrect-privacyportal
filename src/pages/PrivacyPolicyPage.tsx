import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, Mail, Shield, Lock, Database } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useBrand } from '../hooks/useBrand';

export function PrivacyPolicyPage() {
  const { brand } = useBrand();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        <div className="max-w-4xl">
          <div className="mb-8">
            <Link to="/register" className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Registration
            </Link>
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Effective Date: January 1, 2025 | Last Updated: January 1, 2025
            </p>
          </div>

          <div className="bg-card rounded-lg border p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-primary" />
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {brand.productNameWithTM} is an educational platform that provides:
                This Privacy Policy is designed to help you understand how we collect, use, disclose, 
                and safeguard your information when you use our educational compliance platform.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As an educational technology provider, we understand the importance of privacy in the educational 
                sector and are committed to compliance with applicable laws including FERPA, COPPA, GDPR, and other 
                relevant privacy regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <h3 className="text-lg font-medium">a. Information you provide to us:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Account information (name, email address, password)</li>
                  <li>Professional information (role, institution, department)</li>
                  <li>Profile information (avatar, biography)</li>
                  <li>Assessment responses and training progress</li>
                  <li>Content you create, upload, or share on the platform</li>
                </ul>
                
                <h3 className="text-lg font-medium">b. Information automatically collected:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Device information (browser type, operating system, IP address)</li>
                  <li>Usage data (pages visited, features used, time spent)</li>
                  <li>Performance data (crashes, system activity, hardware settings)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 leading-relaxed">
                <li>To provide, maintain, and improve our services</li>
                <li>To personalize your experience and deliver relevant content</li>
                <li>To track your progress through assessments and training modules</li>
                <li>To communicate with you about our services, updates, and policy changes</li>
                <li>To understand how users interact with our platform</li>
                <li>To detect, prevent, and address technical issues and security threats</li>
                <li>To comply with legal obligations and enforce our terms of service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. How We Share Your Information</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>We may share information in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With your institution or organization (if you are affiliated with one)</li>
                  <li>With service providers who perform services on our behalf</li>
                  <li>For legal purposes, including to comply with laws or legal processes</li>
                  <li>In connection with a merger, sale, or acquisition of all or a portion of our company</li>
                </ul>
                <p>
                  We do not sell your personal information to third parties, and we do not share your 
                  information with third parties for their direct marketing purposes without your consent.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Lock className="h-6 w-6 mr-2 text-primary-600" />
                5. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement a variety of security measures to maintain the safety of your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 leading-relaxed mt-4">
                <li>Encryption of transmitted data</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication measures</li>
                <li>Regular backups and disaster recovery planning</li>
                <li>Employee training on data security practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The right to access and receive a copy of your personal information</li>
                  <li>The right to correct or update your personal information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to restrict or object to processing of your personal information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Database className="h-6 w-6 mr-2 text-primary-600" />
                7. Data Retention
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined 
                in this Privacy Policy, unless a longer retention period is required or permitted by law. 
                When we no longer need to use your information, we will securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not knowingly collect personal information from children under 13 without appropriate 
                parental consent. If you are a parent or guardian and believe that your child has provided us 
                with personal information without your consent, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the effective date at the top of this page. 
                You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-primary-600" />
                    <span>Email: {brand.contact.privacyEmail}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary-600" />
                    <span>Address: {brand.contact.address}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link to="/register">
              <Button className="bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Registration
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}