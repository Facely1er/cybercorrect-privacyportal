interface StorageData {
  [key: string]: any;
}

interface DataRightsRequest {
  id: string;
  type: string;
  title: string;
  requesterName: string;
  requesterEmail: string;
  studentName: string;
  submittedAt: string;
  status: string;
  dueDate: string;
  description: string;
}

interface PrivacyIncident {
  id: string;
  incidentNumber: string;
  title: string;
  type: string;
  severity: string;
  description: string;
  affectedCount: number;
  discoveryDate: string;
  status: string;
  assignedTo: string;
  regulations: string[];
}

interface VendorAssessment {
  id: string;
  vendorName: string;
  serviceDescription: string;
  assessmentScore: number;
  riskLevel: string;
  complianceStatus: string;
  lastAssessmentDate: string;
  nextAssessmentDue: string;
  regulations: string[];
}

interface ConsentRecord {
  id: string;
  studentName: string;
  parentName: string;
  parentEmail: string;
  consentType: string;
  serviceProvider: string;
  consentGiven: boolean;
  consentDate: string | null;
  status: string;
  regulations: string[];
}

export const localStorageService = {
  // Generic storage methods
  setItem: (key: string, data: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  getItem: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  // Data Rights Requests
  saveDataRightsRequest: (request: DataRightsRequest): void => {
    const requests = localStorageService.getDataRightsRequests();
    const existingIndex = requests.findIndex(r => r.id === request.id);
    
    if (existingIndex >= 0) {
      requests[existingIndex] = request;
    } else {
      requests.push(request);
    }
    
    localStorageService.setItem('data_rights_requests', requests);
  },

  getDataRightsRequests: (): DataRightsRequest[] => {
    return localStorageService.getItem('data_rights_requests', []);
  },

  // Privacy Incidents
  savePrivacyIncident: (incident: PrivacyIncident): void => {
    const incidents = localStorageService.getPrivacyIncidents();
    const existingIndex = incidents.findIndex(i => i.id === incident.id);
    
    if (existingIndex >= 0) {
      incidents[existingIndex] = incident;
    } else {
      incidents.push(incident);
    }
    
    localStorageService.setItem('privacy_incidents', incidents);
  },

  getPrivacyIncidents: (): PrivacyIncident[] => {
    return localStorageService.getItem('privacy_incidents', []);
  },

  // Vendor Assessments
  saveVendorAssessment: (vendor: VendorAssessment): void => {
    const vendors = localStorageService.getVendorAssessments();
    const existingIndex = vendors.findIndex(v => v.id === vendor.id);
    
    if (existingIndex >= 0) {
      vendors[existingIndex] = vendor;
    } else {
      vendors.push(vendor);
    }
    
    localStorageService.setItem('vendor_assessments', vendors);
  },

  getVendorAssessments: (): VendorAssessment[] => {
    return localStorageService.getItem('vendor_assessments', []);
  },

  // Consent Records
  saveConsentRecord: (consent: ConsentRecord): void => {
    const consents = localStorageService.getConsentRecords();
    const existingIndex = consents.findIndex(c => c.id === consent.id);
    
    if (existingIndex >= 0) {
      consents[existingIndex] = consent;
    } else {
      consents.push(consent);
    }
    
    localStorageService.setItem('consent_records', consents);
  },

  getConsentRecords: (): ConsentRecord[] => {
    return localStorageService.getItem('consent_records', []);
  },

  // Compliance Obligations
  saveComplianceObligation: (obligation: any): void => {
    const obligations = localStorageService.getComplianceObligations();
    const existingIndex = obligations.findIndex(o => o.id === obligation.id);
    
    if (existingIndex >= 0) {
      obligations[existingIndex] = obligation;
    } else {
      obligations.push(obligation);
    }
    
    localStorageService.setItem('compliance_obligations', obligations);
  },

  getComplianceObligations: (): any[] => {
    return localStorageService.getItem('compliance_obligations', []);
  },

  // Form autosave functionality
  saveFormData: (formId: string, data: any): void => {
    localStorageService.setItem(`form_${formId}`, {
      data,
      timestamp: Date.now()
    });
  },

  getFormData: (formId: string): any => {
    const saved = localStorageService.getItem(`form_${formId}`, null);
    if (saved && saved.timestamp && (Date.now() - saved.timestamp) < 86400000) { // 24 hours
      return saved.data;
    }
    return null;
  },

  clearFormData: (formId: string): void => {
    localStorageService.removeItem(`form_${formId}`);
  },

  // Settings and preferences
  saveUserPreferences: (preferences: any): void => {
    localStorageService.setItem('user_preferences', preferences);
  },

  getUserPreferences: (): any => {
    return localStorageService.getItem('user_preferences', {
      theme: 'system',
      notifications: {
        email: true,
        push: true,
        digest: 'weekly'
      },
      privacy: {
        profileVisibility: 'institution',
        activityTracking: true
      }
    });
  },

  // Clear all data
  clearAllData: (): void => {
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith('data_rights_') ||
      key.startsWith('privacy_') ||
      key.startsWith('vendor_') ||
      key.startsWith('consent_') ||
      key.startsWith('compliance_') ||
      key.startsWith('form_') ||
      key.startsWith('user_preferences')
    );
    
    keys.forEach(key => localStorage.removeItem(key));
  }
};