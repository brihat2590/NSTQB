"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

    // Khalti returns vars like pidx, transaction_id, amount, mobile, purchase_order_id, purchase_order_name
    const pidx = searchParams.get("pidx");

    useEffect(() => {
        if (!pidx) {
            setStatus("failed");
            return;
        }

        async function verify() {
            try {
                const res = await fetch(`/api/payment/verify?pidx=${pidx}`);
                const data = await res.json();

                if (data.status === "Completed") {
                    setStatus("success");
                } else {
                    setStatus("failed");
                }
            } catch (err) {
                console.error(err);
                setStatus("failed");
            }
        }

        verify();
    }, [pidx]);

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 text-center space-y-6">
                {status === "loading" && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
                        <h2 className="text-2xl font-bold text-zinc-800">Verifying Payment...</h2>
                        <p className="text-zinc-500">Please wait while we confirm your transaction.</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900">Payment Successful!</h2>
                        <p className="text-zinc-500">
                            Thank you for registering. You will receive a confirmation email shortly.
                        </p>
                        <button
                            onClick={() => router.push("/")}
                            className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98]"
                        >
                            Return to Home
                        </button>
                    </div>
                )}

                {status === "failed" && (
                    <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                            <XCircle className="w-10 h-10 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900">Payment Failed</h2>
                        <p className="text-zinc-500">
                            We couldn't verify your payment. Please try again or contact support.
                        </p>
                        <button
                            onClick={() => router.push("/")}
                            className="w-full py-3 bg-zinc-200 text-zinc-800 rounded-xl font-bold hover:bg-zinc-300 transition-all active:scale-[0.98]"
                        >
                            Back to Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
