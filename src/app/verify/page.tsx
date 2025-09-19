"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "../utils/axiosInstance";

// --- MapWithBoundary: Styled for dark theme, rounded, shadow, border, glassy overlay ---
const MapWithBoundary = ({ boundary }: { boundary: any }) => {
    const [mounted, setMounted] = useState(false);
    const [L, setL] = useState<any>(null);
    const [components, setComponents] = useState<any>(null);

    useEffect(() => {
        let isMounted = true;
        import("leaflet").then((leaflet) => {
            if (isMounted) setL(leaflet);
        });
        import("react-leaflet").then((mod) => {
            if (isMounted) setComponents(mod);
        });
        setMounted(true);
        return () => {
            isMounted = false;
        };
    }, []);

    if (!mounted || !L || !components || !boundary) return null;

    let geoJson = null;
    let latlngs = null;
    let center = [0, 0];

    try {
        if (typeof boundary === "string") {
            geoJson = JSON.parse(boundary);
        } else if (typeof boundary === "object") {
            geoJson = boundary;
        }
    } catch (e) {
        geoJson = null;
    }

    if (geoJson && geoJson.type === "FeatureCollection" && geoJson.features?.length > 0) {
        const coords = geoJson.features[0].geometry.coordinates[0];
        latlngs = coords.map((c: any) => [c[1], c[0]]);
        const lats = latlngs.map((p: any) => p[0]);
        const lngs = latlngs.map((p: any) => p[1]);
        center = [
            (Math.min(...lats) + Math.max(...lats)) / 2,
            (Math.min(...lngs) + Math.max(...lngs)) / 2,
        ];
    } else if (geoJson && geoJson.type === "Polygon" && geoJson.coordinates?.length > 0) {
        const coords = geoJson.coordinates[0];
        latlngs = coords.map((c: any) => [c[1], c[0]]);
        const lats = latlngs.map((p: any) => p[0]);
        const lngs = latlngs.map((p: any) => p[1]);
        center = [
            (Math.min(...lats) + Math.max(...lats)) / 2,
            (Math.min(...lngs) + Math.max(...lngs)) / 2,
        ];
    } else if (Array.isArray(boundary) && boundary.length > 0) {
        if (typeof boundary[0] === "object" && "lat" in boundary[0] && "lng" in boundary[0]) {
            latlngs = boundary.map((p: any) => [p.lat, p.lng]);
        } else if (Array.isArray(boundary[0]) && boundary[0].length === 2) {
            latlngs = boundary.map((c: any) => [c[1], c[0]]);
        }
        if (latlngs) {
            const lats = latlngs.map((p: any) => p[0]);
            const lngs = latlngs.map((p: any) => p[1]);
            center = [
                (Math.min(...lats) + Math.max(...lats)) / 2,
                (Math.min(...lngs) + Math.max(...lngs)) / 2,
            ];
        }
    }

    if (!latlngs || latlngs.length === 0) return null;

    const { MapContainer, TileLayer, Polygon } = components;

    if (L && L.Icon && L.Icon.Default && typeof window !== "undefined") {
        L.Icon.Default.mergeOptions({
            iconRetinaUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            iconUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            shadowUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });
    }

    return (
        <div
            className="my-6 rounded-2xl overflow-hidden border border-green-700 shadow-xl bg-gradient-to-br from-[#101c10] to-[#1a2b1a] relative"
            style={{ height: 320 }}
        >
            <div className="absolute inset-0 bg-green-400/5 pointer-events-none z-10 rounded-2xl" />
            <MapContainer
                center={center}
                zoom={17}
                style={{ height: "100%", width: "100%", zIndex: 1, borderRadius: "1rem" }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='<span class="text-xs text-green-300">&copy; OpenStreetMap contributors</span>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polygon positions={latlngs} pathOptions={{ color: "#A6FF00", fillOpacity: 0.25, weight: 3 }} />
            </MapContainer>
        </div>
    );
};

// --- JsonViewer: Beautiful dark glassy code block with scroll and highlight ---
function JsonViewer({ data }: { data: any }) {
    return (
        <pre
            className="bg-gradient-to-br from-[#101c10] to-[#1a2b1a] text-green-200 rounded-2xl p-6 overflow-x-auto text-sm shadow-inner border border-green-900"
            style={{ maxHeight: 400, fontFamily: "Fira Mono, Menlo, monospace" }}
        >
            {JSON.stringify(data, null, 2)}
        </pre>
    );
}

// --- FhirHerbBatchDetails: Carded, glassy, beautiful, with accent colors ---
function FhirHerbBatchDetails({ fhir }: { fhir: any }) {
    const [farmBoundary, setFarmBoundary] = useState<any>(null);

    useEffect(() => {
        if (!fhir?.contained) {
            setFarmBoundary(null);
            return;
        }
        const farm = fhir.contained.find((item: any) => item.resourceType === "Farm");
        if (farm && farm.boundary) {
            setFarmBoundary(farm.boundary);
        } else {
            setFarmBoundary(null);
        }
    }, [fhir]);

    if (!fhir) return null;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold mb-3 text-green-300 tracking-tight">Herb Batch Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-green-100">
                    <div>
                        <span className="font-semibold text-green-400">Resource Type:</span> {fhir.resourceType}
                    </div>
                    <div>
                        <span className="font-semibold text-green-400">ID:</span> {fhir.id}
                    </div>
                    <div>
                        <span className="font-semibold text-green-400">Status:</span> {fhir.status}
                    </div>
                    <div>
                        <span className="font-semibold text-green-400">Species:</span> {fhir.species}
                    </div>
                    <div>
                        <span className="font-semibold text-green-400">Processor:</span>{" "}
                        {fhir.processor?.reference ? fhir.processor.reference : <span className="text-gray-400">N/A</span>}
                    </div>
                    <div>
                        <span className="font-semibold text-green-400">Last Updated:</span>{" "}
                        {fhir.meta?.lastUpdated
                            ? <span className="">{new Date(fhir.meta.lastUpdated).toLocaleString()}</span>
                            : <span className="text-gray-400">N/A</span>}
                    </div>
                    <div>
                        <span className="font-semibold text-green-400">Farm:</span>{" "}
                        {fhir.farm?.reference ? fhir.farm.reference : <span className="text-gray-400">N/A</span>}
                    </div>
                </div>
            </div>
            {farmBoundary && (
                <div>
                    <h3 className="text-lg font-semibold mt-4 mb-2 text-green-200">Farm Boundary Map</h3>
                    <MapWithBoundary boundary={farmBoundary} />
                </div>
            )}
            {fhir.contained && (
                <div>
                    <h3 className="text-lg font-semibold mt-4 mb-2 text-green-200">Contained Resources</h3>
                    <div className="space-y-4">
                        {fhir.contained.map((item: any, idx: number) => {
                            if (item.resourceType === "Farm") {
                                return (
                                    <div key={idx} className="border border-green-800 rounded-xl p-4 bg-gradient-to-br from-[#142414] to-[#1a2b1a] shadow">
                                        <div className="font-bold text-green-300 mb-1">Farm</div>
                                        <div>
                                            <span className="font-semibold text-green-400">Name:</span> {item.name}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-green-400">Farmer ID:</span> {item.farmerId}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-green-400">Boundary:</span>{" "}
                                            {item.boundary
                                                ? typeof item.boundary === "object"
                                                    ? <span className="text-green-200">{JSON.stringify(item.boundary)}</span>
                                                    : <span className="text-green-200">{item.boundary}</span>
                                                : <span className="text-gray-400">N/A</span>}
                                        </div>
                                    </div>
                                );
                            }
                            if (item.resourceType === "CollectionEvent") {
                                return (
                                    <div key={idx} className="border border-green-800 rounded-xl p-4 bg-gradient-to-br from-[#142414] to-[#1a2b1a] shadow">
                                        <div className="font-bold text-green-300 mb-1">Collection Event</div>
                                        <div>
                                            <span className="font-semibold text-green-400">ID:</span> {item.id}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-green-400">Batch ID:</span> {item.batchId}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-green-400">Collector ID:</span> {item.collectorId}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-green-400">Position:</span>{" "}
                                            {item.position
                                                ? <span className="text-green-200">Lat: {item.position.latitude}, Lng: {item.position.longitude}</span>
                                                : <span className="text-gray-400">N/A</span>}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-green-400">Timestamp:</span>{" "}
                                            {item.timestamp
                                                ? <span className="">{new Date(item.timestamp).toLocaleString()}</span>
                                                : <span className="text-gray-400">N/A</span>}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-green-400">Species:</span> {item.species}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-green-400">Status:</span> {item.status}
                                        </div>
                                    </div>
                                );
                            }
                            if (item.resourceType === "ProcessingStep") {
                                return (
                                    <div key={idx} className="border border-green-800 rounded-xl p-4 bg-gradient-to-br from-[#142414] to-[#1a2b1a] shadow">
                                        <div className="font-bold text-green-300 mb-1">Processing Step</div>
                                        <div>
                                            <span className="font-semibold text-green-400">ID:</span> {item.id}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-green-400">Batch ID:</span> {item.batchId}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-green-400">Step Type:</span> {item.stepType}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-green-400">Params:</span>{" "}
                                            {item.params
                                                ? typeof item.params === "object"
                                                    ? <span className="text-green-200">{JSON.stringify(item.params)}</span>
                                                    : <span className="text-green-200">{item.params}</span>
                                                : <span className="text-gray-400">N/A</span>}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-green-400">Timestamp:</span>{" "}
                                            {item.timestamp
                                                ? <span className="">{new Date(item.timestamp).toLocaleString()}</span>
                                                : <span className="text-gray-400">N/A</span>}
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <div key={idx} className="border border-green-800 rounded-xl p-4 bg-gradient-to-br from-[#142414] to-[#1a2b1a] shadow">
                                    <span className="font-bold text-green-300">{item.resourceType}:</span> <span className="text-green-200">{JSON.stringify(item)}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

// --- Main Page: Beautiful, glassy, green-accented, modern, consistent with dark theme ---
export default function VerifyPage() {
    const searchParams = useSearchParams();
    const pkg = searchParams.get("pkg");
    const tx = searchParams.get("tx");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [verifyData, setVerifyData] = useState<any>(null);

    useEffect(() => {
        if (!pkg || !tx) {
            setError("Missing package or transaction ID in URL.");
            return;
        }
        setLoading(true);
        setError(null);

        axiosInstance
            .get(`/package/verify?pkg=${encodeURIComponent(pkg)}&tx=${encodeURIComponent(tx)}`)
            .then((res) => {
                setVerifyData(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                setError(
                    err?.response?.data?.error ||
                    err.message ||
                    "Failed to fetch verification details."
                );
            })
            .finally(() => setLoading(false));
    }, [pkg, tx]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (!document.getElementById("leaflet-css")) {
                const link = document.createElement("link");
                link.id = "leaflet-css";
                link.rel = "stylesheet";
                link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                document.head.appendChild(link);
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0a1a0a] to-[#101c10] text-white py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center mb-10">
                    <h1 className="text-4xl font-extrabold text-green-400 tracking-tight mb-2 drop-shadow-lg">Package Verification</h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-green-700 rounded-full mb-2" />
                    <p className="text-green-200 text-lg font-medium opacity-80">Check authenticity and traceability of your herbal package</p>
                </div>
                {loading && (
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-400 border-opacity-60 mr-4"></div>
                        <span className="text-green-300 text-lg">Loading verification details...</span>
                    </div>
                )}
                {error && (
                    <div className="text-center text-red-400 mb-6 bg-red-900/30 border border-red-700 rounded-xl py-4 px-6 font-semibold shadow">
                        {error}
                    </div>
                )}
                {!loading && !error && verifyData && (
                    <div className="space-y-10">
                        <div className="bg-gradient-to-br from-[#101c10] to-[#1a2b1a] rounded-2xl shadow-xl p-8 border border-green-900">
                            <h2 className="text-2xl font-bold mb-5 text-green-300 tracking-tight">Package Info</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-green-100">
                                <div>
                                    <span className="font-semibold text-green-400">Package ID:</span> {verifyData.package?.id || <span className="text-gray-400">N/A</span>}
                                </div>
                                <div>
                                    <span className="font-semibold text-green-400">Batch ID:</span> {verifyData.package?.batchId || <span className="text-gray-400">N/A</span>}
                                </div>
                                <div>
                                    <span className="font-semibold text-green-400">Lot No:</span> {verifyData.package?.lotNo || <span className="text-gray-400">N/A</span>}
                                </div>
                                <div>
                                    <span className="font-semibold text-green-400">Expiry:</span> {verifyData.package?.expiry || <span className="text-gray-400">N/A</span>}
                                </div>
                                <div>
                                    <span className="font-semibold text-green-400">Tx ID:</span>{" "}
                                    {(tx || verifyData.package?.txId)
                                        ? <span className="">{(tx || verifyData.package?.txId).slice(0, 10) + "..."}</span>
                                        : <span className="text-gray-400">N/A</span>}
                                </div>
                                <div>
                                    <span className="font-semibold text-green-400">Payload Hash:</span> {verifyData.package?.payloadHash || <span className="text-gray-400">N/A</span>}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#101c10] to-[#1a2b1a] rounded-2xl shadow-xl p-8 border border-green-900">
                            <FhirHerbBatchDetails fhir={verifyData.fhir} />
                        </div>

                        <div className="bg-gradient-to-br from-[#101c10] to-[#1a2b1a] rounded-2xl shadow-xl p-8 border border-green-900">
                            <h2 className="text-xl font-bold mb-3 text-green-300">FHIR Raw JSON</h2>
                            <JsonViewer data={verifyData.fhir} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}