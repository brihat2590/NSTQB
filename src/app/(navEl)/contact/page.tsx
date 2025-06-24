"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
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
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-800 to-red-800 text-transparent bg-clip-text pb-2 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nepal Software Testing Qualifications Body
          </p>
          <p className="text-gray-500 mt-2">
            Get in touch with us for any inquiries about software testing certifications and qualifications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter the subject of your inquiry"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your inquiry in detail..."
                    required
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 text-base font-medium bg-gradient-to-r from-red-500 to-blue-500"
                >
                  {loading ? "Sending..." : "Submit Message"}
                </Button>
              </CardContent>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Contact Information</CardTitle>
                <CardDescription>Reach out to us through any of the following channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ContactInfo icon={<Mail className="h-6 w-6 text-blue-600" />} title="Email" lines={["info@nstqb.org.np", "support@nstqb.org.np"]} />
                <ContactInfo icon={<Phone className="h-6 w-6 text-green-600" />} title="Phone" lines={["+977-9851055879", "+977-9841126820"]} />
                <ContactInfo
                  icon={<MapPin className="h-6 w-6 text-red-600" />}
                  title="Address"
                  lines={[
                    "Kathmandu, Nepal",
                    "Software Testing Center",
                    "Bagmati Province",
                  ]}
                />
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-blue-900 mb-2">Office Hours</h3>
                <div className="space-y-1 text-blue-800">
                  <p>Sunday - Thursday: 10:00 AM - 5:00 PM</p>
                  <p>Friday: 10:00 AM - 3:00 PM</p>
                  <p>Saturday: Closed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {lines.map((line, index) => (
          <p key={index} className="text-gray-600">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
