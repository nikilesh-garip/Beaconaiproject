import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Upload, FileText, Check, User, Shield, Camera } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UserProfileProps {
  user: any;
  profile: any;
  onProfileUpdate: (profile: any) => void;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'uploaded' | 'pending' | 'verified';
  uploadDate?: string;
}

const requiredDocuments = [
  { id: 'aadhar', name: 'Aadhar Card', required: true },
  { id: 'pan', name: 'PAN Card', required: false },
  { id: 'income', name: 'Income Certificate', required: true },
  { id: 'caste', name: 'Caste Certificate', required: false },
  { id: 'domicile', name: 'Domicile Certificate', required: true },
  { id: 'photo', name: 'Passport Size Photo', required: true }
];

export function UserProfile({ user, profile, onProfileUpdate }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState(() => ({
    fullName: (profile?.fullName || user?.name || ''),
    phone: (profile?.phone || user?.phone || ''),
    email: (profile?.email || ''),
    gender: (profile?.gender || ''),
    dateOfBirth: (profile?.dateOfBirth || ''),
    state: (profile?.state || ''),
    district: (profile?.district || ''),
    address: (profile?.address || ''),
    pincode: (profile?.pincode || ''),
    caste: (profile?.caste || ''),
    area: (profile?.area || ''),
    income: (profile?.income || ''),
    disability: (profile?.disability || 'No'),
    minority: (profile?.minority || 'No'),
    student: (profile?.student || 'No')
  }));
  
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'aadhar',
      name: 'Aadhar Card',
      type: 'pdf',
      status: 'uploaded',
      uploadDate: '2024-01-15'
    },
    {
      id: 'income',
      name: 'Income Certificate',
      type: 'pdf',
      status: 'verified',
      uploadDate: '2024-01-10'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onProfileUpdate(formData);
    toast.success('Profile updated successfully!');
    setIsLoading(false);
  };

  const handleFileUpload = (documentId: string) => {
    // Simulate file upload
    const newDocument: Document = {
      id: documentId,
      name: requiredDocuments.find(doc => doc.id === documentId)?.name || '',
      type: 'pdf',
      status: 'uploaded',
      uploadDate: new Date().toISOString().split('T')[0]
    };
    
    setDocuments(prev => {
      const existing = prev.findIndex(doc => doc.id === documentId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newDocument;
        return updated;
      }
      return [...prev, newDocument];
    });
    
    toast.success(`${newDocument.name} uploaded successfully!`);
  };

  const getDocumentStatus = (documentId: string) => {
    return documents.find(doc => doc.id === documentId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'uploaded':
        return <FileText className="w-4 h-4 text-blue-500" />;
      default:
        return <Upload className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'uploaded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border border-white/20">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{formData.fullName || 'Your Name'}</h3>
                <p className="text-gray-600">{formData.phone}</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Camera className="w-4 h-4 mr-2" />
                  Update Photo
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="bg-white/50 backdrop-blur-sm border-white/30"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white/50 backdrop-blur-sm border-white/30"
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="bg-white/50 backdrop-blur-sm border-white/30"
                  />
                </div>

                <div>
                  <Label htmlFor="caste">Caste Category</Label>
                  <Select value={formData.caste} onValueChange={(value) => handleInputChange('caste', value)}>
                    <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="OBC">OBC</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="ST">ST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="area">Area Type</Label>
                  <Select value={formData.area} onValueChange={(value) => handleInputChange('area', value)}>
                    <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                      <SelectValue placeholder="Select area type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Urban">Urban</SelectItem>
                      <SelectItem value="Rural">Rural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="bg-white/50 backdrop-blur-sm border-white/30"
                  />
                </div>

                <div>
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="bg-white/50 backdrop-blur-sm border-white/30"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="bg-white/50 backdrop-blur-sm border-white/30"
                  />
                </div>

                <div>
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    className="bg-white/50 backdrop-blur-sm border-white/30"
                  />
                </div>

                <div>
                  <Label htmlFor="income">Annual Income (₹)</Label>
                  <Input
                    id="income"
                    type="number"
                    value={formData.income}
                    onChange={(e) => handleInputChange('income', e.target.value)}
                    className="bg-white/50 backdrop-blur-sm border-white/30"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label>Student?</Label>
                    <Select value={formData.student} onValueChange={(value) => handleInputChange('student', value)}>
                      <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Disabled?</Label>
                    <Select value={formData.disability} onValueChange={(value) => handleInputChange('disability', value)}>
                      <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Minority?</Label>
                    <Select value={formData.minority} onValueChange={(value) => handleInputChange('minority', value)}>
                      <SelectTrigger className="bg-white/50 backdrop-blur-sm border-white/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                  />
                ) : null}
                Save Profile
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
            <p className="text-gray-600 mb-6">
              Upload the following documents to complete your profile and enable automatic applications.
            </p>

            <div className="grid gap-4">
              {requiredDocuments.map((doc) => {
                const uploaded = getDocumentStatus(doc.id);
                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 border border-gray-200/50 rounded-lg bg-white/50 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(uploaded?.status || 'pending')}
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-gray-600">
                          {doc.required ? 'Required' : 'Optional'}
                          {uploaded?.uploadDate && ` • Uploaded on ${uploaded.uploadDate}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {uploaded && (
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(uploaded.status)}`}>
                          {uploaded.status.charAt(0).toUpperCase() + uploaded.status.slice(1)}
                        </span>
                      )}
                      <Button
                        variant={uploaded ? "outline" : "default"}
                        size="sm"
                        onClick={() => handleFileUpload(doc.id)}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploaded ? 'Re-upload' : 'Upload'}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Document Guidelines</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Upload clear, readable scanned copies</li>
                <li>• Supported formats: PDF, JPG, PNG (Max 5MB per file)</li>
                <li>• Ensure all corners are visible and text is legible</li>
                <li>• Documents will be verified within 24-48 hours</li>
              </ul>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}