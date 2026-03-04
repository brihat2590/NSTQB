'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, Send } from 'lucide-react';
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

const fields = [
  { field: "name",    type: "text",  label: "Full Name",     colSpan: false },
  { field: "email",   type: "email", label: "Email Address", colSpan: false },
  { field: "subject", type: "text",  label: "Subject",       colSpan: true  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactProps>({
    name: "", email: "", subject: "", message: "",
  });
  const [loading, setLoading]   = useState(false);
  const [focused, setFocused]   = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !formData.subject) {
      toast.error("Please fill in all fields");
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
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 md:p-10">
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .fade-up   { animation: fadeUp 0.6s ease-out both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.20s; }

        @keyframes imageFade {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1);    }
        }
        .image-fade { animation: imageFade 1s ease-out both; }

        .field-line {
          position: absolute;
          bottom: 0; left: 0;
          height: 1.5px;
          width: 0;
          background: linear-gradient(90deg, #111827, #6b7280);
          transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 2px;
        }
        .field-wrap:focus-within .field-line { width: 100%; }

        input::placeholder,
        textarea::placeholder { color: #d1d5db; }

        .btn-shimmer {
          position: relative;
          overflow: hidden;
        }
        .btn-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .btn-shimmer:hover::after { transform: translateX(100%); }

        /* frosted icon boxes on right panel */
        .icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem; height: 2rem;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(4px);
          flex-shrink: 0;
        }

        /* inner border on image panel */
        .inner-border {
          position: absolute;
          inset: 1rem;
          border-radius: 1rem;
          border: 1px solid rgba(255,255,255,0.05);
          pointer-events: none;
        }

        /* bottom divider on image panel */
        .panel-divider {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
      `}</style>

      {/* ── Outer border card ── */}
      <div className="w-full max-w-6xl border border-neutral-200 rounded-sm overflow-hidden shadow-[0_8px_48px_rgba(0,0,0,0.08)] grid md:grid-cols-[1fr_420px] fade-up fade-up-1">

        {/* ═══════════════════ LEFT — Form ═══════════════════ */}
        <div className="bg-white px-8 py-12 md:px-14 md:py-16 flex flex-col justify-center">

          
          

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-[1.1] mb-3">
            Get in<br />
            <span className="text-neutral-400 font-light italic">Touch.</span>
          </h1>
          <p className="text-xs text-gray-400 mb-10 max-w-xs leading-relaxed">
            Drop us a message and we'll get back to you within one business day.
          </p>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            <div className="grid grid-cols-2 gap-5">
              {fields.map(({ field, type, label, colSpan }) => (
                <div
                  key={field}
                  className={`field-wrap relative pb-px ${colSpan ? "col-span-2" : "col-span-1"}`}
                >
                  <label className="block text-[9px] font-bold tracking-[0.22em] text-gray-300 uppercase mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={formData[field as keyof ContactProps]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    onFocus={() => setFocused(field)}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent text-sm text-gray-900 pb-2.5 focus:outline-none border-b border-neutral-100"
                  />
                  <span className="field-line" />
                </div>
              ))}
            </div>

            {/* Message */}
            <div className="field-wrap relative pb-px pt-1">
              <label className="block text-[9px] font-bold tracking-[0.22em] text-gray-300 uppercase mb-2">
                Message
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent text-sm text-gray-900 pb-2.5 focus:outline-none border-b border-neutral-100 resize-none"
              />
              <span className="field-line" />
            </div>

            {/* Submit */}
            <div className="pt-3 flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-shimmer group inline-flex items-center gap-3 bg-gray-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-800"
              >
                {loading ? (
                  <>
                    <span className="h-3 w-3 border-[1.5px] border-white border-t-transparent rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-3 w-3" />
                    Send Message
                    <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
              <span className="text-[9px] text-gray-300 leading-relaxed max-w-[120px]">
                We reply within 1 business day
              </span>
            </div>
          </form>

          {/* Mobile contact info */}
          <div className="mt-10 pt-8 border-t border-neutral-100 grid grid-cols-2 gap-4 md:hidden">
            {contactDetails.map(({ icon: Icon, value, href }) => (
              <div key={value} className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-neutral-50 border border-neutral-100 shrink-0">
                  <Icon className="h-3 w-3 text-gray-400" />
                </div>
                {href
                  ? <a href={href} className="text-xs text-gray-500 hover:text-gray-900 transition-colors">{value}</a>
                  : <span className="text-xs text-gray-500">{value}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════ RIGHT — Image Panel ═══════════════════ */}
        <div className="relative hidden md:flex flex-col image-fade min-h-150">

          <img
            src="https://plus.unsplash.com/premium_photo-1670782711832-bf4d7638114a?q=80&w=2215&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Modern architecture"
            // width={900}
            // height={1200}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Layered gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-gray-900/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/20 to-transparent" />

          {/* Accent line */}
          <div className="absolute inset-y-8 right-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* Inner border — moved to CSS class to avoid invalid Tailwind fraction */}
          <div className="inner-border" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between h-full p-9">

            {/* Top label */}
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              <span className="text-[9px] font-semibold tracking-[0.25em] text-white/30 uppercase">
                NSTQB
              </span>
            </div>

            {/* Bottom */}
            <div className=''>
              <p className="text-[12px] font-bold tracking-[0.22em] mb-2 text-white/80 text-center uppercase ">
                Contact Info
              </p>

              <div className="space-y-4">
                {contactDetails.map(({ icon: Icon, value, href }) => (
                  <div key={value} className="flex justify-center items-center  gap-3.5">
                    {/* Icon box — uses .icon-box CSS class instead of bg-white/8 */}
                    {/* <div className="icon-box">
                      <Icon className="h-3.5 w-3.5 text-white/60" />
                    </div> */}
                    {href ? (
                      <a href={href} className="text-xs text-white/60 hover:text-white transition-colors duration-150">
                        {value}
                      </a>
                    ) : (
                      <span className="text-xs text-white/60">{value}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Divider — uses .panel-divider CSS class instead of border-white/8 */}
              <div className="panel-divider">
                <p className="text-[9px] text-white/20 tracking-widest uppercase">
                  Nepal Software Testing Qualifications Body
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}