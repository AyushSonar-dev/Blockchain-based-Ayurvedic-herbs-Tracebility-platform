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
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-[#A6FF00] text-black font-semibold">Verified Organic</Badge>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-balance text-white">{product.name}</h1>
              <p className="text-lg text-gray-400">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#A6FF00]" />
                <div>
                  <p className="text-sm font-medium text-white">{product.farmer}</p>
                  <p className="text-xs text-gray-500">Farmer</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#A6FF00]" />
                <div>
                  <p className="text-sm font-medium text-white">{product.location}</p>
                  <p className="text-xs text-gray-500">Origin</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#A6FF00]" />
                <div>
                  <p className="text-sm font-medium text-white">{product.harvestDate}</p>
                  <p className="text-xs text-gray-500">Harvested</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-[#A6FF00]" />
                <div>
                  <p className="text-sm font-medium text-white">{product.weight}</p>
                  <p className="text-xs text-gray-500">Net Weight</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Farmer's Story */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#A6FF00]/20 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-[#A6FF00]/30">
              <Leaf className="h-6 w-6 text-[#A6FF00]" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">Our Farmer's Story</h3>
              <p className="text-gray-400 leading-relaxed">{product.story}</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  3rd Generation Farmer
                </Badge>
                <Badge variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  20+ Years Experience
                </Badge>
                <Badge variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  Sustainable Practices
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
