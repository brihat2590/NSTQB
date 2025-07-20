"use client"
import { useRouter, useSearchParams } from "next/navigation";


export default function page(){
    const params=useSearchParams();
    const router=useRouter();
    const transaction_uuid=params.get("transaction_uuid");
    if(!transaction_uuid){
        return(
            <div>
                <h1>Payment Failed</h1>
                <p>Transaction UUID is missing. Please try again.</p>
                <button onClick={() => router.push('/esewa/failure')}>Go Back</button>
            </div>
        )
        
    }

    return(
        <div>
            <h1>Payment Successful</h1>
            <p>Your payment has been successfully processed.</p>
            <p>Transaction UUID: {transaction_uuid}</p>
            <p>Thank you for your payment!</p>
        </div>
    )
}