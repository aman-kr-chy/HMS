import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Mail, Lock, User, MapPin, CreditCard, Phone } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onSuccess, defaultMode = 'login' }) => {
  const [mode, setMode] = useState(defaultMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [aadharCard, setAadharCard] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');

  // Reset mode when opened
  React.useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
    }
  }, [isOpen, defaultMode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate auth action
    setTimeout(() => {
      const userData = {
        name: mode === 'register' ? name : 'Demo User',
        email: email,
        address: mode === 'register' ? address : '',
        aadharCard: mode === 'register' ? aadharCard : '',
        mobileNo: mode === 'register' ? mobileNo : '',
        avatar: 'https://i.pravatar.cc/150?u=' + email
      };
      
      if (mode === 'register') {
        alert("Welcome to GrandHotel! You have successfully registered and are now logged in.");
      }
      
      if (onSuccess) onSuccess(userData);
      onClose();
    }, 500);
  };

  const title = mode === 'login' ? 'Sign In' : 'Create Account';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <>
            <Input 
              label="Full Name" 
              placeholder="John Doe" 
              icon={User} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
            <Input 
              label="Mobile Number" 
              placeholder="9876543210" 
              icon={Phone} 
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, ''))}
              maxLength={10}
              minLength={10}
              pattern="[0-9]{10}"
              title="Mobile number must be exactly 10 digits"
              required 
            />
            <Input 
              label="Address" 
              placeholder="123 Main St, City" 
              icon={MapPin} 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required 
            />
            <Input 
              label="Aadhar Card Number" 
              placeholder="123456789012" 
              icon={CreditCard} 
              value={aadharCard}
              onChange={(e) => setAadharCard(e.target.value.replace(/\D/g, ''))}
              maxLength={12}
              minLength={12}
              pattern="[0-9]{12}"
              title="Aadhar Card number must be exactly 12 digits"
              required 
            />
          </>
        )}
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="you@example.com" 
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <Input 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          icon={Lock} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        
        <Button type="submit" className="w-full mt-6" variant="primary">
          {mode === 'login' ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-600">
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <button 
              type="button" 
              onClick={() => setMode('register')} 
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button 
              type="button" 
              onClick={() => setMode('login')} 
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;
