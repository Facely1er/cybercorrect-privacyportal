import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building,
  Shield,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Search,
  Filter,
  Plus,
  Download,
  ExternalLink,
  Eye,
  Edit,
  Calendar,
  BarChart3,
  Globe,
  Lock,
  Award,
  GraduationCap,
  Mail
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { localStorageService } from '../../services/localStorageService';

export function VendorAssessmentsPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const [selectedCompliance, setSelectedCompliance] = useState('all');

  // Get real data from localStorage
  const [vendorAssessments, setVendorAssessments] = useState(() => 
    localStorageService.getVendorAssessments()
  );

  // Refresh data when component mounts
  React.useEffect(() => {
    setVendorAssessments(localStorageService.getVendorAssessments());
  }, []);

  const filteredVendors = vendorAssessments.filter(vendor => {
    const matchesRisk = selectedRiskLevel === 'all' || vendor.riskLevel === selectedRiskLevel;
    const matchesCompliance = selectedCompliance === 'all' || vendor.complianceStatus === selectedCompliance;
    return matchesRisk && matchesCompliance;
  });

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getComplianceBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Compliant</Badge>;
      case 'review_needed':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Review Needed</Badge>;
      case 'non_compliant':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Non-Compliant</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Calculate metrics from real data
  const totalVendors = vendorAssessments.length;
  const compliantVendors = vendorAssessments.filter(v => v.complianceStatus === 'compliant').length;
  const highRiskVendors = vendorAssessments.filter(v => v.riskLevel === 'high' || v.riskLevel === 'critical').length;
  const reviewNeeded = vendorAssessments.filter(v => v.complianceStatus === 'review_needed').length;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Vendor Privacy Assessments</h1>
        <p className="text-muted-foreground">
          Evaluate and monitor third-party vendors for privacy compliance and data protection
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="vendors">All Vendors</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-2xl font-bold">{totalVendors}</span>
              </div>
              <h3 className="font-semibold mb-1">Total Vendors</h3>
              <p className="text-sm text-muted-foreground">Under assessment</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {compliantVendors}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Compliant</h3>
              <p className="text-sm text-muted-foreground">Meeting requirements</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {highRiskVendors}
                </span>
              </div>
              <h3 className="font-semibold mb-1">High Risk</h3>
              <p className="text-sm text-muted-foreground">Need attention</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {reviewNeeded}
                </span>
              </div>
              <h3 className="font-semibold mb-1">Review Needed</h3>
              <p className="text-sm text-muted-foreground">Requires action</p>
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
              Risk Level Distribution
            </h2>
            <div className="space-y-4">
              {['low', 'medium', 'high', 'critical'].map((risk) => {
                const count = vendorAssessments.filter(v => v.riskLevel === risk).length;
                const percentage = totalVendors > 0 ? Math.round((count / totalVendors) * 100) : 0;
                
                return (
                  <div key={risk} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={
                          risk === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          risk === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                          risk === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        }>
                          {risk}
                        </Badge>
                        <span className="font-medium capitalize">{risk} Risk</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {count} vendors ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          risk === 'critical' ? 'bg-red-500' :
                          risk === 'high' ? 'bg-orange-500' :
                          risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* High Priority Vendors */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Vendors Requiring Attention</h2>
            <div className="space-y-4">
              {vendorAssessments
                .filter(v => v.riskLevel === 'high' || v.riskLevel === 'critical' || v.complianceStatus !== 'compliant')
                .map((vendor) => (
                  <div key={vendor.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{vendor.vendorName}</h3>
                          {getRiskBadge(vendor.riskLevel)}
                          {getComplianceBadge(vendor.complianceStatus)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{vendor.serviceDescription}</p>
                        <div className="text-sm text-muted-foreground">
                          Score: {vendor.assessmentScore}/100 • Last assessed: {vendor.lastAssessmentDate}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-6">
          {/* Filters */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search vendors..."
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedRiskLevel}
                  onChange={(e) => setSelectedRiskLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <select
                  value={selectedCompliance}
                  onChange={(e) => setSelectedCompliance(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="compliant">Compliant</option>
                  <option value="review_needed">Review Needed</option>
                  <option value="non_compliant">Non-Compliant</option>
                </select>
              </div>
              <div>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vendor
                </Button>
              </div>
            </div>
          </div>

          {/* Vendors List */}
          <div className="space-y-4">
            {filteredVendors.map((vendor) => (
              <div key={vendor.id} className="bg-white dark:bg-gray-900 rounded-lg border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{vendor.vendorName}</h3>
                      {getRiskBadge(vendor.riskLevel)}
                      {getComplianceBadge(vendor.complianceStatus)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{vendor.serviceDescription}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <span className="font-medium">Assessment Score:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-semibold">{vendor.assessmentScore}/100</span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                vendor.assessmentScore >= 90 ? 'bg-green-500' :
                                vendor.assessmentScore >= 75 ? 'bg-yellow-500' :
                                vendor.assessmentScore >= 60 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${vendor.assessmentScore}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Contract Period:</span>
                        <div className="text-muted-foreground mt-1">
                          {vendor.contractStartDate} to {vendor.contractEndDate}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Next Assessment:</span>
                        <div className="text-muted-foreground mt-1">
                          {vendor.nextAssessmentDue}
                        </div>
                      </div>
                    </div>

                    {/* Data Types */}
                    <div className="mb-4">
                      <span className="font-medium text-sm">Data Types Processed:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {vendor.dataTypesProcessed.map((dataType, index) => (
                          <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {dataType}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Applicable Regulations */}
                    <div className="mb-4">
                      <span className="font-medium text-sm">Applicable Regulations:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {vendor.applicableRegulations.map(reg => (
                          <Badge key={reg} variant={reg as any}>
                            {reg.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Security Certifications */}
                    {vendor.securityCertifications.length > 0 && (
                      <div className="mb-4">
                        <span className="font-medium text-sm">Security Certifications:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {vendor.securityCertifications.map((cert, index) => (
                            <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded flex items-center gap-1">
                              <Award className="h-3 w-3" />
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Compliance Indicators */}
                    <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        {vendor.privacyPolicyReviewed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <span>Privacy Policy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {vendor.dpaSignificant ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <span>DPA Signed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {vendor.studentDataAccess ? (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        <span>Student Data Access</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Assessment
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Update
                    </Button>
                    <Button size="sm">
                      Re-assess
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          {/* Assessment Templates */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Assessment Templates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'FERPA Compliance Assessment', regulations: ['FERPA'], description: 'Standard FERPA vendor evaluation' },
                { name: 'COPPA Assessment for EdTech', regulations: ['COPPA'], description: 'Child privacy assessment for educational technology' },
                { name: 'Multi-State Privacy Assessment', regulations: ['CCPA', 'SHIELD', 'BIPA'], description: 'Comprehensive state privacy law compliance' },
                { name: 'International Vendor Assessment', regulations: ['GDPR', 'PIPEDA'], description: 'Assessment for vendors processing international data' },
                { name: 'Security-Focused Assessment', regulations: ['SHIELD', 'General'], description: 'Technical security and data protection evaluation' },
                { name: 'Biometric Data Assessment', regulations: ['BIPA'], description: 'Specialized assessment for biometric data processing' }
              ].map((template, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.regulations.map(reg => (
                      <span key={reg} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {reg}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Use Template
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Calendar */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-500" />
              Upcoming Assessments
            </h2>
            <div className="space-y-4">
              {vendorAssessments
                .filter(v => new Date(v.nextAssessmentDue) <= new Date(new Date().setMonth(new Date().getMonth() + 3)))
                .sort((a, b) => new Date(a.nextAssessmentDue).getTime() - new Date(b.nextAssessmentDue).getTime())
                .map((vendor) => (
                  <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{vendor.vendorName}</h3>
                      <p className="text-sm text-muted-foreground">Due: {vendor.nextAssessmentDue}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {getRiskBadge(vendor.riskLevel)}
                      <Button variant="outline" size="sm">
                        Schedule Assessment
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {/* Compliance Overview */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Vendor Compliance Overview</h2>
            <div className="space-y-6">
              {/* By Regulation */}
              <div>
                <h3 className="font-medium mb-3">Compliance by Regulation</h3>
                <div className="space-y-3">
                  {['ferpa', 'coppa', 'ccpa', 'shield', 'bipa'].map((reg) => {
                    const relevantVendors = vendorAssessments.filter(v => v.applicableRegulations.includes(reg));
                    const compliant = relevantVendors.filter(v => v.complianceStatus === 'compliant').length;
                    const total = relevantVendors.length;
                    const percentage = total > 0 ? Math.round((compliant / total) * 100) : 0;
                    
                    return (
                      <div key={reg} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant={reg as any}>{reg.toUpperCase()}</Badge>
                            <span className="font-medium">Vendor Compliance</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {compliant}/{total} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Compliance Actions */}
              <div>
                <h3 className="font-medium mb-3">Required Actions</h3>
                <div className="space-y-3">
                  {vendorAssessments
                    .filter(v => v.complianceStatus !== 'compliant')
                    .map((vendor) => (
                      <div key={vendor.id} className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <div>
                          <h4 className="font-medium text-amber-800 dark:text-amber-300">{vendor.vendorName}</h4>
                          <p className="text-xs text-amber-700 dark:text-amber-400">
                            {vendor.complianceStatus === 'review_needed' ? 'Requires privacy policy review and compliance verification' :
                             vendor.complianceStatus === 'non_compliant' ? 'Does not meet compliance requirements - consider termination' :
                             'Status unclear - requires assessment'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getComplianceBadge(vendor.complianceStatus)}
                          <Button variant="outline" size="sm">
                            Take Action
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Resources */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Compliance Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/resources/tools-templates" title="Download vendor assessment checklist">
                <Button variant="outline" className="justify-start w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Vendor Assessment Checklist
                </Button>
              </Link>
              <Link to="/resources/tools-templates" title="Access data processing agreement template">
                <Button variant="outline" className="justify-start w-full">
                  <Download className="h-4 w-4 mr-2" />
                  DPA Template
                </Button>
              </Link>
              <Link to="/training" title="Learn how to review vendor privacy policies">
                <Button variant="outline" className="justify-start w-full">
                  <Globe className="h-4 w-4 mr-2" />
                  Privacy Policy Review Guide
                </Button>
              </Link>
              <Link to="/resources/privacy-regulations" title="Reference security standards for vendors">
                <Button variant="outline" className="justify-start w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  Security Standards Reference
                </Button>
              </Link>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h3 className="font-medium mb-3">Additional Support</h3>
              <div className="flex flex-wrap gap-2">
                <Link to="/training" title="Vendor management training modules">
                  <Button variant="outline" size="sm">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Vendor Management Training
                  </Button>
                </Link>
                <Link to="/privacy/obligations" title="Vendor compliance deadlines">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Compliance Deadlines
                  </Button>
                </Link>
                <Link to="/contact" title="Get expert vendor assessment help">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Expert Consultation
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