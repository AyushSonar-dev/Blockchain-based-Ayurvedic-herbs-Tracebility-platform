"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const batchData = [
  { month: "Jan", batches: 45, processed: 38 },
  { month: "Feb", batches: 52, processed: 48 },
  { month: "Mar", batches: 38, processed: 35 },
  { month: "Apr", batches: 61, processed: 55 },
  { month: "May", batches: 48, processed: 42 },
  { month: "Jun", batches: 55, processed: 51 },
]

const statusData = [
  { name: "Collected", value: 35, color: "#A6FF00" },
  { name: "Received", value: 25, color: "#f97316" },
  { name: "In Processing", value: 20, color: "#eab308" },
  { name: "Processed", value: 20, color: "#3b82f6" },
]

export function BatchAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Monthly Batch Overview</CardTitle>
          <CardDescription className="text-gray-400">Batches created vs processed</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={batchData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="batches" fill="#A6FF00" radius={[4, 4, 0, 0]} />
              <Bar dataKey="processed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Status Distribution</CardTitle>
          <CardDescription className="text-gray-400">Current batch status breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-4">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-300">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ProcessingAnalytics() {
  const processingData = [
    { week: "Week 1", received: 12, processed: 8 },
    { week: "Week 2", received: 15, processed: 12 },
    { week: "Week 3", received: 18, processed: 15 },
    { week: "Week 4", received: 14, processed: 16 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Processing Efficiency</CardTitle>
          <CardDescription className="text-gray-400">Weekly received vs processed batches</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={processingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="received"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="processed"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Processing Metrics</CardTitle>
          <CardDescription className="text-gray-400">Key performance indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-[#A6FF00]">89%</div>
              <div className="text-sm text-gray-400">Processing Rate</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-500">2.3</div>
              <div className="text-sm text-gray-400">Avg Days</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-500">156</div>
              <div className="text-sm text-gray-400">Total Batches</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-500">12</div>
              <div className="text-sm text-gray-400">In Queue</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
