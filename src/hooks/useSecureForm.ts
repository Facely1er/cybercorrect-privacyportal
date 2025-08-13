import { useState, useCallback } from 'react';
import { z } from 'zod';
import { useAutosave } from './useAutosave';

interface UseSecureFormProps<T = any> {
  schema: z.ZodSchema<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; message?: string }>;
  rateLimitKey?: string;
  maxSubmissions?: number;
  timeWindow?: number;
  formId?: string;
  enableAutosave?: boolean;
}

export function useSecureForm<T = any>({
  schema,
  onSubmit,
  rateLimitKey,
  maxSubmissions = 5,
  timeWindow = 300000, // 5 minutes
  formId,
  enableAutosave = true
}: UseSecureFormProps<T>) {
  const [data, setData] = useState<Partial<T>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Setup autosave if enabled and formId provided
  useAutosave(
    formId || 'secure_form',
    data,
    setData,
    {
      enabled: enableAutosave && !!formId,
      delay: 2000
    }
  );

  const updateField = useCallback((field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const validateField = useCallback((field: string, value: any) => {
    try {
      const fieldSchema = (schema as any).shape?.[field];
      if (fieldSchema) {
        fieldSchema.parse(value);
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({
          ...prev,
          [field]: error.errors[0]?.message || 'Invalid value'
        }));
      }
    }
  }, [schema]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setGlobalError(null);
    setSuccessMessage(null);

    try {
      // Validate form data
      const validatedData = schema.parse(data);
      
      // Check rate limiting
      if (rateLimitKey) {
        const submissions = JSON.parse(localStorage.getItem(`submissions_${rateLimitKey}`) || '[]');
        const recentSubmissions = submissions.filter(
          (timestamp: number) => Date.now() - timestamp < timeWindow
        );
        
        if (recentSubmissions.length >= maxSubmissions) {
          setGlobalError('Too many submissions. Please try again later.');
          return;
        }
        
        // Record this submission
        recentSubmissions.push(Date.now());
        localStorage.setItem(`submissions_${rateLimitKey}`, JSON.stringify(recentSubmissions));
      }

      // Submit form
      const result = await onSubmit(validatedData);
      
      if (result.success) {
        setSuccessMessage(result.message || 'Submitted successfully');
        setData({});
        setErrors({});
      } else {
        setGlobalError(result.message || 'Submission failed');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
        setGlobalError('Please correct the errors above');
      } else {
        setGlobalError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [data, schema, onSubmit, rateLimitKey, maxSubmissions, timeWindow]);

  const isValid = Object.keys(errors).length === 0 && Object.keys(data).length > 0;

  return {
    data,
    errors,
    isSubmitting,
    globalError,
    successMessage,
    updateField,
    validateField,
    handleSubmit,
    isValid
  };
}