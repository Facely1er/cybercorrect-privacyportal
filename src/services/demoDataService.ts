import { localStorageService } from './localStorageService';

export const demoDataService = {
  // Generate sample data for demonstration
  generateSampleData: () => {
    const sampleDataRightsRequests = [
      {
        id: `req-${Date.now()}-1`,
        title: 'Student Record Access Request',
        type: 'access',
        requesterName: 'Sample Parent',
        requesterEmail: 'parent@example.com',
        requesterRelationship: 'parent',
        studentIdentifier: 'Student ID: 12345',
        studentName: 'Sample Student',
        description: 'Request to access complete education records for review',
        status: 'submitted',
        submittedAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    const samplePrivacyIncidents = [
      {
        id: `inc-${Date.now()}-1`,
        incidentNumber: `INC-${new Date().getFullYear()}-001`,
        title: 'Sample Privacy Incident',
        type: 'unauthorized_access',
        severity: 'medium',
        description: 'Sample incident for demonstration purposes',
        affectedCount: 0,
        discoveryDate: new Date().toISOString(),
        status: 'investigating',
        assignedTo: 'Privacy Officer',
        applicableRegulations: ['ferpa']
      }
    ];

    const sampleVendorAssessments = [
      {
        id: `vendor-${Date.now()}-1`,
        vendorName: 'Sample EdTech Vendor',
        serviceDescription: 'Educational technology platform',
        assessmentScore: 85,
        riskLevel: 'medium',
        complianceStatus: 'compliant',
        lastAssessmentDate: new Date().toISOString(),
        nextAssessmentDue: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        applicableRegulations: ['ferpa', 'coppa'],
        dataTypesProcessed: ['Student names', 'Learning analytics'],
        securityCertifications: ['SOC 2 Type II'],
        privacyPolicyReviewed: true,
        dpaSignificant: true,
        studentDataAccess: true,
        contractStartDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
        contractEndDate: new Date(Date.now() + 545 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    const sampleConsentRecords = [
      {
        id: `consent-${Date.now()}-1`,
        studentId: 'student-123',
        studentName: 'Demo Student',
        parentName: 'Demo User',
        parentEmail: 'demo@example.com',
        consentType: 'directory_information',
        serviceProvider: 'School District',
        consentGiven: true,
        consentDate: new Date().toISOString(),
        withdrawalDate: null,
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        renewalRequired: true,
        status: 'active',
        applicableRegulations: ['ferpa']
      }
    ];

    const sampleComplianceObligations = [
      {
        id: `obligation-${Date.now()}-1`,
        title: 'FERPA Annual Notice Distribution',
        description: 'Distribute annual FERPA notification to all eligible students and parents',
        regulation: 'ferpa',
        priority: 'high',
        status: 'pending',
        dueDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
        completionPercentage: 0,
        responsibleRole: 'Administrator',
        evidenceRequired: ['Notice distribution records', 'Acknowledgment receipts'],
        externalDependencies: [],
        automationPossible: true
      }
    ];

    // Save sample data
    sampleDataRightsRequests.forEach(req => localStorageService.saveDataRightsRequest(req));
    samplePrivacyIncidents.forEach(incident => localStorageService.savePrivacyIncident(incident));
    sampleVendorAssessments.forEach(vendor => localStorageService.saveVendorAssessment(vendor));
    sampleConsentRecords.forEach(consent => localStorageService.saveConsentRecord(consent));
    sampleComplianceObligations.forEach(obligation => localStorageService.saveComplianceObligation(obligation));

    return {
      success: true,
      message: 'Sample data generated successfully',
      recordsCreated: {
        dataRightsRequests: sampleDataRightsRequests.length,
        privacyIncidents: samplePrivacyIncidents.length,
        vendorAssessments: sampleVendorAssessments.length,
        consentRecords: sampleConsentRecords.length,
        complianceObligations: sampleComplianceObligations.length
      }
    };
  },

  // Clear all data
  clearAllData: () => {
    localStorageService.clearAllData();
    return { 
      success: true, 
      message: 'All privacy portal data has been cleared' 
    };
  },

  // Get data summary
  getDataSummary: () => {
    return {
      dataRightsRequests: localStorageService.getDataRightsRequests().length,
      privacyIncidents: localStorageService.getPrivacyIncidents().length,
      vendorAssessments: localStorageService.getVendorAssessments().length,
      consentRecords: localStorageService.getConsentRecords().length,
      complianceObligations: localStorageService.getComplianceObligations().length,
      totalRecords: localStorageService.getDataRightsRequests().length +
                   localStorageService.getPrivacyIncidents().length +
                   localStorageService.getVendorAssessments().length +
                   localStorageService.getConsentRecords().length +
                   localStorageService.getComplianceObligations().length
    };
  },

  // Import data from exported file
  importData: async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validate import data structure
      if (!data.exportMetadata || !data.exportMetadata.version) {
        return { success: false, message: 'Invalid file format - missing metadata' };
      }
      
      let importedCount = 0;
      
      // Import each data type if present
      if (data.dataRightsRequests && Array.isArray(data.dataRightsRequests)) {
        data.dataRightsRequests.forEach((request: any) => {
          localStorageService.saveDataRightsRequest(request);
          importedCount++;
        });
      }
      
      if (data.privacyIncidents && Array.isArray(data.privacyIncidents)) {
        data.privacyIncidents.forEach((incident: any) => {
          localStorageService.savePrivacyIncident(incident);
          importedCount++;
        });
      }
      
      if (data.vendorAssessments && Array.isArray(data.vendorAssessments)) {
        data.vendorAssessments.forEach((vendor: any) => {
          localStorageService.saveVendorAssessment(vendor);
          importedCount++;
        });
      }
      
      if (data.consentRecords && Array.isArray(data.consentRecords)) {
        data.consentRecords.forEach((consent: any) => {
          localStorageService.saveConsentRecord(consent);
          importedCount++;
        });
      }
      
      if (data.complianceObligations && Array.isArray(data.complianceObligations)) {
        data.complianceObligations.forEach((obligation: any) => {
          localStorageService.saveComplianceObligation(obligation);
          importedCount++;
        });
      }
      
      if (data.userPreferences) {
        localStorageService.saveUserPreferences(data.userPreferences);
      }
      
      return { 
        success: true, 
        message: `Successfully imported ${importedCount} records from ${new Date(data.exportMetadata.exportDate).toLocaleDateString()}` 
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