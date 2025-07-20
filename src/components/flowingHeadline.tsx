"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import * as Icons from "lucide-react"; // import all icons as a map
import { useEffect, useState } from "react";

type Announcement = {
  id: string | number;
  text: string;
  type: string;
  icon: string; // icon name string from backend
  href: string;
};

export default function FlowingHeadline() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/headlines");
        if (!res.ok) {
          console.error("Failed to fetch headlines");
          return;
        }
        const data: Announcement[] = await res.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching headlines:", error);
      }
    }
    fetchData();
  }, []);

  // Duplicate announcements for marquee effect
  const duplicatedAnnouncements = [...announcements, ...announcements];

  return (
    <div className="fixed top-20 w-full z-40 bg-gradient-to-r from-gray-900 via-blue-900 to-red-900 text-white border-b border-gray-700 overflow-hidden">
      <div className="relative">
        {/* Gradient fade sides */}
        <div className="absolute left-0 top-0 w-12 sm:w-16 h-full bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-12 sm:w-16 h-full bg-gradient-to-l from-red-900 to-transparent z-10" />

        {/* Header label */}
        <div className="absolute left-0 top-0 bg-gradient-to-r from-red-600 to-red-700 px-3 sm:px-4 py-2 z-20">
          <div className="flex items-center space-x-2">
            {/* Bell icon hardcoded here */}
            <Icons.Bell className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
            <span className="font-bold text-xs sm:text-sm uppercase tracking-wide">
              Latest Updates
            </span>
          </div>
        </div>

        {/* Marquee content */}
        <div className="py-2 pl-20 sm:pl-32">
          <div className="flex animate-scroll whitespace-nowrap w-max gap-4 sm:gap-6">
            {duplicatedAnnouncements.map((announcement, index) => {
              const isExternal = announcement.href.startsWith("http");
              const IconComponent = (Icons as any)[announcement.icon] || Icons.Calendar; // fallback icon

              const content = (
                <div
                  className="flex items-center min-w-max space-x-2 sm:space-x-3 text-xs sm:text-sm font-medium hover:underline"
                  key={`${announcement.id}-${index}`}
                >
                  <div className="text-yellow-400">
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span>{announcement.text}</span>
                  <Badge
                    variant="outline"
                    className={`text-[10px] sm:text-xs border-0 ${
                      announcement.type === "urgent"
                        ? "bg-red-500/20 text-red-200"
                        : announcement.type === "offer"
                        ? "bg-green-500/20 text-green-200"
                        : announcement.type === "event"
                        ? "bg-blue-500/20 text-blue-200"
                        : announcement.type === "achievement"
                        ? "bg-yellow-500/20 text-yellow-200"
                        : "bg-gray-500/20 text-gray-200"
                    }`}
                  >
                    {announcement.type.toUpperCase()}
                  </Badge>
                  <div className="w-px h-4 bg-white/30 mx-2 sm:mx-4"></div>
                </div>
              );

              return isExternal ? (
                <a
                  key={`${announcement.id}-${index}-external`}
                  href={announcement.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <Link key={`${announcement.id}-${index}-internal`} href={announcement.href}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
