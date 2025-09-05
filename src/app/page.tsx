"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Circle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleSignIn = (role: "farmer" | "processor") => {
    localStorage.setItem("role", role); // store role
    router.push(`/dashboard/${role}`);  // redirect to correct dashboard
  };
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh] gap-12">
          {/* Left side - Graphic */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md">
              <Image
                src="/images/plant-tech-graphic.png"
                alt="Blockchain Agriculture Technology"
                width={400}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance">
                Traceability Platform <span className="text-[#A6FF00]">MVP</span>
              </h1>
              <p className="text-xl text-gray-300 text-pretty">
                Track Ashwagandha from Farm to Processor with complete transparency and real-time insights
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#A6FF00]" />
                <span className="text-sm">Blockchain verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#A6FF00]" />
                <span className="text-sm">End-to-end tracking</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <Link href="/Auth/signin?role=farmer" className="block">
                <Button onClick={()=>handleSignIn("farmer")} className="w-full bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold py-6 text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#A6FF00]/20">
                  🏠 Login as Farmer
                </Button>
              </Link>
              <Link href="/Auth/signin?role=processor" className="block">
                <Button onClick={()=>handleSignIn("processor")} className="w-full bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold py-6 text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#A6FF00]/20">
                  🏭 Login as Processor
                </Button>
              </Link>
            </div>

            {/* Status Indicators */}
            <div className="flex flex-wrap gap-6 pt-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#A6FF00] rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Secure & Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Real-time Updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 pt-8 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Circle className="w-3 h-3 fill-[#A6FF00] text-[#A6FF00]" />
                <span className="text-sm text-gray-400">Real-time tracking active</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="w-3 h-3 fill-orange-500 text-orange-500" />
                <span className="text-sm text-gray-400">Farm to processor visibility</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">Powered by blockchain technology • MVP Version 1.0</div>
          </div>
        </footer>
      </div>
    </div>
  )
}
