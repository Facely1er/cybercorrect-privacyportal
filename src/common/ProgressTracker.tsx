import React from 'react';
import { CheckCircle, Clock, Target } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

interface ProgressStep {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'upcoming';
  progress?: number; // 0-100 for current step
}

interface ProgressTrackerProps {
  steps: ProgressStep[];
  orientation?: 'horizontal' | 'vertical';
  showProgress?: boolean;
  className?: string;
}

export function ProgressTracker({ 
  steps, 
  orientation = 'horizontal', 
  showProgress = true,
  className = '' 
}: ProgressTrackerProps) {
  const currentStepIndex = steps.findIndex(step => step.status === 'current');
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const totalSteps = steps.length;
  const overallProgress = Math.round((completedSteps / totalSteps) * 100);

  if (orientation === 'vertical') {
    return (
      <div className={`space-y-6 ${className}`}>
        {showProgress && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{overallProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        )}
        
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.id} className="relative flex items-start">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full z-10 ${
                  step.status === 'completed' 
                    ? 'bg-green-500 text-white' 
                    : step.status === 'current'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : step.status === 'current' ? (
                    <Target className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>
                
                <div className="ml-4 flex-1">
                  <h3 className={`font-medium ${
                    step.status === 'completed' || step.status === 'current' 
                      ? 'text-foreground' 
                      : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </h3>
                  
                  {step.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  )}
                  
                  {step.status === 'current' && step.progress !== undefined && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs text-muted-foreground">{step.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <div 
                          className="bg-primary-600 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${step.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <Badge 
                    variant={step.status === 'completed' ? 'ferpa' : step.status === 'current' ? 'coppa' : 'general'}
                    className="mt-2"
                  >
                    {step.status === 'completed' ? 'Completed' : 
                     step.status === 'current' ? 'In Progress' : 'Upcoming'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Horizontal layout
  return (
    <div className={className}>
      {showProgress && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center text-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
                step.status === 'completed' 
                  ? 'bg-green-500 text-white' 
                  : step.status === 'current'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}>
                {step.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : step.status === 'current' ? (
                  <Target className="w-5 h-5" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
              </div>
              
              <h3 className={`font-medium text-sm max-w-24 ${
                step.status === 'completed' || step.status === 'current' 
                  ? 'text-foreground' 
                  : 'text-muted-foreground'
              }`}>
                {step.title}
              </h3>
              
              {step.status === 'current' && step.progress !== undefined && (
                <div className="w-20 mt-1">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                    <div 
                      className="bg-primary-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${step.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div className={`flex-1 h-px mx-4 ${
                index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
