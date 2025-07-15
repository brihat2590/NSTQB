import { NextResponse } from "next/server";
import {v4 as uuidv4} from "uuid";
import { generateEsewaSignature } from "@/lib/esewa/verifySignature";
export async function POST(req:Request){
    try{
        const{name,email,amount}=await req.json();
        if(!name || !email ||  !amount){
            return NextResponse.json({
                error: 'All fields are required'
            }, { status: 400 });
        }
        const transactionUuid = uuidv4();
        const message=`total_amount=${amount.toFixed(2)},transaction_uuid=${transactionUuid},product_code=${process.env.ESEWA_MERCHANT_ID}`;
      
          const signature= generateEsewaSignature(message);
          console.log({
            paymentUrl: `${process.env.ESEWA_BASE_URL}/api/epay/main/v2/form`,
            params: {
              amount: amount.toFixed(2),
              tax_amount: "0.00",
              total_amount: amount.toFixed(2),
              product_service_charge: "0.00",
              product_delivery_charge: "0.00",
              transaction_uuid: transactionUuid,
              product_code: process.env.ESEWA_MERCHANT_ID!,
              signature,
              success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/esewa/success`,
              failure_url: `https://rc-epay.esewa.com.np/payment-cancelled`,
              signed_field_names: 'total_amount,transaction_uuid,product_code'
            }})
          return NextResponse.json({
            paymentUrl: `${process.env.ESEWA_BASE_URL}/api/epay/main/v2/form`,
            params: {
              amount: (amount.toFixed(2)),
              tax_amount: "0.00",
              total_amount: (amount.toFixed(2)),
              product_service_charge: "0.00",
              product_delivery_charge: "0.00",
              transaction_uuid: transactionUuid,
              product_code: process.env.ESEWA_MERCHANT_ID!,
              signature,
              success_url: `http://localhost:3000/esewa/success`,
              failure_url: `http://localhost:3000/esewa/failure`,
              signed_field_names: 'total_amount,transaction_uuid,product_code'
            }
          });
    }
    catch(error){
        console.error(`Payment initiation error: ${error}`);
        return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 });
    }
}

