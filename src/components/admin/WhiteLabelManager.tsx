// White label management interface for administrators
import React, { useState } from 'react';
import { 
  Save, 
  Download, 
  Upload, 
  Eye, 
  RefreshCw, 
  Palette, 
  Image, 
  Mail, 
  Building,
  Settings,
  AlertCircle,
  Info
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { useBrand } from '../../hooks/useBrand';
import { validateBrandConfig } from '../../config/brand';

export function WhiteLabelManager() {
  const { config, updateBrand } = useBrand();
  const [isDirty, setIsDirty] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState(config);

  const handleFieldChange = (section: string, field: string, value: unknown) => {
    const newData = {
      ...formData,
      [section]: {
        ...formData[section as keyof typeof formData],
        [field]: value
      }
    };
    
    setFormData(newData);
    setIsDirty(true);
    
    // Validate changes
    const errors = validateBrandConfig(newData);
    setValidationErrors(errors);
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      const success = updateBrand(formData);
      if (success) {
        setIsDirty(false);
        setValidationErrors([]);
      }
    } catch (error) {
      console.error('Failed to save brand configuration:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleExportConfig = () => {
    const configJson = JSON.stringify(formData, null, 2);
    const blob = new Blob([configJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brand-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedConfig = JSON.parse(e.target?.result as string);
        setFormData(importedConfig);
        setIsDirty(true);
        
        const errors = validateBrandConfig(importedConfig);
        setValidationErrors(errors);
      } catch {
        alert('Invalid configuration file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">White Label Configuration</h1>
            <p className="text-muted-foreground">
              Customize the platform branding, colors, and contact information
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isDirty && (
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                Unsaved Changes
              </Badge>
            )}
            <Button variant="outline" onClick={handleExportConfig}>
              <Download className="h-4 w-4 mr-2" />
              Export Config
            </Button>
            <label>
              <Button variant="outline" as="span">
                <Upload className="h-4 w-4 mr-2" />
                Import Config
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleImportConfig}
                className="hidden"
              />
            </label>
            <Button 
              onClick={handleSave} 
              disabled={!isDirty || validationErrors.length > 0 || saving}
            >
              {saving ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </div>
        
        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <h3 className="font-medium text-red-800 dark:text-red-300">Configuration Errors</h3>
            </div>
            <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-400">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Tabs defaultValue="branding" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Image className="h-5 w-5 mr-2" />
              Brand Identity
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Brand Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('root', 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="Your Brand Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Full Brand Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleFieldChange('root', 'fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="Your Brand™ Privacy Portal"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => handleFieldChange('root', 'tagline', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="Privacy Portal"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleFieldChange('root', 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="Brief description of your platform"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Logo URL</label>
                  <input
                    type="url"
                    value={formData.logo.primary}
                    onChange={(e) => handleFieldChange('logo', 'primary', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="/logos/your-logo.png"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Icon URL</label>
                  <input
                    type="url"
                    value={formData.logo.icon}
                    onChange={(e) => handleFieldChange('logo', 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="/logos/your-icon.png"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Logo Alt Text</label>
                  <input
                    type="text"
                    value={formData.logo.alt}
                    onChange={(e) => handleFieldChange('logo', 'alt', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="Your Brand Logo"
                  />
                </div>
                
                {/* Logo Preview */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Logo Preview</h3>
                  <div className="flex items-center gap-4">
                    <img 
                      src={formData.logo.primary} 
                      alt={formData.logo.alt}
                      className="h-12 w-12 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <div className="font-bold text-lg">{formData.name}</div>
                      <div className="text-sm text-muted-foreground">{formData.tagline}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="colors" className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Color Scheme
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.colors.primary}
                      onChange={(e) => handleFieldChange('colors', 'primary', e.target.value)}
                      className="w-12 h-10 border border-input rounded-md"
                    />
                    <input
                      type="text"
                      value={formData.colors.primary}
                      onChange={(e) => handleFieldChange('colors', 'primary', e.target.value)}
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-background"
                      placeholder="#1E40AF"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Accent Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.colors.accent}
                      onChange={(e) => handleFieldChange('colors', 'accent', e.target.value)}
                      className="w-12 h-10 border border-input rounded-md"
                    />
                    <input
                      type="text"
                      value={formData.colors.accent}
                      onChange={(e) => handleFieldChange('colors', 'accent', e.target.value)}
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-background"
                      placeholder="#1E3A8A"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.colors.background}
                      onChange={(e) => handleFieldChange('colors', 'background', e.target.value)}
                      className="w-12 h-10 border border-input rounded-md"
                    />
                    <input
                      type="text"
                      value={formData.colors.background}
                      onChange={(e) => handleFieldChange('colors', 'background', e.target.value)}
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-background"
                      placeholder="#F8FAFF"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Text Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.colors.text}
                      onChange={(e) => handleFieldChange('colors', 'text', e.target.value)}
                      className="w-12 h-10 border border-input rounded-md"
                    />
                    <input
                      type="text"
                      value={formData.colors.text}
                      onChange={(e) => handleFieldChange('colors', 'text', e.target.value)}
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-background"
                      placeholder="#0B1220"
                    />
                  </div>
                </div>
              </div>
              
              {/* Color Preview */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Color Preview</h3>
                <div className="space-y-3">
                  <div 
                    className="h-16 rounded-lg flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: formData.colors.primary }}
                  >
                    Primary Color
                  </div>
                  <div 
                    className="h-12 rounded-lg flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: formData.colors.accent }}
                  >
                    Accent Color
                  </div>
                  <div 
                    className="h-12 rounded-lg flex items-center justify-center border"
                    style={{ 
                      backgroundColor: formData.colors.background,
                      color: formData.colors.text 
                    }}
                  >
                    Background & Text
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Contact Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Support Email</label>
                  <input
                    type="email"
                    value={formData.contact.supportEmail}
                    onChange={(e) => handleFieldChange('contact', 'supportEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="support@yourdomain.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Privacy Email</label>
                  <input
                    type="email"
                    value={formData.contact.privacyEmail}
                    onChange={(e) => handleFieldChange('contact', 'privacyEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="privacy@yourdomain.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Legal Email</label>
                  <input
                    type="email"
                    value={formData.contact.legalEmail}
                    onChange={(e) => handleFieldChange('contact', 'legalEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="legal@yourdomain.com"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Support Phone</label>
                  <input
                    type="tel"
                    value={formData.contact.phone}
                    onChange={(e) => handleFieldChange('contact', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Company Address</label>
                  <textarea
                    rows={3}
                    value={formData.contact.address}
                    onChange={(e) => handleFieldChange('contact', 'address', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="123 Main St, City, State 12345"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="legal" className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Legal Entity Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.legal.companyName}
                    onChange={(e) => handleFieldChange('legal', 'companyName', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="Your Company Name Inc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.legal.country}
                    onChange={(e) => handleFieldChange('legal', 'country', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="United States"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">State/Province</label>
                  <input
                    type="text"
                    value={formData.legal.state}
                    onChange={(e) => handleFieldChange('legal', 'state', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="California"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Registered Address</label>
                  <textarea
                    rows={2}
                    value={formData.legal.registeredAddress}
                    onChange={(e) => handleFieldChange('legal', 'registeredAddress', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    placeholder="Legal registered address"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Feature Configuration
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Core Features</h3>
                  <div className="space-y-3">
                    {Object.entries(formData.features).map(([key, value]) => (
                      <label key={key} className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleFieldChange('features', key, e.target.checked)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Customization Options</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium">Enable Custom CSS</span>
                      <input
                        type="checkbox"
                        checked={formData.customization.enableCustomCSS}
                        onChange={(e) => handleFieldChange('customization', 'enableCustomCSS', e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </label>
                    
                    {formData.customization.enableCustomCSS && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Custom CSS URL</label>
                          <input
                            type="url"
                            value={formData.customization.customCSSUrl || ''}
                            onChange={(e) => handleFieldChange('customization', 'customCSSUrl', e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            placeholder="https://yourdomain.com/custom.css"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Custom JS URL</label>
                          <input
                            type="url"
                            value={formData.customization.customJSUrl || ''}
                            onChange={(e) => handleFieldChange('customization', 'customJSUrl', e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                            placeholder="https://yourdomain.com/custom.js"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div>
                <h3 className="font-medium mb-3">Social Media Links (Optional)</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    <input
                      type="url"
                      value={formData.social?.website || ''}
                      onChange={(e) => handleFieldChange('social', 'website', e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      placeholder="https://yourdomain.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Twitter</label>
                    <input
                      type="url"
                      value={formData.social?.twitter || ''}
                      onChange={(e) => handleFieldChange('social', 'twitter', e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      placeholder="https://twitter.com/yourbrand"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={formData.social?.linkedin || ''}
                      onChange={(e) => handleFieldChange('social', 'linkedin', e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      placeholder="https://linkedin.com/company/yourbrand"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Eye className="h-5 w-5 mr-2" />
          Live Preview
        </h2>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={formData.logo.primary} 
              alt={formData.logo.alt}
              className="h-12 w-12 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div>
              <h3 className="text-2xl font-bold" style={{ color: formData.colors.primary }}>
                {formData.name}
              </h3>
              <p className="text-muted-foreground">{formData.tagline}</p>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4">{formData.description}</p>
          
          <div className="flex gap-2">
            <button 
              className="px-4 py-2 rounded-md text-white font-medium"
              style={{ backgroundColor: formData.colors.primary }}
            >
              Primary Button
            </button>
            <button 
              className="px-4 py-2 rounded-md border font-medium"
              style={{ 
                borderColor: formData.colors.primary,
                color: formData.colors.primary 
              }}
            >
              Secondary Button
            </button>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Preview Notes</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                This preview shows how your brand configuration will appear in the application. 
                Save your changes to apply them site-wide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}