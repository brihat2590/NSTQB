"use client";

import { useEffect, useState,use } from "react";

type EventDetail = {
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

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  /* ---------------- FETCH EVENT ---------------- */
  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/events/${slug}`);
        if (!res.ok) throw new Error("Event not found");
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [slug]);

  /* ---------------- COUNTDOWN ---------------- */
  useEffect(() => {
    if (!event) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const eventTime = new Date(event.dateTime).getTime();
      const diff = eventTime - now;

      if (diff <= 0) {
        setTimeLeft("Event started");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center text-gray-500">
        Loading event details...
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (!event) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center text-red-500">
        Event not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* ---------------- BANNER ---------------- */}
      {event.bannerImage && (
        <img
          src={event.bannerImage}
          alt={event.title}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />
      )}

      {/* ---------------- HEADER ---------------- */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        {event.title}
      </h1>

      <p className="text-gray-600 mb-4">
        📅 {new Date(event.dateTime).toLocaleString()} &nbsp; | &nbsp; 📍{" "}
        {event.venue}
      </p>

      {/* ---------------- COUNTDOWN ---------------- */}
      <div className="inline-block mb-6 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
        ⏳ {timeLeft}
      </div>

      {/* ---------------- DESCRIPTION ---------------- */}
      <p className="text-gray-800 leading-relaxed mb-6">
        {event.description}
      </p>

      {/* ---------------- INFO CARDS ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Event Type</p>
          <p className="font-semibold">{event.eventType}</p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Ticket Price</p>
          <p className="font-semibold">
            {event.eventType === "FREE" ? "Free" : `₹${event.ticketPrice}`}
          </p>
        </div>

        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Registration</p>
          <p
            className={`font-semibold ${
              event.registrationOpen ? "text-green-600" : "text-red-600"
            }`}
          >
            {event.registrationOpen ? "Open" : "Closed"}
          </p>
        </div>
      </div>

      {/* ---------------- REGISTER BUTTON ---------------- */}
      <button
        disabled={!event.registrationOpen}
        className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition ${
          event.registrationOpen
            ? "bg-black text-white hover:bg-gray-800"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Register Now
      </button>

      {/* ---------------- DEADLINE ---------------- */}
      <p className="mt-4 text-sm text-gray-500">
        Registration closes on{" "}
        {new Date(event.registrationDeadline).toLocaleDateString()}
      </p>
    </div>
  );
}
