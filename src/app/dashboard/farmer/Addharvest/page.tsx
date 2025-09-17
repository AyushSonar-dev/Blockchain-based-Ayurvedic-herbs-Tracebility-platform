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


              </div>

              <div className="space-y-2">
                <Label htmlFor="species" className="text-sm font-medium">
                  Species
                </Label>
                <Input
                  id="species"
                  type="text"
                  placeholder="Enter species (e.g., Turmeric)"
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmId" className="text-sm font-medium">
                  FarmID
                </Label>
                <Input
                  id="farmId"
                  type="text"
                  required
                  placeholder="Enter farm ID"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
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