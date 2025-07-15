'use client';

import { useEffect, useState } from 'react';

type Registration = {
  id: number;
  name: string;
  email: string;
  event: {
    title: string;
    slug: string;
    date: string;
  };
  createdAt: string;
};

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    fetch('/api/register')
      .then(res => res.json())
      .then(data => setRegistrations(data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Event Registrations</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Event</th>
              <th className="border px-4 py-2">Event Date</th>
              <th className="border px-4 py-2">Registered On</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg.id} className="text-sm">
                <td className="border px-4 py-2">{reg.name}</td>
                <td className="border px-4 py-2">{reg.email}</td>
                <td className="border px-4 py-2">{reg.event.title}</td>
                <td className="border px-4 py-2">
                  {new Date(reg.event.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(reg.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
