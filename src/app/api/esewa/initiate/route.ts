/* eslint-disable @typescript-eslint/no-explicit-any */

// app/api/payment/initiate/route.ts

import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"
import { v4 as uuidv4 } from 'uuid';
import {  generateEsewaSignature } from "@/lib/esewa/verifySignature";

export async function POST(req: Request) {
  try {
    const { amount, name, email,eventId } = await req.json();

    // Validate inputs
    if (!amount || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount < 1) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Calculate amounts with 13% VAT
    const baseAmount = Number(numericAmount.toFixed(2));
    const taxAmount = Number("0.00");
    const totalAmount = Number((baseAmount + taxAmount).toFixed(2));

    // Generate signature
    const transactionUuid = uuidv4();
    const message = [
      `total_amount=${totalAmount.toFixed(2)}`,
      `transaction_uuid=${transactionUuid}`,
      `product_code=${process.env.ESEWA_MERCHANT_ID}`
    ].join(',');

    const signature = generateEsewaSignature(message);
    await prisma.eventRegistration.create({
      data:{
        name,
        email,
        eventId:Number(eventId),
        amount:totalAmount,
        transaction_uuid: transactionUuid,
        status:"PENDING"
      }


    })
    console.log("intent created");
    console.log("registration has been created with pending");
    console.log({
      paymentUrl: `${process.env.ESEWA_BASE_URL}/api/epay/main/v2/form`,
      params: {
        amount: baseAmount.toFixed(2),
        tax_amount: taxAmount.toFixed(2),
        total_amount: totalAmount.toFixed(2),
        product_service_charge: "0.00",
        product_delivery_charge: "0.00",
        transaction_uuid: transactionUuid,
        product_code: process.env.ESEWA_MERCHANT_ID!,
        signature,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/esewa/verify`,
        failure_url: `${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure`,
        signed_field_names: 'total_amount,transaction_uuid,product_code'
      }
    })
    

    return NextResponse.json({
      paymentUrl: `${process.env.ESEWA_BASE_URL}/api/epay/main/v2/form`,
      params: {
        amount: baseAmount.toFixed(2),
        tax_amount: taxAmount.toFixed(2),
        total_amount: totalAmount.toFixed(2),
        product_service_charge: "0.00",
        product_delivery_charge: "0.00",
        transaction_uuid: transactionUuid,
        product_code: process.env.ESEWA_MERCHANT_ID!,
        signature,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/esewa/verify`,
        failure_url: `${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure`,
        signed_field_names: 'total_amount,transaction_uuid,product_code'
      }
    });
    
  } catch (error: any) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: error.message || "Payment failed" },
      { status: 500 }
    );
  }
}