"use client";

import { useEffect, useState, use } from "react";
import {toast} from "sonner"

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

interface Speaker {
  name: string;
  bio: string;
  photo?: string;
}

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [timeLeft, setTimeLeft] = useState("");
  const [showModal, setShowModal] = useState(false);
const [submitting, setSubmitting] = useState(false);

const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
});



async function handleRegister(e: React.FormEvent) {
  e.preventDefault();

  if (!form.name || !form.email) {
    toast.error("Name and email are required");
    return;
  }

  setSubmitting(true);

  try {
    const res = await fetch(`/api/events/${slug}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Registration failed");
      return;
    }

    toast.success("🎉 Thank you for registering. We will contact you soon");
    setForm({ name: "", email: "", phone: "" });

    // Optional: auto-close modal
    setTimeout(() => {
      setShowModal(false);
    }, 800);
  } catch {
    toast.error("Something went wrong. Please try again.");
  } finally {
    setSubmitting(false);
  }
}




  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    async function fetchEvent() {
      try {
        const [eventRes, speakerRes] = await Promise.all([
          fetch(`/api/events/${slug}`),
          fetch(`/api/events/${slug}/speakers`),
        ]);

        if (!eventRes.ok) throw new Error("Event not found");

        const eventData = await eventRes.json();
        const speakerData = await speakerRes.json();

        setEvent(eventData);
        setSpeakers(speakerData.speakers || []);
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
      const diff =
        new Date(event.dateTime).getTime() - new Date().getTime();

      if (diff <= 0) {
        setTimeLeft("Live Now");
        clearInterval(timer);
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);

      setTimeLeft(`${d}d ${h}h ${m}m`);
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xs tracking-widest uppercase text-zinc-400">
        Initializing
      </div>
    );

  if (!event)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Event not found
      </div>
    );

  return (
    <div className="bg-white min-h-screen pb-40">
      {/* ---------------- HERO ---------------- */}
      <div className="w-full">
        {event.bannerImage && (
          <div className="relative h-[300px] md:h-[420px] overflow-hidden mb-12 md:mb-16 shadow-2xl">
            <img
              src={event.bannerImage}
              alt="Event banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/90 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-[15px] font-extrabold tracking-widest text-black shadow-lg">
              ⏳ {timeLeft}
            </div>
          </div>
        )}

        {/* ---------------- TITLE ---------------- */}
        <div className="text-center px-4 mb-16 md:mb-20">
          <p className="text-indigo-600 text-[10px] md:text-xs font-extrabold tracking-[0.3em] md:tracking-[0.35em] uppercase mb-4">
            Featured Event
          </p>
          <h1 className="text-3xl md:text-6xl tracking-tight text-zinc-900 mb-6 font-bold leading-tight max-w-5xl mx-auto">
            {event.title}
          </h1>
          <div className="flex justify-center flex-wrap gap-4 md:gap-6 text-xs md:text-sm text-zinc-500 font-medium">
            <span className="flex items-center gap-1.5">📍 {event.venue}</span>
            <span className="flex items-center gap-1.5">
              {new Date(event.dateTime).toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {/* Added Event Time */}
    <span className="flex items-center gap-1.5 border-l border-zinc-200 pl-4 md:pl-6">
       {new Date(event.dateTime).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }) } 
      <p>onwards</p>
    </span>
            
          </div>
        </div>

        {/* ---------------- DESCRIPTION ---------------- */}
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-20 px-6">
          <p className="text-indigo-600 text-[10px] md:text-xs font-extrabold tracking-[0.35em] uppercase mb-4">
            Overview
          </p>
          <p className="text-sm md:text-base  text-zinc-700 leading-relaxed font-light">
            {event.description}
          </p>
        </div>

        {/* ---------------- SPEAKERS ---------------- */}
        {speakers.length>0&&(<section className="max-w-6xl mx-auto py-16 px-6">
          <h2 className="text-[10px] md:text-sm font-extrabold tracking-[0.35em] text-center uppercase text-gray-500 mb-12">
            Meet the Speakers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
            {speakers.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-28 h-28 md:w-32 md:h-32 mb-6 overflow-hidden rounded-full ring-4 ring-gray-50 shadow-md transition-all duration-300 group-hover:ring-indigo-100">
                  <img
                    src={s.photo || "https://placehold.co/200x200?text=Speaker"}
                    alt={s.name}
                    className="w-full h-full object-cover  hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-zinc-900">{s.name}</h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[200px]">
                    {s.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>)}
      </div>

      {/* ---------------- ADAPTIVE REGISTRATION BAR ---------------- */}
      {/* On mobile (< sm), it's a solid bar at the very bottom.
          On larger screens (>= sm), it's the floating pill design.
      */}
      <div className="fixed bottom-0 sm:bottom-6 left-0 sm:left-1/2 sm:-translate-x-1/2 w-full sm:w-[92%] sm:max-w-lg z-50">
        <div className="bg-zinc-950 sm:rounded-3xl px-6 py-4 shadow-2xl flex items-center justify-between border-t sm:border border-white/10 backdrop-blur-lg">
          <div>
            <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-zinc-500 font-bold">
              Ticket Price
            </p>
            <p className="text-white font-bold text-base md:text-lg">
              {event.eventType === "FREE" ? "Free Entry" : `₹${event.ticketPrice}`}
            </p>
          </div>

          <button
  disabled={!event.registrationOpen}
  onClick={() => setShowModal(true)}
  className={`px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase ${
    event.registrationOpen
      ? "bg-white text-black hover:bg-zinc-200"
      : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
  }`}
>
  {event.registrationOpen ? "Register Now" : "Sold Out"}
</button>

        </div>
      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white/95 rounded-xl w-[92%] max-w-md p-7 shadow-[0_20px_60px_rgba(0,0,0,0.25)] relative animate-in fade-in zoom-in-95">
      
      {/* Close */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition"
      >
        ✕
      </button>

      {/* Header */}
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 my-4">
        Register for the Event
      </h3>
      <p className="text-sm text-zinc-500 mb-6">
        Secure your seat for{" "}
        <span className="font-medium">{event.title}</span> {" "}
        happening on{" "}
        <span className="font-medium">
          {new Date(event.dateTime).toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}</span>
      </p>
      <p className="text-sm text-zinc-500 mb-6">

        Please fill in your details below to complete your registration.
      </p>

      {/* Form */}
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-3">
          <input
            required
            placeholder="Full Name"
            className="w-full border border-zinc-300 px-4 py-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            required
            type="email"
            placeholder="Email Address"
            className="w-full border border-zinc-300 px-4 py-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            placeholder="Phone (optional)"
            className="w-full border border-zinc-300 px-4 py-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />
        </div>

        
        

        <div className="h-px bg-zinc-200" />

        {/* CTA */}
        <button
          disabled={submitting}
          className="w-full bg-zinc-900 hover:bg-black text-white py-3 rounded-md text-sm font-semibold tracking-wide transition active:scale-[0.98] disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Confirm Registration"}
        </button>

        {/* Trust note */}
        <p className="text-[11px] text-zinc-400 text-center">
          You’ll receive a confirmation email after registering.
        </p>
      </form>
    </div>
  </div>
)}



    </div>
  );
}