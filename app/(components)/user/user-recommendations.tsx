import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Star } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  category: string
  price: number
  rating: number
  image: string
}

interface UserRecommendationsProps {
  recommendations: Product[]
  className?: string
}

export function UserRecommendations({ recommendations, className }: UserRecommendationsProps) {
  return (
    <Card className={`${className} bg-black/20 backdrop-blur-sm border-white/10`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-white">Recommended for You</CardTitle>
        <ArrowUpRight className="size-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {recommendations.map((product) => (
            <Card key={product.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardContent className="p-4">
                <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-white">{product.name}</h3>
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-300">
                    {product.category}
                  </Badge>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">${product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-1">
                      <Star className="size-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm text-gray-400">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

