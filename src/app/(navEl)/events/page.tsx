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
    <div className="max-w-7xl mx-auto px-4 py-10  md:pb-32">
      {/* ---------------- HEADER SECTION ---------------- */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-semibold text-gray-900 p-2">Upcoming Events</h1>
        <p className="text-gray-600 mt-2 p-2">
          Discover, register, and attend events you care about
        </p>
      </div>

      {/* ---------------- LOADING STATE ---------------- */}
      {loading && (
        <p className="text-center text-gray-500 min-h-screen">Loading events...</p>
      )}

      {/* ---------------- EMPTY STATE ---------------- */}
      {!loading && data.length === 0 && (
        <p className="text-center text-gray-500">
          No events available at the moment.
        </p>
      )}

      {/* ---------------- EVENTS GRID ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.slug}`}
            className="group border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            {/* Banner Image */}
            {event.bannerImage && (
              <img
                src={event.bannerImage}
                alt={event.title}
                className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}

            {/* Content */}
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">
                {event.title}
              </h2>

              <p className="text-sm text-gray-500">
                {new Date(event.dateTime).toLocaleString()}
              </p>

              <p className="text-sm text-gray-600 line-clamp-2">
                {event.description}
              </p>

              <p className="text-sm text-gray-700">
                {event.venue}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    event.registrationOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {event.registrationOpen ? "Open" : "Closed"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
