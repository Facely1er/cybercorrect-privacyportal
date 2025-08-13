import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { NotificationProvider } from './contexts/NotificationContext';
import { ProductionGuard } from './components/common/ProductionGuard';
import { BrandProvider } from './components/common/BrandProvider';
import { ErrorBoundary } from './common/ErrorBoundary';
import { AccessibilityProvider, SkipToContent } from './components/common/AccessibilityProvider';
import { OfflineStatusIndicator } from './components/common/OfflineStatusIndicator';

// Layout components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { PrivacyPortalSidebar } from './components/layout/PrivacyPortalSidebar';

// Core pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorks';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { LegalPage } from './pages/LegalPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

// Authentication pages
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

// Privacy portal pages
import { DataRightsExercisePage } from './pages/DataRightsExercisePage';
import { StakeholderDutiesPage } from './pages/StakeholderDutiesPage';
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

function App() {
  return (
    <ProductionGuard>
      <BrandProvider>
        <ErrorBoundary>
          <ThemeProvider defaultTheme="dark" storageKey="theme">
            <AccessibilityProvider>
              <NotificationProvider>
              <div className="min-h-screen bg-background text-foreground flex flex-col">
                <SkipToContent />
                <Header />
                
                <div className="flex flex-1 pt-16">
                  <Routes>
                    {/* Privacy Portal Routes with Sidebar */}
                    <Route path="/privacy/*" element={
                      <>
                        <PrivacyPortalSidebar />
                        <main id="main-content" className="flex-1 focus:outline-none">
                          <Routes>
                            <Route index element={<PrivacyDashboardPage />} />
                            <Route path="dashboard" element={<PrivacyDashboardPage />} />
                            <Route path="data-rights" element={<DataRightsPortalPage />} />
                            <Route path="obligations" element={<ComplianceObligationsPage />} />
                            <Route path="incidents" element={<PrivacyIncidentsPage />} />
                            <Route path="vendors" element={<VendorAssessmentsPage />} />
                            <Route path="consent" element={<ConsentManagementPage />} />
                            <Route path="stakeholders" element={<StakeholderManagementPage />} />
                            <Route path="automation" element={<AutomationPage />} />
                            <Route path="analytics" element={<AnalyticsPage />} />
                            <Route path="reports" element={<ReportsPage />} />
                          </Routes>
                        </main>
                      </>
                    } />

                    {/* Main Application Routes without Sidebar */}
                    <Route path="/*" element={
                      <main id="main-content" className="flex-1 focus:outline-none">
                        <Routes>
                          {/* Public pages */}
                          <Route path="/" element={<HomePage />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/how-it-works" element={<HowItWorksPage />} />
                          <Route path="/contact" element={<ContactPage />} />
                          <Route path="/faq" element={<FAQPage />} />
                          <Route path="/legal" element={<LegalPage />} />
                          <Route path="/terms" element={<TermsPage />} />
                          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

                          {/* Authentication */}
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/register" element={<RegisterPage />} />
                          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                          <Route path="/profile" element={<ProfilePage />} />
                          <Route path="/settings" element={<SettingsPage />} />

                          {/* Privacy portal entry points */}
                          <Route path="/data-rights" element={<DataRightsExercisePage />} />
                          <Route path="/stakeholder-duties" element={<StakeholderDutiesPage />} />

                          {/* Redirects for legacy URLs */}
                          <Route path="/management/*" element={<Navigate to="/privacy" replace />} />
                          <Route path="/assessment/*" element={<Navigate to="/privacy" replace />} />
                          <Route path="/training/*" element={<Navigate to="/privacy" replace />} />
                          <Route path="/dashboard/*" element={<Navigate to="/privacy" replace />} />
                          <Route path="/resources/*" element={<Navigate to="/privacy" replace />} />
                          <Route path="/role/*" element={<Navigate to="/privacy" replace />} />
                          <Route path="/learning-paths/*" element={<Navigate to="/privacy" replace />} />
                          <Route path="/onboarding/*" element={<Navigate to="/privacy" replace />} />
                          <Route path="/calendar/*" element={<Navigate to="/privacy/obligations" replace />} />
                          <Route path="/certificate/*" element={<Navigate to="/privacy" replace />} />
                          <Route path="/integration/*" element={<Navigate to="/privacy" replace />} />

                          {/* Catch-all redirect */}
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </main>
                    } />
                  </Routes>
                </div>

                <Footer />
                <OfflineStatusIndicator />
              </div>
              </NotificationProvider>
            </AccessibilityProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </BrandProvider>
    </ProductionGuard>
  );
}

export default App;