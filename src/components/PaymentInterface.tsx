import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { CreditCard, Smartphone, Building, CheckCircle, Clock, AlertCircle, IndianRupee } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Payment {
  id: string;
  schemeName: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  transactionId?: string;
  paymentMethod?: string;
}

interface PaymentInterfaceProps {
  user: any;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    schemeName: 'National Scholarship Portal',
    amount: 50,
    status: 'completed',
    date: '2024-01-15',
    transactionId: 'TXN123456789',
    paymentMethod: 'UPI'
  },
  {
    id: '2',
    schemeName: 'Pradhan Mantri Awas Yojana',
    amount: 100,
    status: 'pending',
    date: '2024-01-20'
  }
];

export function PaymentInterface({ user }: PaymentInterfaceProps) {
  const [payments] = useState<Payment[]>(mockPayments);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [upiPin, setUpiPin] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('State Bank of India');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock UPI ID for demo
  const mockUpiId = 'user@paytm';
  const mockUpiPin = '1234';

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handlePayment = async () => {
    if (!selectedPayment) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    if (paymentMethod === 'upi') {
      if (upiId !== mockUpiId || upiPin !== mockUpiPin) {
        toast.error('Invalid UPI ID or PIN. Try user@paytm with PIN 1234');
        setIsProcessing(false);
        return;
      }
    }

    // Simulate successful payment
    const transactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    toast.success(`Payment successful! Transaction ID: ${transactionId}`);
    setShowPaymentModal(false);
    setIsProcessing(false);
    setUpiId('');
    setUpiPin('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
  };

  const openPaymentModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const totalPaid = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="text-2xl font-bold text-green-600">₹{totalPaid}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-orange-600">₹{totalPending}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-blue-600">{payments.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Payment History */}
      <Card className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
        <div className="p-6 border-b border-gray-200/50">
          <h3 className="text-lg font-semibold">Payment History</h3>
          <p className="text-gray-600 text-sm">Track all your scheme application payments</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {payments.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200/30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{payment.schemeName}</h4>
                    <p className="text-sm text-gray-600">
                      {payment.date} {payment.transactionId && `• ${payment.transactionId}`}
                    </p>
                    {payment.paymentMethod && (
                      <p className="text-xs text-gray-500">via {payment.paymentMethod}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-semibold">₹{payment.amount}</p>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(payment.status)}
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {payment.status === 'pending' && (
                    <Button
                      onClick={() => openPaymentModal(payment)}
                      size="sm"
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      Pay Now
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {payments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No payments yet</h3>
              <p className="text-gray-600">Your payment history will appear here once you apply for schemes.</p>
            </div>
          )}
        </div>
      </Card>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              Complete your scheme application payment using your preferred payment method.
            </DialogDescription>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-6">
              {/* Payment Details */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">{selectedPayment.schemeName}</h4>
                <div className="flex justify-between text-sm">
                  <span>Application Fee:</span>
                  <span className="font-semibold">₹{selectedPayment.amount}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className="font-medium">Select Payment Method</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPaymentMethod('upi')}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-xs">UPI</span>
                  </Button>
                  <Button
                    variant={paymentMethod === 'card' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPaymentMethod('card')}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-xs">Card</span>
                  </Button>
                  <Button
                    variant={paymentMethod === 'netbanking' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPaymentMethod('netbanking')}
                    className="flex flex-col items-center gap-1 h-auto py-3"
                  >
                    <Building className="w-4 h-4" />
                    <span className="text-xs">Net Banking</span>
                  </Button>
                </div>
              </div>

              {/* UPI Payment Form */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">UPI ID</label>
                    <Input
                      placeholder="Enter UPI ID"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">Demo: user@paytm</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">UPI PIN</label>
                    <Input
                      type="password"
                      placeholder="Enter UPI PIN"
                      value={upiPin}
                      onChange={(e) => setUpiPin(e.target.value)}
                      maxLength={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">Demo PIN: 1234</p>
                  </div>
                </div>
              )}

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <Input 
                      placeholder="1234 5678 9012 3456" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry</label>
                      <Input 
                        placeholder="MM/YY" 
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <Input 
                        placeholder="123" 
                        maxLength={3} 
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Net Banking Form */}
              {paymentMethod === 'netbanking' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Select Bank</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                  >
                    <option value="State Bank of India">State Bank of India</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                  </select>
                </div>
              )}

              {/* Pay Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing || (paymentMethod === 'upi' && (!upiId || !upiPin))}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Processing Payment...
                  </div>
                ) : (
                  `Pay ₹${selectedPayment.amount}`
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}