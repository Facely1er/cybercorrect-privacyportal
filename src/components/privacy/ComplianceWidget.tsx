import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  Calendar,
  ArrowRight,
  Shield
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ComplianceWidgetProps {
  className?: string;
  showActions?: boolean;
}

export function ComplianceWidget({ className = '', showActions = true }: ComplianceWidgetProps) {
  // Mock compliance data - in production, fetch from compliance service
  const complianceData = {
    overallScore: 78,
    trend: '+5%',
    criticalObligations: 2,
    upcomingDeadlines: 8,
    recentCompletions: 3
  };

  const upcomingObligations = [
    {
      title: 'FERPA Annual Notice',
      dueDate: '2025-08-15',
      priority: 'critical',
      daysUntil: 195
    },
    {
      title: 'COPPA Vendor Review',
      dueDate: '2025-03-31',
      priority: 'high',
      daysUntil: 87
    },
    {
      title: 'Security Assessment',
      dueDate: '2025-02-15',
      priority: 'medium',
      daysUntil: 43
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Medium</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Low</Badge>;
    }
  };

  const formatDaysUntil = (days: number) => {
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    if (days < 0) return `${Math.abs(days)} days overdue`;
    return `${days} days remaining`;
  };

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Compliance Status</h3>
            <p className="text-sm text-muted-foreground">Current compliance overview</p>
          </div>
        </div>
        {showActions && (
          <Link to="/privacy/obligations">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        )}
      </div>

      {/* Compliance Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Compliance Score</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {complianceData.overallScore}%
            </span>
            <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              {complianceData.trend}
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-primary-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${complianceData.overallScore}%` }}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-lg font-bold text-red-600 dark:text-red-400">
            {complianceData.criticalObligations}
          </div>
          <div className="text-xs text-muted-foreground">Critical</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
            {complianceData.upcomingDeadlines}
          </div>
          <div className="text-xs text-muted-foreground">Upcoming</div>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {complianceData.recentCompletions}
          </div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
      </div>

      {/* Upcoming Obligations */}
      <div>
        <h4 className="font-medium text-sm mb-3 flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          Upcoming Deadlines
        </h4>
        <div className="space-y-3">
          {upcomingObligations.slice(0, 3).map((obligation, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1">
                <h5 className="font-medium text-sm">{obligation.title}</h5>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {formatDaysUntil(obligation.daysUntil)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={
                  obligation.priority === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  obligation.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                  obligation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }>
                  {obligation.priority}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showActions && (
        <div className="mt-6 pt-4 border-t">
          <Link to="/privacy/obligations">
            <Button variant="outline" size="sm" className="w-full">
              Manage All Obligations
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}