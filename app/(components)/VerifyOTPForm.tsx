'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface VerifyOTPFormProps {
  email: string;
  referralCode?: string;
}

export default function VerifyOTPForm({ email, referralCode }: VerifyOTPFormProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (error) {
      audioRef.current?.play().catch((err) => {
        console.warn('Autoplay prevented by browser:', err);
      });
    }
  }, [error]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9A-Fa-f]?$/.test(value)) return; // Allow only hexadecimal characters or empty

    const newOtp = [...otp];
    newOtp[index] = value.toUpperCase(); // Convert to uppercase for consistency
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        prevInput?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
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
        body: JSON.stringify({ email, otp: otp.join(''), referralCode }),
        // api will fetch the email,otp, referral code from the form
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem('token', token);

        login(); //calls login function
        //instead of we can directly allow user to go to their dashboard because they have varified their profile by giving corect otp. sofor that we have to just add logic of pushing to their unique dashboard in route file after generating token and call it here instead of login()

        
        setSuccess(true);
        router.push('/login');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.log(err);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-200">Verify Your Email</h3>

      {error && <p className="text-red-500 animate-blink">{error}</p>}

      {/* 🔊 Hidden buzzer audio */}
      <audio ref={audioRef} src="/public/asserts/error-sound.mp3" preload="auto" />

      {success && <p className="text-green-500">OTP verified successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div className="flex justify-between">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)} 
              // updated the cursor movement to left on backspace  
              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-lg font-bold text-black"
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