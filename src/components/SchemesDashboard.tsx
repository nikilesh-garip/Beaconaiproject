import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CheckCircle, Clock, XCircle, Search, Filter, ExternalLink, Users, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Scheme {
  id: string;
  name: string;
  description: string;
  department: string;
  eligibility: string[];
  benefits: string;
  deadline: string;
  applicationFee: number;
  status: 'eligible' | 'not-eligible' | 'applied' | 'processing' | 'approved';
  category: string;
  targetGroup: string;
}

const mockSchemes: Scheme[] = [
  {
    id: '1',
    name: 'PM-KISAN Samman Nidhi',
    description: 'Financial assistance to farmers with cultivable land holding',
    department: 'Ministry of Agriculture',
    eligibility: ['Farmer', 'Land ownership', 'Annual income < 2 lakh'],
    benefits: '₹6,000 per year in 3 installments',
    deadline: '2024-03-31',
    applicationFee: 0,
    status: 'eligible',
    category: 'Agriculture',
    targetGroup: 'Farmers'
  },
  {
    id: '2',
    name: 'National Scholarship Portal',
    description: 'Merit-based scholarships for students',
    department: 'Ministry of Education',
    eligibility: ['Student', 'Merit criteria', 'Income < 6 lakh'],
    benefits: '₹10,000 to ₹80,000 per year',
    deadline: '2024-01-31',
    applicationFee: 50,
    status: 'eligible',
    category: 'Education',
    targetGroup: 'Students'
  },
  {
    id: '3',
    name: 'Pradhan Mantri Awas Yojana',
    description: 'Housing for all - affordable housing scheme',
    department: 'Ministry of Housing',
    eligibility: ['First-time home buyer', 'Income < 12 lakh', 'No existing property'],
    benefits: 'Subsidy up to ₹2.67 lakh',
    deadline: '2024-12-31',
    applicationFee: 100,
    status: 'not-eligible',
    category: 'Housing',
    targetGroup: 'General'
  },
  {
    id: '4',
    name: 'Startup India Seed Fund',
    description: 'Financial support for startups to prove concept',
    department: 'Department for Promotion of Industry',
    eligibility: ['Startup', 'DPIIT recognition', 'Technology-based solution'],
    benefits: 'Up to ₹20 lakh grant',
    deadline: '2024-06-30',
    applicationFee: 0,
    status: 'applied',
    category: 'Business',
    targetGroup: 'Entrepreneurs'
  },
  {
    id: '5',
    name: 'Ayushman Bharat',
    description: 'Health insurance coverage for families',
    department: 'Ministry of Health',
    eligibility: ['Family income < 5 lakh', 'SECC database inclusion'],
    benefits: '₹5 lakh health coverage per family',
    deadline: 'Ongoing',
    applicationFee: 0,
    status: 'processing',
    category: 'Healthcare',
    targetGroup: 'Families'
  }
];

interface SchemesDashboardProps {
  userProfile: any;
}

export function SchemesDashboard({ userProfile }: SchemesDashboardProps) {
  const [schemes] = useState<Scheme[]>(mockSchemes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'eligible':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'applied':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'eligible':
        return 'bg-green-100 text-green-800';
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-orange-100 text-orange-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || scheme.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || scheme.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleApply = async (scheme: Scheme) => {
    if (scheme.status !== 'eligible') return;
    
    toast.success(`Application initiated for ${scheme.name}!`);
    // In real app, would trigger AI agent to apply
  };

  const categories = [...new Set(schemes.map(s => s.category))];
  const statuses = ['eligible', 'applied', 'processing', 'approved', 'not-eligible'];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50 backdrop-blur-sm border-white/30"
              />
            </div>
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48 bg-white/50 backdrop-blur-sm border-white/30">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48 bg-white/50 backdrop-blur-sm border-white/30">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Schemes', value: schemes.length, icon: Users, color: 'blue' },
          { label: 'Eligible', value: schemes.filter(s => s.status === 'eligible').length, icon: CheckCircle, color: 'green' },
          { label: 'Applied', value: schemes.filter(s => s.status === 'applied').length, icon: Clock, color: 'orange' },
          { label: 'Processing', value: schemes.filter(s => s.status === 'processing').length, icon: Clock, color: 'purple' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Schemes List */}
      <div className="grid gap-6">
        {filteredSchemes.map((scheme, index) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{scheme.name}</h3>
                        {getStatusIcon(scheme.status)}
                        <Badge className={getStatusColor(scheme.status)}>
                          {scheme.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{scheme.description}</p>
                      <p className="text-sm text-gray-500">Department: {scheme.department}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Eligibility Criteria:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {scheme.eligibility.map((criteria, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            {criteria}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Benefits:</span>
                        <span className="text-gray-600">{scheme.benefits}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Deadline:</span>
                        <span className="text-gray-600">{scheme.deadline}</span>
                      </div>
                      {scheme.applicationFee > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-orange-600" />
                          <span className="font-medium">Application Fee:</span>
                          <span className="text-gray-600">₹{scheme.applicationFee}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:w-48">
                  <Badge variant="outline" className="w-fit">
                    {scheme.category}
                  </Badge>
                  
                  {scheme.status === 'eligible' && (
                    <Button
                      onClick={() => handleApply(scheme)}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      Apply Now
                    </Button>
                  )}
                  
                  {scheme.status === 'applied' && (
                    <Button variant="outline" className="cursor-default">
                      Application Submitted
                    </Button>
                  )}
                  
                  {scheme.status === 'processing' && (
                    <Button variant="outline" className="cursor-default">
                      Under Review
                    </Button>
                  )}
                  
                  {scheme.status === 'not-eligible' && (
                    <Button variant="outline" disabled>
                      Not Eligible
                    </Button>
                  )}

                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No schemes found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}