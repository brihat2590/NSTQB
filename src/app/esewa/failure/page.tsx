'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function EsewaFailurePage() {
  const params = useSearchParams();

  useEffect(() => {
    // Log all query params returned from eSewa (transaction_code, status, etc.)
    console.log('eSewa Payment Failed');
    for (const [key, value] of params.entries()) {
      console.log(`${key}: ${value}`);
    }
  }, [params]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
      <p className="mt-2">Your payment could not be completed. Please try again.</p>
    </div>
  );
}
