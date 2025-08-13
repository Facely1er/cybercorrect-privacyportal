import React from 'react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { PrivacyAnalyticsDashboard } from '../../components/analytics/PrivacyAnalyticsDashboard';
import { DataExportImport } from '../../components/common/DataExportImport';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { BarChart3, Target, CheckCircle, AlertTriangle, BookOpen, FileText } from 'lucide-react';

export function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Privacy Analytics</h1>
        <p className="text-muted-foreground">
          Advanced analytics and insights for your privacy compliance program
        </p>
      </div>

      <PrivacyAnalyticsDashboard organizationId="a1b2c3d4-e5f6-7890-1234-567890abcdef" />
      
      {/* Export Options */}
      <div className="mt-8">
        <DataExportImport showDemoControls={false} />
      </div>
      
      {/* Analytics Resources */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Analytics and Insights</h2>
        <p className="text-muted-foreground mb-4">
          Use these resources to interpret your analytics data and take action on insights.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link to="/privacy/dashboard" title="View comprehensive privacy dashboard">
            <Button variant="outline" size="sm" className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              Privacy Dashboard
            </Button>
          </Link>
          <Link to="/privacy/obligations" title="Review compliance metrics and deadlines">
            <Button variant="outline" size="sm" className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Compliance Metrics
            </Button>
          </Link>
          <Link to="/privacy/incidents" title="Analyze incident trends and patterns">
            <Button variant="outline" size="sm" className="w-full">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Incident Analytics
            </Button>
          </Link>
          <Link to="/privacy/reports" title="Generate detailed compliance reports">
            <Button variant="outline" size="sm" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Detailed Reports
            </Button>
          </Link>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/training" title="Learn how to interpret privacy analytics">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Analytics Training
              </Button>
            </Link>
            <Link to="/assessment" title="Assess your analytics interpretation skills">
              <Button variant="outline" size="sm">
                <Target className="h-4 w-4 mr-2" />
                Analytics Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}