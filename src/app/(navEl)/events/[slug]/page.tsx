'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, MapPin, Users, Clock } from 'lucide-react';

type Event = {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  imageUrl: string;
  isPaid: boolean;
  price?: number;
};

export default function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then((data: Event[]) => {
        const matched = data.find(ev => ev.slug === slug);
        setEvent(matched || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mb-6"></div>
          <p className="text-gray-600 text-lg">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎫</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-all duration-200 hover:translate-x-[-2px]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to Events</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Event Image */}
          <div className="relative">
            <div className="aspect-[2/1] md:aspect-[4/1] max-h-64 md:max-h-80 overflow-hidden">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>
            
            {/* Event Status Badge */}
            <div className="absolute top-6 right-6">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                isUpcoming 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {isUpcoming ? 'Upcoming' : 'Past Event'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Event Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {event.title}
              </h1>

              {/* Event Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-medium">
                    {eventDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-medium">
                    {eventDate.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="mb-8">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <div className="whitespace-pre-wrap">{event.description}</div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Pricing</h3>
              <div className="flex items-center justify-between">
                <div>
                  {event.isPaid ? (
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₹{event.price}</span>
                      <span className="text-gray-600 ml-2">per person</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-2xl font-bold text-green-600">Free</span>
                      <span className="text-gray-600 ml-2">event</span>
                    </div>
                  )}
                </div>
                
                {isUpcoming && (
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    {event.isPaid ? 'Register Now' : 'Join Event'}
                  </button>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Event Details</h4>
                <p className="text-gray-600 text-sm">
                  This is a {event.isPaid ? 'paid' : 'free'} event. 
                  {event.isPaid && ` Registration fee: ₹${event.price}`}
                </p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
                <p className="text-gray-600 text-sm">
                  {isUpcoming ? 'Registration is open' : 'This event has ended'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}