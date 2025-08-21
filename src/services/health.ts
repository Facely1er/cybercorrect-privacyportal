// Health check and system status monitoring
import { environment } from '@/config/environment';
import { monitoringService } from './monitoring';

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  environment: string;
  uptime: number;
  checks: {
    database: HealthCheck;
    api: HealthCheck;
    storage: HealthCheck;
    auth: HealthCheck;
    monitoring: HealthCheck;
  };
  metrics: {
    memoryUsage?: number;
    errorRate: number;
    responseTime: number;
  };
}

export interface HealthCheck {
  status: 'pass' | 'fail' | 'warn';
  message: string;
  timestamp: string;
  responseTime?: number;
  details?: Record<string, any>;
}

class HealthService {
  private startTime: number = Date.now();
  private errorCount: number = 0;
  private requestCount: number = 0;
  private totalResponseTime: number = 0;

  constructor() {
    // Track errors for health metrics
    window.addEventListener('error', () => {
      this.errorCount++;
    });

    window.addEventListener('unhandledrejection', () => {
      this.errorCount++;
    });
  }

  public async getHealthStatus(): Promise<HealthStatus> {
    const startTime = performance.now();
    
    const checks = await this.runHealthChecks();
    const metrics = this.getMetrics();
    
    const overallStatus = this.determineOverallStatus(checks);
    
    const endTime = performance.now();
    
    return {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: __APP_VERSION__ || '1.0.0',
      environment: environment.environment,
      uptime: Date.now() - this.startTime,
      checks,
      metrics: {
        ...metrics,
        responseTime: endTime - startTime,
      },
    };
  }

  private async runHealthChecks(): Promise<HealthStatus['checks']> {
    const checks = await Promise.allSettled([
      this.checkDatabase(),
      this.checkAPI(),
      this.checkStorage(),
      this.checkAuth(),
      this.checkMonitoring(),
    ]);

    return {
      database: checks[0].status === 'fulfilled' ? checks[0].value : this.createFailedCheck('Database check failed'),
      api: checks[1].status === 'fulfilled' ? checks[1].value : this.createFailedCheck('API check failed'),
      storage: checks[2].status === 'fulfilled' ? checks[2].value : this.createFailedCheck('Storage check failed'),
      auth: checks[3].status === 'fulfilled' ? checks[3].value : this.createFailedCheck('Auth check failed'),
      monitoring: checks[4].status === 'fulfilled' ? checks[4].value : this.createFailedCheck('Monitoring check failed'),
    };
  }

  private async checkDatabase(): Promise<HealthCheck> {
    const startTime = performance.now();
    
    try {
      if (!environment.isConfigured || !environment.supabaseUrl) {
        return {
          status: 'warn',
          message: 'Database not configured',
          timestamp: new Date().toISOString(),
          responseTime: performance.now() - startTime,
          details: { configured: false },
        };
      }

      // Simple connectivity check
      const response = await fetch(`${environment.supabaseUrl}/rest/v1/`, {
        method: 'HEAD',
        headers: {
          'apikey': environment.supabaseAnonKey,
        },
      });

      if (response.ok) {
        return {
          status: 'pass',
          message: 'Database connection successful',
          timestamp: new Date().toISOString(),
          responseTime: performance.now() - startTime,
          details: { 
            url: environment.supabaseUrl,
            status: response.status,
          },
        };
      } else {
        return {
          status: 'fail',
          message: `Database connection failed: ${response.status}`,
          timestamp: new Date().toISOString(),
          responseTime: performance.now() - startTime,
          details: { 
            status: response.status,
            statusText: response.statusText,
          },
        };
      }
    } catch (error) {
      return {
        status: 'fail',
        message: `Database connection error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        responseTime: performance.now() - startTime,
        details: { error: error instanceof Error ? error.message : 'Unknown error' },
      };
    }
  }

  private async checkAPI(): Promise<HealthCheck> {
    const startTime = performance.now();
    
    try {
      // Check if we can make a basic request to our own origin
      const response = await fetch(window.location.origin, {
        method: 'HEAD',
      });

      if (response.ok) {
        return {
          status: 'pass',
          message: 'API connectivity successful',
          timestamp: new Date().toISOString(),
          responseTime: performance.now() - startTime,
          details: { 
            origin: window.location.origin,
            status: response.status,
          },
        };
      } else {
        return {
          status: 'warn',
          message: `API response: ${response.status}`,
          timestamp: new Date().toISOString(),
          responseTime: performance.now() - startTime,
          details: { 
            status: response.status,
            statusText: response.statusText,
          },
        };
      }
    } catch (error) {
      return {
        status: 'fail',
        message: `API check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        responseTime: performance.now() - startTime,
        details: { error: error instanceof Error ? error.message : 'Unknown error' },
      };
    }
  }

