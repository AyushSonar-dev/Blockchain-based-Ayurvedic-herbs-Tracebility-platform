"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { QrCode, Camera, Search, Package } from "lucide-react"
import { useRouter } from "next/navigation"

export function QRScanner() {
  const [manualCode, setManualCode] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const router = useRouter()

  const handleScan = (code?: string) => {
    const productCode = code || manualCode || "BATCH-A2847"
    router.push(`/consumer/product/${productCode}`)
  }

  const mockRecentScans = [
    {
      id: "BATCH-A2847",
      product: "Organic Turmeric",
      farm: "Green Valley Organics",
      date: "2024-01-20",
    },
    {
      id: "BATCH-B1923",
      product: "Ashwagandha Root",
      farm: "Himalayan Herbs Co.",
      date: "2024-01-18",
    },
  ]

  return (
    <div className="space-y-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center justify-center">
            <QrCode className="h-5 w-5" />
            QR Code Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isScanning ? (
            <div className="space-y-4">
              <div className="aspect-square max-w-xs mx-auto bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Camera className="h-16 w-16 text-muted-foreground mx-auto" />
                  <div>
                    <p className="font-medium">Camera Scanner</p>
                    <p className="text-sm text-muted-foreground">Tap to activate camera</p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  setIsScanning(true)
                  // Simulate scanning delay
                  setTimeout(() => {
                    setIsScanning(false)
                    handleScan("BATCH-A2847")
                  }, 2000)
                }}
              >
                <Camera className="h-5 w-5 mr-2" />
                Start Camera Scanner
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or enter manually</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Enter batch ID or product code"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleScan()}
                />
                <Button onClick={() => handleScan()}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="aspect-square max-w-xs mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                <div className="animate-pulse">
                  <QrCode className="h-16 w-16 text-primary" />
                </div>
              </div>
              <div>
                <p className="font-medium">Scanning...</p>
                <p className="text-sm text-muted-foreground">Point your camera at the QR code</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {mockRecentScans.length > 0 && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg">Recent Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRecentScans.map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleScan(scan.id)}
                >
                  <div className="flex items-center gap-3">
                    <Package className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">{scan.product}</h4>
                      <p className="text-sm text-muted-foreground">{scan.farm}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      {scan.id}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{scan.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
