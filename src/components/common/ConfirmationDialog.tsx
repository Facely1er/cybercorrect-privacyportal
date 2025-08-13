// Reusable confirmation dialog for destructive actions
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning',
  loading = false
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          iconColor: 'text-red-500',
          confirmButtonClass: 'bg-red-600 hover:bg-red-700 text-white',
          bgColor: 'bg-red-50 dark:bg-red-950/30',
          borderColor: 'border-red-200 dark:border-red-800'
        };
      case 'warning':
        return {
          iconColor: 'text-amber-500',
          confirmButtonClass: 'bg-amber-600 hover:bg-amber-700 text-white',
          bgColor: 'bg-amber-50 dark:bg-amber-950/30',
          borderColor: 'border-amber-200 dark:border-amber-800'
        };
      default:
        return {
          iconColor: 'text-blue-500',
          confirmButtonClass: 'bg-primary hover:bg-primary/90',
          bgColor: 'bg-blue-50 dark:bg-blue-950/30',
          borderColor: 'border-blue-200 dark:border-blue-800'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg border w-full max-w-md shadow-xl">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-full ${styles.bgColor} ${styles.borderColor} border`}>
              <AlertTriangle className={`h-6 w-6 ${styles.iconColor}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm mb-6">{description}</p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                  className="sm:flex-1"
                >
                  {cancelText}
                </Button>
                <Button
                  onClick={onConfirm}
                  disabled={loading}
                  className={`sm:flex-1 ${styles.confirmButtonClass}`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                      Processing...
                    </>
                  ) : (
                    confirmText
                  )}
                </Button>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={loading}
              className="self-start"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}