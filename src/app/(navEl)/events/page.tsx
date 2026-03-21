"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type EventDataProps = {
  id: string;
  title: string;
  slug: string;
  description: string;
  venue: string;
  dateTime: string;
  eventType: "FREE" | "PAID";
  ticketPrice: number;
  registrationOpen: boolean;
  registrationDeadline: string;
  bannerImage?: string;
};


export default function EventPage() {
  
  const [data, setData] = useState<EventDataProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const resData = await response.json();
        if (Array.isArray(resData)) {
          setData(resData);
        } else {
          console.error("API did not return an array", resData);
          setData([]);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const filteredEvents = data
  .filter((event) => {
    const eventDate = new Date(event.dateTime);
    const now = new Date();
    return eventDate > now || (now.getTime() - eventDate.getTime()) < (6 * 60 * 60 * 1000);
  })
  .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* ---------- HEADER ---------- */}
      {/* ---------- HEADER ---------- */}
<header className="max-w-2xl mx-auto px-6 py-16 text-center border-b border-black/5">
  <h1 className="text-4xl sm:text-6xl font-semibold tracking-tighter text-black">
    Upcoming Events
  </h1>
  <p className="mt-6 text-base text-black/60 leading-relaxed max-w-lg mx-auto uppercase tracking-widest text-[10px] sm:text-xs">
    Sessions / Meetups / Workshops
  </p>
</header>

{/* ---------- LOADING ---------- */}
{loading && (
  <div className="flex flex-col items-center justify-center min-h-[40vh]">
    <div className="w-6 h-6 border border-black border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-black/40">
      Loading
    </p>
  </div>
)}

{/* ---------- EMPTY ---------- */}
{!loading && filteredEvents.length === 0 && (
  <div className="flex flex-col items-center justify-center py-24 px-4">
    <div className="w-full max-w-xs border-t border-black mb-8"></div>
    <h2 className="text-sm uppercase tracking-widest text-black font-medium">
      No events scheduled
    </h2>
    <p className="mt-2 text-xs text-black/50 italic">
      Please check back at a later date.
    </p>
  </div>
)}
      
      
      {/* ---------- EVENTS GRID ---------- */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data
          .filter((event) => {
            const eventDate = new Date(event.dateTime);
            const now = new Date();
            // Show if future OR started within last 6 hours
            return eventDate > now || (now.getTime() - eventDate.getTime()) < (6 * 60 * 60 * 1000);
          })
          .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
          .map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition-shadow hover:shadow-md"
            >
              {/* Image */}
              {event.bannerImage && (
                <div className="overflow-hidden">
                  <img
                    src={event.bannerImage}
                    alt={event.title}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              )}

              {/* Card Content */}
              <div className="p-5 flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-gray-900 leading-snug">
                  {event.title}
                </h2>
                <p>
                  {new Date(event.dateTime).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div className="flex gap-2">
                  {new Date(event.dateTime).toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                  <p>onwards</p>
                </div>


                {/* <p className="text-sm text-gray-600 line-clamp-2">
                {event.description}
              </p> */}

                <p className="text-sm text-gray-700">
                  {event.venue}
                </p>

                {/* Footer */}
                <div className="mt-3 flex items-center justify-between">
                  {(() => {
                    const eventDate = new Date(event.dateTime);
                    const isLive = new Date() >= eventDate;
                    const isOpen = event.registrationOpen && (!event.registrationDeadline || new Date() <= new Date(event.registrationDeadline));

                    if (isLive) {
                      return (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-red-600 text-white animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                          LIVE
                        </span>
                      );
                    }

                    return (
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${isOpen
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                          }`}
                      >
                        {isOpen ? "Registration Open" : "Closed"}
                      </span>
                    );
                  })()}

                  <span className="text-sm font-medium text-gray-800">
                    {event.eventType === "FREE" ? "Free" : `NPR ${event.ticketPrice}`}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
