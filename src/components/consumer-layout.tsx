"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Leaf, ArrowLeft, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface ConsumerLayoutProps {
  children: React.ReactNode
  showBackButton?: boolean
}

export function ConsumerLayout({ children, showBackButton = false }: ConsumerLayoutProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.back()}
                  className="text-white hover:bg-gray-800"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-[#A6FF00]" />
                <div>
                  <h1 className="font-bold text-lg text-white">AgriTrace</h1>
                  <p className="text-xs text-gray-400">Product Transparency</p>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-800 bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 bg-black">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/30 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Leaf className="h-5 w-5 text-[#A6FF00]" />
              <span className="font-semibold text-white">AgriTrace</span>
            </div>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Bringing transparency to your food supply chain. Scan any QR code on our products to discover the complete
              journey from farm to table.
            </p>
            <div className="flex justify-center gap-4 text-xs text-gray-500">
              <span>© 2024 AgriTrace</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
