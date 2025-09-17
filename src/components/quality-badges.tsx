import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Leaf, Award, CheckCircle, Star, Globe } from "lucide-react"

export function QualityBadges() {
  const qualityBadges = [
    {
      id: 1,
      name: "USDA Organic",
      description: "Certified organic by USDA standards",
      icon: Leaf,
      color: "bg-green-100 text-green-800 border-green-200",
      verified: true,
      certificationNumber: "USDA-ORG-2023-1245",
    },
    {
      id: 2,
      name: "FSSAI Approved",
      description: "Food Safety and Standards Authority of India certified",
      icon: Shield,
      color: "bg-blue-100 text-blue-800 border-blue-200",
      verified: true,
      certificationNumber: "FSSAI-12345678901234",
    },
    {
      id: 3,
      name: "Premium Grade",
      description: "Highest quality grade with 3.2% curcumin content",
      icon: Star,
      color: "bg-amber-100 text-amber-800 border-amber-200",
      verified: true,
      certificationNumber: "GRADE-A-TUR-2024",
    },
    {
      id: 4,
      name: "Fair Trade",
      description: "Ethically sourced with fair compensation to farmers",
      icon: Globe,
      color: "bg-purple-100 text-purple-800 border-purple-200",
      verified: true,
      certificationNumber: "FT-IND-2023-0892",
    },
    {
      id: 5,
      name: "Lab Tested",
      description: "Third-party laboratory tested for purity and potency",
      icon: CheckCircle,
      color: "bg-teal-100 text-teal-800 border-teal-200",
      verified: true,
      certificationNumber: "LAB-TEST-2023-1156",
    },
    {
      id: 6,
      name: "Export Quality",
      description: "Meets international export quality standards",
      icon: Award,
      color: "bg-indigo-100 text-indigo-800 border-indigo-200",
      verified: true,
      certificationNumber: "EXP-QUAL-2024-0034",
    },
  ]

  const testResults = [
    { parameter: "Curcumin Content", value: "3.2%", standard: "≥3.0%", status: "pass" },
    { parameter: "Moisture Content", value: "8.5%", standard: "≤12%", status: "pass" },
    { parameter: "Ash Content", value: "6.8%", standard: "≤9%", status: "pass" },
    { parameter: "Aflatoxin", value: "< 5 ppb", standard: "≤20 ppb", status: "pass" },
    { parameter: "Heavy Metals", value: "Not Detected", standard: "Within Limits", status: "pass" },
    { parameter: "Pesticide Residue", value: "Not Detected", standard: "Below Detection", status: "pass" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Award className="h-5 w-5" />
            Quality Certifications
          </CardTitle>
          <CardDescription className="text-gray-400">Verified certifications and quality standards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {qualityBadges.map((badge) => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.id}
                  className="relative p-4 rounded-lg border-2 bg-gray-800 border-gray-700 transition-all hover:shadow-md hover:border-[#A6FF00]/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-[#A6FF00]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-white">{badge.name}</h3>
                        {badge.verified && <CheckCircle className="h-4 w-4 text-[#A6FF00]" />}
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{badge.description}</p>
                      <p className="text-xs font-mono text-gray-500">{badge.certificationNumber}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <CheckCircle className="h-5 w-5" />
            Laboratory Test Results
          </CardTitle>
          <CardDescription className="text-gray-400">Detailed analysis of quality parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testResults.map((test, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-700 rounded-lg bg-gray-800/50"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm text-white">{test.parameter}</span>
                    <Badge
                      variant={test.status === "pass" ? "default" : "destructive"}
                      className="text-xs bg-[#A6FF00] text-black"
                    >
                      {test.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-300">
                      Result: <strong className="text-white">{test.value}</strong>
                    </span>
                    <span className="text-gray-300">Standard: {test.standard}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gray-800 border border-[#A6FF00]/50 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#A6FF00]" />
              <span className="font-medium text-sm text-white">All Quality Tests Passed</span>
            </div>
            <p className="text-xs text-white mt-1">
              This product meets all national and international quality standards.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
