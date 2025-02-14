import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

// Dummy data for recommendations
const DUMMY_RECOMMENDATIONS = [
  {
    id: 1,
    name: "Product 1",
    category: "Electronics",
    price: 299.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Books",
    price: 19.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Product 3",
    category: "Home",
    price: 49.99,
    image: "/placeholder.svg?height=100&width=100",
  },
]

interface UserRecommendationsProps {
  categories: string[]
  className?: string
}

export function UserRecommendations({ categories, className }: UserRecommendationsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recommended for You</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {DUMMY_RECOMMENDATIONS.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="mb-4 h-[100px] w-full object-cover"
                />
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <p className="mt-2 font-medium">${product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

