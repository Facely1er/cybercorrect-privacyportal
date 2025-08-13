// Reusable metrics card component for dashboards
import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MetricsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    timeframe?: string;
  };
  status?: 'success' | 'warning' | 'error' | 'info';
  onClick?: () => void;
  className?: string;
}

export function MetricsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  status,
  onClick,
  className
}: MetricsCardProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return {
          iconBg: 'bg-green-100 dark:bg-green-900/30',
          iconColor: 'text-green-600 dark:text-green-400',
          valuColor: 'text-green-600 dark:text-green-400'
        };
      case 'warning':
        return {
          iconBg: 'bg-amber-100 dark:bg-amber-900/30',
          iconColor: 'text-amber-600 dark:text-amber-400',
          valuColor: 'text-amber-600 dark:text-amber-400'
        };
      case 'error':
        return {
          iconBg: 'bg-red-100 dark:bg-red-900/30',
          iconColor: 'text-red-600 dark:text-red-400',
          valuColor: 'text-red-600 dark:text-red-400'
        };
      case 'info':
        return {
          iconBg: 'bg-blue-100 dark:bg-blue-900/30',
          iconColor: 'text-blue-600 dark:text-blue-400',
          valuColor: 'text-blue-600 dark:text-blue-400'
        };
      default:
        return {
          iconBg: 'bg-primary-100 dark:bg-primary-900/30',
          iconColor: 'text-primary-600 dark:text-primary-400',
          valuColor: 'text-foreground'
        };
    }
  };

  const getTrendIcon = () => {
    switch (trend?.direction) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />;
      case 'down':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = () => {
    switch (trend?.direction) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const styles = getStatusStyles();

  return (
    <div 
      className={cn(
        'bg-white dark:bg-gray-900 rounded-lg border p-6 transition-shadow',
        onClick && 'cursor-pointer hover:shadow-md',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        {Icon && (
          <div className={`p-2 rounded-lg ${styles.iconBg}`}>
            <Icon className={`h-6 w-6 ${styles.iconColor}`} />
          </div>
        )}
        <span className={`text-2xl font-bold ${styles.valuColor}`}>
          {value}
        </span>
      </div>
      
      <h3 className="font-semibold mb-1">{title}</h3>
      
      {description && (
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
      )}
      
      {trend && (
        <div className={`flex items-center gap-1 text-xs ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="font-medium">
            {trend.direction === 'neutral' ? 'No change' : `${Math.abs(trend.value)}${typeof trend.value === 'number' && trend.value % 1 !== 0 ? '' : trend.value > 100 ? '' : '%'}`}
          </span>
          {trend.timeframe && (
            <span className="text-muted-foreground">vs {trend.timeframe}</span>
          )}
        </div>
      )}
    </div>
  );
}

// Specialized metrics cards for common use cases
export function ComplianceScoreCard({ 
  score, 
  trend, 
  onClick 
}: { 
  score: number; 
  trend?: number; 
  onClick?: () => void; 
}) {
  const getStatus = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 75) return 'info';
    if (score >= 60) return 'warning';
    return 'error';
  };

  return (
    <MetricsCard
      title="Compliance Score"
      value={`${score}%`}
      description="Overall privacy compliance"
      icon={Shield}
      status={getStatus(score)}
      trend={trend ? {
        value: trend,
        direction: trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral',
        timeframe: 'last month'
      } : undefined}
      onClick={onClick}
    />
  );
}

export function DataRightsRequestsCard({ 
  count, 
  trend, 
  onClick 
}: { 
  count: number; 
  trend?: number; 
  onClick?: () => void; 
}) {
  return (
    <MetricsCard
      title="Data Rights Requests"
      value={count}
      description="Active requests"
      icon={FileText}
      trend={trend ? {
        value: trend,
        direction: trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral',
        timeframe: 'last month'
      } : undefined}
      onClick={onClick}
    />
  );
}