import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package2, ArrowUpRight } from "lucide-react"

interface Order {
  orderId: string
  productName: string
  orderDate: Date
  status: string
  amount: number
}

interface UserOrdersProps {
  orders: Order[]
  className?: string
}

export function UserOrders({ orders, className }: UserOrdersProps) {
  return (
    <Card className={`${className} bg-black/20 backdrop-blur-sm border-white/10`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-white">Recent Orders</CardTitle>
        <ArrowUpRight className="size-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="flex items-center justify-between space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Package2 className="size-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium text-white">{order.productName}</p>
                  <p className="text-sm text-gray-400">{order.orderDate.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">${order.amount.toFixed(2)}</p>
                <Badge variant="secondary" className="bg-purple-500/10 text-purple-300">
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

