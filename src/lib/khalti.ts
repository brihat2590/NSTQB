export async function initiatePayment(payload: {
    return_url: string;
    website_url: string;
    amount: number; // in paisa
    purchase_order_id: string;
    purchase_order_name: string;
    customer_info: {
        name: string;
        email: string;
        phone: string;
    };
}) {
    const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;
    if (!KHALTI_SECRET_KEY) {
        throw new Error("KHALTI_SECRET_KEY is not defined");
    }

    const response = await fetch("https://a.khalti.com/api/v2/epayment/initiate/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Key ${KHALTI_SECRET_KEY}`,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to initiate payment");
    }

    return await response.json();
}

export async function verifyPayment(pidx: string) {
    const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;
    if (!KHALTI_SECRET_KEY) {
        throw new Error("KHALTI_SECRET_KEY is not defined");
    }

    const response = await fetch("https://a.khalti.com/api/v2/epayment/lookup/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Key ${KHALTI_SECRET_KEY}`,
        },
        body: JSON.stringify({ pidx }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Payment verification failed");
    }

    return await response.json();
}
