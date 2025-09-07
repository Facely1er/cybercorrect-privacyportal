import React, { useState } from 'react';
import { 
  Zap, 
  Settings,
  Play,
  Target,
  Bell,
  FileText,
  Plus
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Switch } from '../ui/Switch';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  type: 'notification' | 'workflow' | 'report' | 'assessment';
  trigger: string;
  actions: string[];
  enabled: boolean;
  lastRun?: string;
  nextRun?: string;
  runCount: number;
  successRate: number;
}

interface ComplianceAutomationProps {
  organizationId: string;
}

export function ComplianceAutomation({ organizationId: _ }: ComplianceAutomationProps) {
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: 'auto-001',
      name: 'FERPA Annual Notice Reminder',
      description: 'Automatically send reminders for FERPA annual notice distribution',
      type: 'notification',
      trigger: '90 days before deadline',
      actions: ['Send email to administrators', 'Create compliance task', 'Update dashboard'],
      enabled: true,
      lastRun: '2024-05-15',
      nextRun: '2025-05-15',
      runCount: 12,
      successRate: 100
    },
    {
      id: 'auto-002',
      name: 'Vendor Assessment Scheduler',
      description: 'Schedule quarterly vendor privacy assessments',
      type: 'workflow',
      trigger: 'Quarterly schedule',
      actions: ['Generate assessment forms', 'Send to vendors', 'Track responses'],
      enabled: true,
      lastRun: '2025-01-01',
      nextRun: '2025-04-01',
      runCount: 8,
      successRate: 95
    },
    {
      id: 'auto-003',
      name: 'Data Rights Request Auto-Response',
      description: 'Send automatic acknowledgment for data rights requests',
      type: 'notification',
      trigger: 'New data rights request submitted',
      actions: ['Send confirmation email', 'Assign to privacy officer', 'Set deadline'],
      enabled: true,
      lastRun: '2025-01-03',
      nextRun: 'On demand',
      runCount: 45,
      successRate: 98
    },
    {
      id: 'auto-004',
      name: 'Consent Renewal Reminders',
      description: 'Remind parents about expiring consent forms',
      type: 'notification',
      trigger: '30 days before expiry',
      actions: ['Send renewal notice', 'Generate new forms', 'Track responses'],
      enabled: false,
      runCount: 0,
      successRate: 0
    },
    {
      id: 'auto-005',
      name: 'Monthly Compliance Report',
      description: 'Generate and distribute monthly compliance reports',
      type: 'report',
      trigger: 'First day of month',
      actions: ['Generate report', 'Email to leadership', 'Archive report'],
      enabled: true,
      lastRun: '2025-01-01',
      nextRun: '2025-02-01',
      runCount: 6,
      successRate: 100
    },
    {
      id: 'auto-006',
      name: 'Incident Response Escalation',
      description: 'Automatically escalate high-severity privacy incidents',
      type: 'workflow',
      trigger: 'High/Critical incident reported',
      actions: ['Notify privacy officer', 'Create response team', 'Start timeline tracking'],
      enabled: true,
      lastRun: '2024-12-20',
      nextRun: 'On demand',
      runCount: 3,
      successRate: 100
    }
  ]);

  const [showCreateRule, setShowCreateRule] = useState(false);

  const handleToggleRule = (ruleId: string) => {
    setAutomationRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'notification':
        return <Bell className="h-4 w-4 text-blue-500" />;
      case 'workflow':
        return <Zap className="h-4 w-4 text-purple-500" />;
      case 'report':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'assessment':
        return <Target className="h-4 w-4 text-amber-500" />;
      default:
        return <Settings className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      notification: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      workflow: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      report: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      assessment: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
    };
    
    return (
      <Badge className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const automationTemplates = [
    {
      name: 'COPPA Compliance Monitoring',
      description: 'Monitor and alert on COPPA compliance for educational technology',
      type: 'workflow',
      trigger: 'New EdTech platform integration'
    },
    {
      name: 'GDPR Data Subject Rights',
      description: 'Automated handling of GDPR data subject rights requests',
      type: 'workflow',
      trigger: 'GDPR request received'
    },
    {
      name: 'Breach Notification Workflow',
      description: 'Automate breach notification timelines and requirements',
      type: 'notification',
      trigger: 'Privacy incident classified as breach'
    },
    {
      name: 'Compliance Training Reminders',
      description: 'Send automated reminders for mandatory privacy training',
      type: 'notification',
      trigger: 'Training deadline approaching'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Compliance Automation</h2>
          <p className="text-muted-foreground">Automate routine compliance tasks and notifications</p>
        </div>
        <Button onClick={() => setShowCreateRule(true)}>
          <Zap className="h-4 w-4 mr-2" />
          Create Rule
        </Button>
      </div>

      {/* Automation Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {automationRules.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Rules</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {automationRules.filter(r => r.enabled).length}
            </div>
            <div className="text-sm text-muted-foreground">Active Rules</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {automationRules.reduce((sum, rule) => sum + rule.runCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Runs</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {Math.round(automationRules.reduce((sum, rule) => sum + rule.successRate, 0) / automationRules.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Active Automation Rules */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Active Automation Rules</h3>
        <div className="space-y-4">
          {automationRules.map((rule) => (
            <div key={rule.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(rule.type)}
                      <h4 className="font-medium">{rule.name}</h4>
                    </div>
                    {getTypeBadge(rule.type)}
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={() => handleToggleRule(rule.id)}
                      />
                      <span className="text-sm text-muted-foreground">
                        {rule.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Trigger:</span>
                      <div className="text-muted-foreground">{rule.trigger}</div>
                    </div>
                    <div>
                      <span className="font-medium">Last Run:</span>
                      <div className="text-muted-foreground">{rule.lastRun || 'Never'}</div>
                    </div>
                    <div>
                      <span className="font-medium">Success Rate:</span>
                      <div className={`${
                        rule.successRate >= 95 ? 'text-green-600' :
                        rule.successRate >= 80 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {rule.successRate}% ({rule.runCount} runs)
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Test Run
                  </Button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-3">
                <span className="font-medium text-sm">Actions:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {rule.actions.map((action, index) => (
                    <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {action}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Templates */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Automation Templates</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {automationTemplates.map((template, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(template.type)}
                    <h4 className="font-medium text-sm">{template.name}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Trigger:</span> {template.trigger}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Use Template
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Rule Form */}
      {showCreateRule && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Create Automation Rule</h3>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rule Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  placeholder="Enter rule name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rule Type</label>
                <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                  <option value="">Select type</option>
                  <option value="notification">Notification</option>
                  <option value="workflow">Workflow</option>
                  <option value="report">Report</option>
                  <option value="assessment">Assessment</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
                placeholder="Describe what this automation rule does"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Trigger</label>
                <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                  <option value="">Select trigger</option>
                  <option value="deadline">Compliance deadline approaching</option>
                  <option value="request">Data rights request submitted</option>
                  <option value="incident">Privacy incident reported</option>
                  <option value="schedule">Scheduled interval</option>
                  <option value="threshold">Metric threshold reached</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Schedule</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  placeholder="e.g., 30 days before deadline"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Actions to Perform</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Send email notification',
                  'Create compliance task',
                  'Generate report',
                  'Update dashboard',
                  'Assign to team member',
                  'Create calendar event',
                  'Send SMS alert',
                  'Log audit entry',
                  'Update status'
                ].map((action) => (
                  <label key={action} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-primary" />
                    <span className="text-sm">{action}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowCreateRule(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create Rule
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}