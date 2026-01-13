"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar } from "lucide-react";
import Image from "next/image";
import HeroCarousel from "./CarouselComp";
import { useRouter } from "next/navigation";
import VideoComponent from "./YoutubeComp";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white sm:mt-10">
        {/* BACKGROUND GRADIENT SHAPES */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Blue gradient */}
          <div className="absolute bottom-0 left-0 w-[85%] h-[70%] bg-blue-50/70 -skew-x-12 -translate-x-1/4" />

          {/* Red gradient */}
          <div className="absolute top-0 right-0 w-[75%] h-[65%] bg-red-50/60 skew-x-12 translate-x-1/4" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-20 pb-24 md:flex md:items-center md:justify-between gap-12">
          {/* LEFT */}
          <div className="flex-1 max-w-2xl space-y-8">
            <Badge
              variant="outline"
              className="border-blue-200 bg-blue-50 text-blue-600 font-medium"
            >
              🇳🇵 Authorized by ISTQB
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-800 leading-tight">
              International Certifications
              <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl text-blue-600 font-semibold">
                in Software Testing
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Advance your career with globally recognized software testing
              certifications. Join professionals who strengthen their expertise
              through NSTQB.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-6 transition-all"
                onClick={() => router.push("/FAQ")}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                More Information
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium px-8 py-6 transition-all"
                onClick={() => router.push("/registration")}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Reserve Seat
              </Button>
            </div>

            {/* PARTNER */}
            <div className="pt-8">
              <p className="text-sm text-gray-500 mb-2">
                Authorized Partner of:
              </p>
              <Image
                src="/istqb.png"
                alt="ISTQB Logo"
                width={80}
                height={80}
                priority
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 mt-10 md:mt-0 flex justify-end">
            <div className="w-full max-w-2xl overflow-hidden shadow-sm hidden md:block">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <VideoComponent />
    </div>
  );
}
