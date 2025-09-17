import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, MapPin, Truck, Package, Leaf } from "lucide-react"

export function ProductTimeline() {
  const timelineEvents = [
    {
      id: 1,
      title: "Seeds Planted",
      description: "Organic turmeric seeds planted in certified organic soil",
      date: "2023-06-15",
      location: "Rajesh Farm, Kerala",
      status: "completed",
      icon: Leaf,
      details: "Variety: Lakadong turmeric, known for high curcumin content",
    },
    {
      id: 2,
      title: "Growth Monitoring",
      description: "Regular monitoring of crop health and soil conditions",
      date: "2023-08-20",
      location: "Rajesh Farm, Kerala",
      status: "completed",
      icon: Clock,
      details: "Soil pH: 6.5, Moisture: Optimal, No pesticides used",
    },
    {
      id: 3,
      title: "Harvest",
      description: "Turmeric rhizomes harvested at peak maturity",
      date: "2023-12-10",
      location: "Rajesh Farm, Kerala",
      status: "completed",
      icon: CheckCircle,
      details: "Yield: 2.5 tons per acre, Quality grade: Premium",
    },
    {
      id: 4,
      title: "Processing",
      description: "Cleaned, dried, and ground into fine powder",
      date: "2023-12-15",
      location: "Golden Spice Processing, Kochi",
      status: "completed",
      icon: Package,
      details: "Moisture content: 8.5%, Curcumin: 3.2%",
    },
    {
      id: 5,
      title: "Quality Testing",
      description: "Laboratory testing for purity and active compounds",
      date: "2023-12-18",
      location: "Certified Lab, Kochi",
      status: "completed",
      icon: CheckCircle,
      details: "All tests passed, Organic certification verified",
    },
    {
      id: 6,
      title: "Packaging",
      description: "Sealed in food-grade packaging with QR code",
      date: "2023-12-20",
      location: "Golden Spice Processing, Kochi",
      status: "completed",
      icon: Package,
      details: "Batch: TUR-2024-001, Expiry: Dec 2025",
    },
    {
      id: 7,
      title: "Distribution",
      description: "Shipped to retail distribution center",
      date: "2023-12-22",
      location: "Mumbai Distribution Center",
      status: "completed",
      icon: Truck,
      details: "Temperature controlled transport, Chain of custody maintained",
    },
  ]

  return (
    <Card className="bg-black border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Clock className="h-5 w-5 text-[#A6FF00]" />
          Product Journey Timeline
        </CardTitle>
        <CardDescription className="text-gray-300">
          Follow your product's complete journey from farm to your table
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-700" />

          <div className="space-y-6">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon
              return (
                <div key={event.id} className="relative flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black border-2 border-[#A6FF00]">
                    <Icon className="h-5 w-5 text-[#A6FF00]" />
                  </div>

                  {/* Event content */}
                  <div className="flex-1 min-w-0 pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{event.title}</h3>
                      <Badge className="bg-[#A6FF00] text-black hover:bg-[#A6FF00]/90 text-xs">{event.status}</Badge>
                    </div>

                    <p className="text-sm text-gray-300 mb-2">{event.description}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 bg-gray-900 p-2 rounded border border-gray-800">
                      {event.details}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
