import React from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface SecureFormFieldProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select';
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  autoComplete?: string;
  rows?: number;
  maxLength?: number;
  options?: { value: string; label: string }[];
}

export function SecureFormField({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder,
  helpText,
  autoComplete,
  rows = 4,
  maxLength,
  options = []
}: SecureFormFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const inputClasses = `w-full px-3 py-2 border rounded-md bg-background transition-colors ${
    error ? 'border-red-500 focus:ring-red-500' : 'border-input focus:ring-2 focus:ring-primary focus:border-transparent'
  }`;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={inputClasses}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            required={required}
          />
        );
      
      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={inputClasses}
            required={required}
          >
            <option value="">Select an option</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'password':
        return (
          <div className="relative">
            <input
              id={name}
              name={name}
              type={showPassword ? 'text' : 'password'}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              className={`${inputClasses} pr-10`}
              placeholder={placeholder}
              autoComplete={autoComplete}
              maxLength={maxLength}
              required={required}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        );
      
      default:
        return (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={inputClasses}
            placeholder={placeholder}
            autoComplete={autoComplete}
            maxLength={maxLength}
            required={required}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {renderInput()}
      
      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {helpText && !error && (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      )}
      
      {maxLength && type === 'textarea' && (
        <div className="text-xs text-muted-foreground text-right">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
}