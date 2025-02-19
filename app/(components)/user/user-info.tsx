import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, UserIcon, Heart } from "lucide-react"

interface UserInfoProps {
  user: {
    username: string
    email: string
    area: string
    interestedCategory: string[]
  }
  className?: string
}

export function UserInfo({ user, className }: UserInfoProps) {
  return (
    <Card className={`${className} bg-black/20 backdrop-blur-sm border-white/10`}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">User Information</CardTitle>
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
              <Heart className="size-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Interests</p>
              <div className="flex gap-2 mt-1">
                {user.interestedCategory.map((category) => (
                  <Badge key={category} variant="secondary" className="bg-purple-500/10 text-purple-300">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

