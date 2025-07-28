"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Calendar,
  BookOpen,
  Users,
  LucideIcon,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useEffect, useState } from "react";

// Type definitions
type AnnouncementType = "urgent" | "offer" | "event" | "achievement" | "info";

interface Announcement {
  id: string;
  text: string;
  href: string;
  type: AnnouncementType;
  icon: keyof typeof LucideIcons;
}

// Icon mapping (you can extend this)
const iconMap: Record<string, LucideIcon> = {
  Calendar,
  BookOpen,
  Users,
  Bell,
};

export default function FlowingHeadline() {
  const [flowingAnnouncements, setFlowingAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/headlines");
        if (!response.ok) {
          console.error("Failed to fetch headlines");
          return;
        }
        const data: Announcement[] = await response.json();
        setFlowingAnnouncements(data);
      } catch (error) {
        console.error("Error fetching headlines", error);
      }
    }

    fetchData();
  }, []);

  // Duplicate for scrolling animation
  const duplicatedAnnouncements = [...flowingAnnouncements, ...flowingAnnouncements];

  return (
    <div className="fixed top-20 w-full z-40 bg-gradient-to-r from-gray-900 via-blue-900 to-red-900 text-white border-b border-gray-700 overflow-hidden">
      <div className="relative">
        {/* Side gradients */}
        <div className="absolute left-0 top-0 w-12 sm:w-16 h-full bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-12 sm:w-16 h-full bg-gradient-to-l from-red-900 to-transparent z-10" />

        {/* Header Label */}
        <div className="absolute left-0 top-0 bg-gradient-to-r from-red-600 to-red-700 px-3 sm:px-4 py-2 z-20">
          <div className="flex items-center space-x-2">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
            <span className="font-bold text-xs sm:text-sm uppercase tracking-wide">
              Latest Updates
            </span>
          </div>
        </div>

        {/* Scrolling Marquee */}
        <div className="py-2 pl-20 sm:pl-32">
          <div className="flex animate-scroll whitespace-nowrap w-max gap-4 sm:gap-6">
            {flowingAnnouncements.length === 0 ? (
              // Show loading placeholders
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center min-w-max space-x-2 sm:space-x-3 text-xs sm:text-sm font-medium opacity-70 animate-pulse"
                >
                  <Bell className="text-yellow-300 h-4 w-4" />
                  <div className="bg-white/20 h-4 w-40 rounded" />
                  <Badge
                    variant="outline"
                    className="text-[10px] sm:text-xs bg-gray-500/20 text-gray-200 border-0"
                  >
                    LOADING
                  </Badge>
                  <div className="w-px h-4 bg-white/30 mx-2 sm:mx-4"></div>
                </div>
              ))
            ) : (
              duplicatedAnnouncements.map((announcement, index) => {
                const Icon = iconMap[announcement.icon] || Bell;
                const isExternal = announcement.href.startsWith("http");

                const content = (
                  <div className="flex items-center min-w-max space-x-2 sm:space-x-3 text-xs sm:text-sm font-medium hover:underline">
                    <Icon className="text-yellow-400 h-4 w-4" />
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
                    key={`${announcement.id}-${index}`}
                    href={announcement.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <Link key={`${announcement.id}-${index}`} href={announcement.href}>
                    {content}
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
