"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      formData.ticketPrice === "" ? 0 : parseFloat(formData.ticketPrice);

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
          dateTime: formData.dateTime,
          eventType,
          ticketPrice: price === 0 ? null : price,
          registrationOpen: formData.registrationOpen,
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
            <h1 className="text-3xl font-bold text-zinc-900">Events</h1>
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Create event</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <input
                required
                placeholder="Event title"
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              {/* Slug */}
              <input
                required
                placeholder="event-slug"
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
              />

              {/* Description */}
              <textarea
                rows={3}
                required
                placeholder="Event description"
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200 resize-none"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />

              {/* Date + Venue */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="datetime-local"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dateTime: e.target.value,
                    })
                  }
                />

                <input
                  required
                  placeholder="Venue / location"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200"
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      venue: e.target.value,
                    })
                  }
                />
              </div>

              {/* Ticket Price */}
              <input
                type="number"
                min={0}
                step="0.01"
                placeholder="Ticket price (0 for free event)"
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200"
                value={formData.ticketPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ticketPrice: e.target.value,
                  })
                }
              />

              {/* Banner Image */}
              <input
                type="url"
                placeholder="Banner image URL (optional)"
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-200"
                value={formData.bannerImage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bannerImage: e.target.value,
                  })
                }
              />

              {/* Registration toggle */}
              <label className="flex items-center gap-3 text-sm text-zinc-600">
                <input
                  type="checkbox"
                  checked={formData.registrationOpen}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationOpen: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded border-zinc-300 text-indigo-600"
                />
                Open registrations immediately
              </label>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl text-zinc-500 hover:bg-zinc-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                >
                  Create event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
