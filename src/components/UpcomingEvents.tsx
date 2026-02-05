"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

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

export default function UpcomingEvents() {
    const [events, setEvents] = useState<EventDataProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getEvents() {
            try {
                const response = await fetch("/api/events");
                if (!response.ok) throw new Error("Failed to fetch events");
                const data: EventDataProps[] = await response.json();

                // Filter for future events and sort by date
                const now = new Date();
                const upcoming = data
                    .filter((event) => new Date(event.dateTime) > now)
                    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
                    .slice(0, 3); // Take only top 3

                setEvents(upcoming);
            } catch (error) {
                console.error("Error loading events:", error);
            } finally {
                setLoading(false);
            }
        }

        getEvents();
    }, []);

    if (!loading && events.length === 0) return null;

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                            Upcoming Events
                        </h2>
                        <p className="mt-4 text-xl text-gray-600">
                            Join us for our upcoming workshops, seminars, and networking sessions.
                        </p>
                    </div>
                    <Link
                        href="/events"
                        className="group flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                    >
                        View all events
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-96 rounded-2xl bg-gray-100 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <Link
                                key={event.id}
                                href={`/events/${event.slug}`}
                                className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden bg-gray-100">
                                    {event.bannerImage ? (
                                        <img
                                            src={event.bannerImage}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-200">
                                            <Calendar className="w-16 h-16" />
                                        </div>
                                    )}

                                    {/* Date Badge */}
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg text-center min-w-[3.5rem]">
                                        <span className="block text-xs font-bold text-gray-500 uppercase">
                                            {new Date(event.dateTime).toLocaleDateString(undefined, { month: 'short' })}
                                        </span>
                                        <span className="block text-2xl font-bold text-gray-900 leading-none mt-0.5">
                                            {new Date(event.dateTime).getDate()}
                                        </span>
                                    </div>

                                    {/* Status Badge */}
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm ${event.registrationOpen
                                            ? "bg-green-500/90 text-white"
                                            : "bg-red-500/90 text-white"
                                        }`}>
                                        {event.registrationOpen ? "Open" : "Closed"}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 flex flex-col">
                                    {/* Price & Type */}
                                    <div className="flex items-center gap-2 mb-3 text-sm">
                                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium">
                                            {event.eventType === "FREE" ? "Free" : "Paid"}
                                        </span>
                                        {event.ticketPrice > 0 && (
                                            <span className="text-gray-600 font-medium">
                                                NPR {event.ticketPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                        {event.title}
                                    </h3>

                                    <div className="mt-auto flex items-center gap-2 text-gray-500 text-sm">
                                        <MapPin className="w-4 h-4 flex-shrink-0" />
                                        <span className="line-clamp-1">{event.venue}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
