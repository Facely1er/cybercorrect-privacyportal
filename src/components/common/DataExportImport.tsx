import React, { useState, useRef } from 'react';
import { 
  Download, 
  Upload, 
  FileText, 
  Database, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2,
  Building,
  Users,
  Shield,
  Calendar
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { exportService } from '../../services/exportService';
import { localStorageService } from '../../services/localStorageService';
import { useNotifications, createNotification } from '../../contexts/NotificationContext';

interface DataExportImportProps {
  className?: string;
  showDataControls?: boolean;
}

export function DataExportImport({ 
  className = '', 
  showDataControls = true 
}: DataExportImportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'txt'>('json');
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { addNotification } = useNotifications();

  // Get current data counts for display
  const dataCounts = {
    dataRightsRequests: localStorageService.getDataRightsRequests().length,
    privacyIncidents: localStorageService.getPrivacyIncidents().length,
    vendorAssessments: localStorageService.getVendorAssessments().length,
    consentRecords: localStorageService.getConsentRecords().length,
    complianceObligations: localStorageService.getComplianceObligations().length
  };

  const totalRecords = Object.values(dataCounts).reduce((sum, count) => sum + count, 0);

  const handleExportData = async (dataType: 'all' | 'dataRightsRequests' | 'privacyIncidents' | 'vendorAssessments' | 'consentRecords' | 'complianceObligations') => {
    setIsExporting(true);
    
    try {
      switch (dataType) {
        case 'all':
          await exportService.exportAllData({ format: exportFormat });
          addNotification({
            type: 'success',
            title: 'Export Complete',
            message: 'All privacy portal data has been exported successfully',
            timestamp: Date.now(),
            read: false,
            category: 'system'
          });
          break;
        case 'dataRightsRequests':
          await exportService.exportDataRightsRequests({ format: exportFormat });
          addNotification({
            type: 'success',
            title: 'Export Complete',
            message: 'Data rights requests exported successfully',
            timestamp: Date.now(),
            read: false,
            category: 'data_rights'
          });
          break;
        case 'privacyIncidents':
          await exportService.exportPrivacyIncidents({ format: exportFormat });
          addNotification({
            type: 'success',
            title: 'Export Complete',
            message: 'Privacy incidents exported successfully',
            timestamp: Date.now(),
            read: false,
            category: 'privacy'
          });
          break;
        case 'vendorAssessments':
          await exportService.exportVendorAssessments({ format: exportFormat });
          addNotification({
            type: 'success',
            title: 'Export Complete',
            message: 'Vendor assessments exported successfully',
            timestamp: Date.now(),
            read: false,
            category: 'compliance'
          });
          break;
        case 'consentRecords':
          await exportService.exportConsentRecords({ format: exportFormat });
          addNotification({
            type: 'success',
            title: 'Export Complete',
            message: 'Consent records exported successfully',
            timestamp: Date.now(),
            read: false,
            category: 'privacy'
          });
          break;
        case 'complianceObligations':
          await exportService.exportComplianceObligations({ format: exportFormat });
          addNotification({
            type: 'success',
            title: 'Export Complete',
            message: 'Compliance obligations exported successfully',
            timestamp: Date.now(),
            read: false,
            category: 'compliance'
          });
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
      addNotification({
        type: 'error',
        title: 'Export Failed',
        message: 'There was an error exporting your data',
        timestamp: Date.now(),
        read: false,
        category: 'system'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportData = async (file: File) => {
    setIsImporting(true);
    setImportMessage(null);
    setImportError(null);

    try {
      const result = await exportService.importData(file);
      
      if (result.success) {
        setImportMessage(result.message);
        addNotification({
          type: 'success',
          title: 'Import Complete',
          message: 'Privacy portal data has been imported successfully',
          timestamp: Date.now(),
          read: false,
          category: 'system'
        });
        
        // Reload the page to reflect imported data
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setImportError(result.message);
        addNotification({
          type: 'error',
          title: 'Import Failed',
          message: result.message,
          timestamp: Date.now(),
          read: false,
          category: 'system'
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Import failed';
      setImportError(errorMessage);
      addNotification({
        type: 'error',
        title: 'Import Failed',
        message: errorMessage,
        timestamp: Date.now(),
        read: false,
        category: 'system'
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImportData(file);
    }
    // Reset input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to clear all privacy portal data? This action cannot be undone.')) {
      localStorageService.clearAllData();
      
      addNotification({
        type: 'info',
        title: 'Data Cleared',
        message: 'All privacy portal data has been cleared from local storage',
        timestamp: Date.now(),
        read: false,
        category: 'system'
      });

      // Reload to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Current Data Overview */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Database className="h-5 w-5 mr-2 text-blue-500" />
          Current Data Overview
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {dataCounts.dataRightsRequests}
            </div>
            <div className="text-xs text-muted-foreground">Data Rights</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              {dataCounts.privacyIncidents}
            </div>
            <div className="text-xs text-muted-foreground">Incidents</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {dataCounts.vendorAssessments}
            </div>
            <div className="text-xs text-muted-foreground">Vendors</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {dataCounts.consentRecords}
            </div>
            <div className="text-xs text-muted-foreground">Consent</div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
              {dataCounts.complianceObligations}
            </div>
            <div className="text-xs text-muted-foreground">Obligations</div>
          </div>
        </div>

        <div className="text-center">
          <Badge variant="general" className="bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
            Total Records: {totalRecords}
          </Badge>
        </div>
      </div>

      {/* Export Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Download className="h-5 w-5 mr-2 text-blue-500" />
          Export Privacy Portal Data
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Export Format:</span>
            <div className="flex gap-2">
              {(['json', 'csv', 'txt'] as const).map(format => (
                <Button
                  key={format}
                  variant={exportFormat === format ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setExportFormat(format)}
                >
                  {format.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={() => handleExportData('dataRightsRequests')}
                disabled={isExporting || dataCounts.dataRightsRequests === 0}
                className="justify-start"
              >
                <FileText className="h-4 w-4 mr-2" />
                Data Rights ({dataCounts.dataRightsRequests})
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportData('privacyIncidents')}
                disabled={isExporting || dataCounts.privacyIncidents === 0}
                className="justify-start"
              >
                <Shield className="h-4 w-4 mr-2" />
                Incidents ({dataCounts.privacyIncidents})
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportData('vendorAssessments')}
                disabled={isExporting || dataCounts.vendorAssessments === 0}
                className="justify-start"
              >
                <Building className="h-4 w-4 mr-2" />
                Vendors ({dataCounts.vendorAssessments})
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportData('consentRecords')}
                disabled={isExporting || dataCounts.consentRecords === 0}
                className="justify-start"
              >
                <Users className="h-4 w-4 mr-2" />
                Consent ({dataCounts.consentRecords})
              </Button>
              <Button
                variant="outline"
                onClick={() => handleExportData('complianceObligations')}
                disabled={isExporting || dataCounts.complianceObligations === 0}
                className="justify-start"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Obligations ({dataCounts.complianceObligations})
              </Button>
              <Button
                onClick={() => handleExportData('all')}
                disabled={isExporting || totalRecords === 0}
                className="justify-start md:col-span-1"
              >
                {isExporting ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Export All Data
              </Button>
            </div>
            
            {totalRecords === 0 && (
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Info className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No data available for export. Start using the privacy portal to generate data.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Upload className="h-5 w-5 mr-2 text-green-500" />
          Import Privacy Portal Data
        </h3>
        
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Import Guidelines</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Import only JSON files exported from CyberCorrect™ Privacy Portal</li>
                  <li>• Files must contain valid data structure with proper metadata</li>
                  <li>• Importing will merge with existing data (duplicates are handled)</li>
                  <li>• Create a backup export before importing new data</li>
                  <li>• Large imports may take a few seconds to process</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="justify-start"
            >
              {isImporting ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {isImporting ? 'Importing...' : 'Select File to Import'}
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <span className="text-sm text-muted-foreground">
              Accepts JSON files only
            </span>
          </div>

          {/* Import Status Messages */}
          {importMessage && (
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-green-800 dark:text-green-300">{importMessage}</span>
              </div>
            </div>
          )}

          {importError && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span className="text-red-800 dark:text-red-300">{importError}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data Management Controls */}
      {showDataControls && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Database className="h-5 w-5 mr-2 text-purple-500" />
            Data Management
          </h3>
          
          <div className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Data Management</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    These controls manage all privacy portal data stored locally in your browser.
                    Always export your data before clearing to prevent loss.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => handleExportData('all')}
                disabled={totalRecords === 0}
                className="justify-start"
              >
                <Download className="h-4 w-4 mr-2" />
                Backup All Data
              </Button>
              
              <Button
                variant="outline"
                onClick={handleClearAllData}
                disabled={totalRecords === 0}
                className="justify-start text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 dark:border-red-800 dark:text-red-400"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Backup:</strong> Exports all data in JSON format for safekeeping</p>
              <p><strong>Clear:</strong> Removes all privacy portal data from browser storage</p>
              <p><strong>Note:</strong> User preferences and theme settings are preserved during clear operations</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}