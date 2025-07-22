'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Pencil, Trash2, Plus, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  isPaid: boolean;
  price?: number;
  slug: string;
};

export default function AdminPanel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    imageUrl: "",
    isPaid: false,
    price: "",
    slug: ""
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchEvents = () => {
    setLoading(true);
    return fetch("/api/events")
      .then((res) => res.json())
      .then(setEvents)
      .catch(() => toast.error("Failed to fetch events."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
      if (name === "isPaid" && !checked) {
        setForm((prev) => ({ ...prev, price: "" }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.isPaid && (form.price === "" || isNaN(Number(form.price)) || Number(form.price) < 0)) {
      toast.error("Please enter a valid non-negative price for paid events.");
      return;
    }

    setSubmitting(true);
    
    try {
      const eventData = {
        ...form,
        price: form.isPaid ? Number(form.price) : undefined,
      };

      if (editing) {
        const res = await fetch(`/api/events/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventData),
        });

        if (res.ok) {
          toast.success("Event updated successfully!");
        } else {
          toast.error("Failed to update event.");
        }
        setEditing(null);
      } else {
        const res = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventData),
        });

        if (res.ok) {
          toast.success("Event added successfully!");
        } else {
          toast.error("Failed to add event.");
        }
      }

      setForm({
        title: "",
        description: "",
        date: "",
        imageUrl: "",
        isPaid: false,
        price: "",
        slug: ""
      });
      
      fetchEvents();
    } catch (err) {
      toast.error("An error occurred while submitting.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditing(event);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date.slice(0, 16),
      imageUrl: event.imageUrl,
      isPaid: event.isPaid,
      price: event.price != null ? event.price.toString() : "",
      slug: event.slug
    });
    toast.info("Editing event...");
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });

      if (res.ok) {
        toast.success("Event deleted successfully!");
        fetchEvents();
      } else {
        toast.error("Failed to delete event.");
      }
    } catch (err) {
      toast.error("An error occurred while deleting.");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
     
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm">
        <Link href={"/admin"}><ArrowLeft/></Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 mt-2">Event Management Dashboard</h1>
        <p className="text-gray-600 mb-6">Create and manage your events</p>

        {/* Event Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
              <input
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                name="title"
                placeholder="Event Title"
                value={form.title}
                onChange={handleFormChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL Identifier)</label>
              <input
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                name="slug"
                placeholder="e.g., summer-concert"
                value={form.slug}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px]"
              name="description"
              placeholder="Describe your event..."
              value={form.description}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
              <input
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                name="date"
                type="datetime-local"
                value={form.date}
                onChange={handleFormChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>

          <div className="flex items-center pt-1">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="isPaid"
                  checked={form.isPaid}
                  onChange={handleFormChange}
                  className="sr-only"
                />
                <div className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${form.isPaid ? 'bg-blue-500' : 'bg-gray-300'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${form.isPaid ? 'translate-x-4' : ''}`}></div>
                </div>
              </div>
              <span className="text-gray-700 font-medium">Paid Event</span>
            </label>
          </div>

          {form.isPaid && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs.)</label>
              <input
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter amount"
                value={form.price}
                onChange={handleFormChange}
                required={form.isPaid}
              />
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              className={`flex items-center justify-center px-5 py-3 rounded-xl font-medium text-white transition-all ${
                submitting 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow hover:shadow-md'
              }`}
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  {editing ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  {editing ? (
                    <>
                      <Pencil className="w-4 h-4 mr-2" />
                      Update Event
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Event
                    </>
                  )}
                </>
              )}
            </button>
            
            {editing && (
              <button
                type="button"
                className="flex items-center px-5 py-3 text-gray-600 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setEditing(null);
                  setForm({
                    title: "",
                    description: "",
                    date: "",
                    imageUrl: "",
                    isPaid: false,
                    price: "",
                    slug: ""
                  });
                  toast("Edit cancelled");
                }}
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Events List */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
          <span>Your Events</span>
          {loading && <Loader2 className="animate-spin ml-3 h-5 w-5 text-blue-600" />}
        </h2>
        <p className="text-gray-600 mb-6">Manage existing events</p>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-10">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Plus className="text-gray-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No events yet</h3>
            <p className="text-gray-500">Create your first event to get started</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li
                key={event.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md"
              >
                <div className="p-5 flex flex-col sm:flex-row gap-5">
                  <div className="flex-shrink-0">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 sm:w-20 sm:h-20 overflow-hidden">
                      {event.imageUrl ? (
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-xs text-center">No Image</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-lg text-gray-800">{event.title}</h3>
                      <div className="text-sm font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                        {event.isPaid ? `Rs. ${event.price}` : "Free"}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Date:</span>{' '}
                        {new Date(event.date).toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Slug:</span> {event.slug}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:self-center">
                    <button
                      className="flex items-center justify-center px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors"
                      onClick={() => handleEdit(event)}
                    >
                      <Pencil className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </button>
                    
                    <button
                      className="flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      onClick={() => handleDelete(event.id)}
                      disabled={deletingId === event.id}
                    >
                      {deletingId === event.id ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}