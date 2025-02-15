// components/ResetPasswordForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordForm({ token }: { token: string }) {
  const [formData, setFormData] = useState({ password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: formData.password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">Reset Password</h3>

      {success ? (
        <p className="text-green-500">Password reset successful. You can now log in with your new password.</p>
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Reset Password
            </button>
          </form>
        </>
      )}
    </div>
  );
}