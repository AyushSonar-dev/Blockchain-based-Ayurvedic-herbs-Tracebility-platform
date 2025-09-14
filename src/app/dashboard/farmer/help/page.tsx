"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle, Home, Plus, Mail, User, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react";
function HelpPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Run only on client
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);
  return (
    <div className="min-h-screen bg-black text-white">
 

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
          <p className="text-xl text-gray-400">Find answers or contact support</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <Search className="w-6 h-6 text-[#A6FF00]" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription className="text-gray-400">Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-[#A6FF00] transition-colors">
                    How do I add a new harvest batch?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    To add a new harvest batch, click the "Add Harvest" button in the navigation bar or on your
                    dashboard. Fill in the required information including Batch ID, Quantity, Location, and Harvest
                    Date. You can also add optional notes for additional context. Once submitted, your batch will be
                    tracked through the processing pipeline.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-[#A6FF00] transition-colors">
                    How do I track my processing status?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    You can track your batch processing status from the "My Batches" dashboard. Each batch shows its
                    current status: Collected (green), Received (orange), In Processing (yellow), or Processed (blue).
                    Click "View Details" on any batch to see more detailed tracking information and processing history.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-[#A6FF00] transition-colors">
                    How do I reset my password?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    To reset your password, go to the sign-in page and click "Forgot Password" below the login form.
                    Enter your email address and you'll receive a password reset link. Follow the instructions in the
                    email to create a new password. If you don't receive the email, check your spam folder or contact
                    support.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-[#A6FF00] transition-colors">
                    What does blockchain verification mean?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Blockchain verification ensures that all data in your traceability records is immutable and
                    transparent. Once a batch is recorded, its information cannot be altered, providing complete
                    transparency from farm to processor. This creates trust and accountability throughout the supply
                    chain.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-gray-700">
                  <AccordionTrigger className="text-white hover:text-[#A6FF00] transition-colors">
                    How do I view analytics and reports?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Analytics are available on your dashboard showing monthly batch overviews, status distributions, and
                    processing metrics. You can view trends in your harvest data, processing efficiency, and overall
                    performance. These insights help optimize your operations and track progress over time.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Support Form */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-[#A6FF00]" />
                Contact Support
              </CardTitle>
              <CardDescription className="text-gray-400">
                Can't find what you're looking for? Send us a message
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue or question in detail..."
                    rows={6}
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#A6FF00]/20"
                >
                  Submit Ticket
                </Button>
              </form>

              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Need immediate help?</h4>
                <p className="text-sm text-gray-400 mb-3">For urgent issues, you can also reach us directly:</p>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-300">📧 support@traceability.com</p>
                  <p className="text-gray-300">📞 +1 (555) 123-4567</p>
                  <p className="text-gray-300">🕒 Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


export default HelpPage;