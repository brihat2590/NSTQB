"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BadgeCheck, AlertTriangle } from "lucide-react";

type EventRegistration = {
  name: string;
  email: string;
  transaction_uuid: string;
};

export default function RegistrationCard() {
  const searchParams = useSearchParams();
  const transaction_uuid = searchParams.get("transaction_uuid");

  const [registration, setRegistration] = useState<EventRegistration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!transaction_uuid) {
      setError("Transaction UUID is missing.");
      setLoading(false);
      return;
    }

    const fetchRegistration = async () => {
      try {
        const res = await fetch(`/api/event-registration/get-registration?transaction_uuid=${transaction_uuid}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to fetch registration.");
        } else {
          setRegistration(data);
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistration();
  }, [transaction_uuid]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-600 text-lg">
        Loading your registration...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-600 text-center">
        <div className="p-4 border border-red-400 bg-red-50 rounded-lg shadow">
          <AlertTriangle className="w-6 h-6 inline-block mr-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white border border-gray-300 shadow-lg rounded-2xl p-6 max-w-md w-full text-center">
        <div className="flex justify-center items-center mb-4 text-green-600">
          <BadgeCheck className="w-8 h-8 mr-2" />
          <h1 className="text-xl font-bold">Payment Successful</h1>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Registration ID Card</h2>
          <div className="bg-gray-50 rounded-lg border px-4 py-3 text-left">
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {registration?.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {registration?.email}
            </p>
            <p className="break-all">
              <span className="font-semibold">Transaction UUID:</span>{" "}
              {registration?.transaction_uuid}
            </p>
          </div>
        </div>

        <div className="text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-sm font-medium">
          <AlertTriangle className="w-4 h-4 inline-block mr-2" />
          Please <span className="underline font-semibold">save this page now</span>. The registration details
          will not be available if the page is reloaded.
        </div>
      </div>
    </div>
  );
}
