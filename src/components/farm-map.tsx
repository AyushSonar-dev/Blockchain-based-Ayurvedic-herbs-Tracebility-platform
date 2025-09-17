"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Thermometer, Droplets } from "lucide-react"

export function FarmMap() {
  return (
    <Card className="bg-black border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <MapPin className="h-5 w-5 text-[#A6FF00]" />
          Farm Location & Environment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Map Placeholder */}
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-800">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50" />
          <div className="text-center space-y-2 relative z-10">
            <MapPin className="h-12 w-12 text-[#A6FF00] mx-auto" />
            <p className="font-medium text-white">Green Valley Organics</p>
            <p className="text-sm text-gray-300">Karnataka, India</p>
            <Badge className="bg-[#A6FF00] text-black hover:bg-[#A6FF00]/90">12.9716° N, 77.5946° E</Badge>
          </div>
          {/* Mock farm boundaries */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-[#A6FF00]/50 rounded-lg" />
          <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-[#A6FF00] rounded-full" />
        </div>

        {/* Environmental Data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
            <Thermometer className="h-8 w-8 text-[#A6FF00] mx-auto mb-2" />
            <p className="font-semibold text-white">24°C</p>
            <p className="text-sm text-gray-300">Avg Temperature</p>
          </div>
          <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
            <Droplets className="h-8 w-8 text-[#A6FF00] mx-auto mb-2" />
            <p className="font-semibold text-white">65%</p>
            <p className="text-sm text-gray-300">Humidity</p>
          </div>
          <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
            <Navigation className="h-8 w-8 text-[#A6FF00] mx-auto mb-2" />
            <p className="font-semibold text-white">2.5 acres</p>
            <p className="text-sm text-gray-300">Farm Size</p>
          </div>
        </div>

        {/* Farm Details */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white">Farm Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Soil Type:</span>
                <span className="text-white">Red Laterite</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Elevation:</span>
                <span className="text-white">920m above sea level</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Water Source:</span>
                <span className="text-white">Rainwater & Borewell</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Organic Since:</span>
                <span className="text-white">2018</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Certification:</span>
                <span className="text-white">NPOP, USDA Organic</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Harvest Season:</span>
                <span className="text-white">January - March</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
