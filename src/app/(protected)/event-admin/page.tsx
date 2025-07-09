'use client';

import { useEffect, useState } from "react";
import { toast } from "sonner";

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  isPaid: boolean;
  price?: number;
  slug:string
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
    slug:""
  });

  const fetchEvents = () =>
    fetch("/api/events")
      .then((res) => res.json())
      .then(setEvents)
      .catch(() => toast.error("Failed to fetch events."));

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target=e.target as HTMLInputElement
    const { name, value, type, checked } = target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
      // If unchecked isPaid, clear price
      if (name === "isPaid" && !checked) {
        setForm((prev) => ({ ...prev, price: "" }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate price if isPaid is true
    if (form.isPaid && (form.price === "" || isNaN(Number(form.price)) || Number(form.price) < 0)) {
      toast.error("Please enter a valid non-negative price for paid events.");
      return;
    }

    try {
      if (editing) {
        const res = await fetch(`/api/events/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            price: form.isPaid ? Number(form.price) : undefined,
          }),
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
          body: JSON.stringify({
            ...form,
            price: form.isPaid ? Number(form.price) : undefined,
          }),
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
        slug:""
      });
      fetchEvents();
    } catch (err) {
      toast.error("An error occurred while submitting.");
      console.error(err);
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
      slug:event.slug
    });
    toast.info("Editing event...");
  };

  const handleDelete = async (id: number) => {
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
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel – Manage Events</h1>

      {/* Event Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-8 space-y-4"
      >
        <input
          className="border p-2 rounded w-full"
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleFormChange}
          required
        />
         <input
          className="border p-2 rounded w-full"
          name="slug"
          placeholder="Event Slug (for URL)"
          value={form.slug}
          onChange={handleFormChange}
          required/>
        <textarea
          className="border p-2 rounded w-full"
          name="description"
          placeholder="Event Description"
          value={form.description}
          onChange={handleFormChange}
          required
        />
        <input
          className="border p-2 rounded w-full"
          name="date"
          type="datetime-local"
          value={form.date}
          onChange={handleFormChange}
          required
        />
        <input
          className="border p-2 rounded w-full"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleFormChange}
          required
        />
       

        {/* isPaid checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPaid"
            checked={form.isPaid}
            onChange={handleFormChange}
          />
          <span>Is Paid Event?</span>
        </label>

        {/* price input shown only if isPaid */}
        {form.isPaid && (
          <input
            className="border p-2 rounded w-full"
            name="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="Price (Rs.)"
            value={form.price}
            onChange={handleFormChange}
            required={form.isPaid}
          />
        )}

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          {editing ? "Update Event" : "Add Event"}
        </button>
        {editing && (
          <button
            type="button"
            className="ml-2 text-gray-600 underline"
            onClick={() => {
              setEditing(null);
              setForm({
                title: "",
                description: "",
                date: "",
                imageUrl: "",
                isPaid: false,
                price: "",
                slug:""
              });
              toast("Edit cancelled");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Events List */}
      <ul>
        {events.map((event) => (
          <li
            key={event.id}
            className="flex items-center border-b py-4 gap-4"
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-24 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <div className="font-semibold">{event.title}</div>
              <div className="text-sm text-gray-500">
                {new Date(event.date).toLocaleString()}
              </div>
              <div className="text-sm">{event.description}</div>
              <div className="text-sm mt-1">
                {event.isPaid ? (
                  <span className="font-semibold text-red-600">
                    Paid: Rs.{event.price}
                  </span>
                ) : (
                  <span className="font-semibold text-green-600">Free Event</span>
                )}
              </div>
            </div>
            <button
              className="bg-yellow-400 text-black px-2 py-1 rounded mr-2"
              onClick={() => handleEdit(event)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(event.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
