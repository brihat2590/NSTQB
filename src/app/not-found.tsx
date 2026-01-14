'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
        <h1 className="text-6xl font-semibold text-gray-900">404</h1>

        <p className="mt-4 text-lg text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-red-800 hover:bg-red-700 transition"
        >
          Go back home
        </Link>
      </main>

      <Footer />
    </div>
  );
}
