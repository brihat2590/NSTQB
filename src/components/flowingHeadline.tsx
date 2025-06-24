"use client";

import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Award,
  BookOpen,
  Users,
  AlertCircle,
  Bell,
} from "lucide-react";

const flowingAnnouncements = [
  {
    id: 1,
    text: "🔥 CTFL v4.0 Exam Registration Open - Next Exam: May 31, 2025",
    type: "urgent",
    icon: <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />,
    href: "/registration-process",
  },
  {
    id: 2,
    text: "📚 New Study Materials Available - Download CTFL v4.0 Syllabus & Sample Questions",
    type: "info",
    icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />,
    href: "/CTFL",
  },
  {
    id: 3,
    text: "🎓 Free Webinar: Introduction to Software Testing - March 15, 2025 at 2:00 PM NST",
    type: "event",
    icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
    href: "/webinar/introduction-to-software-testing",
  },
  {
    id: 4,
    text: "⏰ Early Bird Discount: Register before May 20th and save NPR 2,000 on exam fees",
    type: "offer",
    icon: <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />,
    href: "/offers/early-bird-discount",
  },
  {
    id: 5,
    text: "🏆 150+ Professionals Already Certified - Join Nepal's Leading Testing Community",
    type: "achievement",
    icon: <Award className="h-4 w-4 sm:h-5 sm:w-5" />,
    href: "/community",
  },
  {
    id: 6,
    text: "📅 Upcoming Exam Dates: May 31, June 28, July 26, August 30, September 27, 2025",
    type: "schedule",
    icon: <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />,
    href: "/exam-dates",
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
            {duplicatedAnnouncements.map((announcement, index) => (
              <a
                key={`${announcement.id}-${index}`}
                href={announcement.href}
                className="flex items-center min-w-max space-x-2 sm:space-x-3 text-xs sm:text-sm font-medium hover:underline"
              >
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
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
