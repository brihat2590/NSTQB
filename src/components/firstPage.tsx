"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Globe, BookOpen, Calendar, TrendingUp } from "lucide-react";
import Image from "next/image";
import HeroCarousel from "./CarouselComp";
import { useRouter } from "next/navigation";
import VideoComponent from "./YoutubeComp";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white text-gray-900 sm:mt-10  ">
        {/* Background Geometric Shapes */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-r from-blue-50 to-transparent transform -skew-x-12 -translate-x-1/4" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 pt-20 md:py-20 md:flex md:items-center md:justify-between gap-10">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl space-y-8">
            <div className="space-y-6">
              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-600">
                🇳🇵 Authorized by ISTQB
              </Badge>

              <h1 className="text-4xl md:tracking-tight
               md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800 ">
                International Certifications
                <span className="block text-3xl md:text-4xl lg:text-5xl text-blue-600">
                  in Software Testing
                </span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                Advance your career with globally recognized software testing certifications. Join hundreds of
                professionals who have enhanced their skills with NSTQB.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-blue-600 text-white hover:from-red-700 hover:to-blue-700 font-semibold px-8 py-6 rounded-lg"
                  onClick={
                    ()=>{
                      router.push("/FAQ")
                    }
                  }
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  More Information
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600  font-semibold px-8 py-6 rounded-lg hover:bg-blue-600 hover:text-white"
                  onClick={()=>{
                    router.push("/registration")
                  }}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Reserve Seat
                </Button>
              </div>
            </div>

            {/* Partner Logos */}
            <div className="md:pt-8">
            <p className="text-gray-500 text-sm mb-0 md:mb-4">Authorized Partner of:</p>
            <div className="flex justify-start items-center mt-0">
              <Image
                src="/istqb.png"
                alt="ISTQB Logo"
                width={80}
                height={80}
                className=""
                priority
              />
            </div>
</div>

            
          </div>

          {/* Right Content - Hero Carousel */}
          <div className="flex-1 mt-10 md:mt-0 flex justify-end">
            <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-lg hidden md:block">
              <HeroCarousel />
            </div>
          </div>

        </div>

        {/* Bottom Stats Section */}
        {/* <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border rounded-xl p-6 shadow-sm">
            {[
              { icon: <Award className="w-8 h-8 text-blue-600" />, value: "98%", label: "Pass Rate" },
              { icon: <Users className="w-8 h-8 text-red-600" />, value: "150+", label: "Certified Testers" },
              { icon: <Globe className="w-8 h-8 text-green-600" />, value: "130+", label: "Countries recognize ISTQB " },
              { icon: <TrendingUp className="w-8 h-8 text-purple-600" />, value: "90%", label: "Career Advancement" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div> */}
      </section>
      <VideoComponent/>
    </div>
  );
}