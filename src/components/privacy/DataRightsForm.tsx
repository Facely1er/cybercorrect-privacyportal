// Secure data rights request form
import React from 'react';
import { useSecureForm } from '../../hooks/useSecureForm';
import { SecureFormField } from '../forms/SecureFormField';
import { dataSubjectRequestSchema } from '../../utils/validation';
import { dataRightsService } from '../../services/dataRightsService';
import { Button } from '../ui/Button';
import { AlertCircle, CheckCircle, Send } from 'lucide-react';
import { useAutosave } from '../../hooks/useAutosave';

interface DataRightsFormProps {
  requestType: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  organizationId: string;
}

export function DataRightsForm({ 
  requestType, 
  onSuccess, 
  onCancel,
  organizationId 
}: DataRightsFormProps) {
  const [formData, setFormData] = React.useState({
    requesterName: '',
    requesterEmail: '',
    requesterRelationship: '',
    studentIdentifier: '',
    requestDetails: ''
  });

  // Setup autosave
  useAutosave(`data_rights_form_${requestType}`, formData, setFormData, {
    delay: 2000, // Save after 2 seconds of inactivity
    enabled: true
  });

  const {
    data,
    errors,
    isSubmitting,
    globalError,
    successMessage,
    updateField,
    validateField,
    handleSubmit,
    isValid
  } = useSecureForm({
    schema: dataSubjectRequestSchema,
    onSubmit: async (formData) => {
      const result = await dataRightsService.submitRequest(
        {
          ...formData,
          requestType: requestType as any
        },
        organizationId
      );
      
      if (result.success && onSuccess) {
        setTimeout(onSuccess, 1500);
      }
      
      return result;
    },
    rateLimitKey: `data_rights_${requestType}`,
    maxSubmissions: 3,
    timeWindow: 300000 // 5 minutes
  });

  // Update form data when secure form data changes
  React.useEffect(() => {
    setFormData({
      requesterName: data.requesterName || '',
      requesterEmail: data.requesterEmail || '',
      requesterRelationship: data.requesterRelationship || '',
      studentIdentifier: data.studentIdentifier || '',
      requestDetails: data.requestDetails || ''
    });
  }, [data]);

  const requestTypeLabels: Record<string, string> = {
    access: 'Access Request',
    rectification: 'Correction Request',
    erasure: 'Deletion Request',
    portability: 'Data Portability Request',
    opt_out: 'Opt-Out Request',
    directory_opt_out: 'Directory Information Opt-Out'
  };

  const relationshipOptions = [
    { value: 'parent', label: 'Parent' },
    { value: 'guardian', label: 'Legal Guardian' },
    { value: 'student', label: 'Student (18+ or eligible)' },
    { value: 'representative', label: 'Authorized Representative' }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Submit {requestTypeLabels[requestType] || 'Data Rights Request'}
        </h2>
        <p className="text-muted-foreground">
          Complete this form to submit your data rights request. We'll process it according to applicable privacy regulations.
        </p>
      </div>

      {/* Global messages */}
      {globalError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <p>{globalError}</p>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <SecureFormField
            label="Your Full Name"
            name="requesterName"
            type="text"
            value={data.requesterName || ''}
            onChange={(value) => updateField('requesterName', value)}
            onBlur={() => validateField('requesterName', data.requesterName)}
            error={errors.requesterName}
            required
            autoComplete="name"
            placeholder="Enter your full legal name"
          />

          <SecureFormField
            label="Your Email Address"
            name="requesterEmail"
            type="email"
            value={data.requesterEmail || ''}
            onChange={(value) => updateField('requesterEmail', value)}
            onBlur={() => validateField('requesterEmail', data.requesterEmail)}
            error={errors.requesterEmail}
            required
            autoComplete="email"
            placeholder="your.email@domain.com"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <SecureFormField
            label="Relationship to Student"
            name="requesterRelationship"
            type="select"
            value={data.requesterRelationship || ''}
            onChange={(value) => updateField('requesterRelationship', value)}
            options={relationshipOptions}
            error={errors.requesterRelationship}
            required
            helpText="Your relationship to the student whose data is being requested"
          />

          <SecureFormField
            label="Student Identifier"
            name="studentIdentifier"
            type="text"
            value={data.studentIdentifier || ''}
            onChange={(value) => updateField('studentIdentifier', value)}
            onBlur={() => validateField('studentIdentifier', data.studentIdentifier)}
            error={errors.studentIdentifier}
            required
            placeholder="Student ID, name, or other identifier"
            helpText="Student ID number, full name, or other identifying information"
          />
        </div>

        <SecureFormField
          label="Request Details"
          name="requestDetails"
          type="textarea"
          value={data.requestDetails || ''}
          onChange={(value) => updateField('requestDetails', value)}
          onBlur={() => validateField('requestDetails', data.requestDetails)}
          error={errors.requestDetails}
          required
          rows={6}
          maxLength={2000}
          placeholder="Please provide specific details about your request..."
          helpText="Be as specific as possible about what information you're requesting or what action you want taken."
        />

        {/* Legal notice */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Processing Information</h4>
          <div className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <p>• We will verify your identity before processing this request</p>
            <p>• Response times vary by request type (typically 30-45 days)</p>
            <p>• You will receive email updates about the status of your request</p>
            <p>• Some requests may require additional documentation</p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Request
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}