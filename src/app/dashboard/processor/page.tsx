"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Plus,
  HelpCircle,
  ChevronDown,
  MapPin,
  User,
  Link,
  X,
} from "lucide-react";
import { ProcessingAnalytics } from "@/components/analytics-chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import useUser from "@/app/store/store";
import { toast } from "sonner";

// Accept Batch Modal Component
function AcceptBatchModal({
  open,
  onClose,
  batch,
  userLocation,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  batch: any;
  userLocation: string;
  onSubmit: (data: { batchId: string; location: string; species: string; moisture: string; coordinates?: [number, number] }) => void;
}) {
  const [species, setSpecies] = useState("");
  const [moisture, setMoisture] = useState("");
  const [isAccepting, setIsAccepting] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  // Reset form when batch changes or modal closes
  useEffect(() => {
    if (open) {
      setSpecies("");
      setMoisture("");
      setGeoError(null);
    }
  }, [open, batch]);
  if (!open || !batch) return null;

  const acceptBatch = async () => {
    setIsAccepting(true);
    setGeoError(null);
    // Try to get geolocation
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coordinates: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          try {
            const body = {
              batchId: batch.id,
              location: coordinates,
              species,
              moisture,
            };
            const res = await axiosInstance.post('/collection/accept-batch', body);
            toast.success("Batch Accepted Successfully");
            setIsAccepting(false);
            onClose();
            // Call onSubmit to trigger parent update
            onSubmit({
              batchId: batch.id,
              location: userLocation,
              species,
              moisture,
              coordinates,
            });
          } catch (error: any) {
            toast.error(error?.data?.response?.error || "Failed to accept batch");
            setIsAccepting(false);
          }
        },
        (error) => {
          setGeoError("Failed to get current location. Please allow location access and try again.");
          toast.error("Failed to get current location. Please allow location access and try again.");
          setIsAccepting(false);
        }
      );
    } else {
      setGeoError("Geolocation is not supported by your browser.");
      toast.error("Geolocation is not supported by your browser.");
      setIsAccepting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-4">Accept Batch</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            acceptBatch();
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Batch ID</label>
            <input
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700"
              value={batch.id}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Location</label>
            <input
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700"
              value={userLocation}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Species</label>
            <input
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700"
              value={species}
              onChange={e => setSpecies(e.target.value)}
              required
              placeholder="Enter species"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-1">Moisture</label>
            <input
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700"
              value={moisture}
              onChange={e => setMoisture(e.target.value)}
              required
              placeholder="Enter moisture"
            />
          </div>
          {geoError && (
            <div className="mb-4 text-red-400 text-sm">{geoError}</div>
          )}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isAccepting}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#A6FF00] text-black hover:bg-[#8FE600]"
              disabled={isAccepting}
            >
              {isAccepting ? "Accepting..." : "Accept Batch"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Create Package Modal Component
function CreatePackageModal({
  open,
  onClose,
  batch,
  onPackageCreated,
}: {
  open: boolean;
  onClose: () => void;
  batch: any;
  onPackageCreated: () => void;
}) {
  const [packageId, setPackageId] = useState("");
  const [lotNo, setLotNo] = useState("");
  const [expiry, setExpiry] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setPackageId("");
      setLotNo("");
      setExpiry("");
      setQrData(null);
      setResult(null);
      setError(null);
    }
  }, [open, batch]);

  if (!open || !batch) return null;

  const handleCreatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setError(null);
    setQrData(null);
    setResult(null);
    try {
      const body = {
        packageId,
        batchId: batch.id,
        lotNo,
        expiry,
      };
      const res = await axiosInstance.post("/package/create", body);
      if (res.status === 201 && res.data) {
        setResult(res.data);
        setQrData(res.data.qrData);
        toast.success("Package created successfully!");
        // Notify parent to refresh batches
        onPackageCreated();
      } else {
        setError("Failed to create package.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to create package.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-4">Create Package</h2>
        {result ? (
          <div>
            <div className="mb-4">
              <div className="text-green-400 font-semibold mb-2">Package Created!</div>
              <div className="text-gray-300 text-sm mb-2 break-words">
                <div className="flex flex-col gap-1">
                  <div>
                    <b>Package ID:</b>{" "}
                    <span className="break-all">{result.packageId}</span>
                  </div>
                  <div>
                    <b>Batch ID:</b>{" "}
                    <span className="break-all">{result.batchId}</span>
                  </div>
                  <div>
                    <b>Lot No:</b>{" "}
                    <span className="break-all">{result.lotNo}</span>
                  </div>
                  <div>
                    <b>Expiry:</b>{" "}
                    <span className="break-all">{result.expiry}</span>
                  </div>
                  <div>
                    <b>Tx ID:</b>{" "}
                    <span className="break-all">{result.txId}</span>
                  </div>
                  <div>
                    <b>Payload Hash:</b>{" "}
                    <span className="break-all">{result.payloadHash}</span>
                  </div>
                  <div>
                    <b>Verify URL:</b>{" "}
                    <a
                      href={result.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline break-all"
                      style={{ wordBreak: "break-all" }}
                    >
                      {result.verifyUrl}
                    </a>
                  </div>
                </div>
              </div>
              {qrData && (
                <div className="flex flex-col items-center">
                  <div className="mb-2 text-gray-300">Scan QR to verify:</div>
                  <img src={qrData} alt="Package QR" className="w-40 h-40 bg-white rounded p-2" />
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <Button onClick={onClose} className="bg-[#A6FF00] text-black hover:bg-[#8FE600]">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCreatePackage}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Batch ID</label>
              <input
                className="w-full px-3 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700"
                value={batch.id}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Package ID</label>
              <input
                className="w-full px-3 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700"
                value={packageId}
                onChange={e => setPackageId(e.target.value)}
                required
                placeholder="Enter package ID"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Lot No</label>
              <input
                className="w-full px-3 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700"
                value={lotNo}
                onChange={e => setLotNo(e.target.value)}
                required
                placeholder="Enter lot number"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-1">Expiry</label>
              <input
                type="date"
                className="w-full px-3 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700"
                value={expiry}
                onChange={e => setExpiry(e.target.value)}
                required
                placeholder="Enter expiry date"
              />
            </div>
            {error && (
              <div className="mb-4 text-red-400 text-sm">{error}</div>
            )}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={isCreating}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#A6FF00] text-black hover:bg-[#8FE600]"
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create Package"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ProcessorDashboard() {
  const router = useRouter();
  const { user } = useUser();
  const [collections, setCollections] = useState<any[]>([]);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);

  // For Create Package Modal
  const [createPackageModalOpen, setCreatePackageModalOpen] = useState(false);
  const [selectedPackageBatch, setSelectedPackageBatch] = useState<any>(null);

  // You may want to get the processor's current location from user or another source
  // For now, fallback to user.location or "Processing Facility"
  const userLocation =
    (user && (user.location || user.address || user.facilityName)) || "Processing Facility";

  // Refetch batches function
  const fetchCollections = useCallback(async () => {
    const res = await axiosInstance.get("/collection/collections");
    setCollections(res.data.collections);
  }, []);

  useEffect(() => {
    if(user) {
      fetchCollections();
    }
  }, [user, fetchCollections]);

  const batches = collections.filter((data: any) => data.resourceType === "HerbBatch");

  // Accept batch handler
  const handleAcceptBatch = async (formData: {
    batchId: string;
    location: string;
    species: string;
    moisture: string;
    coordinates?: [number, number];
  }) => {
    setAcceptModalOpen(false);
    setSelectedBatch(null);
    // Refetch batches after accepting
    await fetchCollections();
  };

  // Create package modal close handler
  const handleCloseCreatePackage = () => {
    setCreatePackageModalOpen(false);
    setSelectedPackageBatch(null);
  };

  // Handler to refresh batches after package creation
  const handlePackageCreated = async () => {
    await fetchCollections();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Processing Batches</h1>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/processor/Addprocessing">
            <Button className="bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold rounded-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Batch
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

      {/* Processing Analytics Section */}
      <ProcessingAnalytics />
      <div>
        {/* Processing Batches Table */}
        <Card className="bg-gray-900/50 border-gray-800 mt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 font-medium">Batch ID</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Source Location</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Farmer Name</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((batch: any) => (
                  <tr
                    key={batch.id}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30"
                  >
                    <td className="p-4 font-medium">{batch.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        {batch.farm?.boundary?.[0] ||
                          batch.location ||
                          "Unknown Location"}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        {batch.farm?.name || batch.farmerName || "Unknown Farmer"}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        className={`${batch.status === "harvested"
                          ? "bg-orange-500 text-white"
                          : batch.status === "processing"
                            ? "bg-yellow-500 text-black"
                            : batch.status === "processed"
                              ? "bg-green-500 text-white"
                              : "bg-gray-500 text-white"
                          } rounded-full px-3 py-1`}
                      >
                        {batch.status
                          ? batch.status.charAt(0).toUpperCase() + batch.status.slice(1)
                          : "Unknown"}
                      </Badge>
                    </td>
                    <td className="p-4 text-gray-300">
                      {batch.harvestedAt
                        ? new Date(Number(batch.harvestedAt)).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {/* Accept Batch button for harvested */}
                        {batch.status === "harvested" && (
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => {
                              setSelectedBatch(batch);
                              setAcceptModalOpen(true);
                            }}
                          >
                            Accept Batch
                          </Button>
                        )}
                        {/* Add Processing button for collected and farmer is user._id */}
                        {batch.status === "collected" &&
                          ((batch.processor && user?._id && batch.processor === user._id) ||
                            (batch.processor && user?._id && batch.processor === user._id)) && (
                            <Button
                              size="sm"
                              className="bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold"
                              onClick={() => router.push(`/dashboard/processor/Addprocessing?batchId=${batch.id}`)}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add Processing
                            </Button>
                          )}
                        {/* Mark Processed button for processing */}
                        {batch.status === "processing" && (
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            disabled
                          >
                            Mark Processed
                          </Button>
                        )}
                        {/* Create Package button for processed, only for processor in batch.processor with user._id */}
                        {batch.status === "processed" &&
                          batch.processor &&
                          user?._id &&
                          batch.processor === user._id && (
                            <Button
                              size="sm"
                              className="bg-purple-500 hover:bg-purple-600 text-white"
                              onClick={() => {
                                setSelectedPackageBatch(batch);
                                setCreatePackageModalOpen(true);
                              }}
                            >
                              Create Package
                            </Button>
                          )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                          onClick={() => router.push(`/consumer/batch/${batch.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Accept Batch Modal */}
      <AcceptBatchModal
        open={acceptModalOpen}
        onClose={() => {
          setAcceptModalOpen(false);
          setSelectedBatch(null);
        }}
        batch={selectedBatch}
        userLocation={userLocation}
        onSubmit={handleAcceptBatch}
      />

      {/* Create Package Modal */}
      <CreatePackageModal
        open={createPackageModalOpen}
        onClose={handleCloseCreatePackage}
        batch={selectedPackageBatch}
        onPackageCreated={handlePackageCreated}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-400">
          Showing {batches.length} batches
        </p>
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
  );
}