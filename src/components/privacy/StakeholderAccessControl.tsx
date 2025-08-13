import React, { useState } from 'react';
import { Users, Shield, Eye, Edit, X, Plus, Search, Mail, Phone } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ConfirmationDialog } from '../common/ConfirmationDialog';

interface Stakeholder {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'guardian' | 'student' | 'staff' | 'administrator' | 'external';
  permissions: string[];
  lastAccess?: string;
  status: 'active' | 'suspended' | 'pending';
  studentConnections?: string[];
}

interface StakeholderAccessControlProps {
  organizationId: string;
  onAccessChange?: (stakeholderId: string, permissions: string[]) => void;
}

export function StakeholderAccessControl({ 
  organizationId, 
  onAccessChange 
}: StakeholderAccessControlProps) {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
    {
      id: 'stakeholder-001',
      name: 'Demo Parent',
      email: 'demo.parent@example.com',
      role: 'parent',
      permissions: ['view_student_records', 'request_data_access'],
      lastAccess: '2025-01-03',
      status: 'active',
      studentConnections: ['Demo Student']
    },
    {
      id: 'stakeholder-002',
      name: 'Demo Student',
      email: 'demo.student@example.com',
      role: 'student',
      permissions: ['view_own_records', 'manage_privacy_settings'],
      lastAccess: '2025-01-02',
      status: 'active',
      studentConnections: ['Demo Student']
    },
    {
      id: 'stakeholder-003',
      name: 'Demo Administrator',
      email: 'demo.admin@example.com',
      role: 'administrator',
      permissions: ['manage_compliance', 'view_all_reports', 'manage_incidents'],
      lastAccess: '2025-01-03',
      status: 'active'
    },
    {
      id: 'stakeholder-004',
      name: 'Demo Guardian',
      email: 'demo.guardian@example.com',
      role: 'guardian',
      permissions: ['view_student_records', 'manage_consent'],
      lastAccess: '2024-12-28',
      status: 'pending',
      studentConnections: ['Demo Student']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showAddStakeholder, setShowAddStakeholder] = useState(false);
  const [editingStakeholder, setEditingStakeholder] = useState<string | null>(null);
  const [showConfirmRevoke, setShowConfirmRevoke] = useState<string | null>(null);


  const availablePermissions = [
    { id: 'view_student_records', label: 'View Student Records', category: 'data_access' },
    { id: 'request_data_access', label: 'Request Data Access', category: 'data_rights' },
    { id: 'manage_privacy_settings', label: 'Manage Privacy Settings', category: 'self_service' },
    { id: 'view_own_records', label: 'View Own Records', category: 'self_service' },
    { id: 'manage_consent', label: 'Manage Consent', category: 'consent' },
    { id: 'view_compliance_reports', label: 'View Compliance Reports', category: 'reporting' },
    { id: 'manage_compliance', label: 'Manage Compliance', category: 'admin' },
    { id: 'view_all_reports', label: 'View All Reports', category: 'admin' },
    { id: 'manage_incidents', label: 'Manage Incidents', category: 'admin' },
    { id: 'export_data', label: 'Export Data', category: 'admin' }
  ];

  const rolePermissionDefaults = {
    parent: ['view_student_records', 'request_data_access', 'manage_consent'],
    guardian: ['view_student_records', 'request_data_access', 'manage_consent'],
    student: ['view_own_records', 'manage_privacy_settings', 'request_data_access'],
    staff: ['view_compliance_reports'],
    administrator: ['manage_compliance', 'view_all_reports', 'manage_incidents', 'export_data'],
    external: ['request_data_access']
  };

  const filteredStakeholders = stakeholders.filter(stakeholder => {
    const matchesSearch = stakeholder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stakeholder.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || stakeholder.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Active</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Suspended</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Pending</Badge>;
      default:
        return <Badge variant="general">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      parent: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      guardian: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      student: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      staff: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      administrator: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      external: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    };
    
    return (
      <Badge className={colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const handlePermissionChange = (stakeholderId: string, permission: string, granted: boolean) => {
    setStakeholders(prev => prev.map(stakeholder => {
      if (stakeholder.id === stakeholderId) {
        const newPermissions = granted 
          ? [...stakeholder.permissions, permission]
          : stakeholder.permissions.filter(p => p !== permission);
        
        onAccessChange?.(stakeholderId, newPermissions);
        
        return { ...stakeholder, permissions: newPermissions };
      }
      return stakeholder;
    }));
  };

  const handleRevokeAccess = (stakeholderId: string) => {
    setStakeholders(prev => prev.map(stakeholder => 
      stakeholder.id === stakeholderId 
        ? { ...stakeholder, status: 'suspended', permissions: [] }
        : stakeholder
    ));
    setShowConfirmRevoke(null);
  };

  // Check if current user can manage stakeholder access
  const canManageAccess = true; // For demo purposes, allow all users to manage access

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Stakeholder Access Control</h2>
          <p className="text-muted-foreground">Manage privacy portal access for students, parents, and staff</p>
        </div>
        {canManageAccess && (
          <Button onClick={() => setShowAddStakeholder(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Stakeholder
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search stakeholders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm"
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-3 py-2 border border-input rounded-md bg-background text-sm"
        >
          <option value="all">All Roles</option>
          <option value="parent">Parents</option>
          <option value="guardian">Guardians</option>
          <option value="student">Students</option>
          <option value="staff">Staff</option>
          <option value="administrator">Administrators</option>
          <option value="external">External</option>
        </select>
      </div>

      {/* Stakeholders List */}
      <div className="space-y-4">
        {filteredStakeholders.map((stakeholder) => (
          <div key={stakeholder.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg border p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium">{stakeholder.name}</h3>
                  {getRoleBadge(stakeholder.role)}
                  {getStatusBadge(stakeholder.status)}
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    <span>{stakeholder.email}</span>
                  </div>
                  {stakeholder.studentConnections && (
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>Connected to: {stakeholder.studentConnections.join(', ')}</span>
                    </div>
                  )}
                  {stakeholder.lastAccess && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>Last access: {stakeholder.lastAccess}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {canManageAccess && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingStakeholder(stakeholder.id)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowConfirmRevoke(stakeholder.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Revoke
                  </Button>
                </div>
              )}
            </div>

            {/* Permissions */}
            <div>
              <h4 className="font-medium text-sm mb-2">Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {stakeholder.permissions.map((permission) => {
                  const permissionInfo = availablePermissions.find(p => p.id === permission);
                  return (
                    <Badge 
                      key={permission} 
                      variant="general" 
                      className="text-xs"
                    >
                      {permissionInfo?.label || permission}
                    </Badge>
                  );
                })}
                {stakeholder.permissions.length === 0 && (
                  <span className="text-sm text-muted-foreground italic">No permissions granted</span>
                )}
              </div>
            </div>

            {/* Edit Permissions Interface */}
            {editingStakeholder === stakeholder.id && canManageAccess && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium text-sm mb-3">Edit Permissions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availablePermissions.map((permission) => (
                    <label key={permission.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={stakeholder.permissions.includes(permission.id)}
                        onChange={(e) => handlePermissionChange(
                          stakeholder.id, 
                          permission.id, 
                          e.target.checked
                        )}
                        className="rounded border-gray-300 text-primary"
                      />
                      <span className="text-sm">{permission.label}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingStakeholder(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setEditingStakeholder(null)}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Stakeholder Form */}
      {showAddStakeholder && canManageAccess && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Stakeholder</h3>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  placeholder="Enter email address"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                  <option value="">Select role</option>
                  <option value="parent">Parent</option>
                  <option value="guardian">Legal Guardian</option>
                  <option value="student">Student</option>
                  <option value="staff">Staff Member</option>
                  <option value="administrator">Administrator</option>
                  <option value="external">External Party</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Student Connection</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  placeholder="Connected student name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Default Permissions</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {availablePermissions.slice(0, 6).map((permission) => (
                  <label key={permission.id} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 text-primary" />
                    <span className="text-sm">{permission.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAddStakeholder(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Add Stakeholder
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!showConfirmRevoke}
        onClose={() => setShowConfirmRevoke(null)}
        onConfirm={() => showConfirmRevoke && handleRevokeAccess(showConfirmRevoke)}
        title="Revoke Access"
        description="Are you sure you want to revoke all access for this stakeholder? This action cannot be undone."
        confirmText="Revoke Access"
        variant="danger"
      />
    </div>
  );
}