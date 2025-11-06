import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Bot, User, Send, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatbotInterfaceProps {
  user: any;
  onProfileUpdate: (profile: any) => void;
}

// Mock form fields that the AI collects
const profileFields = [
  { key: 'fullName', question: 'What is your full name as per Aadhar card?', type: 'text' },
  { key: 'gender', question: 'What is your gender? (Male/Female/Other)', type: 'select', options: ['Male', 'Female', 'Other'] },
  { key: 'caste', question: 'What is your caste category? (General/OBC/SC/ST)', type: 'select', options: ['General', 'OBC', 'SC', 'ST'] },
  { key: 'dateOfBirth', question: 'What is your date of birth? (DD/MM/YYYY)', type: 'date' },
  { key: 'state', question: 'Which state are you from?', type: 'text' },
  { key: 'area', question: 'Do you live in urban or rural area?', type: 'select', options: ['Urban', 'Rural'] },
  { key: 'disability', question: 'Are you a person with disability? (Yes/No)', type: 'select', options: ['Yes', 'No'] },
  { key: 'minority', question: 'Do you belong to a minority community? (Yes/No)', type: 'select', options: ['Yes', 'No'] },
  { key: 'student', question: 'Are you currently a student? (Yes/No)', type: 'select', options: ['Yes', 'No'] },
  { key: 'income', question: 'What is your annual family income in rupees?', type: 'number' }
];

export function ChatbotInterface({ user, onProfileUpdate }: ChatbotInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hello ${user.name || 'there'}! I'm your AI assistant. I'll help you complete your profile so we can find the best government schemes for you. Let's start with some basic information.`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentField, setCurrentField] = useState(0);
  const [profileData, setProfileData] = useState<any>({});
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isProfileComplete && currentField < profileFields.length) {
      const timer = setTimeout(() => {
        askNextQuestion();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentField, isProfileComplete]);

  const askNextQuestion = () => {
    if (currentField < profileFields.length) {
      const field = profileFields[currentField];
      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: field.question,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  const addMessage = (content: string, type: 'user' | 'bot') => {
    const message: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const simulateTyping = async () => {
    const typingMessage: Message = {
      id: 'typing',
      type: 'bot',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    addMessage(userMessage, 'user');
    setInputValue('');
    setIsLoading(true);

    await simulateTyping();

    // Process the user's response
    if (!isProfileComplete && currentField < profileFields.length) {
      const field = profileFields[currentField];
      const newProfileData = { ...profileData, [field.key]: userMessage };
      setProfileData(newProfileData);

      // Validate response
      let isValid = true;
      let response = '';

      if (field.type === 'select' && field.options && !field.options.some(option => 
        option.toLowerCase() === userMessage.toLowerCase())) {
        isValid = false;
        response = `Please choose from: ${field.options.join(', ')}`;
      } else {
        response = `Great! I've recorded your ${field.key.replace(/([A-Z])/g, ' $1').toLowerCase()}.`;
        setCurrentField(prev => prev + 1);
      }

      addMessage(response, 'bot');

      // Check if profile is complete
      if (currentField + 1 >= profileFields.length && isValid) {
        setTimeout(() => {
          setIsProfileComplete(true);
          onProfileUpdate(newProfileData);
          addMessage(
            'Perfect! I\'ve collected all your information. Let me analyze which government schemes you\'re eligible for. This will take a moment...',
            'bot'
          );
          
          setTimeout(() => {
            addMessage(
              'Analysis complete! Based on your profile, I found several schemes you\'re eligible for. You can view them in the "Schemes" tab. Would you like me to automatically apply for the most relevant ones?',
              'bot'
            );
          }, 3000);
        }, 1000);
      }
    } else {
      // Handle general conversation after profile completion
      let response = '';
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('apply') || lowerMessage.includes('yes')) {
        response = 'Great! I\'ll start the application process for eligible schemes. You\'ll receive notifications about the progress. Please check the "Payments" tab if any fees are required.';
      } else if (lowerMessage.includes('schemes') || lowerMessage.includes('eligibility')) {
        response = 'You can view all available schemes and your eligibility status in the "Schemes" tab. I\'ve already filtered them based on your profile.';
      } else if (lowerMessage.includes('documents')) {
        response = 'You can upload required documents in your "Profile" section. I\'ll guide you through which documents are needed for each scheme.';
      } else {
        response = 'I\'m here to help you with government schemes, applications, and any questions you have about the process. How can I assist you?';
      }
      
      addMessage(response, 'bot');
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg h-[600px] flex flex-col relative">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">BEACON AI Assistant</h3>
              <p className="text-sm text-gray-600">
                {isProfileComplete ? 'Ready to help with schemes' : `Collecting profile info (${currentField}/${profileFields.length})`}
              </p>
            </div>
            {isProfileComplete && (
              <div className="ml-auto">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-4">
            <div className="space-y-4 min-h-0">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    layout
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white border border-gray-200'
                      }`}>
                        {message.isTyping ? (
                          <div className="flex gap-1 py-1">
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                        ) : (
                          <p className="text-sm">{message.content}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Input - Fixed position */}
        <div className="p-4 border-t border-gray-200/50 flex-shrink-0 bg-white/80 backdrop-blur-lg">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="bg-white/50 backdrop-blur-sm border-white/30 flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Progress Indicator */}
      {!isProfileComplete && (
        <Card className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Profile Completion</span>
            <span className="text-sm text-gray-600">{currentField}/{profileFields.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentField / profileFields.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </Card>
      )}
    </div>
  );
}