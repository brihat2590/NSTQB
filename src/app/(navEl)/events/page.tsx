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
        const resData = await response.json();
        setData(resData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* ---------- HEADER ---------- */}
      <header className="max-w-2xl mx-auto text-center mb-14">
        <h1 className="text-3xl sm:text-5xl font-semibold  text-gray-900 py-2">
          Upcoming Events
        </h1>
        <p className="mt-3 md:mt-5 text-gray-600 leading-relaxed">
          Browse upcoming sessions, meetups, and workshops you can register for.
        </p>
      </header>

      {/* ---------- LOADING ---------- */}
      {loading && (
        <div className="flex items-center justify-center min-h-[40vh]">
          <p className="text-gray-500">Loading events…</p>
        </div>
      )}

      {/* ---------- EMPTY ---------- */}
      {!loading && data.length === 0 && (
        <p className="text-center text-gray-500">
          No events available right now.
        </p>
      )}

      {/* ---------- EVENTS GRID ---------- */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((event) => (
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
      }) } 
      <p>onwards</p>
            </div>
              

              <p className="text-sm text-gray-600 line-clamp-2">
                {event.description}
              </p>

              <p className="text-sm text-gray-700">
                {event.venue}
              </p>

              {/* Footer */}
              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    event.registrationOpen
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {event.registrationOpen ? "Registration Open" : "Closed"}
                </span>

                <span className="text-sm font-medium text-gray-800">
                  {event.eventType === "FREE" ? "Free" : `₹${event.ticketPrice}`}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
