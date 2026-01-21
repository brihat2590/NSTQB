"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronLeft,  } from "lucide-react";
import Link from "next/link";

type Speaker = {
  id: string;
  name: string;
  bio: string;
  photo: string;
};

type Registration = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

type EventForm = {
  title: string;
  slug: string;
  description: string;
  dateTime: Date;
  venue: string;
  eventType: "FREE" 
  ticketPrice?: number;
  registrationOpen: boolean;
  registrationDeadline?: Date;
  bannerImage?: string;
}

export default function EventAdminDetail() {
  const { slug } = useParams<{ slug: string }>();
  const router=useRouter();

  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  // Modals & Forms
  const [openSpeakerModal, setOpenSpeakerModal] = useState(false);
  const [openRegModal, setOpenRegModal] = useState(false);
  
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [editingReg, setEditingReg] = useState<Registration | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function fetchData() {
    const [sRes, rRes] = await Promise.all([
      fetch(`/api/events/${slug}/speakers`),
      fetch(`/api/events/${slug}/register`)
    ]);

    const sData = await sRes.json();
    const rData = await rRes.json();

    setSpeakers(sData.speakers || []);
    setRegistrations(rData.registrations || []);
  }

  useEffect(() => {
    fetchData();
  }, [slug]);

  /* ---------------- SPEAKER ACTIONS ---------------- */

  function openAddSpeaker() {
    setEditingSpeaker(null);
    setName("");
    setBio("");
    setPhoto("");
    setOpenSpeakerModal(true);
  }

  function openEditSpeaker(speaker: Speaker) {
    setEditingSpeaker(speaker);
    setName(speaker.name);
    setBio(speaker.bio);
    setPhoto(speaker.photo || "");
    setOpenSpeakerModal(true);
  }

  const deleteEvent=async()=>{
    try{

      const response=await fetch(`/api/events/${slug}`,{
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
        

      }) 
      if(response.ok){
        toast.success("Event deleted successfully");
        router.push("/events-admin")
      }
      else{
        toast.error("Failed to delete event");
      }

    }
    catch(err){
      toast.error("An error occurred while deleting the event");
      console.log(err);
      
    }
  }

  async function saveSpeaker() {
    const url = editingSpeaker
      ? `/api/events/${slug}/speakers/${editingSpeaker.id}`
      : `/api/events/${slug}/speakers`;

    const method = editingSpeaker ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, bio, photo })
    });

    if (!res.ok) {
      toast.error("Failed to save speaker");
      return;
    }

    toast.success(editingSpeaker ? "Speaker updated" : "Speaker added");
    setOpenSpeakerModal(false);
    fetchData();
  }

  async function deleteSpeaker(id: string) {
    await fetch(`/api/events/${slug}/speakers/${id}`, { method: "DELETE" });
    toast.success("Speaker removed");
    fetchData();
  }

  /* ---------------- REGISTRATION ACTIONS ---------------- */

  function openEditReg(reg: Registration) {
    setEditingReg(reg);
    setName(reg.name);
    setEmail(reg.email);
    setPhone(reg.phone || "");
    setOpenRegModal(true);
  }

  async function saveRegistration() {
    if (!editingReg) return;

    const res = await fetch(`/api/events/${slug}/register/${editingReg.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone })
    });

    if (!res.ok) {
      toast.error("Failed to update registration");
      return;
    }

    toast.success("Registration updated");
    setOpenRegModal(false);
    fetchData();
  }

  async function deleteRegistration(id: string) {
    await fetch(`/api/events/${slug}/register/${id}`, { method: "DELETE" });
    toast.success("Registration removed");
    fetchData();
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12 bg-zinc-50 min-h-screen">
      {/* ---------------- HEADER ---------------- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
        <div>
          <div className="flex gap-2 items-center">
            <Link href="/events-admin"><ChevronLeft/></Link>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Event Control Panel
          </h1>

          </div>
          <p className="text-zinc-500 mt-1 pl-4">Manage your event speakers and guest list.</p>
        </div>

        <button
          onClick={openAddSpeaker}
          className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
        >
          + Add New Speaker
        </button>
      </div>

      <div className="grid lg:grid-cols-1 gap-12">
        {/* ---------------- SPEAKERS ---------------- */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold text-zinc-800">Speakers</h2>
            <span className="bg-zinc-200 text-zinc-700 text-xs px-2 py-0.5 rounded-full">{speakers.length}</span>
          </div>

          {speakers.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-zinc-200">
              <p className="text-zinc-400">No speakers assigned to this event.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {speakers.map(s => (
                <div key={s.id} className="group bg-white p-6 rounded-xl border border-zinc-200 hover:border-indigo-300 transition-all hover:shadow-lg">
                  <div className="flex gap-4">
                    <div className="h-16 w-16 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden flex-shrink-0">
                      {s.photo ? (
                        <img src={s.photo} alt={s.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-zinc-400 text-xs text-center">No Photo</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">{s.name}</h3>
                      <p className="text-sm text-zinc-500 line-clamp-2 mt-1 leading-relaxed">{s.bio}</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-zinc-100">
                    <button onClick={() => openEditSpeaker(s)} className="text-sm font-semibold text-zinc-600 hover:text-indigo-600 transition-colors">
                      Edit Details
                    </button>
                    <button onClick={() => deleteSpeaker(s.id)} className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ---------------- REGISTRATIONS ---------------- */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold text-zinc-800">Registrations</h2>
            <span className="bg-zinc-200 text-zinc-700 text-xs px-2 py-0.5 rounded-full">{registrations.length}</span>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/50 border-b border-zinc-200">
                  <th className="p-4 font-semibold text-zinc-700 text-sm">Attendee</th>
                  <th className="p-4 font-semibold text-zinc-700 text-sm">Contact Information</th>
                  <th className="p-4 font-semibold text-zinc-700 text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {registrations.map(r => (
                  <tr key={r.id} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-zinc-900">{r.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-zinc-600">{r.email}</div>
                      <div className="text-xs text-zinc-400">{r.phone || "No phone provided"}</div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => openEditReg(r)} className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded hover:bg-indigo-100">
                          Edit
                        </button>
                        <button onClick={() => deleteRegistration(r.id)} className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* ---------------- SPEAKER MODAL ---------------- */}
      {openSpeakerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={() => setOpenSpeakerModal(false)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-zinc-900 mb-6">
              {editingSpeaker ? "Update Speaker Profile" : "Add New Speaker"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1 block">Full Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full border border-zinc-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1 block">Photo URL</label>
                <input
                  value={photo}
                  onChange={e => setPhoto(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full border border-zinc-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1 block">Biography</label>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="Tell us about the speaker..."
                  rows={4}
                  className="w-full border border-zinc-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setOpenSpeakerModal(false)}
                className="px-5 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveSpeaker}
                className="px-5 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
              >
                {editingSpeaker ? "Save Changes" : "Add Speaker"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- REGISTRATION MODAL ---------------- */}
      {openRegModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={() => setOpenRegModal(false)} />
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-zinc-900 mb-6">Edit Registration</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1 block">Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-zinc-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1 block">Email Address</label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-zinc-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1 block">Phone Number</label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full border border-zinc-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setOpenRegModal(false)}
                className="px-5 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveRegistration}
                className="px-5 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
              >
                Update Registration
              </button>
            </div>
          </div>
        </div>
      )}

      <button onClick={deleteEvent} className="mt-8 px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all shadow-md shadow-red-100">{`Delete this event`}</button>
    </div>
  );
}