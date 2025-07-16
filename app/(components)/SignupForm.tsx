// components/SignupForm.tsx
'use client';

import { useState } from 'react';
import VerifyOTPForm from './VerifyOTPForm';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    area: '',
  });
  const [error, setError] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);

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
        setShowOtpForm(true); // Show OTP verification form
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">Sign Up</h3>

      {error && <p className="text-red-500">{error}</p>}

      {!showOtpForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />

          {/* Area */}
          <select
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Area</option>
            <option value="Area 1">Area 1</option>
            <option value="Area 2">Area 2</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      ) : (
        <VerifyOTPForm email={formData.email} />
      )}
    </div>
  );
}