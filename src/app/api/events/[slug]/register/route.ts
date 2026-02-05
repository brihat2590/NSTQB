import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";


export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const { name, phone, email } = await req.json();
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
            // Initiate Khalti Payment
            try {
                const { initiatePayment } = await import("@/lib/khalti"); // Dynamic import to avoid build issues if lib missing

                const purchase_order_id = `txn_${registration.id}_${Date.now()}`;

                // Update with PO ID
                await prisma.registrationEvent.update({
                    where: { id: registration.id },
                    data: { purchaseOrderId: purchase_order_id }
                });

                const paymentResponse = await initiatePayment({
                    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
                    website_url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
                    amount: event.ticketPrice * 100, // Rs to Paisa
                    purchase_order_id: purchase_order_id,
                    purchase_order_name: `Registration for ${event.title}`,
                    customer_info: {
                        name: name,
                        email: email,
                        phone: phone || "9800000000"
                    }
                });

                // Update pidx
                await prisma.registrationEvent.update({
                    where: { id: registration.id },
                    data: { pidx: paymentResponse.pidx }
                });

                return NextResponse.json(
                    {
                        message: "Payment Initiated",
                        paymentUrl: paymentResponse.payment_url,
                        pidx: paymentResponse.pidx
                    },
                    { status: 200 }
                );

            } catch (err: any) {
                console.error("Khalti Init Error:", err);
                return NextResponse.json(
                    { message: "Failed to initiate payment. Please try again." },
                    { status: 500 }
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