// Health monitoring dashboard component for administrators
import React from 'react';
import { Activity, AlertTriangle, CheckCircle, Clock, Database, Globe, Shield, Zap } from 'lucide-react';
import { useHealthStatus } from '@/services/health';
import { monitoringService } from '@/services/monitoring';

interface HealthMetricCardProps {
  title: string;
  status: 'pass' | 'warn' | 'fail';
  value?: string | number;
  message: string;
  icon: React.ReactNode;
  details?: Record<string, any>;
}

const HealthMetricCard: React.FC<HealthMetricCardProps> = ({
  title,
  status,
  value,
  message,
  icon,
  details
}) => {
  const statusColors = {
    pass: 'bg-green-50 border-green-200 text-green-800',
    warn: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    fail: 'bg-red-50 border-red-200 text-red-800'
  };

  const statusIcons = {
    pass: <CheckCircle className="h-5 w-5 text-green-600" />,
    warn: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
    fail: <AlertTriangle className="h-5 w-5 text-red-600" />
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${statusColors[status]}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="font-semibold">{title}</h3>
        </div>
        {statusIcons[status]}
      </div>
      
      {value && (
        <div className="text-2xl font-bold mb-1">{value}</div>
      )}
      
      <p className="text-sm opacity-80 mb-2">{message}</p>
      
      {details && (
        <details className="text-xs">
          <summary className="cursor-pointer font-medium">Details</summary>
          <pre className="mt-2 p-2 bg-black bg-opacity-10 rounded text-xs overflow-x-auto">
            {JSON.stringify(details, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
};

export const HealthDashboard: React.FC = () => {
  const { healthStatus, loading, error, checkHealth } = useHealthStatus();
  const [monitoringStatus, setMonitoringStatus] = React.useState(monitoringService.getHealthStatus());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMonitoringStatus(monitoringService.getHealthStatus());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 animate-spin" />
          <span>Loading health status...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-2 text-red-800">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-semibold">Health Check Failed</span>
        </div>
        <p className="text-red-600 mt-1">{error}</p>
        <button
          onClick={checkHealth}
          className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!healthStatus) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-600">No health data available</p>
      </div>
    );
  }

  const overallStatusColor = {
    healthy: 'text-green-600',
    degraded: 'text-yellow-600',
    unhealthy: 'text-red-600'
  }[healthStatus.status];

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">System Health</h2>
          <button
            onClick={checkHealth}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className={`text-2xl font-bold ${overallStatusColor}`}>
              {healthStatus.status.toUpperCase()}
            </div>
            <div className="text-sm text-gray-600">Overall Status</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.floor(healthStatus.uptime / (1000 * 60 * 60 * 24))}d
            </div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {healthStatus.version}
            </div>
            <div className="text-sm text-gray-600">Version</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {healthStatus.environment}
            </div>
            <div className="text-sm text-gray-600">Environment</div>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          Last updated: {new Date(healthStatus.timestamp).toLocaleString()}
        </div>
      </div>

      {/* Health Checks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HealthMetricCard
          title="Database"
          status={healthStatus.checks.database.status}
          message={healthStatus.checks.database.message}
          icon={<Database className="h-5 w-5" />}
          value={healthStatus.checks.database.responseTime ? `${Math.round(healthStatus.checks.database.responseTime)}ms` : undefined}
          details={healthStatus.checks.database.details}
        />

        <HealthMetricCard
          title="API"
          status={healthStatus.checks.api.status}
          message={healthStatus.checks.api.message}
          icon={<Globe className="h-5 w-5" />}
          value={healthStatus.checks.api.responseTime ? `${Math.round(healthStatus.checks.api.responseTime)}ms` : undefined}
          details={healthStatus.checks.api.details}
        />

        <HealthMetricCard
          title="Storage"
          status={healthStatus.checks.storage.status}
          message={healthStatus.checks.storage.message}
          icon={<Zap className="h-5 w-5" />}
          value={healthStatus.checks.storage.responseTime ? `${Math.round(healthStatus.checks.storage.responseTime)}ms` : undefined}
          details={healthStatus.checks.storage.details}
        />

        <HealthMetricCard
          title="Authentication"
          status={healthStatus.checks.auth.status}
          message={healthStatus.checks.auth.message}
          icon={<Shield className="h-5 w-5" />}
          value={healthStatus.checks.auth.responseTime ? `${Math.round(healthStatus.checks.auth.responseTime)}ms` : undefined}
          details={healthStatus.checks.auth.details}
        />

        <HealthMetricCard
          title="Monitoring"
          status={healthStatus.checks.monitoring.status}
          message={healthStatus.checks.monitoring.message}
          icon={<Activity className="h-5 w-5" />}
          details={healthStatus.checks.monitoring.details}
        />

        {/* Performance Metrics */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Performance</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Error Rate:</span>
              <span className={`text-sm font-medium ${
                healthStatus.metrics.errorRate > 5 ? 'text-red-600' :
                healthStatus.metrics.errorRate > 1 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {healthStatus.metrics.errorRate.toFixed(2)}%
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm">Response Time:</span>
              <span className={`text-sm font-medium ${
                healthStatus.metrics.responseTime > 1000 ? 'text-red-600' :
                healthStatus.metrics.responseTime > 500 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {Math.round(healthStatus.metrics.responseTime)}ms
              </span>
            </div>
            
            {healthStatus.metrics.memoryUsage && (
              <div className="flex justify-between">
                <span className="text-sm">Memory Usage:</span>
                <span className={`text-sm font-medium ${
                  healthStatus.metrics.memoryUsage > 80 ? 'text-red-600' :
                  healthStatus.metrics.memoryUsage > 60 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {Math.round(healthStatus.metrics.memoryUsage)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Monitoring Service Status */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Monitoring Service</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`text-lg font-bold ${monitoringStatus.isOnline ? 'text-green-600' : 'text-red-600'}`}>
              {monitoringStatus.isOnline ? 'ONLINE' : 'OFFLINE'}
            </div>
            <div className="text-sm text-gray-600">Connection</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {monitoringStatus.errorQueueSize}
            </div>
            <div className="text-sm text-gray-600">Queued Errors</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {monitoringStatus.performanceQueueSize}
            </div>
            <div className="text-sm text-gray-600">Queued Metrics</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-gray-600">
              {monitoringStatus.sessionId.slice(-8)}
            </div>
            <div className="text-sm text-gray-600">Session ID</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={checkHealth}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh Health Check
          </button>
          
          <button
            onClick={() => monitoringService.reportCustomEvent('manual_health_check')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Log Health Check Event
          </button>
          
          <button
            onClick={() => window.open('/health', '_blank')}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            View Raw Health Data
          </button>
        </div>
      </div>
    </div>
  );
};