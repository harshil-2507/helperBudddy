import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

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
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.orderId} className="flex items-center justify-between space-x-4">
              <div>
                <p className="font-medium">{order.productName}</p>
                <p className="text-sm text-muted-foreground">{new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${order.amount}</p>
                <p className="text-sm text-muted-foreground">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

