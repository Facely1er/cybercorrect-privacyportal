import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users,
  Shield,
  Eye,
  Settings,
  Plus,
  Search,
  Filter,
  BarChart3,
  Clock,
  Mail,
  Phone,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  UserX,
  Activity,
  Download,
  GraduationCap
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { StakeholderAccessControl } from '../../components/privacy/StakeholderAccessControl';

export function StakeholderManagementPage() {
  const organizationId = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';
  const [activeTab, setActiveTab] = useState('overview');

  // Mock stakeholder data
  const stakeholderStats = {
    totalStakeholders: 1247,
    activeUsers: 1089,
    pendingAccess: 23,
    suspendedUsers: 8,
    parentGuardians: 845,
    students: 267,
    staff: 89,
    administrators: 23,
    external: 23
  };

  const accessLogs = [
    {
      stakeholder: 'Demo User',
      action: 'Viewed demo records',
      timestamp: '2025-01-03 14:30',
      result: 'Success',
      ipAddress: '192.168.1.100'
    },
    {
      stakeholder: 'Demo Student',
      action: 'Updated privacy settings',
      timestamp: '2025-01-03 12:15',
      result: 'Success',
      ipAddress: '10.0.1.50'
    },
    {
      stakeholder: 'Demo Administrator',
      action: 'Exported compliance report',
      timestamp: '2025-01-03 09:45',
      result: 'Success',
      ipAddress: '172.16.1.10'
    },
    {
      stakeholder: 'Demo User',
      action: 'Attempted unauthorized access',
      timestamp: '2025-01-02 16:20',
      result: 'Denied',
      ipAddress: '203.0.113.45'
    }
  ];

  const permissionGroups = [
    {
      name: 'Data Access',
      permissions: [
        { id: 'view_student_records', label: 'View Student Records', count: 892 },
        { id: 'view_own_records', label: 'View Own Records', count: 267 },
        { id: 'request_data_access', label: 'Request Data Access', count: 1247 }
      ]
    },
    {
      name: 'Privacy Management',
      permissions: [
        { id: 'manage_privacy_settings', label: 'Manage Privacy Settings', count: 267 },
        { id: 'manage_consent', label: 'Manage Consent', count: 892 },
        { id: 'opt_out_directory', label: 'Opt-out Directory', count: 156 }
      ]
    },
    {
      name: 'Administrative',
      permissions: [
        { id: 'manage_compliance', label: 'Manage Compliance', count: 23 },
        { id: 'view_all_reports', label: 'View All Reports', count: 45 },
        { id: 'manage_incidents', label: 'Manage Incidents', count: 12 },
        { id: 'export_data', label: 'Export Data', count: 23 }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Stakeholder Management</h1>
        <p className="text-muted-foreground">
          Manage privacy portal access and permissions for all institutional stakeholders
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-2xl font-bold">{stakeholderStats.totalStakeholders}</span>
              </div>
              <h3 className="font-semibold mb-1">Total Stakeholders</h3>
              <p className="text-sm text-muted-foreground">All registered users</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stakeholderStats.activeUsers}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Active Users</h3>
              <p className="text-sm text-muted-foreground">Currently enabled</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {stakeholderStats.pendingAccess}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Pending Access</h3>
              <p className="text-sm text-muted-foreground">Awaiting approval</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <UserX className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {stakeholderStats.suspendedUsers}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Suspended</h3>
              <p className="text-sm text-muted-foreground">Access revoked</p>
            </div>
          </div>

          {/* Stakeholder Distribution */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
              Stakeholder Distribution
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Parents & Guardians', count: stakeholderStats.parentGuardians, color: 'bg-blue-500' },
                { label: 'Students', count: stakeholderStats.students, color: 'bg-green-500' },
                { label: 'Staff', count: stakeholderStats.staff, color: 'bg-amber-500' },
                { label: 'Administrators', count: stakeholderStats.administrators, color: 'bg-red-500' },
                { label: 'External', count: stakeholderStats.external, color: 'bg-purple-500' }
              ].map((item) => {
                const percentage = Math.round((item.count / stakeholderStats.totalStakeholders) * 100);
                return (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <StakeholderAccessControl organizationId="demo-org" />
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          {/* Permission Groups */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Permission Groups</h2>
            <div className="space-y-6">
              {permissionGroups.map((group) => (
                <div key={group.name}>
                  <h3 className="font-medium mb-3">{group.name}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">{permission.label}</h4>
                          <p className="text-xs text-muted-foreground">
                            {permission.count} stakeholders
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          {/* Activity Logs */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Access Activity Logs</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {accessLogs.map((log, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-sm">{log.stakeholder}</h3>
                    <p className="text-xs text-muted-foreground">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={
                      log.result === 'Success' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }>
                      {log.result}
                    </Badge>
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {log.ipAddress}
                    </code>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h3 className="font-medium mb-3">Security and Compliance</h3>
              <div className="flex flex-wrap gap-2">
                <Link to="/privacy/incidents" title="Report security incidents involving stakeholder access">
                  <Button variant="outline" size="sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Report Security Incident
                  </Button>
                </Link>
                <Link to="/privacy/obligations" title="Review access control compliance requirements">
                  <Button variant="outline" size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Access Control Compliance
                  </Button>
                </Link>
                <Link to="/training" title="Security awareness training for stakeholders">
                  <Button variant="outline" size="sm">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Security Training
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}