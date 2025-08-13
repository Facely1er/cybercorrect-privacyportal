import { DataSubjectRequest } from '../utils/validation';
import { localStorageService } from './localStorageService';

export const dataRightsService = {
  submitRequest: async (
    requestData: DataSubjectRequest & { requestType: string },
    organizationId: string
  ) => {
    try {
      const newRequest = {
        id: `req-${Date.now()}`,
        ...requestData,
        organizationId,
        status: 'submitted',
        submittedAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString() // 45 days from now
      };
      
      // Save to localStorage
      localStorageService.saveDataRightsRequest(newRequest);
      
      return {
        success: true,
        message: `Your ${requestData.requestType} request has been submitted successfully. You will receive email updates on the progress.`
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to submit request. Please try again.'
      };
    }
  },

  getRequests: (userId: string) => {
    const requests = localStorageService.getDataRightsRequests();
    return requests.filter(req => req.requesterEmail === userId);
  },

  updateRequestStatus: (requestId: string, status: string) => {
    const requests = localStorageService.getDataRightsRequests();
    const updatedRequests = requests.map(req => 
      req.id === requestId ? { ...req, status, updatedAt: new Date().toISOString() } : req
    );
    localStorageService.setItem('data_rights_requests', updatedRequests);
  }
};