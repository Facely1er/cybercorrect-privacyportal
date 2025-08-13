import React, { useState } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Users, FileText, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { MetricsCard } from '../common/MetricsCard';

interface PrivacyAnalyticsDashboardProps {
  organizationId: string;
}

export function PrivacyAnalyticsDashboard({ organizationId }: PrivacyAnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock analytics data
  const analyticsData = {
    dataRightsRequests: {
      total: 127,
      completed: 98,
      pending: 23,
      overdue: 6,
      trend: { value: 12, direction: 'up' as const }
    },
    privacyIncidents: {
      total: 8,
      resolved: 6,
      open: 2,
      critical: 1,
      trend: { value: 2, direction: 'down' as const }
    },
    complianceScore: {
      overall: 78,
      ferpa: 85,
      coppa: 72,
      ccpa: 68,
      trend: { value: 5, direction: 'up' as const }
    },
    stakeholderEngagement: {
      activeUsers: 1089,
      portalSessions: 2847,
      avgSessionTime: '8m 32s',
      trend: { value: 15, direction: 'up' as const }
    }
  };

  const complianceMetrics = [
    { regulation: 'FERPA', score: 85, target: 90, trend: '+5%' },
    { regulation: 'COPPA', score: 72, target: 85, trend: '+3%' },
    { regulation: 'CCPA', score: 68, target: 80, trend: '+12%' },
    { regulation: 'BIPA', score: 45, target: 75, trend: '-8%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Privacy Analytics Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive privacy program performance insights</p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d', '1y'].map(range => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Data Rights Requests"
          value={analyticsData.dataRightsRequests.total}
          description="Total requests submitted"
          icon={FileText}
          trend={analyticsData.dataRightsRequests.trend}
          status="info"
        />
        <MetricsCard
          title="Privacy Incidents"
          value={analyticsData.privacyIncidents.total}
          description="Incidents this period"
          icon={AlertTriangle}
          trend={analyticsData.privacyIncidents.trend}
          status={analyticsData.privacyIncidents.critical > 0 ? 'error' : 'warning'}
        />
        <MetricsCard
          title="Compliance Score"
          value={`${analyticsData.complianceScore.overall}%`}
          description="Overall compliance rating"
          icon={CheckCircle}
          trend={analyticsData.complianceScore.trend}
          status={analyticsData.complianceScore.overall >= 80 ? 'success' : 'warning'}
        />
        <MetricsCard
          title="Active Stakeholders"
          value={analyticsData.stakeholderEngagement.activeUsers}
          description="Users this period"
          icon={Users}
          trend={analyticsData.stakeholderEngagement.trend}
          status="info"
        />
      </div>

      {/* Compliance by Regulation */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
          Compliance Performance by Regulation
        </h3>
        <div className="space-y-4">
          {complianceMetrics.map((metric) => (
            <div key={metric.regulation} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant={metric.regulation.toLowerCase() as any}>
                    {metric.regulation}
                  </Badge>
                  <span className="font-medium">Compliance Score</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">{metric.score}%</span>
                  <span className="text-muted-foreground">Target: {metric.target}%</span>
                  <span className={`${
                    metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    metric.score >= metric.target ? 'bg-green-500' : 
                    metric.score >= metric.target * 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(metric.score, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Processing Performance */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Data Rights Request Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Completed on time</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{analyticsData.dataRightsRequests.completed}</span>
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(analyticsData.dataRightsRequests.completed / analyticsData.dataRightsRequests.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">In progress</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{analyticsData.dataRightsRequests.pending}</span>
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(analyticsData.dataRightsRequests.pending / analyticsData.dataRightsRequests.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-600">Overdue</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-red-600">{analyticsData.dataRightsRequests.overdue}</span>
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(analyticsData.dataRightsRequests.overdue / analyticsData.dataRightsRequests.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Incident Response Performance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Resolved incidents</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{analyticsData.privacyIncidents.resolved}</span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Open incidents</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{analyticsData.privacyIncidents.open}</span>
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-600">Critical incidents</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-red-600">{analyticsData.privacyIncidents.critical}</span>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}