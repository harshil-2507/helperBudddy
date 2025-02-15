// components/ForgotPasswordForm.tsx
'use client';

import { useState } from 'react';

export default function ForgotPasswordForm() {
  const [formData, setFormData] = useState({ email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
        console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">Forgot Password</h3>

      {success ? (
        <p className="text-green-500">Password reset email sent. Please check your inbox.</p>
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Send Reset Link
            </button>
          </form>
        </>
      )}
    </div>
  );
}