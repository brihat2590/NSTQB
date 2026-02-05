import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPayment } from "@/lib/khalti";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const pidx = searchParams.get("pidx");
    const txnId = searchParams.get("txnId");
    const amount = searchParams.get("amount");
    const purchase_order_id = searchParams.get("purchase_order_id");
    const transaction_id = searchParams.get("transaction_id");
    const message = searchParams.get("message");

    if (!pidx) {
        return NextResponse.json(
            { message: "Missing pidx" },
            { status: 400 }
        );
    }

    try {
        // 1. Verify with Khalti
        const paymentInfo = await verifyPayment(pidx);

        // 2. Update Database
        if (paymentInfo.status === "Completed") {
            await prisma.registrationEvent.update({
                where: { pidx: pidx },
                data: {
                    status: "COMPLETED",
                    transaction_uuid: paymentInfo.transaction_id || undefined
                }
            });

            return NextResponse.json({
                status: "Completed",
                message: "Payment verified successfully"
            });
        } else {
            await prisma.registrationEvent.update({
                where: { pidx: pidx },
                data: { status: paymentInfo.status }
            });

            return NextResponse.json({
                status: paymentInfo.status,
                message: "Payment not completed"
            });
        }

    } catch (err: any) {
        console.error("Payment Verification Error:", err);
        return NextResponse.json(
            { message: "Verification failed", error: err.message },
            { status: 500 }
        );
    }
}
