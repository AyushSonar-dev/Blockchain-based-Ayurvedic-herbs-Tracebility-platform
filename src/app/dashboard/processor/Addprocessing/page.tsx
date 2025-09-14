"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, Upload, Plus, Leaf } from "lucide-react"
import Link from "next/link"

export default function AddProcessingPage() {
  const [formData, setFormData] = useState({
    batchId: "",
    farmerName: "",
    quantity: "",
    processingStatus: "",
    qualityResults: "",
    labResults: "",
    processingNotes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Processing details submitted:", formData)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-black text-white">
 

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <Leaf className="w-8 h-8 text-[#A6FF00]" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Add Processing Details</h1>
          <p className="text-gray-400">Record a new harvest batch to track through the processing pipeline</p>
        </div>

        <Card className="bg-gray-900/50 border-gray-800 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Row - Batch ID, Farmer Name, Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="batchId" className="text-white font-medium">
                  Batch ID
                </Label>
                <Input
                  id="batchId"
                  value={formData.batchId}
                  onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmerName" className="text-white font-medium">
                  Farmer Name
                </Label>
                <Input
                  id="farmerName"
                  value={formData.farmerName}
                  onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-white font-medium">
                  Quantity (kg)
                </Label>
                <Input
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder=""
                />
              </div>
            </div>

            {/* Processing Status */}
            <div className="space-y-2">
              <Label htmlFor="processingStatus" className="text-white font-medium">
                Processing Status
              </Label>
              <Select
                value={formData.processingStatus}
                onValueChange={(value) => setFormData({ ...formData, processingStatus: value })}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Collected" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="collected" className="text-white hover:bg-gray-700">
                    Collected
                  </SelectItem>
                  <SelectItem value="received" className="text-white hover:bg-gray-700">
                    Received
                  </SelectItem>
                  <SelectItem value="processing" className="text-white hover:bg-gray-700">
                    In Processing
                  </SelectItem>
                  <SelectItem value="completed" className="text-white hover:bg-gray-700">
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quality Check Results */}
            <div className="space-y-2">
              <Label htmlFor="qualityResults" className="text-white font-medium">
                Quality Check Results
              </Label>
              <Textarea
                id="qualityResults"
                value={formData.qualityResults}
                onChange={(e) => setFormData({ ...formData, qualityResults: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
                placeholder="Enter quality assessment results..."
              />
            </div>

            {/* Lab Results */}
            <div className="space-y-2">
              <Label htmlFor="labResults" className="text-white font-medium">
                Lab Results
              </Label>
              <Textarea
                id="labResults"
                value={formData.labResults}
                onChange={(e) => setFormData({ ...formData, labResults: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
                placeholder="Enter laboratory test results..."
              />
            </div>

            {/* Processing Notes */}
            <div className="space-y-2">
              <Label htmlFor="processingNotes" className="text-white font-medium">
                Processing Notes
              </Label>
              <Textarea
                id="processingNotes"
                value={formData.processingNotes}
                onChange={(e) => setFormData({ ...formData, processingNotes: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[120px]"
                placeholder=""
              />
            </div>

            {/* Upload Documents */}
            <div className="space-y-2">
              <Label className="text-white font-medium">Upload Documents (Optional)</Label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center bg-gray-800/30">
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">
                  Drag & drop files here or <span className="text-[#A6FF00] cursor-pointer">browse</span>
                </p>
                <p className="text-sm text-gray-500">PDF, DOC, JPG up to 10MB</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-800 bg-transparent px-8"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold px-8">
                Save Details
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
