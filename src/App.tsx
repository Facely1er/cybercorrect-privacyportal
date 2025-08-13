import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './common/ErrorBoundary';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { NotificationProvider } from './contexts/NotificationContext';
import { BrandProvider } from './components/common/BrandProvider';
import { AccessibilityProvider, SkipToContent } from './components/common/AccessibilityProvider';
import { ProductionGuard } from './components/common/ProductionGuard';
import { AnonymousBrowsingNotice } from './components/auth/AnonymousBrowsingNotice';
import { OfflineStatusIndicator } from './components/common/OfflineStatusIndicator';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { PrivacyPortalSidebar } from './components/layout/PrivacyPortalSidebar';

// Page Components
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { HowItWorksPage } from './pages/HowItWorks';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { LegalPage } from './pages/LegalPage';

// Privacy Portal Pages
import { PrivacyPortalPage } from './pages/PrivacyPortalPage';
import { DataRightsExercisePage } from './pages/DataRightsExercisePage';
import { StakeholderDutiesPage } from './pages/StakeholderDutiesPage';

// Privacy Management Pages
import { PrivacyDashboardPage } from './pages/privacy/PrivacyDashboardPage';
import { DataRightsPortalPage } from './pages/privacy/DataRightsPortalPage';
import { ComplianceObligationsPage } from './pages/privacy/ComplianceObligationsPage';
import { PrivacyIncidentsPage } from './pages/privacy/PrivacyIncidentsPage';
import { VendorAssessmentsPage } from './pages/privacy/VendorAssessmentsPage';
import { ConsentManagementPage } from './pages/privacy/ConsentManagementPage';
import { StakeholderManagementPage } from './pages/privacy/StakeholderManagementPage';
import { AutomationPage } from './pages/privacy/AutomationPage';
import { AnalyticsPage } from './pages/privacy/AnalyticsPage';
import { ReportsPage } from './pages/privacy/ReportsPage';

// Import CSS
import './index.css';

// Layout component for privacy portal pages
function PrivacyPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <PrivacyPortalSidebar />
      <div className="flex-1 flex flex-col">
        <main id="main-content" className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

// Main layout component
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ProductionGuard>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="system">
          <BrandProvider>
            <NotificationProvider>
              <AccessibilityProvider>
                <Router>
                  <SkipToContent />
                  <AnonymousBrowsingNotice />
                  <OfflineStatusIndicator />
                  
                  <Routes>
                    {/* Authentication Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    
                    {/* Legal Pages */}
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/legal" element={<LegalPage />} />
                    
                    {/* Main Application Routes */}
                    <Route path="/" element={
                      <MainLayout>
                        <HomePage />
                      </MainLayout>
                    } />
                    
                    <Route path="/about" element={
                      <MainLayout>
                        <AboutPage />
                      </MainLayout>
                    } />
                    
                    <Route path="/contact" element={
                      <MainLayout>
                        <ContactPage />
                      </MainLayout>
                    } />
                    
                    <Route path="/faq" element={
                      <MainLayout>
                        <FAQPage />
                      </MainLayout>
                    } />
                    
                    <Route path="/how-it-works" element={
                      <MainLayout>
                        <HowItWorksPage />
                      </MainLayout>
                    } />
                    
                    {/* Data Rights Exercise - Public Access */}
                    <Route path="/data-rights" element={
                      <MainLayout>
                        <DataRightsExercisePage />
                      </MainLayout>
                    } />
                    
                    {/* Stakeholder Duties - Public Access */}
                    <Route path="/stakeholder-duties" element={
                      <MainLayout>
                        <StakeholderDutiesPage />
                      </MainLayout>
                    } />
                    
                    {/* Profile and Settings */}
                    <Route path="/profile" element={
                      <MainLayout>
                        <ProfilePage />
                      </MainLayout>
                    } />
                    
                    <Route path="/settings" element={
                      <MainLayout>
                        <SettingsPage />
                      </MainLayout>
                    } />
                    
                    {/* Privacy Portal Routes */}
                    <Route path="/privacy" element={<Navigate to="/privacy/dashboard" replace />} />
                    
                    <Route path="/privacy/dashboard" element={
                      <PrivacyPortalLayout>
                        <PrivacyDashboardPage />
                      </PrivacyPortalLayout>
                    } />
                    
                    <Route path="/privacy/data-rights" element={
                      <PrivacyPortalLayout>
                        <DataRightsPortalPage />
                      </PrivacyPortalLayout>
                    } />
                    
                    <Route path="/privacy/obligations" element={
                      <PrivacyPortalLayout>
                        <ComplianceObligationsPage />
                      </PrivacyPortalLayout>
                    } />
                    
                    <Route path="/privacy/incidents" element={
                      <PrivacyPortalLayout>
                        <PrivacyIncidentsPage />
                      </PrivacyPortalLayout>
                    } />
                    
                    <Route path="/privacy/vendors" element={
                      <PrivacyPortalLayout>
                        <VendorAssessmentsPage />
                      </PrivacyPortalLayout>
                    } />
                    
                    <Route path="/privacy/consent" element={
                      <PrivacyPortalLayout>
                        <ConsentManagementPage />
                      </PrivacyPortalLayout>
                    } />
                    
                    <Route path="/privacy/stakeholders" element={
                      <PrivacyPortalLayout>
                        <StakeholderManagementPage />
                      </PrivacyPortalLayout>
                    } />
                    
                    <Route path="/privacy/automation" element={
                      <PrivacyPortalLayout>
                        <AutomationPage />
                      </PrivacyPortalLayout>
                    } />
                    
                    <Route path="/privacy/analytics" element={
                      <PrivacyPortalLayout>
                        <AnalyticsPage />
                      </PrivacyPortalLayout>
                    } />
                    
                    <Route path="/privacy/reports" element={
                      <PrivacyPortalLayout>
                        <ReportsPage />
                      </PrivacyPortalLayout>
                    } />
                    
                    {/* Catch-all route */}
                    <Route path="*" element={
                      <MainLayout>
                        <div className="container mx-auto px-4 py-16 text-center">
                          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                          <p className="text-muted-foreground mb-8">
                            The page you're looking for doesn't exist.
                          </p>
                          <div className="space-x-4">
                            <a href="/" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90">
                              Go Home
                            </a>
                            <a href="/privacy" className="border border-input px-6 py-2 rounded-lg hover:bg-accent">
                              Privacy Portal
                            </a>
                          </div>
                        </div>
                      </MainLayout>
                    } />
                  </Routes>
                </Router>
              </AccessibilityProvider>
            </NotificationProvider>
          </BrandProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </ProductionGuard>
  );
}

export default App;