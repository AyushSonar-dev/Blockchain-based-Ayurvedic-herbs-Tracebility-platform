"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Save, Trash2, Home, Plus, HelpCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { toast } from "sonner";
import axiosInstance from "@/app/utils/axiosInstance";
import { useRouter } from "next/navigation";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Polygon = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polygon),
  { ssr: false }
);
const useMapEvents: typeof import("react-leaflet").useMapEvents = (
  callback
) => {
  const { useMapEvents } = require("react-leaflet");
  return useMapEvents(callback);
};

interface LatLng {
  lat: number;
  lng: number;
}
function FlyToCurrentLocation({ location }: { location: LatLng | null }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 15, { animate: true, duration: 1.5 });
    }
  }, [location, map]);

  return null;
}

function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (latlng: LatLng) => void;
}) {
  useMapEvents({
    click: (e: { latlng: LatLng }) => {
      onMapClick(e.latlng);
    },
  });
  return null;
}

export default function FarmerMapPage() {
  const [fieldPoints, setFieldPoints] = useState<LatLng[]>([]);
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [createFarmLoading, setCreateFarmLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setIsClient(true);

    // Fix for default markers in Next.js - do this after component mounts
    const fixLeafletIcons = async () => {
      const L = await import("leaflet");
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });
    };

    fixLeafletIcons();

    // Get user's current location and set map accordingly
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(userLocation);
        },
        (error) => {
          console.log("Geolocation error:", error);
          // Keep default location if geolocation fails
        }
      );
    }
  }, []);

  const handleMapClick = useCallback((latlng: LatLng) => {
    setFieldPoints((prev) => [...prev, latlng]);
  }, []);

  const handleSaveField = async () => {
    if (fieldPoints.length < 3) {
      // Not enough points to form a boundary
      toast.error("Not Enough Points")
      return;
    }

    // Format the boundary as an array of [lat, lng] pairs
    const boundary = fieldPoints.map((point) => [point.lat, point.lng]);

    // Optionally, close the polygon if not already closed
    if (
      boundary.length > 2 &&
      (boundary[0][0] !== boundary[boundary.length - 1][0] ||
        boundary[0][1] !== boundary[boundary.length - 1][1])
    ) {
      boundary.push([boundary[0][0], boundary[0][1]]);
    }

    const payload = {
      boundaryJson: {
        boundary: boundary,
      },
    };

    try {
      setCreateFarmLoading(true)
      const res = await axiosInstance.post(
        "/collection/create-farm",
        payload
      );
      console.log("Farm saved successfully:", res.data);
      // Optionally, show a success message or redirect
      if (res.data) {
        toast.success(res.data.message)
        router.push('/dashboard/farmer/Addharvest')
      }
      setCreateFarmLoading(false)
    } catch (error: any) {
      setCreateFarmLoading(false)
      console.error("Error saving farm:", error.response?.data || error.message);
      toast.error(error.message || "Error Adding Farm")
      // Optionally, show an error message
    } finally {
      setCreateFarmLoading(false)
    }
  };

  const handleClearPoints = () => {
    setFieldPoints([]);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A6FF00] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading map...</p>
        </div>
      </div>
    );
  }

  // Use currentLocation if available, otherwise fallback to NYC
  // Ensure mapCenter is always a LatLngTuple ([number, number])
  const mapCenter: [number, number] = currentLocation
    ? [currentLocation.lat, currentLocation.lng]
    : [40.7128, -74.006];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Map Container */}
      <div className="relative h-[calc(100vh-80px)]">
        <MapContainer
          center={mapCenter}
          zoom={15}
          className="h-full w-full"
          style={{ background: "#1a1a1a" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {currentLocation && <FlyToCurrentLocation location={currentLocation} />}
          {/* Map click handler */}
          <MapClickHandler onMapClick={handleMapClick} />

          {/* Render markers for each field point */}
          {fieldPoints.map((point, index) => (
            <Marker key={index} position={[point.lat, point.lng]} />
          ))}

          {/* Render user's current location as a distinct marker (not part of polygon) */}
          {currentLocation && (
            <Marker
              position={[currentLocation.lat, currentLocation.lng]}
              icon={
                typeof window !== "undefined"
                  ? new (require("leaflet").Icon)({
                    iconUrl:
                      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowUrl:
                      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                    shadowSize: [41, 41],
                  })
                  : undefined
              }
            />
          )}

          {/* Render polygon if we have at least 3 points */}
          {fieldPoints.length >= 3 && (
            <Polygon
              positions={fieldPoints.map((point) => [point.lat, point.lng])}
              pathOptions={{
                color: "#A6FF00",
                fillColor: "#A6FF00",
                fillOpacity: 0.2,
                weight: 3,
              }}
            />
          )}
        </MapContainer>

        {/* Coordinates Card - Fixed at bottom */}
        <Card className="absolute bottom-4 left-4 right-4 bg-gray-900/95 border-gray-800 backdrop-blur-sm z-[1000] max-w-2xl mx-auto">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#A6FF00]" />
              Field Boundary Points ({fieldPoints.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Instructions */}
            <p className="text-sm text-gray-400">
              Click on the map to add points that define your field boundary. At
              least 3 points are needed to create a field.
            </p>

            {/* Show user's current location */}
            {currentLocation && (
              <div className="flex items-center gap-2 text-xs text-blue-400 mb-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                Your current location: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
              </div>
            )}

            {/* Coordinates List */}
            {fieldPoints.length > 0 && (
              <div className="max-h-32 overflow-y-auto space-y-1">
                {fieldPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-800/50 rounded px-3 py-2 text-sm"
                  >
                    <span className="text-gray-300">
                      Point {index + 1}: {point.lat.toFixed(6)},{" "}
                      {point.lng.toFixed(6)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                onClick={handleSaveField}
                disabled={fieldPoints.length < 3}
                className="bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {createFarmLoading ? <Loader2 className="animate-spin" /> : `Save Farm (${fieldPoints.length} points)`}

              </Button>

              <Button
                onClick={handleClearPoints}
                disabled={fieldPoints.length === 0}
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-800 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Points
              </Button>
            </div>

            {fieldPoints.length > 0 && fieldPoints.length < 3 && (
              <p className="text-xs text-yellow-500">
                Add {3 - fieldPoints.length} more point
                {3 - fieldPoints.length !== 1 ? "s" : ""} to create a field
                boundary
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
