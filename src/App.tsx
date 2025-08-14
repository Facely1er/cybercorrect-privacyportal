import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { NotificationProvider } from './contexts/NotificationContext';
import { ErrorBoundary } from './common/ErrorBoundary';

// Layout components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Core pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorks';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { LegalPage } from './pages/LegalPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { PrivacyPortalPage } from './pages/PrivacyPortalPage';

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
import { ComplianceObligationsPage } from './pages/privacy/ComplianceObligationsPage';
import { PrivacyIncidentsPage } from './pages/privacy/PrivacyIncidentsPage';
import { VendorAssessmentsPage } from './pages/privacy/VendorAssessmentsPage';
import { ConsentManagementPage } from './pages/privacy/ConsentManagementPage';
import { StakeholderManagementPage } from './pages/privacy/StakeholderManagementPage';
import { AutomationPage } from './pages/privacy/AutomationPage';
import { AnalyticsPage } from './pages/privacy/AnalyticsPage';
import { ReportsPage } from './pages/privacy/ReportsPage';
import { DataRightsPortalPage } from './pages/privacy/DataRightsPortalPage';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <NotificationProvider>
          <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            
            <main id="main-content" className="flex-1 focus:outline-none pt-16">
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

                {/* Privacy portal routes */}
                <Route path="/privacy" element={<PrivacyPortalPage />} />
                <Route path="/privacy/dashboard" element={<PrivacyDashboardPage />} />
                <Route path="/privacy/data-rights" element={<DataRightsPortalPage />} />
                <Route path="/privacy/obligations" element={<ComplianceObligationsPage />} />
                <Route path="/privacy/incidents" element={<PrivacyIncidentsPage />} />
                <Route path="/privacy/vendors" element={<VendorAssessmentsPage />} />
                <Route path="/privacy/consent" element={<ConsentManagementPage />} />
                <Route path="/privacy/stakeholders" element={<StakeholderManagementPage />} />
                <Route path="/privacy/automation" element={<AutomationPage />} />
                <Route path="/privacy/analytics" element={<AnalyticsPage />} />
                <Route path="/privacy/reports" element={<ReportsPage />} />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;