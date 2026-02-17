import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTransaction } from "@/lib/payments/hamropay";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const merchantTxnId =
        searchParams.get("merchantTxnId") ||
        searchParams.get("MerchantTxnId") ||
        searchParams.get("purchaseOrderId");

    if (!merchantTxnId) {
        return NextResponse.json(
            { message: "Missing merchantTxnId" },
            { status: 400 }
        );
    }

    try {
        const registration = await prisma.registrationEvent.findFirst({
            where: { purchaseOrderId: merchantTxnId },
        });

        if (!registration) {
            return NextResponse.json(
                { message: "Registration not found for provided merchantTxnId" },
                { status: 404 }
            );
        }

        const paymentInfo = await getTransaction(merchantTxnId);
        const normalizedStatus = String(paymentInfo.status || "UNKNOWN").toUpperCase();
        const paymentMeta = paymentInfo as Record<string, unknown>;
        const gatewayOrderId =
            typeof paymentInfo.orderId === "string"
                ? paymentInfo.orderId
                : typeof paymentMeta.orderID === "string"
                    ? paymentMeta.orderID
                    : typeof paymentMeta.order_id === "string"
                        ? paymentMeta.order_id
                        : null;
        const trackingReference =
            typeof paymentInfo.trackingId === "string"
                ? paymentInfo.trackingId
                : typeof paymentInfo.transactionUuid === "string"
                    ? paymentInfo.transactionUuid
                    : typeof paymentMeta.transaction_uuid === "string"
                        ? paymentMeta.transaction_uuid
                        : merchantTxnId;

        await prisma.registrationEvent.update({
            where: { id: registration.id },
            data: {
                status: normalizedStatus,
                pidx: normalizedStatus === "COMPLETED"
                    ? gatewayOrderId || registration.pidx
                    : registration.pidx,
                transaction_uuid: normalizedStatus === "COMPLETED"
                    ? trackingReference
                    : registration.transaction_uuid,
            },
        });

        return NextResponse.json({
            status: normalizedStatus,
            message: paymentInfo.message || "Transaction status fetched successfully",
        });
    } catch (err: any) {
        console.error("Payment Verification Error:", err);
        return NextResponse.json(
            { message: "Verification failed", error: err.message },
            { status: 500 }
        );
    }
}
