import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ChatbotInterface } from './ChatbotInterface';
import { SchemesDashboard } from './SchemesDashboard';
import { UserProfile } from './UserProfile';
import { PaymentInterface } from './PaymentInterface';
import { Bot, FileText, User, CreditCard, Bell, LogOut, Lightbulb } from 'lucide-react';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('chatbot');
  const [userProfile, setUserProfile] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to BEACON! Start by completing your profile.', type: 'info' },
    { id: 2, message: 'New PM-KISAN scheme available for farmers.', type: 'success' }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BEACON
              </h1>
              <p className="text-sm text-gray-600">AI Government Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="hidden md:block">Welcome, {user.name || user.phone}</span>
            </div>
            
            <div className="relative">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
            </div>

            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-white/80 backdrop-blur-sm border border-white/20">
              <TabsTrigger value="chatbot" className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                <span className="hidden sm:inline">AI Assistant</span>
              </TabsTrigger>
              <TabsTrigger value="schemes" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Schemes</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span className="hidden sm:inline">Payments</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chatbot" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">AI Assistant</h2>
                <p className="text-gray-600">Let our AI help you find and apply for government schemes</p>
              </div>
              <ChatbotInterface 
                user={user} 
                onProfileUpdate={(profile) => setUserProfile(profile)}
              />
            </TabsContent>

            <TabsContent value="schemes" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Available Schemes</h2>
                <p className="text-gray-600">Browse and apply for government schemes you're eligible for</p>
              </div>
              <SchemesDashboard userProfile={userProfile} />
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Your Profile</h2>
                <p className="text-gray-600">Manage your personal information and documents</p>
              </div>
              <UserProfile 
                user={user} 
                profile={userProfile}
                onProfileUpdate={setUserProfile}
              />
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Payment History</h2>
                <p className="text-gray-600">Track your scheme application payments</p>
              </div>
              <PaymentInterface user={user} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}