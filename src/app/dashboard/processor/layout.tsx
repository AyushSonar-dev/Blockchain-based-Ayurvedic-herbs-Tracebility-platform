import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, Plus, HelpCircle, ChevronDown } from "lucide-react";

export default function ProcessorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 ">
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
              <Link href={"/dashboard/processor"}>
                <Button className="bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold">
                  🏭 Processing Batches
                </Button>
              </Link>

              <Link href={"/dashboard/processor/Addprocessing"}>
                <Button className="bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold">
                  Add Process
                </Button>
              </Link>

              <Link href={"/dashboard/processorx/help"}>
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
      <div>{children}</div>
    </div>
  );
}
