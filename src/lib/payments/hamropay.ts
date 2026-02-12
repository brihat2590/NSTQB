import crypto from "crypto";

type ProductItem = {
  name: string;
  imageUrl: string;
  description: string;
  price: number; // in Rs for display
  quantity: number;
};

type CreateSessionPayload = {
  merchantTxnId: string;
  transactionAmount: number; // in paisa
  failedRedirectionUrl: string;
  successRedirectionUrl: string;
  productList: ProductItem[];
  phone_number?: string;
  metadata?: Record<string, string>;
};

type CreateSessionResponse = {
  sessionId: string;
  merchantId: string;
};

type GetTransactionResponse = {
  merchantTransactionId: string;
  trackingId?: string;
  status: "PENDING" | "PROCESSING" | "FAILED" | "COMPLETED" | "NOT_INITIATED" | string;
  amount: number;
  remarks: string;
  message: string;
};

function getConfig() {
  const clientId = process.env.HAMRO_PAY_CLIENT_ID;
  const clientApiKey = process.env.HAMRO_PAY_CLIENT_API_KEY;
  const secret = process.env.HAMRO_PAY_SECRET;
  const merchantId = process.env.HAMRO_PAY_MERCHANT_ID;
  const baseUrl = process.env.HAMRO_PAY_BASE_URL;
  const gatewayUrl = process.env.HAMRO_PAY_GATEWAY_URL;

  if (!clientId || !clientApiKey || !secret || !merchantId || !baseUrl || !gatewayUrl) {
    throw new Error("Missing HamroPay configuration in environment variables");
  }

  return { clientId, clientApiKey, secret, merchantId, baseUrl, gatewayUrl };
}

function signHmac512Base64(message: string, secret: string) {
  return crypto.createHmac("sha512", secret).update(message, "utf8").digest("base64");
}

function buildSignatureFromFields(fields: Array<string | number>, secret: string) {
  const signatureMessage = fields.map((field) => String(field)).join(",");
  return signHmac512Base64(signatureMessage, secret);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, init: RequestInit, retries = 2) {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, init);
      if (response.status >= 500 && response.status <= 504 && attempt < retries) {
        await sleep(400 * (attempt + 1));
        continue;
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await sleep(400 * (attempt + 1));
        continue;
      }
      const message = (error as any)?.message || "Network request failed";
      const causeCode = (error as any)?.cause?.code || "";
      throw new Error(`HamroPay network error: ${message}${causeCode ? ` (${causeCode})` : ""}`);
    }
  }

  throw lastError || new Error("Request failed");
}

function parseJsonSafely(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function readHamroPayResponse(response: Response, context: string) {
  const contentType = response.headers.get("content-type") || "";
  const raw = await response.text();
  const parsed = parseJsonSafely(raw);

  if (!response.ok) {
    const apiMessage =
      (parsed && typeof parsed === "object" && "message" in parsed && parsed.message) || null;
    const bodySnippet = raw.slice(0, 220).replace(/\s+/g, " ").trim();
    const detail = apiMessage
      ? String(apiMessage)
      : `Non-JSON response from HamroPay (${contentType || "unknown content-type"}): ${bodySnippet}`;
    throw new Error(`HamroPay ${context} failed (${response.status}): ${detail}`);
  }

  if (!parsed) {
    const bodySnippet = raw.slice(0, 220).replace(/\s+/g, " ").trim();
    throw new Error(
      `HamroPay ${context} returned invalid JSON (${contentType || "unknown content-type"}): ${bodySnippet}`
    );
  }

  return parsed;
}

export async function createSession(payload: CreateSessionPayload): Promise<CreateSessionResponse> {
  const { clientId, clientApiKey, secret, merchantId, baseUrl } = getConfig();
  const url = `${baseUrl}/v1/checkout/sessionId`;

  const signature = buildSignatureFromFields(
    [payload.merchantTxnId, payload.transactionAmount, merchantId, clientId, clientApiKey],
    secret
  );

  const response = await fetchWithRetry(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Client-Id": clientId,
      "Client-API-Key": clientApiKey,
      Signature: signature,
    },
    body: JSON.stringify({
      merchantTxnId: payload.merchantTxnId,
      merchantId,
      transactionAmount: payload.transactionAmount,
      failedRedirectionUrl: payload.failedRedirectionUrl,
      successRedirectionUrl: payload.successRedirectionUrl,
      productList: payload.productList,
      phone_number: payload.phone_number,
      metadata: payload.metadata,
    }),
  });

  const data = await readHamroPayResponse(response, "Create Session");

  return data;
}

export function buildCheckoutParams(input: {
  sessionId: string;
  merchantTransactionId: string;
  transactionAmount: number; // in paisa
  remarks: string;
  phone_number?: string;
}) {
  const { clientId, clientApiKey, secret, merchantId } = getConfig();

  const token = buildSignatureFromFields(
    [merchantId, input.merchantTransactionId, input.sessionId, input.transactionAmount, clientId, clientApiKey],
    secret
  );

  return {
    merchant_id: merchantId,
    session_id: input.sessionId,
    token,
    merchant_transaction_id: input.merchantTransactionId,
    remarks: input.remarks,
    ...(input.phone_number ? { phone_number: input.phone_number } : {}),
  };
}

export async function getTransaction(merchantTxnId: string): Promise<GetTransactionResponse> {
  const { clientId, clientApiKey, secret, merchantId, baseUrl } = getConfig();
  const url = `${baseUrl}/v1/checkout/transaction`;

  const signature = buildSignatureFromFields([merchantTxnId, merchantId, clientId, clientApiKey], secret);

  const response = await fetchWithRetry(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Client-Id": clientId,
      "Client-API-Key": clientApiKey,
      Signature: signature,
    },
    body: JSON.stringify({
      merchantId,
      merchantTxnId,
    }),
  });

  const data = await readHamroPayResponse(response, "Get Transaction");

  return data;
}

export function getCheckoutGatewayUrl() {
  const { gatewayUrl } = getConfig();
  return `${gatewayUrl}/api/checkout`;
}
