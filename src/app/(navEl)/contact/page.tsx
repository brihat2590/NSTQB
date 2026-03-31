'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface ContactProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactDetails = [
  { icon: Mail,   value: "info@nstqb.org",   href: "mailto:info@nstqb.org" },
  { icon: Phone,  value: "+977-9851055879",   href: "tel:+9779851055879"    },
  { icon: MapPin, value: "Kathmandu, Nepal",  href: undefined               },
  { icon: Clock,  value: "09:00 – 18:00",     href: undefined               },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactProps>({
    name: "", email: "", subject: "", message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !formData.subject) {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Message sent.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Error sending message.");
      }
    } catch (err: any) {
      toast.error("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-[1fr_380px] border border-neutral-100 shadow-sm">
        
        {/* LEFT — Minimalist Form */}
        <div className="bg-white p-8 md:p-16">
          <header className="mb-12">
            <span className="text-[10px] tracking-[0.3em] text-red-800 font-bold uppercase">Contact Us</span>
            <h1 className="text-3xl font-light text-neutral-900 mt-2">Let's start a conversation.</h1>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: "Name", key: "name", type: "text" },
                { label: "Email", key: "email", type: "email" },
              ].map((f) => (
                <div key={f.key} className="group">
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    value={formData[f.key as keyof ContactProps]}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    className="w-full py-2 border-b border-neutral-200 focus:border-red-800 outline-none transition-colors text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full py-2 border-b border-neutral-200 focus:border-red-800 outline-none transition-colors text-sm"
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-widest text-neutral-400 mb-1">Message</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full py-2 border-b border-neutral-200 focus:border-red-800 outline-none transition-colors text-sm resize-none"
              />
            </div>

            <button
              disabled={loading}
              className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-red-800 hover:text-red-900 transition-all disabled:opacity-30 group"
            >
              {loading ? "Sending..." : "Send Message"}
              {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />}
            </button>
          </form>
        </div>

        {/* RIGHT — Solid Image Panel (No Gradient) */}
        <div className="relative hidden md:block bg-neutral-900">
          <img
            src="https://plus.unsplash.com/premium_photo-1670782711832-bf4d7638114a?q=80&w=2215&auto=format&fit=crop"
            alt="NSTQB Office"
            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
          />
          
          <div className="relative h-full p-12 flex flex-col justify-between z-10 text-white">
            <div className="border-l-2 border-red-800 pl-6">
              <p className="text-xs font-medium tracking-tight text-neutral-300">
                Nepal Software Testing <br /> Qualifications Body
              </p>
            </div>

            <div className="space-y-6">
              {contactDetails.map(({ icon: Icon, value, href }) => (
                <div key={value} className="flex items-center gap-4">
                  <Icon className="h-4 w-4 text-red-800" />
                  {href ? (
                    <a href={href} className="text-[13px] text-neutral-300 hover:text-white transition-colors">
                      {value}
                    </a>
                  ) : (
                    <span className="text-[13px] text-neutral-300">{value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}