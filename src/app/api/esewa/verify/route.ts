// import { generateEsewaSignature } from '@/lib/esewa/verifySignature';
// import { NextRequest, NextResponse } from 'next/server';


// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
    
//     // Extract required parameters
//     const donationId = formData.get('donationId');
//     const transactionUuid = formData.get('transaction_uuid');
//     const totalAmount = formData.get('total_amount');
//     const productCode = formData.get('product_code');
//     const receivedSignature = formData.get('signature');

//     // Validate required parameters
//     if (!donationId || !transactionUuid || !totalAmount || !productCode || !receivedSignature) {
//       return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/failure`);
//     }

//     // Verify with eSewa API
//     const verificationResponse = await fetch(`${process.env.ESEWA_BASE_URL}/api/epay/main/v2/verify`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.ESEWA_SECRET_KEY}`
//       },
//       body: JSON.stringify({
//         transaction_uuid: transactionUuid.toString(),
//         total_amount: totalAmount.toString()
//       })
//     });

//     if (!verificationResponse.ok) {
//       throw new Error('eSewa verification failed');
//     }

//     // Generate signature
//     const signatureMessage = [
//       `total_amount=${totalAmount}`,
//       `transaction_uuid=${transactionUuid}`,
//       `product_code=${process.env.ESEWA_MERCHANT_ID}`
//     ].join(',');

 
//     const validSignature = generateEsewaSignature(signatureMessage)
    
//     if (validSignature !== receivedSignature.toString()) {
//       throw new Error('Invalid signature');
//     }
//     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/success`);
//   } catch (error) {
//     console.error('Payment verification error:', error);
//     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure`);
//   }
// }

// // export async function GET(req: NextRequest) {
// //   try {
// //     const { searchParams } = new URL(req.url)

// //     // Extract params from the URL
// //     const transaction_code = searchParams.get('transaction_code')
// //     const status = searchParams.get('status')
// //     const total_amount = searchParams.get('total_amount')
// //     const transaction_uuid = searchParams.get('transaction_uuid')
// //     const signature = searchParams.get('signature')

// //     if (!transaction_code || !status || !total_amount || !transaction_uuid || !signature) {
// //       return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure?reason=missing_params`)
// //     }

// //     // Construct the payload string
// //     const signatureMessage = [
// //         `total_amount=${total_amount.toString()}`,
// //         `transaction_uuid=${transaction_uuid.toString()}`,
// //         `product_code=${process.env.ESEWA_MERCHANT_ID}`
// //       ].join(',');
  
   
// //       const isValid = generateEsewaSignature(signatureMessage)

// //     if (!isValid) {
// //       return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure?reason=invalid_signature`)
// //     }

// //     // Signature verified: Redirect to frontend success page
// //     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/success?uuid=${transaction_uuid}`)
// //   } catch (error) {
// //     console.error('Verification error:', error)
// //     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure?reason=internal_error`)
// //   }
// // }


// export async function GET(req: NextRequest) {

//     console.log("GET request received for eSewa verification at verify");
//   try {
//     const { searchParams } = new URL(req.url)

//     // eSewa sends everything in `data` param as a base64 encoded JSON string
//     const dataParam = searchParams.get("data")

//     if (!dataParam) {
//       return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure?reason=missing_data`)
//     }

//     // Decode base64
//     const decodedString = Buffer.from(dataParam, "base64").toString("utf-8")
//     const parsedData = JSON.parse(decodedString)
//     console.log(parsedData);

//     const {
//       transaction_code,
//       status,
//       total_amount,
//       transaction_uuid,
//       signature,
//     } = parsedData
//     console.log(transaction_code, status, total_amount, transaction_uuid, signature)

//     // Ensure all required fields exist
//     if (!transaction_code || !status || !total_amount || !transaction_uuid || !signature) {
//       return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure?reason=missing_params`)
//     }

//     // Construct signature string
//     const signatureMessage = [
//       `total_amount=${total_amount}`,
//       `transaction_uuid=${transaction_uuid}`,
//       `product_code=${process.env.ESEWA_MERCHANT_ID}`,
//     ].join(",")

//     const isValid = generateEsewaSignature(signatureMessage) === signature

//     if (!isValid) {
//       return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure?reason=invalid_signature`)
//     }

//     // ✅ Signature verified: redirect to frontend success page
//     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/success?transaction_uuid=${transaction_uuid}`)
//   } catch (error) {
//     console.error("Verification error:", error)
//     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure?reason=internal_error`)
//   }
// }
import crypto from 'crypto';
import {prisma} from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Your existing signature generation helper
function generateEsewaSignature(message: string): string {
  const secretKey = process.env.ESEWA_SECRET_KEY!;
  return crypto.createHmac('sha256', secretKey)
               .update(message, 'utf8')
               .digest('base64');
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const dataParam = searchParams.get("data");
    if (!dataParam) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure?reason=missing_data`);
    }

    // Decode base64 data string and parse JSON
    const decodedString = Buffer.from(dataParam, "base64").toString("utf-8");
    const parsedData = JSON.parse(decodedString);
    console.log(parsedData)
    const{
        status,
        total_amount,
        transaction_code,
        signed_field_names,
        transaction_uuid
    }=parsedData

    // Extract signature and signed_field_names
    const signature = parsedData.signature;
    const signedFieldNames = parsedData.signed_field_names;

    if (!signature || !signedFieldNames) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure?reason=missing_params`);
    }

    // Split signed_field_names into array (order matters!)
    const signedFields = signedFieldNames.split(',');

    // Build signature string: concat values of each signed field as key=value, joined by commas
    const signatureMessage = signedFields.map((fieldName:string) => {
      if (fieldName === 'signed_field_names') {
        // The value of signed_field_names is the full string itself
        return `${fieldName}=${signedFieldNames}`;
      }
      const value = parsedData[fieldName];
      if (value === undefined) {
        throw new Error(`Missing field "${fieldName}" needed for signature verification.`);
      }
      return `${fieldName}=${value}`;
    }).join(',');

    // Generate signature with your secret key
    const generatedSignature = generateEsewaSignature(signatureMessage);

    // Compare signatures
    if (generatedSignature !== signature) {
        await prisma.examRegistration.update({
            where:{transaction_uuid},
            data:{
                status: "FAILED"}
        })
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure?reason=invalid_signature`);
    }
    if(status!=="COMPLETE"){
        await prisma.examRegistration.update({
            where:{transaction_uuid},
            data:{
                status: "FAILED"}

        })
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure?reason=payment_not_complete`);
    }
    //aba update registration to store completed

    await prisma.examRegistration.update({
        where:{transaction_uuid},
        data:{
            status:"COMPLETED"
        }

    })
    console.log("generated signature", generatedSignature);
    console.log("received signature", signature);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/success?transaction_uuid=${parsedData.transaction_uuid}`);

    // Signature verified, redirect success page with transaction_uuid
    

  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/esewa/failure?reason=internal_error`);
  }
}
