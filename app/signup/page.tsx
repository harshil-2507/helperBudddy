// app/signup/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Globe from '@/components/threeD/Globe';
import VerifyOTPForm from '@/app/(components)/VerifyOTPForm';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    area: '',
    referralCode: '', // Add referralCode field
  });
  const [error, setError] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const referralCode = searchParams.get('referralCode');
    if (referralCode) {
      setFormData({ ...formData, referralCode });
    }
  }, [searchParams, formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtpForm(true);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white relative">
      <img src="/grid-pattern.svg" alt="Grid Pattern" className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20 " />
      {/* Left Part - Exact Copy */}
      <div className="w-1/2 h-screen flex flex-col justify-center items-center relative z-10 text-center">
        <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
          <Globe />
        </div>
        <h1 className="text-4xl font-mono text-gradient z-10 mt-16">Connect with HelperBuddy Community</h1>
      </div>

      {/* Right Part - Form with Your Submit Logic */}
      <div className="w-1/2 h-screen flex flex-col justify-center items-center p-8 z-10 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg bg-gray-800 bg-opacity-30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl space-y-8"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

          {error && <p className="text-red-400 text-center">{error}</p>}

          {!showOtpForm ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="flex items-center space-x-2 bg-gray-700 bg-opacity-40 p-2 rounded-md">
                <FaUser className="text-white" />
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  className="bg-transparent focus:outline-none text-white w-full"
                />
              </label>
              <label className="flex items-center space-x-2 bg-gray-700 bg-opacity-40 p-2 rounded-md">
                <FaEnvelope className="text-white" />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-transparent focus:outline-none text-white w-full"
                />
              </label>
              <label className="flex items-center space-x-2 bg-gray-700 bg-opacity-40 p-2 rounded-md">
                <FaLock className="text-white" />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="bg-transparent focus:outline-none text-white w-full"
                />
              </label>
              <select
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                required
                className="w-full px-4 py-2 bg-gray-700 bg-opacity-40 rounded-md text-white focus:outline-none"
              >
                <option value="">Select Area</option>
                <option value="Area 1">Area 1</option>
                <option value="Area 2">Area 2</option>
              </select>
              <label className="flex items-center space-x-2 bg-gray-700 bg-opacity-40 p-2 rounded-md">
                <input
                  type="text"
                  placeholder="Referral Code (Optional)"
                  value={formData.referralCode}
                  onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                  className="bg-transparent focus:outline-none text-white w-full"
                />
              </label>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Sign Up
              </button>
            </form>
          ) : (
            <VerifyOTPForm email={formData.email} referralCode={formData.referralCode} />
          )}
          <p className="text-center text-gray-400">
            Already have an account? <Link href="/login" className="text-blue-400 hover:underline">Login here</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}