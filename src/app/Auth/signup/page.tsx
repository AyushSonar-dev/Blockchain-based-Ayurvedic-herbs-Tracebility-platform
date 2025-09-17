"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, Lock, User } from "lucide-react";
import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import axiosInstance from "@/app/utils/axiosInstance";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    orgType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (role === "farmer") {

      setFormData({ ...formData, orgType: "farmer" });
      console.log(formData)
    } else if (role === "processor") {
      setFormData({ ...formData, orgType: "processor" });
    }

    try {
      const res = await axiosInstance.post(
        `/users/register`,
        formData,
      );
      console.log("Response:", res.data);
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      toast.success("Signup successful you may signin now ✅");
    } catch (err: any) {
      console.error("Error:", err.response?.data || err.message);
      toast.error("Signup failed ❌");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get(
          `users/me`,
        );
        const user = res.data.user

        if(user) {
          router.push(`/dashboard/${user.orgType}`)
        }


      } catch (err: any) {
        console.log("Error:", err.response?.data || err.message);
      }
    }

    getUser()
  }, [])
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Create an Account
          </CardTitle>
          <CardDescription className="text-gray-400">
            Join the traceability platform to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  onChange={handleChange}
                  value={formData.name}
                  name="name"
                  placeholder="Enter your name"
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
                  onChange={handleChange}
                  value={formData.email}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  onChange={handleChange}
                  value={formData.phone}
                  name="phone"
                  type="text"
                  placeholder="Enter your phone number"
                  required
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
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
                  onChange={handleChange}
                  value={formData.password}
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-[#A6FF00] focus:ring-[#A6FF00]/20 transition-all duration-300"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#A6FF00] hover:bg-[#8FE600] text-black font-semibold py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#A6FF00]/20"
            >
              Sign Up
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                href="/Auth/signin"
                className="text-[#A6FF00] hover:text-[#8FE600] font-medium transition-colors duration-300"
              >
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
