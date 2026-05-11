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
    <div className="min-h-screen bg-neutral-50 px-6 py-12 md:py-16">
      <div className="mx-auto w-full max-w-5xl mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl text-center font-semibold tracking-tight text-neutral-900 mb-6">
  Contact Us
</h1>
      </div>

      <div className="mx-auto w-full max-w-5xl grid md:grid-cols-[1fr_380px] border border-neutral-100 shadow-sm bg-white">
        
        {/* LEFT — Enhanced Form */}
        <div className="bg-white p-8 md:p-12 lg:p-14">
          <header className="mb-8 md:mb-10">
            <span className="text-[10px] tracking-[0.3em] text-red-800 font-bold uppercase">Get In Touch</span>
            <h2 className="text-3xl font-light text-neutral-900 mt-2">How can we help you?</h2>
            <p className="text-sm text-neutral-500 mt-3 max-w-md">
              Share your question or feedback and our team will get back to you as soon as possible.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: "Name", key: "name", type: "text" },
                { label: "Email", key: "email", type: "email" },
              ].map((f) => (
                <div key={f.key} className="group">
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2">{f.label}</label>
                  <input
                    type={f.type}
                    value={formData[f.key as keyof ContactProps]}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    className="w-full h-11 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm text-neutral-800 outline-none transition-all placeholder:text-neutral-400 focus:border-red-700 focus:bg-white focus:ring-2 focus:ring-red-100"
                    placeholder={`Enter your ${f.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full h-11 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm text-neutral-800 outline-none transition-all placeholder:text-neutral-400 focus:border-red-700 focus:bg-white focus:ring-2 focus:ring-red-100"
                placeholder="What is this about?"
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Message</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-3 text-sm text-neutral-800 outline-none transition-all placeholder:text-neutral-400 resize-none focus:border-red-700 focus:bg-white focus:ring-2 focus:ring-red-100"
                placeholder="Write your message here..."
              />
            </div>

            <button
              disabled={loading}
              className="inline-flex h-11 items-center justify-center gap-3 rounded-md bg-red-800 px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-red-900 disabled:opacity-40 disabled:cursor-not-allowed group"
            >
              {loading ? "Sending..." : "Send Message"}
              {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />}
            </button>

            <p className="text-xs text-neutral-500 pt-1">We usually respond within 1-2 business days.</p>
          </form>
        </div>

        {/* RIGHT — Image + Hover Contact Details */}
        <div className="group relative hidden md:block bg-neutral-900 overflow-hidden">
          <img
            src="https://plus.unsplash.com/premium_photo-1670782711832-bf4d7638114a?q=80&w=2215&auto=format&fit=crop"
            alt="NSTQB Office"
            className="absolute inset-0 w-full h-full object-cover opacity-45 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-red-900/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative h-full p-12 flex flex-col justify-between z-10 text-white">
            <div className="border-l-2 border-red-800 pl-6">
              <p className="text-xs font-medium tracking-tight text-neutral-200 transition-colors duration-300 hover:text-white-900 ">
                Nepal Software Testing <br /> Qualifications Body
              </p>
            </div>

            <div className="space-y-6 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              {contactDetails.map(({ icon: Icon, value, href }) => (
                <div key={value} className="flex items-center gap-4">
                  <Icon className="h-4 w-4 text-amber-200" />
                  {href ? (
                    <a href={href} className="text-[13px] text-amber-50/90 hover:text-white transition-colors">
                      {value}
                    </a>
                  ) : (
                    <span className="text-[13px] text-amber-50/90">{value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:hidden border-t border-neutral-100 bg-white p-6">
          <p className="text-[10px] tracking-[0.2em] text-red-800 font-semibold uppercase mb-4">NSTQB Contact</p>
          <div className="space-y-3">
            {contactDetails.map(({ icon: Icon, value, href }) => (
              <div key={value} className="flex items-center gap-3 text-neutral-700">
                <Icon className="h-4 w-4 text-red-700" />
                {href ? (
                  <a href={href} className="text-sm hover:text-red-800 transition-colors">
                    {value}
                  </a>
                ) : (
                  <span className="text-sm">{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}