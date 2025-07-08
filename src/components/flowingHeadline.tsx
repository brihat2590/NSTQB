"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  BookOpen,
  Users,
  Bell,
} from "lucide-react";

const flowingAnnouncements = [
  {
    id: 1,
    text: "🔥 CTFL v4.0 Exam Registration Open - Next Exam: Aug 30, 2025",
    type: "urgent",
    icon: <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />,
    href: "/registration-process", // internal
  },
  {
    id: 2,
    text: "📚 New Study Materials Available - Download CTFL v4.0 Syllabus & Sample Questions",
    type: "info",
    icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />,
    href: "/CTFL", // internal
  },
  
];

export default function FlowingHeadline() {
  const duplicatedAnnouncements = [
    ...flowingAnnouncements,
    ...flowingAnnouncements,
  ];

  return (
    <div className="fixed top-20 w-full z-40 bg-gradient-to-r from-gray-900 via-blue-900 to-red-900 text-white border-b border-gray-700 overflow-hidden">
      <div className="relative">
        {/* Gradient fade sides */}
        <div className="absolute left-0 top-0 w-12 sm:w-16 h-full bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-12 sm:w-16 h-full bg-gradient-to-l from-red-900 to-transparent z-10" />

        {/* Header label */}
        <div className="absolute left-0 top-0 bg-gradient-to-r from-red-600 to-red-700 px-3 sm:px-4 py-2 z-20">
          <div className="flex items-center space-x-2">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
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

              const content = (
                <div className="flex items-center min-w-max space-x-2 sm:space-x-3 text-xs sm:text-sm font-medium hover:underline">
                  <div className="text-yellow-400">{announcement.icon}</div>
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
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
