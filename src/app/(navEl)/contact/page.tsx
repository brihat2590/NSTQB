"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message.");

      toast.success("Your message has been sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight pb-2 mb-4">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nepal Software Testing Qualifications Body
          </p>
          <p className="text-gray-500 mt-4 max-w-3xl mx-auto">
            Get in touch with us for any inquiries about software testing certifications and qualifications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Contact Form */}
          <Card className="shadow-lg border-0 rounded-xl overflow-hidden flex flex-col">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Send className="h-6 w-6 text-red-700" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Send us a Message</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit} className="flex-grow">
              <CardContent className="p-8 space-y-6 flex flex-col h-full">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-gray-700 font-medium">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                      className="h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-gray-700 font-medium">Your Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your inquiry in detail..."
                      required
                      className="min-h-[150px] resize-none rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 text-base font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="mr-2 h-5 w-5" />
                        Submit Message
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>

          {/* Contact Info */}
          <Card className="shadow-lg border-0 rounded-xl overflow-hidden flex flex-col">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 border-b">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Contact Information</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    Reach out to us through any of the following channels
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 flex flex-col h-full">
              <div className="space-y-8">
                <ContactInfo 
                  icon={<Mail className="h-6 w-6 text-blue-600" />} 
                  title="Email" 
                  lines={["info@nstqb.org.np", "support@nstqb.org.np"]} 
                />
                <ContactInfo 
                  icon={<Phone className="h-6 w-6 text-green-600" />} 
                  title="Phone" 
                  lines={["+977-9851055879", "+977-9841126820", "+977 9801879216"]} 
                />
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-100">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-3">Response Time</h3>
                  <p className="text-gray-700">
                    We typically respond to inquiries within 1-2 business days. For urgent matters, please call us directly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="flex items-start gap-5">
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
        {lines.map((line, index) => (
          <p key={index} className="text-gray-700 mb-1 last:mb-0">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}