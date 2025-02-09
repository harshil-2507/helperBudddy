// components/VerifyOTPForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface VerifyOTPFormProps {
  email: string;
}

export default function VerifyOTPForm({ email }: VerifyOTPFormProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otp.join('') }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token in localStorage
        const token = data.token; // Assuming the backend sends the token
        localStorage.setItem('token', token);

        login(); // Update global authentication state
        setSuccess(true);
        router.push('/dashboard'); // Redirect to dashboard
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">Verify Your Email</h3>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">OTP verified successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-lg font-bold"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}