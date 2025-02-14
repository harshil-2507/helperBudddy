import type { User } from "@/models/User"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

interface UserInfoProps {
  user: User
  className?: string
}

export function UserInfo({ user, className }: UserInfoProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Username</p>
            <p className="font-medium">{user.username}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Area</p>
            <p className="font-medium">{user.area}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Interests</p>
            {/* <p className="font-medium">{user.interestedCategory.join(", ")}</p> */}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

