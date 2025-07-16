// app/(auth)/reset-password/[token]/page.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/(components)/ui/button';
import { Input } from '@/app/(components)/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
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
        body: JSON.stringify({ token: params.token, password: formData.password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        router.push('/login');
      } else {
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
          </CardHeader>
          <CardContent>
            {success ? (
              <p className="text-green-500">Password reset successful. You can now log in with your new password.</p>
            ) : (
              <>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="password"
                    placeholder="New Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="w-full"
                  />
                  <Button type="submit" className="w-full">
                    Reset Password
                  </Button>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}