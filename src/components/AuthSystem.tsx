import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ArrowLeft, Phone, Shield, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AuthSystemProps {
  onAuthSuccess: (user: any) => void;
  onBack: () => void;
}

// Mock database for demonstration
const mockUsers = [
  { phone: '9876543210', name: 'Rahul Kumar' },
  { phone: '8765432109', name: 'Priya Sharma' },
  { phone: '7654321098', name: 'Amit Patel' }
];

export function AuthSystem({ onAuthSuccess, onBack }: AuthSystemProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock OTP is always 123456 for demo
  const mockOTP = '123456';

  const handlePhoneSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (mode === 'login') {
      const user = mockUsers.find(u => u.phone === phone);
      if (!user) {
        toast.error('Phone number not registered. Please sign up first.');
        setIsLoading(false);
        return;
      }
    }
    
    toast.success('OTP sent successfully!');
    setStep('otp');
    setIsLoading(false);
  };

  const handleOTPSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (otp !== mockOTP) {
      toast.error('Invalid OTP. Try 123456');
      setIsLoading(false);
      return;
    }

    let user;
    if (mode === 'login') {
      user = mockUsers.find(u => u.phone === phone);
    } else {
      user = { phone, name };
      // In real app, would save to database
      mockUsers.push(user);
    }

    toast.success('Authentication successful!');
    onAuthSuccess(user);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-2xl p-8">
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.05 }}
            >
              {step === 'phone' ? (
                <Phone className="w-8 h-8 text-white" />
              ) : (
                <Shield className="w-8 h-8 text-white" />
              )}
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {step === 'phone' 
                ? 'Enter your phone number to continue'
                : 'Enter the OTP sent to your phone'
              }
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {step === 'phone' ? (
              <>
                {mode === 'register' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block mb-2">Full Name</label>
                    <Input
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/50 backdrop-blur-sm border-white/30"
                    />
                  </motion.div>
                )}
                
                <div>
                  <label className="block mb-2">Phone Number</label>
                  <Input
                    placeholder="Enter 10-digit phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-white/50 backdrop-blur-sm border-white/30"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block mb-2">Enter OTP</label>
                <Input
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-white/50 backdrop-blur-sm border-white/30 text-center text-lg tracking-widest"
                  maxLength={6}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Demo OTP: 123456
                </p>
              </div>
            )}

            <Button
              onClick={step === 'phone' ? handlePhoneSubmit : handleOTPSubmit}
              disabled={isLoading || (step === 'phone' ? !phone || (mode === 'register' && !name) : !otp)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {step === 'phone' ? 'Send OTP' : 'Verify & Continue'}
                  <Check className="w-4 h-4" />
                </span>
              )}
            </Button>

            {step === 'phone' && (
              <div className="text-center">
                <button
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {mode === 'login' 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Login"
                  }
                </button>
              </div>
            )}

            {step === 'otp' && (
              <div className="text-center">
                <button
                  onClick={() => setStep('phone')}
                  className="text-gray-600 hover:text-gray-700 transition-colors"
                >
                  Change phone number
                </button>
              </div>
            )}
          </div>
        </Card>

        {/* Demo accounts info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-white/20"
        >
          <h4 className="font-semibold mb-2">Demo Accounts:</h4>
          <div className="space-y-1 text-sm text-gray-600">
            {mockUsers.map((user, index) => (
              <div key={index} className="flex justify-between">
                <span>{user.name}</span>
                <span>{user.phone}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">OTP: 123456</p>
        </motion.div>
      </motion.div>
    </div>
  );
}