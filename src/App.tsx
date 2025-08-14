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

// Authentication pages
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

// Privacy portal pages
import { DataRightsExercisePage } from './pages/DataRightsExercisePage';
import { StakeholderDutiesPage } from './pages/StakeholderDutiesPage';

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
                <Route path="/privacy" element={<Navigate to="/privacy/dashboard" replace />} />
                <Route path="/privacy/dashboard" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Privacy Dashboard</h1><p>Coming soon...</p></div>} />
                <Route path="/privacy/data-rights" element={<DataRightsExercisePage />} />
                <Route path="/privacy/obligations" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Compliance Obligations</h1><p>Coming soon...</p></div>} />
                <Route path="/privacy/incidents" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Privacy Incidents</h1><p>Coming soon...</p></div>} />
                <Route path="/privacy/vendors" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Vendor Assessments</h1><p>Coming soon...</p></div>} />
                <Route path="/privacy/consent" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Consent Management</h1><p>Coming soon...</p></div>} />
                <Route path="/privacy/stakeholders" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Stakeholder Management</h1><p>Coming soon...</p></div>} />
                <Route path="/privacy/automation" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Automation</h1><p>Coming soon...</p></div>} />
                <Route path="/privacy/analytics" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Analytics</h1><p>Coming soon...</p></div>} />
                <Route path="/privacy/reports" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Reports</h1><p>Coming soon...</p></div>} />

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