  private async checkStorage(): Promise<HealthCheck> {
    const startTime = performance.now();
    
    try {
      // Test localStorage availability
      const testKey = 'health-check-test';
      const testValue = 'test-value';
      
      localStorage.setItem(testKey, testValue);
      const retrieved = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      
      if (retrieved === testValue) {
        return {
          status: 'pass',
          message: 'Local storage working correctly',
          timestamp: new Date().toISOString(),
          responseTime: performance.now() - startTime,
        };
      } else {
        return {
          status: 'fail',
          message: 'Local storage test failed',
          timestamp: new Date().toISOString(),
          responseTime: performance.now() - startTime,
        };
      }
    } catch (error) {
      return {
        status: 'fail',
        message: `Storage check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        responseTime: performance.now() - startTime,
        details: { error: error instanceof Error ? error.message : 'Unknown error' },
      };
    }
  }

  private async checkAuth(): Promise<HealthCheck> {
    const startTime = performance.now();
    
    try {
      if (!environment.isConfigured) {
        return {
          status: 'warn',
          message: 'Authentication not configured',
          timestamp: new Date().toISOString(),
          responseTime: performance.now() - startTime,
          details: { configured: false },
        };
      }

      // Check if Supabase auth endpoint is reachable
      const response = await fetch(`${environment.supabaseUrl}/auth/v1/settings`, {
        method: 'GET',
        headers: {
          'apikey': environment.supabaseAnonKey,
        },
      });

      if (response.ok) {
        return {
          status: 'pass',
          message: 'Authentication service available',
          timestamp: new Date().toISOString(),
          responseTime: performance.now() - startTime,
          details: { 
            status: response.status,
          },
        };
      } else {
        return {
          status: 'warn',
          message: `Auth service response: ${response.status}`,
          timestamp: new Date().toISOString(),
          responseTime: performance.now() - startTime,
          details: { 
            status: response.status,
            statusText: response.statusText,
          },
        };
      }
    } catch (error) {
      return {
        status: 'fail',
        message: `Auth check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        responseTime: performance.now() - startTime,
        details: { error: error instanceof Error ? error.message : 'Unknown error' },
      };
    }
  }

  private async checkMonitoring(): Promise<HealthCheck> {
    const startTime = performance.now();
    
    try {
      const monitoringStatus = monitoringService.getHealthStatus();
      
      const hasIssues = monitoringStatus.errorQueueSize > 50 || !monitoringStatus.isOnline;
      
      return {
        status: hasIssues ? 'warn' : 'pass',
        message: hasIssues ? 'Monitoring has issues' : 'Monitoring service operational',
        timestamp: new Date().toISOString(),
        responseTime: performance.now() - startTime,
        details: monitoringStatus,
      };
    } catch (error) {
      return {
        status: 'fail',
        message: `Monitoring check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
        responseTime: performance.now() - startTime,
        details: { error: error instanceof Error ? error.message : 'Unknown error' },
      };
    }
  }

  private createFailedCheck(message: string): HealthCheck {
    return {
      status: 'fail',
      message,
      timestamp: new Date().toISOString(),
    };
  }

  private getMetrics() {
    const errorRate = this.requestCount > 0 ? (this.errorCount / this.requestCount) * 100 : 0;
    const avgResponseTime = this.requestCount > 0 ? this.totalResponseTime / this.requestCount : 0;

    const metrics: HealthStatus['metrics'] = {
      errorRate,
      responseTime: avgResponseTime,
    };

    // Add memory usage if available
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      metrics.memoryUsage = memory.usedJSHeapSize / memory.totalJSHeapSize * 100;
    }

    return metrics;
  }

  private determineOverallStatus(checks: HealthStatus['checks']): HealthStatus['status'] {
    const checkValues = Object.values(checks);
    
    if (checkValues.some(check => check.status === 'fail')) {
      return 'unhealthy';
    }
    
    if (checkValues.some(check => check.status === 'warn')) {
      return 'degraded';
    }
    
    return 'healthy';
  }

  public recordRequest(responseTime: number): void {
    this.requestCount++;
    this.totalResponseTime += responseTime;
  }

  public getUptime(): number {
    return Date.now() - this.startTime;
  }

  public getErrorRate(): number {
    return this.requestCount > 0 ? (this.errorCount / this.requestCount) * 100 : 0;
  }
}

// Singleton instance
export const healthService = new HealthService();

// React hook for health status
export const useHealthStatus = () => {
  const [healthStatus, setHealthStatus] = React.useState<HealthStatus | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const status = await healthService.getHealthStatus();
      setHealthStatus(status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Health check failed');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    checkHealth();
    
    // Refresh health status every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { healthStatus, loading, error, checkHealth };
};