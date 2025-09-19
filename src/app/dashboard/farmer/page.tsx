"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, ChevronDown, MapPin } from "lucide-react";
import Link from "next/link";
import { BatchAnalytics } from "@/components/analytics-chart";
import axiosInstance from "@/app/utils/axiosInstance";
import useUser from "@/app/store/store";
import { toast } from "sonner";

export default function FarmerDashboard() {
  const router = useRouter();
  const { user, setUser } = useUser()
  const [collections, setCollections] = useState([])
  const [showHarvestForm, setShowHarvestForm] = useState(false)
  const [harvestForm, setHarvestForm] = useState<{
    location: any,
    batchId: any,
    farmId: any,
    quantityKg: any
  }>({
    batchId: "",
    farmId: "",
    quantityKg: "",
    location: [],
  });
  const [harvestLoading, setHarvestLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Helper to get current location as [lat, lng] array
  const getCurrentLocationArray = (): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by your browser.");
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve([latitude, longitude]);
          },
          (error) => {
            reject("Unable to retrieve your location.");
          }
        );
      }
    });
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get(`users/me`);
        const user = res.data.user;
        if (user) {
          setUser(user)
        }
        if (!user) {
          router.push(`/`);
        }
      } catch (err: any) {
        console.log("Error:", err.response?.data || err.message);
      }
    };

    getUser();
  }, [router]);

  useEffect(() => {
    const logout = async () => {
      await axiosInstance.post('/users/logout')
    }
    // logout()
  }, [])
  useEffect(() => {
    const fetchCollections = async () => {
      const res = await axiosInstance.get('/collection/collections')
      setCollections(res.data.collections)
    }
    if(user) {
      fetchCollections()
    }
  }, [user])

  const batches = collections.filter(
    (data: any) =>
      data.resourceType === "HerbBatch" &&
      data.farm.farmerId === user?._id
  );
  console.log(batches)

  // Handler to open the harvest form for a specific batch
  const handleOpenHarvestForm = async (batch: any) => {
    setLocationError(null);
    try {
      const loc = await getCurrentLocationArray();
      setHarvestForm({
        batchId: batch.id,
        farmId: batch.farm.id,
        quantityKg: "",
        location: loc,
      });
    } catch (err: any) {
      setHarvestForm({
        batchId: batch.id,
        farmId: batch.farm.id,
        quantityKg: "",
        location: "",
      });
      setLocationError(typeof err === "string" ? err : "Failed to get location.");
    }
    setShowHarvestForm(true);
  };

  // Handler for form input changes
  const handleHarvestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHarvestForm({
      ...harvestForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handler to submit the harvest form
  const handleHarvestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHarvestLoading(true);
    try {
      // Always try to get the latest location before submitting
      let locationToSend = harvestForm.location;
      try {
        locationToSend = await getCurrentLocationArray();
      } catch (err) {
        // fallback to whatever is in the form (may be empty)
      }
      await axiosInstance.post('/collection/harvest-add', {
        batchId: harvestForm.batchId,
        farmId: harvestForm.farmId,
        quantityKg: harvestForm.quantityKg,
        location: locationToSend,
      });
      setShowHarvestForm(false);
      setHarvestForm({
        batchId: "",
        farmId: "",
        quantityKg: "",
        location: "",
      });
      // Optionally, refresh collections
      const res = await axiosInstance.get('/collection/collections')
      setCollections(res.data.collections)
      toast.success("Batch Harvested Successfully")
    } catch (err: any) {
      // Handle error, show toast, etc.
      // console.error(err);
      toast.error(err.response.data.error)
      console.log(err)
    } finally {
      setHarvestLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Harvest Batches</h1>
        <div className="flex items-center gap-4">
          <Link href={"/dashboard/farmer/Addharvest"}>
            <Button className="bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold rounded-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Harvest
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
              >
                All Status <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-gray-700">
              <DropdownMenuItem className="text-white hover:bg-gray-800">
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-800">
                Collected
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-800">
                Received
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-800">
                In Processing
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-gray-800">
                Processed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Analytics Section */}
      <BatchAnalytics />

      {/* Harvest Form Modal */}
      {showHarvestForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 w-full max-w-md shadow-2xl relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setShowHarvestForm(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Add Harvest Details</h2>
            <form onSubmit={handleHarvestSubmit} className="space-y-4">
              <div>
                <Label htmlFor="batchId" className="text-sm font-medium">Batch ID</Label>
                <Input
                  id="batchId"
                  name="batchId"
                  value={harvestForm.batchId}
                  readOnly
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="farmId" className="text-sm font-medium">Farm ID</Label>
                <Input
                  id="farmId"
                  name="farmId"
                  value={harvestForm.farmId}
                  readOnly
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="quantityKg" className="text-sm font-medium">Quantity (kg)</Label>
                <Input
                  id="quantityKg"
                  name="quantityKg"
                  type="number"
                  value={harvestForm.quantityKg}
                  onChange={handleHarvestInputChange}
                  placeholder="Enter quantity in kg"
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={harvestForm.location}
                  readOnly
                  placeholder="Location will be detected automatically"
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
                {locationError && (
                  <p className="text-red-500 text-xs mt-1">{locationError}</p>
                )}
                {!harvestForm.location && !locationError && (
                  <p className="text-gray-400 text-xs mt-1">Detecting location...</p>
                )}
              </div>
              <div className="flex gap-4 pt-2">
                <Button
                  type="submit"
                  className="flex-1 bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold py-3 rounded-lg justify-center items-center transition-all duration-300 hover:shadow-lg hover:shadow-[#A6FF00]/20"
                  disabled={harvestLoading || !harvestForm.location}
                >
                  {harvestLoading ? "Saving..." : "Save Harvest"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-700 text-white hover:bg-gray-800 bg-transparent py-3 rounded-lg"
                  onClick={() => setShowHarvestForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div>
        {/* Batches Table */}
        <Card className="bg-gray-900/50 border-gray-800 mt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 font-medium">
                    Batch ID
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium">
                    Quantity
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium">
                    Location
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium">
                    Status
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium">
                    Date
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {batches.map((batch: any) => (
                  <tr
                    key={batch.id}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30"
                  >
                    <td className="p-4 font-medium">{batch.id}</td>
                    <td className="p-4">{batch.quantityKg || "N/A"}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        {batch.location ||
                          (batch.farm?.boundary?.[0]
                            ? `${batch.farm.boundary[0][0]}, ${batch.farm.boundary[0][1]}`
                            : "N/A")}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        className={`${batch.statusColor || ""} rounded-full px-3 py-1`}
                      >
                        {batch.status || batch.statusName || "N/A"}
                      </Badge>
                    </td>
                    <td className="p-4 text-gray-300">
                      {batch.createdAt
                        ? new Date(batch.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                        : "N/A"}
                    </td>
                    <td className="p-4 flex gap-2">
                      <Link href={`/consumer/batch/${batch.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                        >
                          View Details
                        </Button>
                      </Link>
                      {(batch.status === "created" || batch.statusName === "created") && (
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-[#A6FF00] text-black hover:bg-[#8FE600] font-semibold"
                          onClick={() => handleOpenHarvestForm(batch)}
                        >
                          Harvest
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-400">Showing {batches.length} batches</p>
          <div className="flex items-center gap-2">
            <Button className="bg-[#A6FF00] text-black hover:bg-[#8FE600] w-10 h-10 rounded-lg">
              1
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-white hover:bg-gray-800 w-10 h-10 rounded-lg bg-transparent"
            >
              2
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-white hover:bg-gray-800 w-10 h-10 rounded-lg bg-transparent"
            >
              3
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
