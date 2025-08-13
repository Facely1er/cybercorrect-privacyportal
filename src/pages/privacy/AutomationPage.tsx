import React from 'react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ComplianceAutomation } from '../../components/privacy/ComplianceAutomation';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { CheckCircle, FileText, Calendar, BookOpen, HelpCircle } from 'lucide-react';

export function AutomationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      <ComplianceAutomation organizationId="a1b2c3d4-e5f6-7890-1234-567890abcdef" />
      
      {/* Related Resources */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Enhance Your Automation Strategy</h2>
        <p className="text-muted-foreground mb-4">
          Maximize the effectiveness of your compliance automation with these related resources and tools.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link to="/privacy/obligations" title="View compliance obligations that can be automated">
            <Button variant="outline" size="sm" className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Compliance Obligations
            </Button>
          </Link>
          <Link to="/privacy/reports" title="Automate compliance report generation">
            <Button variant="outline" size="sm" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Automated Reports
            </Button>
          </Link>
          <Link to="/calendar" title="View compliance calendar for automation timing">
            <Button variant="outline" size="sm" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Compliance Calendar
            </Button>
          </Link>
          <Link to="/training" title="Learn automation best practices">
            <Button variant="outline" size="sm" className="w-full">
              <BookOpen className="h-4 w-4 mr-2" />
              Automation Training
            </Button>
          </Link>
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/contact" title="Get help setting up advanced automation">
            <Button size="sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              Get Automation Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}