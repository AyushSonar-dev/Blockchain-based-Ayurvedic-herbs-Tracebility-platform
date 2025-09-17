"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home, Upload, Plus, Leaf } from "lucide-react";
import Link from "next/link";

export default function AddProcessingPage() {
  const [formData, setFormData] = useState({
    batchId: "",
    packageId: "",
    lotNo: "",
    expiry: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Processing details submitted:", formData);
    // Handle form submission
  };

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
          <p className="text-gray-400">
            Record a new harvest batch to track through the processing pipeline
          </p>
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
                  onChange={(e) =>
                    setFormData({ ...formData, batchId: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder=""
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="packageId" className="text-white font-medium">
                  Package ID
                </Label>
                <Input
                  id="packageId"
                  value={formData.packageId}
                  onChange={(e) =>
                    setFormData({ ...formData, packageId: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lotNo" className="text-white font-medium">
                  Lot No
                </Label>
                <Input
                  id="lotNo"
                  value={formData.lotNo}
                  onChange={(e) =>
                    setFormData({ ...formData, lotNo: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry" className="text-white font-medium">
                  Expiry Date
                </Label>
                <Input
                  type="date"
                  id="expiry"
                  value={formData.expiry}
                  onChange={(e) =>
                    setFormData({ ...formData, expiry: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder=""
                />
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
              <Button
                type="submit"
                className="bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold px-8"
              >
                Save Details
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
