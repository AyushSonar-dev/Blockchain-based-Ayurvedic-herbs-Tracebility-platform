"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Leaf, Home, HelpCircle, Loader2 } from "lucide-react"
import Link from "next/link";
import { useEffect, useState } from "react";
import useUser from "@/app/store/store"
import axiosInstance from "@/app/utils/axiosInstance"
import { toast } from "sonner"

function AddHarvestPage() {
  const [role, setRole] = useState<string | null>(null);
  const { user } = useUser()
  const [farmId, setFarmId] = useState("")
  const [batchId, setBatchId] = useState("")
  const [species, setSpecies] = useState("")
  const [createBatchLoading, setCreateBatchLoading] = useState(false);

  useEffect(() => {
    // Run only on client
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    const fetchFarmId = async () => {
      if (user) {
        const res = await axiosInstance.get(`/collection/farm/${user._id}`)

        if (res.data.farm) {
          setFarmId(res.data.farm.id)
        }
      }
    }
    fetchFarmId()
  }, [user]);


  const createCollection = async () => {

    try {
      setCreateBatchLoading(true)
      const res = await axiosInstance.post('/collection/add', {
        batchId,
        species,
        farmId
      })

      console.log(res)

      toast.success("Batch created successfully")
      setBatchId("")
      setSpecies("")
    } catch (error: any) {
      console.log(error)
      toast.error(error.message || "Error creating batch")
    } finally {
      setCreateBatchLoading(false)
    }
  }
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
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="batchId" className="text-sm font-medium">
                    Batch ID
                  </Label>
                  <Input
                    id="batchId"
                    type="text"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
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
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  placeholder="Enter species (e.g., Turmeric)"
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
                />
              </div>





              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => createCollection()}
                  className="flex-1 bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold py-3 rounded-lg justify-center items-center transition-all duration-300 hover:shadow-lg hover:shadow-[#A6FF00]/20"
                >
                  {createBatchLoading ? <Loader2 className="animate-spin" /> : 'Create Batch'}
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