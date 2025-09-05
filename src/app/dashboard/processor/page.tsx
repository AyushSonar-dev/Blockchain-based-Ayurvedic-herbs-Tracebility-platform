import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Plus,
  HelpCircle,
  ChevronDown,
  MapPin,
  User,
} from "lucide-react";
import Link from "next/link";
import { ProcessingAnalytics } from "@/components/analytics-chart";

const processingBatches = [
  {
    id: "B001",
    sourceLocation: "Field A-12",
    farmerName: "John Smith",
    status: "Received",
    date: "2024-01-15",
    statusColor: "bg-orange-500 text-white",
  },
  {
    id: "B002",
    sourceLocation: "Field B-08",
    farmerName: "Sarah Johnson",
    status: "In Processing",
    date: "2024-01-14",
    statusColor: "bg-yellow-500 text-black",
  },
  {
    id: "B003",
    sourceLocation: "Field C-05",
    farmerName: "Mike Wilson",
    status: "Processed",
    date: "2024-01-13",
    statusColor: "bg-blue-500 text-white",
  },
  {
    id: "B004",
    sourceLocation: "Field A-07",
    farmerName: "John Smith",
    status: "Received",
    date: "2024-01-12",
    statusColor: "bg-orange-500 text-white",
  },
  {
    id: "B005",
    sourceLocation: "Field D-03",
    farmerName: "Emma Davis",
    status: "In Processing",
    date: "2024-01-11",
    statusColor: "bg-yellow-500 text-black",
  },
  {
    id: "B006",
    sourceLocation: "Field B-15",
    farmerName: "Tom Brown",
    status: "Processed",
    date: "2024-01-10",
    statusColor: "bg-blue-500 text-white",
  },
  {
    id: "B007",
    sourceLocation: "Field C-12",
    farmerName: "Lisa Garcia",
    status: "Received",
    date: "2024-01-09",
    statusColor: "bg-orange-500 text-white",
  },
  {
    id: "B008",
    sourceLocation: "Field A-03",
    farmerName: "John Smith",
    status: "In Processing",
    date: "2024-01-08",
    statusColor: "bg-yellow-500 text-black",
  },
];

export default function ProcessorDashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#A6FF00] rounded-full flex items-center justify-center text-black font-bold">
                  AP
                </div>
                <div>
                  <h2 className="text-xl font-bold">Welcome, Alex Processor</h2>
                  <p className="text-sm text-gray-400">
                    Manage processing batches and track status
                  </p>
                  <p className="text-xs text-gray-500">Profile</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>

              <Button className="bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold">
                🏭 Processing Batches
              </Button>
              <Link href={"/help"}>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Processing Batches</h1>
          <div className="flex items-center gap-4">
            <Button className="bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold rounded-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Batch
            </Button>
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

        {/* Processing Batches Table */}
        <Card className="bg-gray-900/50 border-gray-800 mt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-gray-400 font-medium">
                    Batch ID
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium">
                    Source Location
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium">
                    Farmer Name
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
                {processingBatches.map((batch) => (
                  <tr
                    key={batch.id}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30"
                  >
                    <td className="p-4 font-medium">{batch.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        {batch.sourceLocation}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        {batch.farmerName}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        className={`${batch.statusColor} rounded-full px-3 py-1`}
                      >
                        {batch.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-gray-300">{batch.date}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {batch.status === "Received" && (
                          <Button
                            size="sm"
                            className="bg-yellow-500 hover:bg-yellow-600 text-black"
                          >
                            Mark Processing
                          </Button>
                        )}
                        {batch.status === "In Processing" && (
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            Mark Processed
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
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

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-400">Showing 8 batches</p>
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
