// components/Referral.tsx
"use client";
import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { IUser } from '@/models/User';
import { Button } from '@/app/(components)/ui/button';

interface ReferralProps {
  user: IUser;
}

export default function Referral({ user }: ReferralProps) {
  const [referralLink, setReferralLink] = useState<string>('');

  useEffect(() => {
    if (user.referralCode) {
      const link = `${window.location.origin}/signup?referralCode=${user.referralCode}`;
      setReferralLink(link);
    }
  }, [user]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Helper Buddy',
        text: 'Join Helper Buddy using my referral link!',
        url: referralLink,
      });
    } else {
      alert('Your browser does not support the share feature.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Referral Program</h2>
      <p className="text-gray-600 mb-6">Invite your friends and earn bonus coins!</p>
      <div className="mb-6">
        <QRCode value={referralLink} size={256} />
      </div>
      <Button onClick={handleShare} className="w-full">
        Share Referral Link
      </Button>
    </div>
  );
}