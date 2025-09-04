import { useEffect, useRef, useCallback } from 'react';
import { localStorageService } from '../services/localStorageService';

interface UseAutosaveOptions<T> {
  delay?: number; // milliseconds to wait before saving
  enabled?: boolean;
  onSave?: (data: T) => void;
  onLoad?: (data: T) => void;
}

export function useAutosave<T>(
  formId: string,
  data: T,
  setData: (data: T) => void,
  options: UseAutosaveOptions<T> = {}
) {
  const {
    delay = 1000,
    enabled = true,
    onSave,
    onLoad
  } = options;

  const timeoutRef = useRef<NodeJS.Timeout>();
  const isInitialLoad = useRef(true);

  // Load saved data on mount
  useEffect(() => {
    if (!enabled) return;

    const savedData = localStorageService.getFormData(formId);
    if (savedData && isInitialLoad.current) {
      setData(savedData);
      onLoad?.(savedData);
    }
    isInitialLoad.current = false;
  }, [formId, setData, enabled, onLoad]);

  // Autosave data when it changes
  useEffect(() => {
    if (!enabled || isInitialLoad.current) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for saving
    timeoutRef.current = setTimeout(() => {
      localStorageService.saveFormData(formId, data);
      onSave?.(data);
    }, delay);

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, formId, delay, enabled, onSave]);

  // Manual save function
  const saveNow = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    localStorageService.saveFormData(formId, data);
    onSave?.(data);
  }, [data, formId, onSave]);

  // Clear saved data
  const clearSaved = useCallback(() => {
    localStorageService.clearFormData(formId);
  }, [formId]);

  return {
    saveNow,
    clearSaved
  };
}