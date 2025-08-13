import { localStorageService } from './localStorageService';

interface ExportOptions {
  format: 'csv' | 'json' | 'txt';
  filename?: string;
}

interface ExportData {
  dataRightsRequests: any[];
  privacyIncidents: any[];
  vendorAssessments: any[];
  consentRecords: any[];
  complianceObligations: any[];
  userPreferences: any;
  exportMetadata: {
    exportDate: string;
    version: string;
    dataTypes: string[];
  };
}

export const exportService = {
  // Export all privacy portal data
  exportAllData: async (options: ExportOptions) => {
    const filename = options.filename || `privacy-portal-data-${new Date().toISOString().split('T')[0]}`;
    
    const exportData: ExportData = {
      dataRightsRequests: localStorageService.getDataRightsRequests(),
      privacyIncidents: localStorageService.getPrivacyIncidents(),
      vendorAssessments: localStorageService.getVendorAssessments(),
      consentRecords: localStorageService.getConsentRecords(),
      complianceObligations: localStorageService.getComplianceObligations(),
      userPreferences: localStorageService.getUserPreferences(),
      exportMetadata: {
        exportDate: new Date().toISOString(),
        version: '1.0.0',
        dataTypes: ['dataRightsRequests', 'privacyIncidents', 'vendorAssessments', 'consentRecords', 'complianceObligations']
      }
    };

    if (options.format === 'json') {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      downloadBlob(blob, `${filename}.json`);
    } else if (options.format === 'csv') {
      // For CSV, export each data type separately
      await exportDataRightsRequestsCSV(exportData.dataRightsRequests, filename);
      await exportPrivacyIncidentsCSV(exportData.privacyIncidents, filename);
      await exportVendorAssessmentsCSV(exportData.vendorAssessments, filename);
      await exportConsentRecordsCSV(exportData.consentRecords, filename);
      await exportComplianceObligationsCSV(exportData.complianceObligations, filename);
    } else {
      // Text format - simple summary
      const text = generateTextSummary(exportData);
      const blob = new Blob([text], { type: 'text/plain' });
      downloadBlob(blob, `${filename}.txt`);
    }
  },

  // Export specific data types
  exportDataRightsRequests: async (options: ExportOptions) => {
    const data = localStorageService.getDataRightsRequests();
    const filename = options.filename || `data-rights-requests-${new Date().toISOString().split('T')[0]}`;
    
    if (options.format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      downloadBlob(blob, `${filename}.json`);
    } else if (options.format === 'csv') {
      await exportDataRightsRequestsCSV(data, filename);
    } else {
      const text = data.map(req => 
        `${req.title}\nType: ${req.type}\nRequester: ${req.requesterName}\nStudent: ${req.studentName}\nStatus: ${req.status}\nSubmitted: ${req.submittedAt}\n\n`
      ).join('');
      const blob = new Blob([text], { type: 'text/plain' });
      downloadBlob(blob, `${filename}.txt`);
    }
  },

  exportPrivacyIncidents: async (options: ExportOptions) => {
    const data = localStorageService.getPrivacyIncidents();
    const filename = options.filename || `privacy-incidents-${new Date().toISOString().split('T')[0]}`;
    
    if (options.format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      downloadBlob(blob, `${filename}.json`);
    } else if (options.format === 'csv') {
      await exportPrivacyIncidentsCSV(data, filename);
    } else {
      const text = data.map(incident => 
        `${incident.title}\nSeverity: ${incident.severity}\nType: ${incident.type}\nAffected: ${incident.affectedCount}\nStatus: ${incident.status}\nDiscovered: ${incident.discoveryDate}\n\n`
      ).join('');
      const blob = new Blob([text], { type: 'text/plain' });
      downloadBlob(blob, `${filename}.txt`);
    }
  },

  exportVendorAssessments: async (options: ExportOptions) => {
    const data = localStorageService.getVendorAssessments();
    const filename = options.filename || `vendor-assessments-${new Date().toISOString().split('T')[0]}`;
    
    if (options.format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      downloadBlob(blob, `${filename}.json`);
    } else if (options.format === 'csv') {
      await exportVendorAssessmentsCSV(data, filename);
    } else {
      const text = data.map(vendor => 
        `${vendor.vendorName}\nService: ${vendor.serviceDescription}\nScore: ${vendor.assessmentScore}/100\nRisk: ${vendor.riskLevel}\nStatus: ${vendor.complianceStatus}\nLast Assessed: ${vendor.lastAssessmentDate}\n\n`
      ).join('');
      const blob = new Blob([text], { type: 'text/plain' });
      downloadBlob(blob, `${filename}.txt`);
    }
  },

  exportConsentRecords: async (options: ExportOptions) => {
    const data = localStorageService.getConsentRecords();
    const filename = options.filename || `consent-records-${new Date().toISOString().split('T')[0]}`;
    
    if (options.format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      downloadBlob(blob, `${filename}.json`);
    } else if (options.format === 'csv') {
      await exportConsentRecordsCSV(data, filename);
    } else {
      const text = data.map(consent => 
        `${consent.studentName}\nParent: ${consent.parentName}\nType: ${consent.consentType}\nProvider: ${consent.serviceProvider}\nConsent: ${consent.consentGiven ? 'Given' : 'Not Given'}\nDate: ${consent.consentDate}\n\n`
      ).join('');
      const blob = new Blob([text], { type: 'text/plain' });
      downloadBlob(blob, `${filename}.txt`);
    }
  },

  exportComplianceObligations: async (options: ExportOptions) => {
    const data = localStorageService.getComplianceObligations();
    const filename = options.filename || `compliance-obligations-${new Date().toISOString().split('T')[0]}`;
    
    if (options.format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      downloadBlob(blob, `${filename}.json`);
    } else if (options.format === 'csv') {
      await exportComplianceObligationsCSV(data, filename);
    } else {
      const text = data.map(obligation => 
        `${obligation.title}\nRegulation: ${obligation.regulation}\nPriority: ${obligation.priority}\nStatus: ${obligation.status}\nDue: ${obligation.dueDate}\nProgress: ${obligation.completionPercentage}%\n\n`
      ).join('');
      const blob = new Blob([text], { type: 'text/plain' });
      downloadBlob(blob, `${filename}.txt`);
    }
  },

  // Import functionality
  importData: async (file: File): Promise<{ success: boolean; message: string }> => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validate import data structure
      if (!data.exportMetadata || !data.exportMetadata.version) {
        return { success: false, message: 'Invalid file format - missing metadata' };
      }
      
      // Import each data type if present
      if (data.dataRightsRequests && Array.isArray(data.dataRightsRequests)) {
        data.dataRightsRequests.forEach((request: any) => {
          localStorageService.saveDataRightsRequest(request);
        });
      }
      
      if (data.privacyIncidents && Array.isArray(data.privacyIncidents)) {
        data.privacyIncidents.forEach((incident: any) => {
          localStorageService.savePrivacyIncident(incident);
        });
      }
      
      if (data.vendorAssessments && Array.isArray(data.vendorAssessments)) {
        data.vendorAssessments.forEach((vendor: any) => {
          localStorageService.saveVendorAssessment(vendor);
        });
      }
      
      if (data.consentRecords && Array.isArray(data.consentRecords)) {
        data.consentRecords.forEach((consent: any) => {
          localStorageService.saveConsentRecord(consent);
        });
      }
      
      if (data.complianceObligations && Array.isArray(data.complianceObligations)) {
        data.complianceObligations.forEach((obligation: any) => {
          localStorageService.saveComplianceObligation(obligation);
        });
      }
      
      if (data.userPreferences) {
        localStorageService.saveUserPreferences(data.userPreferences);
      }
      
      return { 
        success: true, 
        message: `Successfully imported data from ${data.exportMetadata.exportDate}` 
      };
    } catch (error) {
      console.error('Import error:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to parse import file' 
      };
    }
  }
};

