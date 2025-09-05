"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Leaf, Home, HelpCircle } from "lucide-react"
import Link from "next/link";
import { useEffect, useState } from "react";

function AddHarvestPage() {
    const [role, setRole] = useState<string | null>(null);
  
    useEffect(() => {
      // Run only on client
      const storedRole = localStorage.getItem("role");
      setRole(storedRole);
    }, []);
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#A6FF00] rounded-full flex items-center justify-center text-black font-bold">
                JS
              </div>
              <div>
                <h2 className="text-xl font-bold">Welcome, John Smith</h2>
                <p className="text-sm text-gray-400">Manage your harvest batches and track progress</p>
                <p className="text-xs text-gray-500">Profile</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
 
              <Link href={'/dashboard/farmer'}>
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  📊 My Batches
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <Card className="w-full max-w-2xl bg-gray-900/50 border-gray-800 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Plus className="w-8 h-8 text-gray-400" />
              <Leaf className="w-8 h-8 text-[#A6FF00]" />
            </div>
            <CardTitle className="text-3xl font-bold">Add New Harvest Batch</CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              Record a new harvest batch to track through the processing pipeline
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="batchId" className="text-sm font-medium">
                    Batch ID
                  </Label>
                  <Input
                    id="batchId"
                    type="text"
                    placeholder="Enter batch ID"
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-medium">
                    Quantity (kg)
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter field location"
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="harvestDate" className="text-sm font-medium">
                  Harvest Date
                </Label>
                <Input
                  id="harvestDate"
                  type="date"
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional notes about this harvest batch..."
                  rows={4}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300 resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#A6FF00]/20"
                >
                  Create Batch
                </Button>
                <Link href="/farmer" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-700 text-white hover:bg-gray-800 bg-transparent py-3 rounded-lg transition-all duration-300"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default AddHarvestPage;