import { z } from 'zod';

export const dataSubjectRequestSchema = z.object({
  requesterName: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  requesterEmail: z.string().email('Valid email required'),
  requesterRelationship: z.enum(['parent', 'guardian', 'student', 'representative'], {
    errorMap: () => ({ message: 'Please select your relationship to the student' })
  }),
  studentIdentifier: z.string().min(1, 'Student identifier is required').max(100, 'Identifier too long'),
  requestDetails: z.string().min(10, 'Please provide more details').max(2000, 'Details too long'),
  requestType: z.enum(['access', 'rectification', 'erasure', 'portability', 'opt_out', 'directory_opt_out']).optional()
});

export const consentRecordSchema = z.object({
  studentName: z.string().min(1, 'Student name is required'),
  parentGuardianName: z.string().min(1, 'Parent/guardian name is required'),
  parentGuardianEmail: z.string().email('Valid email required'),
  consentType: z.string().min(1, 'Consent type is required'),
  serviceProvider: z.string().min(1, 'Service provider is required'),
  consentGiven: z.boolean(),
  purpose: z.enum(['educational_services', 'administrative', 'communications', 'research', 'marketing']),
  applicableRegulations: z.array(z.string()).min(1, 'At least one regulation must be specified')
});

export const privacyIncidentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().min(10, 'Please provide more details').max(2000, 'Description too long'),
  incidentType: z.enum(['data_breach', 'unauthorized_access', 'data_loss', 'privacy_violation', 'consent_violation']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  affectedIndividualsCount: z.number().min(0, 'Count cannot be negative'),
  discoveryDate: z.string().min(1, 'Discovery date is required'),
  incidentDate: z.string().optional(),
  dataTypesAffected: z.array(z.string()).min(1, 'At least one data type must be specified')
});

export type DataSubjectRequest = z.infer<typeof dataSubjectRequestSchema>;
export type ConsentRecord = z.infer<typeof consentRecordSchema>;
export type PrivacyIncident = z.infer<typeof privacyIncidentSchema>;