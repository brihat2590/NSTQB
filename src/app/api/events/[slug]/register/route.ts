import { prisma } from "@/lib/prisma";
import { buildCheckoutParams, createSession, getCheckoutGatewayUrl } from "@/lib/payments/hamropay";

import { NextRequest, NextResponse } from "next/server";


export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const { name, phone, email, remarks, paymentMethod } = await req.json();
    const selectedPaymentMethod = paymentMethod === "QR" ? "QR" : "HAMROPAY";
    if (!name || !email || !phone) {
        return NextResponse.json({ message: "Name, Email and Phone are required" }, { status: 400 });
    }

    try {

        const event = await prisma.events.findUnique({
            where: {
                slug: slug
            }
        });
        if (!event) {
            return new Response(JSON.stringify({ message: "Event not found" }), { status: 404 });

        }
        if (!event.registrationOpen) {
            return NextResponse.json({ message: "Registration is closed for this event" }, { status: 400 });
        }

        const existingUser = await prisma.registrationEvent.findFirst({
            where: {
                eventId: event.id,
                email: email,
            }
        })

        if (existingUser && existingUser.status === "COMPLETED") {
            return NextResponse.json(
                { message: "User with this email is already registered and paid" },
                { status: 400 }
            );
        }

        if (
            event.registrationDeadline &&
            new Date() > event.registrationDeadline
        ) {
            return NextResponse.json(
                { message: "Registration deadline has passed" },
                { status: 400 }
            );
        }

        // Check for total seats capacity
        if (event.totalSeats) {
            const registrationCount = await prisma.registrationEvent.count({
                where: {
                    eventId: event.id,
                    status: "COMPLETED"
                }
            });

            if (registrationCount >= event.totalSeats) {
                return NextResponse.json(
                    { message: "Registration Full" },
                    { status: 400 }
                );
            }
        }

        let registration;

        if (existingUser) {
            // Update existing pending registration
            registration = await prisma.registrationEvent.update({
                where: { id: existingUser.id },
                data: {
                    name: name,
                    phone: phone,
                    amount: event.ticketPrice ? event.ticketPrice * 100 : 0,
                    status: event.eventType === "PAID" ? "PENDING" : "COMPLETED",
                    // Reset these payment fields for new attempt
                    pidx: null,
                    purchaseOrderId: null,
                    transaction_uuid: null
                }
            });
        } else {
            // Create new registration
            registration = await prisma.registrationEvent.create({
                data: {
                    name: name,
                    email: email,
                    phone: phone,
                    eventId: event.id,
                    amount: event.ticketPrice ? event.ticketPrice * 100 : 0, // Store in paisa
                    status: event.eventType === "PAID" ? "PENDING" : "COMPLETED"
                }
            });
        }

        if (event.eventType === "PAID" && event.ticketPrice) {
            if (selectedPaymentMethod === "QR") {
                return NextResponse.json(
                    {
                        message: "Registration submitted. Please pay using QR and send the payment screenshot for verification at info@nstqb.org.",
                        registration,
                        paymentMethod: "QR",
                    },
                    { status: 200 }
                );
            }

            try {
                const merchantTxnId = `mr_${Date.now()}_${registration.id.slice(-6)}`;
                const transactionAmount = Math.round(event.ticketPrice * 100);
                const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

                await prisma.registrationEvent.update({
                    where: { id: registration.id },
                    data: {
                        purchaseOrderId: merchantTxnId,
                        pidx: null,
                        transaction_uuid: null,
                        status: "PENDING",
                    },
                });

                const session = await createSession({
                    merchantTxnId,
                    transactionAmount,
                    successRedirectionUrl: `${appUrl}/payment/success`,
                    failedRedirectionUrl: `${appUrl}/payment/success`,
                    metadata: {
                        eventId: String(event.id),
                        registrationId: registration.id,
                        email,
                    },
                    productList: [
                        {
                            name: event.title,
                            imageUrl: event.bannerImage || `${appUrl}/favicon.ico`,
                            description: `Registration for ${event.title}`,
                            price: event.ticketPrice,
                            quantity: 1,
                        },
                    ],
                });

                const params = buildCheckoutParams({
                    sessionId: session.sessionId,
                    merchantTransactionId: merchantTxnId,
                    transactionAmount,
                    remarks: `${event.title}-${name}`,
                });

                return NextResponse.json(
                    {
                        message: "Payment Initiated",
                        paymentUrl: getCheckoutGatewayUrl(),
                        params,
                    },
                    { status: 200 }
                );
            } catch (err: any) {
                console.error("HamroPay Init Error:", err);
                const message = String(err?.message || "");
                const isGatewayUnavailable =
                    message.includes("failed (502)") ||
                    message.includes("failed (503)") ||
                    message.includes("failed (504)") ||
                    message.includes("HamroPay network error") ||
                    message.includes("terminated") ||
                    message.includes("UND_ERR_SOCKET") ||
                    String(err?.cause?.code || "").includes("UND_ERR");
                return NextResponse.json(
                    {
                        message: isGatewayUnavailable
                            ? "Payment gateway is temporarily unavailable. Please try again in a few minutes."
                            : err?.message || "Failed to initiate HamroPay payment. Please try again."
                    },
                    { status: isGatewayUnavailable ? 503 : 500 }
                );
            }
        }

        return NextResponse.json(
            { message: "Registration successful", registration },
            { status: 201 }
        );
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }

}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    try {

        const event = await prisma.events.findUnique({
            where: {
                slug: slug
            },
            include: {
                registrations: true
            }
        })
        if (!event) {
            return NextResponse.json({
                message: "Event not found"
            })
        }

        return NextResponse.json({
            registrations: event.registrations,
            status: 200
        });



    }
    catch (err) {
        console.log(err);

        return NextResponse.json({
            message: "Internal Server Error"
        })
    }

}
