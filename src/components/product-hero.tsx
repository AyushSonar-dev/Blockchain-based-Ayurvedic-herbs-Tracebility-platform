import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Scan, Leaf } from "lucide-react"

export function ProductHero() {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-balance">Discover Your Product's Journey</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          Scan the QR code on your product packaging to explore its complete journey from farm to your table
        </p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mx-auto">
            <QrCode className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Ready to scan?</h3>
            <p className="text-sm text-muted-foreground">Point your camera at the QR code on your product packaging</p>
          </div>
          <Button size="lg" className="w-full">
            <Scan className="h-5 w-5 mr-2" />
            Start Scanning
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Scan className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">Scan QR Code</h3>
          <p className="text-sm text-muted-foreground">
            Simply scan the QR code on your product packaging with your phone camera
          </p>
        </div>
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">Explore Journey</h3>
          <p className="text-sm text-muted-foreground">
            Discover the farm, farmer, and every step in your product's supply chain
          </p>
        </div>
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <QrCode className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">Verify Quality</h3>
          <p className="text-sm text-muted-foreground">
            View quality test results, certifications, and compliance information
          </p>
        </div>
      </div>
    </div>
  )
}
