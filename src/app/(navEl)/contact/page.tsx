"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Send, Clock, User, MessageSquare } from "lucide-react";
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

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Your message has been sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Contact Us
          </h1>
          <div className="flex justify-center my-6">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            <div className="w-4 h-1 bg-gradient-to-r from-purple-600 to-red-500 rounded-full mx-1"></div>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-600 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-800 font-medium max-w-2xl mx-auto">
            Nepal Software Testing Qualifications Body
          </p>
          <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
            Get in touch with us for any inquiries about software testing certifications and qualifications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Contact Form Card */}
          <Card className="shadow-lg rounded-xl overflow-hidden border border-gray-200 bg-white">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white p-8">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-xl">
                  <Send className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Send us a Message</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit} className="bg-white">
              <CardContent className="py-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium flex items-center gap-2">
                      <User className="h-4 w-4 text-red-600" /> Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-red-600" /> Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      required
                      className="h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-700 font-medium flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-600" /> Subject *
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject of your message"
                    required
                    className="h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700 font-medium flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-600" /> Your Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry in detail..."
                    required
                    className="min-h-[180px] rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 bg-white"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 text-base font-bold rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] mt-5"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending your message...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="mr-3 h-5 w-5" />
                        Submit Message
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>

          {/* Contact Information Card */}
          <Card className="shadow-lg rounded-xl overflow-hidden border border-gray-200 bg-white">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white ">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-xl">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Contact Information</CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    Reach out to us through any of the following channels
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-white">
              <div className="space-y-8">
                <ContactInfo 
                  icon={<Mail className="h-6 w-6 text-blue-600" />} 
                  title="Email Address" 
                  lines={["info@nstqb.org", "support@nstqb.org"]} 
                />
                
                <ContactInfo 
                  icon={<Phone className="h-6 w-6 text-red-600" />} 
                  title="Phone Numbers" 
                  lines={["+977-9851055879", "+977-9841126820", "+977 9801879216"]} 
                />
                
                <ContactInfo 
                  icon={<Clock className="h-6 w-6 text-blue-600" />} 
                  title="Working Hours" 
                  lines={["Monday - Friday: 9:00 AM - 6:00 PM"]} 
                />
              </div>

              <div className="mt-10 pt-6 border-t border-gray-100">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-red-600" /> Response Time
                  </h3>
                  <p className="text-gray-700">
                    We typically respond to inquiries within <span className="font-bold text-blue-700">1-2 business days</span>. 
                    For urgent matters, please call us directly during our working hours.
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
  const isEmail = title.toLowerCase().includes("email");
  const isPhone = title.toLowerCase().includes("phone");

  return (
    <div className="flex items-start gap-5">
      <div className="bg-gray-100 p-3 rounded-xl border border-gray-200">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-lg mb-3">{title}</h3>
        {lines.map((line, index) => {
          const href = isEmail ? `mailto:${line}` : 
                      isPhone ? `tel:${line.replace(/[^\d+]/g, "")}` : "#";
          
          return (
            <div key={index} className="mb-2 last:mb-0">
              <a
                href={href}
                className={`text-gray-800 hover:text-blue-600 transition-colors duration-200 flex items-start gap-2 ${
                  !isEmail && !isPhone ? "cursor-default" : ""
                }`}
              >
                {isEmail || isPhone ? (
                  <span className="block hover:underline">{line}</span>
                ) : (
                  <span className="block">{line}</span>
                )}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}