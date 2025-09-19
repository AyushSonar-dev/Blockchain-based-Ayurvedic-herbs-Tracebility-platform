"use client";

import type React from "react";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Leaf, Loader2 } from "lucide-react";
import axiosInstance from "@/app/utils/axiosInstance";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function AddProcessingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const batchId = searchParams.get("batchId") || "";

  const [step, setStep] = useState<string>("");
  const [temperature, setTemperature] = useState("40C");
  const [duration, setDuration] = useState("6h");
  const [humidity, setHumidity] = useState("30%");
  const [processLoading, setProcessLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchId || !step) {
      alert("Batch ID and Step are required.");
      return;
    }
    const payload = {
      batchId,
      step,
      temperature,
      duration,
      humidity,
    };
    try {
      setProcessLoading(true)
      const res = await axiosInstance.post("/collection/processing-step", {
        batchId,
        step
      });
      console.log(res)
      toast.success("Process added successfully")
    } catch (err: any) {
      console.log(err)
      toast.error(err.response.data.error)
    } finally {
      setProcessLoading(false)
    }
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="step" className="text-white font-medium">
                  Step
                </Label>
                <Select value={step} onValueChange={setStep}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select step" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drying">Drying</SelectItem>
                    <SelectItem value="cooling">Cooling</SelectItem>
                    <SelectItem value="sorting">Sorting</SelectItem>
                    <SelectItem value="packaging">Packaging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Temperature */}
              <div className="space-y-2">
                <Label htmlFor="temperature" className="text-white font-medium">
                  Temperature
                </Label>
                <Input
                  id="temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder="e.g. 40C"
                />
              </div>
              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-white font-medium">
                  Duration
                </Label>
                <Input
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder="e.g. 6h"
                />
              </div>
              {/* Humidity */}
              <div className="space-y-2">
                <Label htmlFor="humidity" className="text-white font-medium">
                  Humidity
                </Label>
                <Input
                  id="humidity"
                  value={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  placeholder="e.g. 30%"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-800 bg-transparent px-8"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#A6FF00] flex justify-center items-center hover:bg-[#8FE600] text-black font-semibold px-8"
              >
                {processLoading ? <Loader2  className="animate-spin"/> :`Save Details`}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
