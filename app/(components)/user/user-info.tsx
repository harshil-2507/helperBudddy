import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, UserIcon, Heart, Shield, Coins } from "lucide-react"

interface UserInfoProps {
  user: {
    _id: string;
    username: string;
    email: string;
    area: string;
    address: string;
    isVerified: boolean;
    interestedCategory?: string[];
    walletCoins: number;
    referralCode?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  className?: string
}

export function UserInfo({ user, className }: UserInfoProps) {
  return (
    <Card className={`${className} bg-black/20 backdrop-blur-sm border-white/10`}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
          User Information
          
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <UserIcon className="size-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Username</p>
              <p className="font-medium text-white">{user.username}</p>
              {user.isVerified && (
              <Shield className="size-5 text-green-500"  />
              )}
              {/* blue tick ?? */}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Mail className="size-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="font-medium text-white">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <MapPin className="size-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Area</p>
              <p className="font-medium text-white">{user.area}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Coins className="size-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Wallet Coins</p>
              <p className="font-medium text-white">{user.walletCoins}</p>
            </div>
          </div>
        </div>
        
        {/* Address section - full width */}
        <div className="flex items-start gap-3">
          <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center mt-1">
            <MapPin className="size-5 text-purple-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-400">Address</p>
            <p className="font-medium text-white">{user.address}</p>
          </div>
        </div>
        
        {/* Interests section - only show if user has interests */}
        {user.interestedCategory && user.interestedCategory.length > 0 && (
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center mt-1">
              <Heart className="size-5 text-purple-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400">Interests</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {user.interestedCategory.map((category) => (
                  <Badge key={category} variant="secondary" className="bg-purple-500/10 text-purple-300">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Referral code section - only show if exists */}
        {user.referralCode && (
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <UserIcon className="size-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Referral Code</p>
              <p className="font-medium text-white font-mono">{user.referralCode}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}