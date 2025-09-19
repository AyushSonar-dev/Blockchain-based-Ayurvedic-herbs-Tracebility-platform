"use client";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axiosInstance";
import { toast } from "sonner";

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    orgType: "farmer", // default to farmer
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // POST to /users/login with { email, password, orgType }
      const res = await axiosInstance.post(
        "/users/login",
        {
          email: formData.email,
          password: formData.password,
          orgType: formData.orgType,
        }
      );
      // Redirect to /dashboard/{orgType}
      router.push(`/dashboard/${formData.orgType}`);
      toast.success("Signed-in successfully ✅");
    } catch (err: any) {
      console.error("Error:", err.response?.data);
      toast.error(err.response.data.message || "Login Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription className="text-gray-400">
            Welcome back to the traceability platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orgType" className="text-sm font-medium">
                Organization Type
              </Label>
              <select
                id="orgType"
                name="orgType"
                value={formData.orgType}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
                disabled={loading}
              >
                <option value="farmer">Farmer</option>
                <option value="processor">Processor</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#A6FF00]/20 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/Auth/signup"
                className="text-[#A6FF00] hover:text-[#8FE600] font-medium transition-colors duration-300"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
