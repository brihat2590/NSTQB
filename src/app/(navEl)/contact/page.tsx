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
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (res.ok) {
        toast.success("Email sent successfully, We will get bacjk to you soon!");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error("Failed to send message");
      }
  
      setLoading(false)
      // Simulate API call
      
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
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Send className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900">Send us a Message</CardTitle>
              </div>
              <CardDescription className="text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      required
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject of your message"
                    required
                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Your Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry in detail..."
                    required
                    className="min-h-[140px] border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending your message...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Message
                    </span>
                  )}
                </Button>
              </CardContent>
            </form>
          </Card>

          {/* Contact Information Card */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900">Contact Information</CardTitle>
              </div>
              <CardDescription className="text-gray-600">
                Reach out to us through any of the following channels
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <ContactInfo 
                icon={<Mail className="h-5 w-5 text-blue-600" />} 
                title="Email Address" 
                lines={["info@nstqb.org", "support@nstqb.org"]}
                bgColor="bg-blue-50"
              />
              
              <ContactInfo 
                icon={<Phone className="h-5 w-5 text-green-600" />} 
                title="Phone Numbers" 
                lines={["+977-9851055879", "+977-9841126820", "+977 9801879216"]}
                bgColor="bg-green-50"
              />
              
              <ContactInfo 
                icon={<Clock className="h-5 w-5 text-purple-600" />} 
                title="Working Hours" 
                lines={["Monday - Friday: 9:00 AM - 6:00 PM"]}
                bgColor="bg-purple-50"
              />

              <div className="pt-6 border-t border-gray-100">
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <h3 className="font-semibold text-gray-900">Response Time</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We typically respond within <span className="font-medium text-blue-600">1-2 business days</span>. 
                    For urgent matters, please call us during working hours.
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

function ContactInfo({ icon, title, lines, bgColor }: { icon: React.ReactNode; title: string; lines: string[]; bgColor: string }) {
  const isEmail = title.toLowerCase().includes("email");
  const isPhone = title.toLowerCase().includes("phone");

  return (
    <div className="flex items-start gap-4">
      <div className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-base mb-2">{title}</h3>
        <div className="space-y-1">
          {lines.map((line, index) => {
            const href = isEmail ? `mailto:${line}` : 
                        isPhone ? `tel:${line.replace(/[^\d+]/g, "")}` : "#";
            
            return (
              <div key={index}>
                {isEmail || isPhone ? (
                  <a
                    href={href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline block"
                  >
                    {line}
                  </a>
                ) : (
                  <span className="text-sm text-gray-600 block">{line}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}