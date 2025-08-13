import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, Mail, Shield, Scale, Gavel, AlertTriangle, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useBrand } from '../hooks/useBrand';

export function LegalPage() {
  const { brand } = useBrand();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />
        
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Legal Information</h1>
            <p className="text-muted-foreground">
              Important legal notices and regulatory information for {brand.productNameWithTM}
            </p>
          </div>

          <div className="bg-card rounded-lg border p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Gavel className="h-6 w-6 mr-2 text-primary" />
                1. Legal Notices
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {brand.productNameWithTM} is a product of {brand.legal.companyName}, a company registered in the {brand.legal.country}. All rights reserved.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The information provided on this platform is for general informational and educational purposes only and does not constitute legal advice. {brand.legal.companyName} is not a law firm, and the content available on {brand.productNameWithTM} does not establish an attorney-client relationship.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                While we strive to keep the information on this platform accurate, complete, and current, {brand.legal.companyName} makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the platform or the information, products, services, or related graphics contained on the platform for any purpose.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Any reliance you place on such information is therefore strictly at your own risk. In no event will {brand.legal.companyName} be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-primary-600" />
                3. Regulatory Compliance Information
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {brand.productNameWithTM} is designed to assist educational institutions with their privacy and data protection compliance efforts. However, the use of our platform does not guarantee compliance with any specific law or regulation, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Family Educational Rights and Privacy Act (FERPA)</li>
                  <li>Children's Online Privacy Protection Act (COPPA)</li>
                  <li>General Data Protection Regulation (GDPR)</li>
                  <li>Health Insurance Portability and Accountability Act (HIPAA)</li>
                  <li>Protection of Pupil Rights Amendment (PPRA)</li>
                  <li>State-specific privacy laws and regulations</li>
                </ul>
                <p>
                  Institutions are responsible for ensuring their own compliance with applicable laws and regulations, and should consult with qualified legal counsel regarding their specific compliance requirements.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  All content on this platform, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of {brand.legal.companyName} or its content suppliers and is protected by international copyright laws.
                </p>
                <p>
                  The compilation of all content on this platform is the exclusive property of {brand.legal.companyName} and is protected by international copyright laws. All software used on this platform is the property of {brand.legal.companyName} or its software suppliers and is protected by international copyright laws.
                </p>
                <p>
                  {brand.productNameWithTM} and other trademarks, service marks, graphics, and logos used in connection with our platform are trademarks or registered trademarks of {brand.legal.companyName}. Other trademarks, service marks, graphics, and logos used in connection with our platform may be the trademarks of other third parties.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Scale className="h-6 w-6 mr-2 text-primary-600" />
                5. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                To the fullest extent permitted by applicable law, {brand.legal.companyName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the platform; (ii) any conduct or content of any third party on the platform; (iii) any content obtained from the platform; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-primary-600" />
                6. Regulatory Warning
              </h2>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
                <p className="text-amber-800 dark:text-amber-300 font-medium mb-2">Important Notice</p>
                <p className="text-amber-700 dark:text-amber-400 mb-4">
                  Educational privacy regulations are complex and subject to change. The content provided on this platform should not be considered exhaustive or a substitute for qualified legal advice. Educational institutions are strongly encouraged to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-amber-700 dark:text-amber-400">
                  <li>Consult with legal counsel experienced in educational privacy laws</li>
                  <li>Regularly review official guidance from relevant regulatory bodies</li>
                  <li>Develop institution-specific policies and procedures</li>
                  <li>Stay informed about regulatory changes that may impact compliance obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                {brand.productNameWithTM} may contain links to third-party websites or services that are not owned or controlled by {brand.legal.companyName}. {brand.legal.companyName} has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that {brand.legal.companyName} shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Legal Notices and your use of the {brand.productNameWithTM} platform shall be governed by and construed in accordance with the laws of the State of {brand.legal.state}, {brand.legal.country}, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Legal Notices will not be considered a waiver of those rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Legal Notices</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Legal Notices at any time. By continuing to access or use our platform after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Legal Notices, please contact us:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-primary-600" />
                    <span>Email: {brand.contact.legalEmail}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary-600" />
                    <span>Address: {brand.contact.address}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <Link to="/terms">
              <Button variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Terms of Service
              </Button>
            </Link>
            <Link to="/privacy">
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Privacy Policy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}