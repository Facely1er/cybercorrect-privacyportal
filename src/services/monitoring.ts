// Production monitoring and error tracking service
import { environment } from '@/config/environment';

export interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  userId?: string;
  sessionId: string;
  component?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: string;
  url: string;
  sessionId: string;
  context?: Record<string, any>;
}

class MonitoringService {
  private sessionId: string;
  private userId?: string;
  private errorQueue: ErrorReport[] = [];
  private performanceQueue: PerformanceMetric[] = [];
  private isOnline: boolean = navigator.onLine;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.setupEventListeners();
    this.setupPerformanceMonitoring();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupEventListeners(): void {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.reportError({
        message: event.message,
        stack: event.error?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId,
        userId: this.userId,
        severity: 'high',
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        }
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId,
        userId: this.userId,
        severity: 'high',
        context: {
          type: 'unhandledrejection',
          reason: event.reason
        }
      });
    });

    // Network status monitoring
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushQueues();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Page visibility monitoring
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flushQueues();
      }
    });
  }

  private setupPerformanceMonitoring(): void {
    // Monitor Core Web Vitals
    this.observePerformance();

    // Monitor resource loading
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.reportPerformanceMetrics();
      }, 0);
    });
  }

  private observePerformance(): void {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.reportPerformance({
            name: 'LCP',
            value: lastEntry.startTime,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            sessionId: this.sessionId,
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            this.reportPerformance({
              name: 'FID',
              value: entry.processingStart - entry.startTime,
              timestamp: new Date().toISOString(),
              url: window.location.href,
              sessionId: this.sessionId,
            });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          this.reportPerformance({
            name: 'CLS',
            value: clsValue,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            sessionId: this.sessionId,
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('Performance monitoring not available:', error);
      }
    }
  }

  private reportPerformanceMetrics(): void {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        // Time to First Byte
        this.reportPerformance({
          name: 'TTFB',
          value: navigation.responseStart - navigation.requestStart,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          sessionId: this.sessionId,
        });

        // DOM Content Loaded
        this.reportPerformance({
          name: 'DCL',
          value: navigation.domContentLoadedEventEnd - navigation.navigationStart,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          sessionId: this.sessionId,
        });

        // Load Complete
        this.reportPerformance({
          name: 'Load',
          value: navigation.loadEventEnd - navigation.navigationStart,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          sessionId: this.sessionId,
        });
      }
    }
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public reportError(error: Partial<ErrorReport>): void {
    const fullError: ErrorReport = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      url: error.url || window.location.href,
      userAgent: error.userAgent || navigator.userAgent,
      timestamp: error.timestamp || new Date().toISOString(),
      sessionId: error.sessionId || this.sessionId,
      userId: error.userId || this.userId,
      severity: error.severity || 'medium',
      component: error.component,
      context: error.context,
    };

    this.errorQueue.push(fullError);

    // Immediate reporting for critical errors
    if (fullError.severity === 'critical') {
      this.flushErrors();
    } else if (this.errorQueue.length >= 10) {
      this.flushErrors();
    }
  }

  public reportPerformance(metric: PerformanceMetric): void {
    this.performanceQueue.push(metric);

    if (this.performanceQueue.length >= 20) {
      this.flushPerformanceMetrics();
    }
  }

  public reportCustomEvent(name: string, data?: Record<string, any>): void {
    const event = {
      name,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      sessionId: this.sessionId,
      userId: this.userId,
      data,
    };

    // Send custom events immediately if online
    if (this.isOnline && environment.production) {
      this.sendCustomEvent(event);
    }
  }

  private async flushQueues(): Promise<void> {
    if (!this.isOnline) return;

    await Promise.all([
      this.flushErrors(),
      this.flushPerformanceMetrics(),
    ]);
  }

  private async flushErrors(): Promise<void> {
    if (this.errorQueue.length === 0 || !this.isOnline) return;

    const errors = [...this.errorQueue];
    this.errorQueue = [];

    try {
      await this.sendErrors(errors);
    } catch (error) {
      // Re-queue errors if sending failed
      this.errorQueue.unshift(...errors);
      console.warn('Failed to send error reports:', error);
    }
  }

  private async flushPerformanceMetrics(): Promise<void> {
    if (this.performanceQueue.length === 0 || !this.isOnline) return;

    const metrics = [...this.performanceQueue];
    this.performanceQueue = [];

    try {
      await this.sendPerformanceMetrics(metrics);
    } catch (error) {
      // Re-queue metrics if sending failed
      this.performanceQueue.unshift(...metrics);
      console.warn('Failed to send performance metrics:', error);
    }
  }

  private async sendErrors(errors: ErrorReport[]): Promise<void> {
    if (!environment.production) {
      console.group('🔍 Error Reports');
      errors.forEach(error => console.error(error));
      console.groupEnd();
      return;
    }

    // Send to configured error tracking service (Sentry, LogRocket, etc.)
    const endpoint = import.meta.env.VITE_ERROR_ENDPOINT;
    if (endpoint) {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ errors }),
      });
    }
  }

  private async sendPerformanceMetrics(metrics: PerformanceMetric[]): Promise<void> {
    if (!environment.production) {
      console.group('📊 Performance Metrics');
      metrics.forEach(metric => console.log(metric));
      console.groupEnd();
      return;
    }

    // Send to configured analytics service
    const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    if (endpoint) {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metrics }),
      });
    }
  }

  private async sendCustomEvent(event: any): Promise<void> {
    if (!environment.production) {
      console.log('📈 Custom Event:', event);
      return;
    }

    // Send to configured analytics service
    const endpoint = import.meta.env.VITE_EVENTS_ENDPOINT;
    if (endpoint) {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    }
  }

  public getHealthStatus(): {
    sessionId: string;
    isOnline: boolean;
    errorQueueSize: number;
    performanceQueueSize: number;
    userId?: string;
  } {
    return {
      sessionId: this.sessionId,
      isOnline: this.isOnline,
      errorQueueSize: this.errorQueue.length,
      performanceQueueSize: this.performanceQueue.length,
      userId: this.userId,
    };
  }
}

// Singleton instance
export const monitoringService = new MonitoringService();

// React hook for component-level error reporting
export const useErrorReporting = () => {
  const reportError = (error: Error, component?: string, context?: Record<string, any>) => {
    monitoringService.reportError({
      message: error.message,
      stack: error.stack,
      component,
      severity: 'medium',
      context,
    });
  };

  const reportCustomEvent = (name: string, data?: Record<string, any>) => {
    monitoringService.reportCustomEvent(name, data);
  };

  return { reportError, reportCustomEvent };
};

// Higher-order component for error boundary integration
export const withErrorReporting = <P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string
) => {
  return (props: P) => {
    const { reportError } = useErrorReporting();

    React.useEffect(() => {
      const handleError = (error: Error) => {
        reportError(error, componentName || Component.name);
      };

      // You would integrate this with your error boundary
      return () => {
        // Cleanup if needed
      };
    }, [reportError]);

    return <Component {...props} />;
  };
};