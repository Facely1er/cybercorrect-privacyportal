import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Building,
  Users,
  Calendar,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  CameraIcon,
  Briefcase
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useUser } from '../hooks/useSupabase';

export function ProfilePage() {
  const { user, profile, updateProfile, loading: userLoading } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    department: profile?.department || '',
    avatar_url: profile?.avatar_url || '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load profile data if user is logged in
  React.useEffect(() => {
    if (profile?.settings) {
      setFormData({
        full_name: profile.full_name || '',
        department: profile.department || '',
        avatar_url: profile.avatar_url || '',
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      const updates = {
        full_name: formData.full_name,
        department: formData.department,
        avatar_url: formData.avatar_url,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await updateProfile(updates);
      
      if (error) {
        setError(error.message || 'Failed to update profile');
      } else {
        setSuccess('Profile updated successfully');
        setIsEditing(false);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    // Reset form data to current profile values
    setFormData({
      full_name: profile?.full_name || '',
      department: profile?.department || '',
      avatar_url: profile?.avatar_url || '',
    });
    setError(null);
  };

  if (userLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading profile data...</p>
          </div>
        </div>
      </div>
    );
  }

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'administrator': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      case 'teacher': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'it-staff': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300';
      case 'student': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative w-32 h-32">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white/20 flex items-center justify-center border-4 border-white">
                  {profile?.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt={profile?.full_name || 'Profile'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=' + (profile?.full_name?.charAt(0) || 'U');
                      }}
                    />
                  ) : (
                    <User className="h-16 w-16 text-white" />
                  )}
                </div>
                {isEditing && (
                  <button 
                    className="absolute bottom-0 right-0 bg-primary-700 text-white p-2 rounded-full hover:bg-primary-800 transition-colors"
                    onClick={() => document.getElementById('avatar-url')?.focus()}
                    type="button"
                  >
                    <CameraIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-1">
                  {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                </h2>
                <p className="text-primary-100 mb-3">
                  {profile?.email || user?.email}
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {profile?.role && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(profile.role)}`}>
                      {profile.role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  )}
                  {profile?.organization_id && (
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                      Organization Member
                    </span>
                  )}
                </div>
              </div>
              
              {!isEditing && (
                <div className="ml-auto hidden md:block">
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="bg-white/20 hover:bg-white/30"
                  >
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Error/Success Messages */}
          {error && (
            <div className="p-4 m-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <p>{error}</p>
              </div>
            </div>
          )}
          
          {success && (
            <div className="p-4 m-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                <p>{success}</p>
              </div>
            </div>
          )}
          
          {/* Mobile Edit Button (Only shown when not editing) */}
          {!isEditing && (
            <div className="px-6 pt-4 md:hidden">
              <Button 
                onClick={() => setIsEditing(true)}
                className="w-full"
              >
                Edit Profile
              </Button>
            </div>
          )}
          
          {/* Profile Information / Edit Form */}
          {isEditing ? (
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="department" className="block text-sm font-medium mb-2">Department</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground"
                      placeholder="Your department"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="avatar_url" className="block text-sm font-medium mb-2">Avatar URL</label>
                  <div className="relative">
                    <CameraIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="avatar_url"
                      name="avatar_url"
                      value={formData.avatar_url}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground"
                      placeholder="https://example.com/your-avatar.jpg"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter a URL to an image (JPG, PNG, or GIF)
                  </p>
                </div>
                
                <div className="flex gap-3 pt-4 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={cancelEdit}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                    <p className="text-lg">{profile?.full_name || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg">{profile?.email || user?.email}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Role</h3>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg">{profile?.role ? profile.role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not specified'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Department</h3>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg">{profile?.department || 'Not specified'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Organization</h3>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg">{profile?.organization_id ? 'Connected' : 'None'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Member Since</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg">
                        {profile?.created_at
                          ? new Date(profile.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : 'Unknown'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}