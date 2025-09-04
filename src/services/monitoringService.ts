// Production monitoring and logging service
import { environment, appConfig } from '../config/environment';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  firstInputDelay?: number;
  cumulativeLayoutShift?: number;
  timeToInteractive?: number;
}

interface UserEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: string;
  userId?: string;
  sessionId: string;
  url: string;
  userAgent: string;
}

interface ErrorEvent {
  message: string;
  stack?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  timestamp: string;
  userId?: string;
  sessionId: string;
  url: string;
  userAgent: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

class MonitoringService {
  private sessionId: string;
  private userId?: string;
  private startTime: number;
  private eventQueue: (UserEvent | ErrorEvent)[] = [];
  private flushInterval: number = 30000; // 30 seconds
  private maxQueueSize: number = 100;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = performance.now();
    this.loadUserId();
    this.initializePerformanceObserver();
    this.startEventFlush();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadUserId(): void {
    try {
      const stored = localStorage.getItem('privacy_portal_user_id');
      this.userId = stored || undefined;
    } catch (error) {
      // Ignore localStorage errors
    }
  }

  setUserId(userId: string): void {
    this.userId = userId;
    try {
      localStorage.setItem('privacy_portal_user_id', userId);
    } catch (error) {
      // Ignore localStorage errors
    }
  }

  clearUserId(): void {
    this.userId = undefined;
    try {
      localStorage.removeItem('privacy_portal_user_id');
    } catch (error) {
      // Ignore localStorage errors
    }
  }

  private initializePerformanceObserver(): void {
    if (!environment.production || !appConfig.analytics.enabled) {
      return;
    }

    // Observe Core Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // First Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries[0] as PerformanceEntry;
          this.trackPerformanceMetric('firstContentfulPaint', fcp.startTime);
        }).observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries[entries.length - 1] as PerformanceEntry;
          this.trackPerformanceMetric('largestContentfulPaint', lcp.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.trackPerformanceMetric('firstInputDelay', entry.processingStart - entry.startTime);
          });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              this.trackPerformanceMetric('cumulativeLayoutShift', entry.value);
            }
          });
        }).observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        if (environment.debugMode) {
          console.warn('Performance Observer setup failed:', error);
        }
      }
    }
  }

  private trackPerformanceMetric(metric: string, value: number): void {
    if (!environment.production || !appConfig.analytics.enabled) {
      return;
    }

    const metrics: PerformanceMetrics = {
      loadTime: performance.now() - this.startTime,
      [metric]: value
    };

    this.sendPerformanceMetrics(metrics);
  }

  private async sendPerformanceMetrics(metrics: PerformanceMetrics): Promise<void> {
    try {
      await fetch('/api/metrics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...metrics,
          timestamp: new Date().toISOString(),
          sessionId: this.sessionId,
          userId: this.userId,
          url: window.location.href,
          userAgent: navigator.userAgent,
          version: appConfig.version,
          environment: environment.environment
        }),
      });
    } catch (error) {
      if (environment.debugMode) {
        console.warn('Failed to send performance metrics:', error);
      }
    }
  }

  // Track user events
  trackEvent(event: string, category: string, action: string, label?: string, value?: number): void {
    if (!environment.production || !appConfig.analytics.enabled) {
      return;
    }

    const userEvent: UserEvent = {
      event,
      category,
      action,
      label,
      value,
      timestamp: new Date().toISOString(),
      userId: this.userId,
      sessionId: this.sessionId,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.addToQueue(userEvent);
  }

  // Track page views
  trackPageView(page: string, title?: string): void {
    this.trackEvent('page_view', 'navigation', 'view', page);
    
    // Update page title for analytics
    if (title) {
      document.title = title;
    }
  }

  // Track user interactions
  trackInteraction(element: string, action: string, label?: string): void {
    this.trackEvent('interaction', 'user_action', action, `${element}${label ? ` - ${label}` : ''}`);
  }

  // Track form submissions
  trackFormSubmission(formName: string, success: boolean, errorMessage?: string): void {
    this.trackEvent('form_submission', 'form', success ? 'success' : 'error', formName, success ? 1 : 0);
    
    if (!success && errorMessage) {
      this.trackError(new Error(`Form submission failed: ${errorMessage}`), 'medium');
    }
  }

  // Track errors
  trackError(error: Error, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'): void {
    if (!environment.production || !appConfig.errorReporting.enabled) {
      return;
    }

    const errorEvent: ErrorEvent = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userId: this.userId,
      sessionId: this.sessionId,
      url: window.location.href,
      userAgent: navigator.userAgent,
      severity
    };

    this.addToQueue(errorEvent);
  }

  // Track API calls
  trackApiCall(endpoint: string, method: string, statusCode: number, duration: number): void {
    this.trackEvent('api_call', 'network', method.toLowerCase(), endpoint, statusCode);
    
    // Track slow API calls
    if (duration > 5000) { // 5 seconds
      this.trackError(new Error(`Slow API call: ${method} ${endpoint} took ${duration}ms`), 'low');
    }
  }

  // Track authentication events
  trackAuthEvent(action: 'login' | 'logout' | 'register' | 'password_reset', success: boolean): void {
    this.trackEvent('authentication', 'auth', action, success ? 'success' : 'failure', success ? 1 : 0);
  }

  private addToQueue(event: UserEvent | ErrorEvent): void {
    this.eventQueue.push(event);
    
    // Flush if queue is full
    if (this.eventQueue.length >= this.maxQueueSize) {
      this.flushEvents();
    }
  }

  private startEventFlush(): void {
    setInterval(() => {
      if (this.eventQueue.length > 0) {
        this.flushEvents();
      }
    }, this.flushInterval);
  }

  private async flushEvents(): Promise<void> {
    if (this.eventQueue.length === 0) {
      return;
    }

    const events = [...this.eventQueue];
    this.eventQueue = [];

    try {
      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          events,
          timestamp: new Date().toISOString(),
          sessionId: this.sessionId,
          userId: this.userId,
          version: appConfig.version,
          environment: environment.environment
        }),
      });
    } catch (error) {
      if (environment.debugMode) {
        console.warn('Failed to flush events:', error);
      }
      // Re-add events to queue for retry
      this.eventQueue.unshift(...events);
    }
  }

  // Get current session info
  getSessionInfo(): { sessionId: string; userId?: string; startTime: number } {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      startTime: this.startTime
    };
  }

  // Track custom metrics
  trackCustomMetric(name: string, value: number, unit?: string): void {
    if (!environment.production || !appConfig.analytics.enabled) {
      return;
    }

    this.trackEvent('custom_metric', 'metrics', 'track', `${name}${unit ? ` (${unit})` : ''}`, value);
  }

  // Track business metrics
  trackBusinessMetric(metric: string, value: number, context?: Record<string, any>): void {
    if (!environment.production || !appConfig.analytics.enabled) {
      return;
    }

    this.trackEvent('business_metric', 'business', 'track', metric, value);
    
    if (context) {
      this.trackEvent('business_context', 'business', 'context', metric, Object.keys(context).length);
    }
  }
}

// Export singleton instance
export const monitoringService = new MonitoringService();

// Export class for testing
export { MonitoringService };

// Export types
export type { PerformanceMetrics, UserEvent, ErrorEvent };