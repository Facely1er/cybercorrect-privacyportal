import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useBrand } from '../hooks/useBrand';

export function TermsPage() {
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
            <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
            <p className="text-muted-foreground">
              Effective Date: January 1, 2025 | Last Updated: January 1, 2025
            </p>
          </div>

          <div className="bg-card rounded-lg border p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <FileText className="h-6 w-6 mr-2 text-primary" />
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing or using CyberCorrect™ ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
                If you disagree with any part of these terms, then you may not access the Service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {brand.productNameWithTM} is provided by {brand.legal.companyName}, a privacy compliance technology company dedicated to 
                simplifying privacy education for educational institutions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {brand.productNameWithTM} is an educational platform that provides:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Privacy compliance assessments for educational institutions</li>
                <li>Interactive training modules on FERPA, COPPA, GDPR, and other regulations</li>
                <li>Compliance tracking and reporting tools</li>
                <li>Educational resources and templates</li>
                <li>Certification programs for privacy education</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts and Registration</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  To access certain features of the Service, you must register for an account. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use Policy</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
                  <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
                  <li>Share your account credentials with others</li>
                  <li>Upload or transmit viruses, malware, or other harmful code</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Use the Service to transmit spam or unsolicited communications</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Privacy and Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information 
                when you use our Service. By using the Service, you consent to the collection and use of information 
                in accordance with our Privacy Policy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As an educational compliance platform, we implement industry-standard security measures to protect 
                student and institutional data in accordance with FERPA, COPPA, and other applicable regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Service and its original content, features, and functionality are owned by CyberCorrect and are 
                  protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, or create derivative works of any part of the Service 
                  without our explicit written permission.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by applicable law, {brand.legal.companyName} shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether 
                incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, 
                resulting from your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your account and access to the Service immediately, without prior notice 
                or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
                provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-primary-600" />
                    <span>Email: {brand.contact.supportEmail}</span>
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