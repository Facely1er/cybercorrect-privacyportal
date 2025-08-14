import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, HelpCircle, Mail, CheckCircle, AlertCircle, Database, Eye, UserCheck, BarChart3, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLocalUser } from '../../hooks/useLocalUser';
import { useBrand } from '../../hooks/useBrand';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(null);
  const { localUser, saveNewsletterSubscription } = useLocalUser();
  const { brand } = useBrand();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSubscriptionSuccess(false);
    setSubscriptionError(null);
  };

  const handleSubscribe = () => {
    setSubscriptionSuccess(false);
    setSubscriptionError(null);
    
    if (!email) {
      setSubscriptionError('Please enter your email address');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionError('Please enter a valid email address');
      return;
    }
    
    setIsSubscribing(true);
    
    setTimeout(() => {
      setIsSubscribing(false);

      try {
        saveNewsletterSubscription(email);
        setSubscriptionSuccess(true);
        setEmail('');
        
        const subscribedEmails = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
        subscribedEmails.push({
          email,
          timestamp: new Date().toISOString(),
          userId: localUser?.id || 'anonymous'
        });
        localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscribedEmails));
      } catch (error) {
        console.error('Error saving subscription:', error);
        setSubscriptionError('Failed to save your subscription. Please try again.');
      }
    }, 1500);
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Brand */}
            <div className="space-y-3">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src={brand.logo.primary} 
                  alt={brand.logo.alt} 
                  className="h-12 w-12"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-sm leading-tight">CyberCorrect™</span>
                  <span className="font-medium text-xs leading-tight">Privacy Portal</span>
                  <span className="text-xs text-muted-foreground leading-tight">by ERMITS</span>
                </div>
              </Link>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {brand.description}
              </p>
              <div>
                <p className="text-xs text-muted-foreground">
                  © 2025 {brand.companyName}™ by ERMITS. All rights reserved.
                </p>
              </div>
            </div>

            {/* Privacy Portal Features */}
            <div>
              <h3 className="font-medium text-sm mb-3">Privacy Portal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/data-rights" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <Eye className="h-3 w-3" />
                    Exercise Data Rights
                  </Link>
                </li>
                <li>
                  <Link to="/stakeholder-duties" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <UserCheck className="h-3 w-3" />
                    My Privacy Duties
                  </Link>
                </li>
                <li>
                  <Link to="/privacy/dashboard" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <Database className="h-3 w-3" />
                    Privacy Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/privacy/stakeholders" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    Stakeholder Access
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <HelpCircle className="h-3 w-3" />
                    Privacy Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Privacy Management */}
            <div>
              <h3 className="font-medium text-sm mb-3">Privacy Management</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/privacy/obligations" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <FileText className="h-3 w-3" />
                    Compliance Obligations
                  </Link>
                </li>
                <li>
                  <Link to="/privacy/incidents" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    Privacy Incidents
                  </Link>
                </li>
                <li>
                  <Link to="/privacy/vendors" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <Database className="h-3 w-3" />
                    Vendor Assessments
                  </Link>
                </li>
                <li>
                  <Link to="/privacy/consent" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <UserCheck className="h-3 w-3" />
                    Consent Management
                  </Link>
                </li>
                <li>
                  <Link to="/privacy/analytics" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <BarChart3 className="h-3 w-3" />
                    Privacy Analytics
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Legal & Support */}
            <div>
              <h3 className="font-medium text-sm mb-3">Legal & Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <FileText className="h-3 w-3" />
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/legal" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <FileText className="h-3 w-3" />
                    Legal Notices
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <HelpCircle className="h-3 w-3" />
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter Section - Full Width */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-base font-semibold mb-1">Privacy Rights Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Get notified about privacy regulation changes affecting educational stakeholders.
                </p>
              </div>
              
              <div className="flex-shrink-0 w-full md:w-auto md:max-w-md space-y-3">
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                    placeholder="your.email@domain.com" 
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isSubscribing}
                  />
                  <Button onClick={handleSubscribe} disabled={isSubscribing} size="sm">
                    {isSubscribing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Subscribe
                      </>
                    )}
                  </Button>
                </div>
                
                {subscriptionSuccess && (
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                    <span>Success! You'll receive privacy rights and regulation updates.</span>
                  </div>
                )}
                
                {subscriptionError && (
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{subscriptionError}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}