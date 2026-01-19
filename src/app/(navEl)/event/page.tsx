'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  isPaid: boolean;
  slug:string,
  price?: number;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('/api/event')
      .then(res => res.json())
      .then(setEvents);
  }, []);

  const now = new Date();

  // Filter upcoming (>= now)
  const upcomingEvents = events.filter(event => new Date(event.date) >= now);
  // Filter past (< now)
  const pastEvents = events.filter(event => new Date(event.date) < now);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Events
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Upcoming Events */}
        <section className="mb-20">
          <div className="flex items-center mb-8">
            <div className="flex-shrink-0 w-1 h-8 bg-gradient-to-b from-green-400 to-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
          </div>
          {upcomingEvents.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg text-gray-500 font-medium">No upcoming events scheduled.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map(ev => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          )}
        </section>

        {/* Past Events */}
        <section>
          <div className="flex items-center mb-8">
            <div className="flex-shrink-0 w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-gray-900">Past Events</h2>
          </div>
          {pastEvents.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-lg text-gray-500 font-medium">No past events to show.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map(ev => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  return (

    <Link href={`/event/${event.slug}`} className="no-underline">
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4">
          {event.isPaid ? (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Paid
            </div>
          ) : (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Free
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {event.title}
        </h3>
        
        <div className="flex items-center mb-4 text-gray-500">
          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <time className="text-sm font-medium">
            {new Date(event.date).toLocaleString(undefined, {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </time>
        </div>
        
        <p className="text-gray-600 flex-grow leading-relaxed mb-4 line-clamp-3">
          {event.description}
        </p>
        
        <div className="pt-4 border-t border-gray-100">
          {event.isPaid ? (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Event Fee</span>
              <span className="text-xl font-bold text-red-600">
                Rs.{event.price ?? 'N/A'}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-lg font-bold text-green-600 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free Event
              </span>
            </div>
          )}
        </div>
        <div className="text-center text-yel">Register</div>
      </div>
    </div>
    </Link>
  );
}