// CSV Export Functions
async function exportDataRightsRequestsCSV(data: any[], filename: string) {
  const headers = ['ID', 'Title', 'Type', 'Requester Name', 'Requester Email', 'Student Name', 'Status', 'Submitted Date', 'Due Date'];
  const csvContent = [
    headers.join(','),
    ...data.map(req => [
      req.id,
      `"${req.title || ''}"`,
      req.type,
      `"${req.requesterName || ''}"`,
      req.requesterEmail,
      `"${req.studentName || ''}"`,
      req.status,
      req.submittedAt,
      req.dueDate
    ].join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  downloadBlob(blob, `${filename}-data-rights-requests.csv`);
}

async function exportPrivacyIncidentsCSV(data: any[], filename: string) {
  const headers = ['ID', 'Incident Number', 'Title', 'Type', 'Severity', 'Affected Count', 'Status', 'Discovery Date', 'Assigned To'];
  const csvContent = [
    headers.join(','),
    ...data.map(incident => [
      incident.id,
      incident.incidentNumber,
      `"${incident.title || ''}"`,
      incident.type,
      incident.severity,
      incident.affectedCount || 0,
      incident.status,
      incident.discoveryDate,
      `"${incident.assignedTo || ''}"`
    ].join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  downloadBlob(blob, `${filename}-privacy-incidents.csv`);
}

async function exportVendorAssessmentsCSV(data: any[], filename: string) {
  const headers = ['ID', 'Vendor Name', 'Service Description', 'Assessment Score', 'Risk Level', 'Compliance Status', 'Last Assessment', 'Next Assessment'];
  const csvContent = [
    headers.join(','),
    ...data.map(vendor => [
      vendor.id,
      `"${vendor.vendorName || ''}"`,
      `"${vendor.serviceDescription || ''}"`,
      vendor.assessmentScore || 0,
      vendor.riskLevel,
      vendor.complianceStatus,
      vendor.lastAssessmentDate,
      vendor.nextAssessmentDue
    ].join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  downloadBlob(blob, `${filename}-vendor-assessments.csv`);
}

async function exportConsentRecordsCSV(data: any[], filename: string) {
  const headers = ['ID', 'Student Name', 'Parent Name', 'Parent Email', 'Consent Type', 'Service Provider', 'Consent Given', 'Consent Date', 'Status'];
  const csvContent = [
    headers.join(','),
    ...data.map(consent => [
      consent.id,
      `"${consent.studentName || ''}"`,
      `"${consent.parentName || ''}"`,
      consent.parentEmail,
      consent.consentType,
      `"${consent.serviceProvider || ''}"`,
      consent.consentGiven ? 'Yes' : 'No',
      consent.consentDate || '',
      consent.status
    ].join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  downloadBlob(blob, `${filename}-consent-records.csv`);
}

async function exportComplianceObligationsCSV(data: any[], filename: string) {
  const headers = ['ID', 'Title', 'Regulation', 'Priority', 'Status', 'Due Date', 'Completion Percentage', 'Responsible Role'];
  const csvContent = [
    headers.join(','),
    ...data.map(obligation => [
      obligation.id,
      `"${obligation.title || ''}"`,
      obligation.regulation,
      obligation.priority,
      obligation.status,
      obligation.dueDate,
      obligation.completionPercentage || 0,
      `"${obligation.responsibleRole || ''}"`
    ].join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  downloadBlob(blob, `${filename}-compliance-obligations.csv`);
}

function generateTextSummary(data: ExportData): string {
  const summary = [
    'CyberCorrect™ Privacy Portal Data Export',
    '==========================================',
    `Export Date: ${data.exportMetadata.exportDate}`,
    `Data Version: ${data.exportMetadata.version}`,
    '',
    'DATA SUMMARY:',
    '--------------',
    `Data Rights Requests: ${data.dataRightsRequests.length}`,
    `Privacy Incidents: ${data.privacyIncidents.length}`,
    `Vendor Assessments: ${data.vendorAssessments.length}`,
    `Consent Records: ${data.consentRecords.length}`,
    `Compliance Obligations: ${data.complianceObligations.length}`,
    '',
    'DETAILED DATA:',
    '--------------',
    '',
    '=== DATA RIGHTS REQUESTS ===',
    ...data.dataRightsRequests.map(req => 
      `${req.title} | ${req.type} | ${req.status} | ${req.submittedAt}`
    ),
    '',
    '=== PRIVACY INCIDENTS ===',
    ...data.privacyIncidents.map(incident => 
      `${incident.title} | ${incident.severity} | ${incident.status} | ${incident.discoveryDate}`
    ),
    '',
    '=== VENDOR ASSESSMENTS ===',
    ...data.vendorAssessments.map(vendor => 
      `${vendor.vendorName} | Score: ${vendor.assessmentScore}/100 | Risk: ${vendor.riskLevel} | ${vendor.complianceStatus}`
    ),
    '',
    '=== CONSENT RECORDS ===',
    ...data.consentRecords.map(consent => 
      `${consent.studentName} | ${consent.consentType} | ${consent.consentGiven ? 'Granted' : 'Not Granted'} | ${consent.status}`
    ),
    '',
    '=== COMPLIANCE OBLIGATIONS ===',
    ...data.complianceObligations.map(obligation => 
      `${obligation.title} | ${obligation.regulation} | ${obligation.priority} | ${obligation.status} | Due: ${obligation.dueDate}`
    ),
    '',
    '==========================================',
    'End of Export'
  ];
  
  return summary.join('\n');
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}