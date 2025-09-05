import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Plus, HelpCircle, ChevronDown, MapPin } from "lucide-react";
import Link from "next/link";
import { BatchAnalytics } from "@/components/analytics-chart";

const batches = [
  {
    id: "B001",
    quantity: "250 kg",
    location: "Field A-12",
    status: "Collected",
    date: "2024-01-15",
    statusColor: "bg-[#A6FF00] text-black",
  },
  {
    id: "B002",
    quantity: "180 kg",
    location: "Field B-08",
    status: "Received",
    date: "2024-01-14",
    statusColor: "bg-orange-500 text-white",
  },
  {
    id: "B003",
    quantity: "320 kg",
    location: "Field C-05",
    status: "In Processing",
    date: "2024-01-13",
    statusColor: "bg-yellow-500 text-black",
  },
  {
    id: "B004",
    quantity: "195 kg",
    location: "Field A-07",
    status: "Processed",
    date: "2024-01-12",
    statusColor: "bg-blue-500 text-white",
  },
  {
    id: "B005",
    quantity: "275 kg",
    location: "Field D-03",
    status: "Collected",
    date: "2024-01-11",
    statusColor: "bg-[#A6FF00] text-black",
  },
  {
    id: "B006",
    quantity: "160 kg",
    location: "Field B-15",
    status: "Received",
    date: "2024-01-10",
    statusColor: "bg-orange-500 text-white",
  },
  {
    id: "B007",
    quantity: "340 kg",
    location: "Field C-12",
    status: "In Processing",
    date: "2024-01-09",
    statusColor: "bg-yellow-500 text-black",
  },
  {
    id: "B008",
    quantity: "220 kg",
    location: "Field A-03",
    status: "Processed",
    date: "2024-01-08",
    statusColor: "bg-blue-500 text-white",
  },
];

export default function FarmerDashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#A6FF00] rounded-full flex items-center justify-center text-black font-bold">
                  JS
                </div>
                <div>
                  <h2 className="text-xl font-bold">Welcome, John Smith</h2>
                  <p className="text-sm text-gray-400">
                    Manage your harvest batches and track progress
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
                📊 My Batches
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
          <h1 className="text-3xl font-bold">My Harvest Batches</h1>
          <div className="flex items-center gap-4">
            <Link href={'/dashboard/farmer/Addharvest'}>
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
                {batches.map((batch) => (
                  <tr
                    key={batch.id}
                    className="border-b border-gray-800/50 hover:bg-gray-800/30"
                  >
                    <td className="p-4 font-medium">{batch.id}</td>
                    <td className="p-4">{batch.quantity}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        {batch.location}
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                      >
                        View Details
                      </Button>
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
