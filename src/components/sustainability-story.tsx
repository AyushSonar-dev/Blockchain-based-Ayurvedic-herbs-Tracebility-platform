import { Badge } from "@/components/ui/badge"
import { Leaf, Droplets, Recycle, Users, Heart, TreePine } from "lucide-react"

export function SustainabilityStory() {
  const sustainabilityMetrics = [
    {
      icon: Droplets,
      title: "Water Conservation",
      value: "40%",
      description: "Less water used compared to conventional farming",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
    },
    {
      icon: Leaf,
      title: "Carbon Footprint",
      value: "65%",
      description: "Reduction in CO2 emissions through organic practices",
      color: "text-[#A6FF00]",
      bgColor: "bg-[#A6FF00]/20",
    },
    {
      icon: Recycle,
      title: "Waste Reduction",
      value: "80%",
      description: "Agricultural waste recycled as compost",
      color: "text-[#FF6A00]",
      bgColor: "bg-[#FF6A00]/20",
    },
    {
      icon: TreePine,
      title: "Biodiversity",
      value: "15+",
      description: "Species of beneficial insects supported",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
    },
  ]

  const impactStories = [
    {
      title: "Supporting Local Communities",
      description:
        "This purchase directly supports Rajesh and 12 other farming families in Kerala, providing them with fair wages and sustainable livelihoods.",
      icon: Users,
      impact: "13 families supported",
      badgeColor: "bg-[#A6FF00]/20 text-[#A6FF00] border-[#A6FF00]/30",
    },
    {
      title: "Preserving Traditional Methods",
      description:
        "By choosing this product, you're helping preserve centuries-old organic farming techniques passed down through generations.",
      icon: Heart,
      impact: "Traditional knowledge preserved",
      badgeColor: "bg-[#FF6A00]/20 text-[#FF6A00] border-[#FF6A00]/30",
    },
    {
      title: "Environmental Protection",
      description:
        "Organic farming practices protect local water sources and maintain soil health for future generations.",
      icon: Leaf,
      impact: "5 acres of organic farmland",
      badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
  ]

  return (
    <div className="space-y-6 bg-black text-white">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Leaf className="h-5 w-5 text-[#A6FF00]" />
            Sustainability Impact
          </h2>
          <p className="text-gray-400 mt-1">How your purchase makes a positive difference</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sustainabilityMetrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <div
                  key={index}
                  className="text-center space-y-3 bg-gray-800/50 p-4 rounded-lg border border-gray-700 shadow-md"
                >
                  <div className="flex justify-center">
                    <div className={`p-3 rounded-full ${metric.bgColor} border border-gray-600`}>
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                    <h3 className="font-semibold text-sm mt-1 text-white">{metric.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{metric.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Community & Environmental Impact</h2>
          <p className="text-gray-400 mt-1">Stories of positive change from your purchase</p>
        </div>
        <div className="p-6 space-y-4">
          {impactStories.map((story, index) => {
            const Icon = story.icon
            return (
              <div key={index} className="flex gap-4 p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="p-2 rounded-full bg-gray-700 border border-gray-600">
                    <Icon className="h-5 w-5 text-[#A6FF00]" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{story.title}</h3>
                    <Badge className={`text-xs border ${story.badgeColor}`}>{story.impact}</Badge>
                  </div>
                  <p className="text-sm text-gray-400">{story.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Farmer Welfare Program</h2>
          <p className="text-gray-400 mt-1">How we ensure fair compensation and support</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white">Fair Trade Premium</span>
                  <span className="text-[#A6FF00]">25% above market rate</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#A6FF00] to-[#A6FF00]/80 h-2 rounded-full shadow-lg shadow-[#A6FF00]/20"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white">Healthcare Support</span>
                  <span className="text-[#FF6A00]">100% coverage</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#FF6A00] to-[#FF6A00]/80 h-2 rounded-full shadow-lg shadow-[#FF6A00]/20"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white">Education Fund</span>
                  <span className="text-blue-400">₹50,000 annually</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-400/80 h-2 rounded-full shadow-lg shadow-blue-400/20"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-[#A6FF00]/10 border border-[#A6FF00]/30 rounded-lg shadow-lg shadow-[#A6FF00]/5">
                <h4 className="font-semibold text-[#A6FF00] text-sm">Direct Impact</h4>
                <p className="text-xs text-gray-300 mt-1">₹2,450 from this purchase goes directly to farmer Rajesh</p>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg shadow-lg shadow-blue-500/5">
                <h4 className="font-semibold text-blue-400 text-sm">Community Fund</h4>
                <p className="text-xs text-gray-300 mt-1">
                  ₹150 contributed to local school and healthcare initiatives
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
