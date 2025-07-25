'use client';

import React, {use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: 0,
    eventId: 0
  });

  const [event, setEvent] = useState<Event | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    fetch('/api/events')
      .then(res => res.json())
      .then((data: Event[]) => {
        const matched = data.find(ev => ev.slug === slug);
        setEvent(matched || null);
        setPageLoading(false);
      })
      .catch(() => setPageLoading(false));
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    setIsSubmitting(true);
    const { isPaid, price, id: eventId } = event;

    const updatedFormData = {
      ...formData,
      eventId,
      amount: price || 0,
    };
    setFormData(updatedFormData);

    try {
      if (isPaid && price) {
        toast.success("Payment process initiated");

        const res = await fetch('/api/esewa/initiate', {
          method: 'POST',
          body: JSON.stringify(updatedFormData),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Failed to initiate payment');

        const { paymentUrl, params } = await res.json();
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = paymentUrl;
        form.style.display = 'none';

        const addField = (name: string, value: string) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          form.appendChild(input);
        };

        addField('amount', params.total_amount);
        addField('tax_amount', params.tax_amount);
        addField('total_amount', params.total_amount);
        addField('transaction_uuid', params.transaction_uuid);
        addField('product_code', params.product_code);
        addField('product_service_charge', params.product_service_charge);
        addField('product_delivery_charge', params.product_delivery_charge);
        addField('signed_field_names', params.signed_field_names);
        addField('signature', params.signature);
        addField('success_url', params.success_url);
        addField('failure_url', params.failure_url);

        document.body.appendChild(form);
        form.submit();
      } else {
        const res = await fetch('/api/event-registration', {
          method: 'POST',
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            eventId
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.status === 409) {
          toast.error("You have already registered for the event. Thank you!");
        } else if (res.ok) {
          toast.success('Successfully registered for the event!');
          setSuccess(true);
          setFormData({ name: '', email: '', amount: 0, eventId: 0 });
        } else {
          throw new Error('Registration failed');
        }
      }
    } catch (error) {
      toast.error('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mb-6" />
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

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative">
            <div className="aspect-[2/1] md:aspect-[4/1] max-h-64 md:max-h-80 overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute top-6 right-6">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isUpcoming ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {isUpcoming ? 'Upcoming' : 'Past Event'}
              </span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">
                  {eventDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">
                  {eventDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8 whitespace-pre-wrap">
              {event.description}
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Pricing</h3>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
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
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 w-full md:w-auto max-w-sm"
                  >
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="border px-4 py-2 rounded-md"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="border px-4 py-2 rounded-md"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    <button
                      type="submit"
                      disabled={!formData.name.trim() || !formData.email.trim() || isSubmitting}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                        !formData.name.trim() || !formData.email.trim() || isSubmitting
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-5 w-5" />
                          {event.isPaid ? 'Processing Payment...' : 'Registering...'}
                        </>
                      ) : event.isPaid ? (
                        'Pay with eSewa'
                      ) : (
                        'Join Event'
                      )}
                    </button>
                    {success && (
                      <p className="text-green-600 text-sm mt-1">Successfully registered!</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
