import React from 'react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ComplianceReportGenerator } from '../../components/reports/ComplianceReportGenerator';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { BarChart3, Calendar, Shield, BookOpen, Users, FileText } from 'lucide-react';

export function ReportsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Compliance Reports</h1>
        <p className="text-muted-foreground">
          Generate comprehensive privacy compliance reports for stakeholders
        </p>
      </div>

      <ComplianceReportGenerator organizationId="a1b2c3d4-e5f6-7890-1234-567890abcdef" />
      
      {/* Report Resources */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Reporting Resources</h2>
        <p className="text-muted-foreground mb-4">
          Access additional resources to enhance your compliance reporting and stakeholder communication.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/privacy/analytics" title="View detailed privacy analytics for reporting">
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              Privacy Analytics Dashboard
            </Button>
          </Link>
          <Link to="/privacy/obligations" title="Include compliance status in reports">
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Compliance Status
            </Button>
          </Link>
          <Link to="/privacy/incidents" title="Include incident summaries in reports">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Incident Summaries
            </Button>
          </Link>
          <Link to="/training" title="Learn report writing best practices">
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="h-4 w-4 mr-2" />
              Report Writing Training
            </Button>
          </Link>
          <Link to="/privacy/stakeholders" title="Manage report distribution to stakeholders">
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Stakeholder Distribution
            </Button>
          </Link>
          <Link to="/resources/tools-templates" title="Access report templates and tools">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Report Templates
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}