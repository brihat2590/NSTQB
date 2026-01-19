"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Event = {
  id: string;
  title: string;
  slug: string;
  venue: string;
  dateTime: string;
  eventType: "FREE" | "PAID";
  ticketPrice?: number;
  registrationOpen: boolean;
};

export default function EventAdminPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-medium text-zinc-500">Loading your events...</p>
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="text-center p-10 bg-white border border-dashed border-zinc-300 rounded-3xl">
          <p className="text-zinc-500 font-medium">No events found in the database.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/50">
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900">
              Event Admin
            </h1>
            <p className="text-lg text-zinc-500 mt-2">
              Centralized control for your upcoming experiences.
            </p>
          </div>
          <div className="h-px flex-1 bg-zinc-200 hidden md:block mx-8 mb-3"></div>
          <div className="text-sm font-medium text-zinc-400 uppercase tracking-widest">
            {events.length} Total Events
          </div>
        </header>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => router.push(`/events-admin/${event.slug}`)}
              className="group relative flex flex-col bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer"
            >
              <div className="p-8 flex-1">
                {/* Status Badges */}
                <div className="flex items-center gap-2 mb-6">
                  <span
                    className={`text-[10px] font-bold tracking-tighter px-2.5 py-1 rounded-md uppercase ${
                      event.eventType === "FREE"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-amber-50 text-amber-600 border border-amber-100"
                    }`}
                  >
                    {event.eventType === "FREE"
                      ? "Free Access"
                      : `Paid · ₹${event.ticketPrice}`}
                  </span>

                  <span
                    className={`text-[10px] font-bold tracking-tighter px-2.5 py-1 rounded-md uppercase ${
                      event.registrationOpen
                        ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                        : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                    }`}
                  >
                    {event.registrationOpen ? "Live" : "Closed"}
                  </span>
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-zinc-900 leading-tight group-hover:text-indigo-600 transition-colors duration-300">
                  {event.title}
                </h2>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-zinc-500">
                    <div className="w-5 h-5 flex items-center justify-center mr-3 bg-zinc-100 rounded text-zinc-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">{event.venue}</span>
                  </div>

                  <div className="flex items-center text-zinc-500">
                    <div className="w-5 h-5 flex items-center justify-center mr-3 bg-zinc-100 rounded text-zinc-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium uppercase tracking-tight">
                      {new Date(event.dateTime).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-8 py-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between group-hover:bg-indigo-50/50 transition-colors duration-500">
                <span className="text-xs font-bold text-zinc-400 group-hover:text-indigo-600 transition-colors">
                  VIEW DETAILS
                </span>
                <div className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}