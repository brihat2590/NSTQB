// app/esewa/failure/page.tsx

'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function EsewaFailurePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const errorCode = searchParams.get('q');
  const refId = searchParams.get('refId');

  useEffect(() => {
    console.log('eSewa failure params:', { errorCode, refId });
    // Optional: You can send this to your backend for logging
  }, [errorCode, refId]);

  const errorMessages: Record<string, string> = {
    ES104: 'Invalid payload signature.',
    ES100: 'Invalid transaction UUID.',
    ES101: 'Product code mismatch.',
    ES102: 'Missing required field.',
    // Add more based on eSewa docs
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center p-6 border rounded-xl shadow">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed ❌</h1>
        <p className="text-gray-700 mb-2">
          Error Code: <strong>{errorCode || 'Unknown'}</strong>
        </p>
        <p className="text-gray-500 mb-4">
          {errorCode && errorMessages[errorCode]
            ? errorMessages[errorCode]
            : 'An unknown error occurred while processing your payment.'}
        </p>
        {refId && (
          <p className="text-sm text-gray-400 mb-2">Transaction Ref: {refId}</p>
        )}
        <button
          onClick={() => router.push('/events')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Events
        </button>
      </div>
    </div>
  );
}
