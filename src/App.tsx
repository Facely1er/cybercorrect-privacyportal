import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './hooks/useAuth';
import { ErrorBoundary } from './common/ErrorBoundary';
import { ProtectedRoute, AdminRoute, StaffRoute } from './components/auth/ProtectedRoute';
import { initializeAccessibility } from './utils/accessibility';

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
import { UnauthorizedPage } from './pages/UnauthorizedPage';

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
  useEffect(() => {
    // Initialize accessibility features
    initializeAccessibility();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="theme">
        <AuthProvider>
          <NotificationProvider>
            <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Skip link for accessibility */}
            <a 
              href="#main-content" 
              className="skip-link focus-visible"
              onFocus={(e) => e.target.classList.add('focus-visible')}
              onBlur={(e) => e.target.classList.remove('focus-visible')}
            >
              Skip to main content
            </a>
            
            <Header />
            
            <main id="main-content" className="flex-1 focus:outline-none pt-16" tabIndex={-1}>
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
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                
                {/* Protected Routes */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } />

                {/* Privacy portal entry points */}
                <Route path="/data-rights" element={<DataRightsExercisePage />} />
                <Route path="/stakeholder-duties" element={<StakeholderDutiesPage />} />

                {/* Privacy portal routes */}
                <Route path="/privacy" element={<PrivacyPortalPage />} />
                <Route path="/privacy/dashboard" element={
                  <StaffRoute>
                    <PrivacyDashboardPage />
                  </StaffRoute>
                } />
                <Route path="/privacy/data-rights" element={
                  <ProtectedRoute>
                    <DataRightsPortalPage />
                  </ProtectedRoute>
                } />
                <Route path="/privacy/obligations" element={
                  <StaffRoute>
                    <ComplianceObligationsPage />
                  </StaffRoute>
                } />
                <Route path="/privacy/incidents" element={
                  <StaffRoute>
                    <PrivacyIncidentsPage />
                  </StaffRoute>
                } />
                <Route path="/privacy/vendors" element={
                  <StaffRoute>
                    <VendorAssessmentsPage />
                  </StaffRoute>
                } />
                <Route path="/privacy/consent" element={
                  <StaffRoute>
                    <ConsentManagementPage />
                  </StaffRoute>
                } />
                <Route path="/privacy/stakeholders" element={
                  <AdminRoute>
                    <StakeholderManagementPage />
                  </AdminRoute>
                } />
                <Route path="/privacy/automation" element={
                  <AdminRoute>
                    <AutomationPage />
                  </AdminRoute>
                } />
                <Route path="/privacy/analytics" element={
                  <StaffRoute>
                    <AnalyticsPage />
                  </StaffRoute>
                } />
                <Route path="/privacy/reports" element={
                  <StaffRoute>
                    <ReportsPage />
                  </StaffRoute>
                } />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;