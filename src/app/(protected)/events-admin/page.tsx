"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeft, X } from "lucide-react";

type Event = {
  id: string;
  title: string;
  slug: string;
  description: string;
  venue: string;
  dateTime: string;
  eventType: "FREE" | "PAID";
  ticketPrice: number | null;
  registrationOpen: boolean;
  bannerImage?: string | null;
};

export default function EventAdminPage() {
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    dateTime: "",
    venue: "",
    ticketPrice: "",
    
    bannerImage: "",
    registrationOpen: true,
    registrationDeadline:""
  });

  /* ---------------- Fetch events ---------------- */
  async function fetchEvents() {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  /* ---------------- Create event ---------------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const price =
      Number(formData.ticketPrice) || 0
    const isoDateTime=new Date(formData.dateTime).toISOString();
    const isoRegistrationDeadline=new Date(formData.registrationDeadline).toISOString();

    const eventType = price > 0 ? "PAID" : "FREE";

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          description: formData.description,
          venue: formData.venue,
          dateTime: isoDateTime,
          eventType,
          ticketPrice: price === 0 ? 0 : price,
          registrationOpen: formData.registrationOpen,
          registrationDeadline: isoRegistrationDeadline,
          bannerImage: formData.bannerImage || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create event");
      }

      toast.success("Event created");
      setIsModalOpen(false);
      setFormData({
        title: "",
        slug: "",
        description: "",
        dateTime: "",
        venue: "",
        ticketPrice: "",
        bannerImage: "",
        registrationOpen: true,
        registrationDeadline:""
      });
      fetchEvents();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-7 h-7 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex gap-2  items-center">
            <p onClick={()=>{
              router.push("/admin")
            }}><ChevronLeft/></p>
            <h1 className="text-3xl font-bold text-zinc-900">Events</h1>

            </div>
            <p className="text-sm text-zinc-500 mt-1">
              Manage upcoming events
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 active:scale-95"
          >
            + Create Event
          </button>
        </div>

        {/* Event Grid */}
        {!events.length ? (
          <div className="bg-white border border-dashed border-zinc-300 rounded-2xl p-16 text-center text-zinc-500">
            No events created yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() =>
                  router.push(`/events-admin/${event.slug}`)
                }
                className="cursor-pointer bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-lg transition"
              >
                {event.bannerImage && (
                  <img
                    src={event.bannerImage}
                    alt={event.title}
                    className="h-40 w-full object-cover"
                  />
                )}

                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-emerald-50 text-emerald-600 border border-emerald-100">
                      {event.eventType === "FREE"
                        ? "Free"
                        : `₹${event.ticketPrice}`}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                        event.registrationOpen
                          ? "bg-indigo-50 text-indigo-600 border-indigo-100"
                          : "bg-zinc-100 text-zinc-500 border-zinc-200"
                      }`}
                    >
                      {event.registrationOpen ? "Live" : "Closed"}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-zinc-900">
                    {event.title}
                  </h2>
                  <p className="text-sm text-zinc-500 mt-2 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="mt-4 text-sm text-zinc-600">
                    <p className="font-medium">{event.venue}</p>
                    <p>
                      {new Date(event.dateTime).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- Modal ---------------- */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
      
      {/* Close Button */}
      <button 
        onClick={() => setIsModalOpen(false)}
        className="absolute right-6 top-6 p-2 rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 transition-all active:scale-95 z-10"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <div className="px-10 py-8 border-b border-zinc-100 bg-gradient-to-br from-white to-zinc-50/50">
        <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
          Create Event
        </h2>
        <p className="text-zinc-500 mt-1.5">
          Fill in the details below to publish a new event
        </p>
      </div>

      {/* Scrollable Form Area */}
      <form 
        onSubmit={handleSubmit} 
        className="px-10 py-8 space-y-6 overflow-y-auto custom-scrollbar"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Title */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-zinc-700 ml-1">
              Event Title
            </label>
            <input
              required
              placeholder="Next.js Conference 2026"
              className="w-full px-4 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-400"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Slug */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-zinc-700 ml-1">
              Event Slug
            </label>
            <div className="">
              
              <input
                required
                placeholder="nextjs-conference"
                className="w-full  px-3 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-zinc-700 ml-1">
              Event Description
            </label>
            <textarea
              rows={6}
              required
              placeholder="What's this event about?"
              className="w-full px-4 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Date & Venue */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-700 ml-1">Date & Time</label>
            <input
              type="datetime-local"
              required
              className="w-full px-4 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-700 ml-1">Venue</label>
            <input
              required
              placeholder="Bangalore, India"
              className="w-full px-4 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            />
          </div>

          {/* Pricing & Deadline */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-700 ml-1">ticketPrice</label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full px-4 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              value={formData.ticketPrice}
              onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-700 ml-1">Registration Deadline</label>
            <input
              type="datetime-local"
              required
              className="w-full px-4 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
            />
          </div>
        </div>

        {/* Banner */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 ml-1">Banner Image URL(hosted)</label>
          <input
            type="url"
            placeholder="https://..."
            className="w-full px-4 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
            value={formData.bannerImage}
            onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
          />
        </div>

        {/* Toggle */}
        <label className="flex items-center group cursor-pointer w-fit">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={formData.registrationOpen}
              onChange={(e) => setFormData({ ...formData, registrationOpen: e.target.checked })}
              className="peer sr-only"
            />
            <div className="w-10 h-6 bg-zinc-200 peer-checked:bg-indigo-600 rounded-full transition-colors duration-200"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-4"></div>
          </div>
          <span className="ml-3 text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">
            Open registrations immediately
          </span>
        </label>

        {/* Actions */}
        <div className="flex gap-4 pt-4 sticky bottom-0 bg-white/80 backdrop-blur-md mt-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="flex-1 py-4 rounded-2xl text-zinc-600 font-bold hover:bg-zinc-100 active:scale-[0.98] transition-all"
          >
            Discard
          </button>
          <button
            type="submit"
            className="flex-[2] py-4 rounded-2xl bg-gray-800 text-white font-bold shadow-lg shadow-indigo-200 hover:bg-gray-900 active:scale-[0.98] transition-all"
          >
            Publish Event
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}
