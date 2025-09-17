import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, User, Package, Leaf } from "lucide-react"

interface ProductStoryProps {
  productId: string
}

export function ProductStory({ productId }: ProductStoryProps) {
  // Mock data - in real app, this would be fetched based on productId
  const product = {
    id: productId,
    name: "Organic Turmeric Powder",
    image: "/organic-turmeric-powder.jpg",
    farm: "Green Valley Organics",
    farmer: "Rajesh Kumar",
    location: "Karnataka, India",
    harvestDate: "January 15, 2024",
    weight: "500g",
    description:
      "Premium organic turmeric grown in the fertile soils of Karnataka using traditional farming methods passed down through generations.",
    story:
      "This turmeric was carefully cultivated by Rajesh Kumar, a third-generation farmer who has been growing organic spices for over 20 years. The farm follows sustainable practices and is certified organic by multiple international bodies.",
  }

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-0">
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <img src={ "/organic-turmeric-powder.jpg"} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-[#A6FF00] text-black font-semibold">Verified Organic</Badge>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-balance text-white">{product.name}</h1>
              <p className="text-lg text-gray-400">{product.description}</p>
            </div>

          
          </div>
        </CardContent>
      </Card>


    </div>
  )
}
