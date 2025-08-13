import React, { useState } from 'react';
import { Download, FileText, Calendar, BarChart3, Shield, Building, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ComplianceReportGeneratorProps {
  organizationId: string;
}

export function ComplianceReportGenerator({ organizationId }: ComplianceReportGeneratorProps) {
  const [reportType, setReportType] = useState('quarterly');
  const [selectedRegulations, setSelectedRegulations] = useState<string[]>(['ferpa', 'coppa']);
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { id: 'quarterly', name: 'Quarterly Compliance Report', description: 'Comprehensive quarterly compliance status' },
    { id: 'annual', name: 'Annual Privacy Report', description: 'Yearly summary of privacy program performance' },
    { id: 'incident', name: 'Incident Summary Report', description: 'Privacy incident analysis and response summary' },
    { id: 'vendor', name: 'Vendor Assessment Report', description: 'Third-party vendor privacy compliance analysis' },
    { id: 'data_rights', name: 'Data Rights Activity Report', description: 'Summary of data subject rights requests and responses' }
  ];

  const availableRegulations = [
    { id: 'ferpa', name: 'FERPA' },
    { id: 'coppa', name: 'COPPA' },
    { id: 'ccpa', name: 'CCPA' },
    { id: 'bipa', name: 'BIPA' },
    { id: 'shield', name: 'SHIELD' },
    { id: 'gdpr', name: 'GDPR' }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      
      // Create a mock PDF download
      const reportData = {
        type: reportType,
        regulations: selectedRegulations,
        generated: new Date().toISOString(),
        organizationId
      };
      
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compliance-report-${reportType}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 2000);
  };

  const handleRegulationToggle = (regulationId: string) => {
    setSelectedRegulations(prev => 
      prev.includes(regulationId)
        ? prev.filter(id => id !== regulationId)
        : [...prev, regulationId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Compliance Report Generator</h2>
        <p className="text-muted-foreground">
          Generate comprehensive privacy compliance reports for stakeholders and regulatory authorities
        </p>
      </div>

      {/* Report Configuration */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Report Configuration</h3>
        
        <div className="space-y-6">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-medium mb-3">Report Type</label>
            <div className="grid md:grid-cols-2 gap-3">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setReportType(type.id)}
                  className={`flex items-start gap-3 p-4 border rounded-lg text-left transition-colors ${
                    reportType === type.id 
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                      : 'hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <FileText className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{type.name}</h4>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Regulation Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">Include Regulations</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {availableRegulations.map((regulation) => (
                <button
                  key={regulation.id}
                  onClick={() => handleRegulationToggle(regulation.id)}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    selectedRegulations.includes(regulation.id)
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Badge 
                    variant={regulation.id as any}
                    className={selectedRegulations.includes(regulation.id) ? '' : 'opacity-50'}
                  >
                    {regulation.name}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                defaultValue="2024-10-01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Report Preview</h3>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-sm">Compliance Score</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">78%</div>
              <div className="text-xs text-muted-foreground">Overall rating</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-green-500" />
                <span className="font-medium text-sm">Data Rights Requests</span>
              </div>
              <div className="text-2xl font-bold text-green-600">127</div>
              <div className="text-xs text-muted-foreground">Processed this quarter</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="font-medium text-sm">Privacy Incidents</span>
              </div>
              <div className="text-2xl font-bold text-amber-600">3</div>
              <div className="text-xs text-muted-foreground">Reported this quarter</div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Report will include:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Executive summary of privacy program performance</li>
              <li>Detailed compliance metrics for selected regulations</li>
              <li>Data rights request processing statistics</li>
              <li>Privacy incident summary and response analysis</li>
              <li>Vendor assessment and risk management overview</li>
              <li>Recommendations for privacy program improvements</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Generate Report */}
      <div className="flex justify-end">
        <Button
          onClick={handleGenerateReport}
          disabled={isGenerating || selectedRegulations.length === 0}
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Generating Report...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Generate Compliance Report
            </>
          )}
        </Button>
      </div>
    </div>
  );
}