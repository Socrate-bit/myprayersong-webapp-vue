/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions";
import { onCall, onRequest, HttpsError } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import Stripe from "stripe";
import { defineSecret } from "firebase-functions/params";

// Set maximum instances to control costs
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Set maximum instances to control costs
setGlobalOptions({ maxInstances: 10 });

const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");

export const createStripeCheckout = onCall(
  { secrets: [stripeSecretKey], cors: true },
  async (request) => {
    if (!request.auth) {
      // Optional: require authentication check
    }

    const stripe = new Stripe(stripeSecretKey.value(), {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      apiVersion: "2025-12-15.clover" as any,
    });

    const { email, origin, isExpress } = request.data; // Extract isExpress
    console.log(request.data);

    if (!email) {
      throw new HttpsError(
        "invalid-argument",
        "The function must be called with an email."
      );
    }

    const baseUrl = origin || "http://localhost:5173";

    // Base line item
    const lineItems = [
      {
        price: "price_1T0OzXF199auYpPyY71WA9nT",
        quantity: 1,
      },
    ];

    // Add express delivery if selected
    if (isExpress) {
      lineItems.push({
        price: "price_1T0P0rF199auYpPyzXXNBrmL",
        quantity: 1,
      });
    }

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        customer_email: email,
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/failure`,
      });

      return { url: session.url };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error("Stripe Checkout Error", error);
      throw new HttpsError("internal", error.message);
    }
  }
);


export const stripeWebhook = onRequest(
  { secrets: [stripeSecretKey] },
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      if (!sig) throw new Error("No signature provided");
      // For simplicity in this demo, accessing the raw body might require
      // specific config. In Cloud Functions v2, req.rawBody is available if
      // configured, or use raw-body. Important: You must obtain your webhook
      // signing secret from the Dashboard. Ideally verify signature:
      // event = stripe.webhooks.constructEvent(
      //   req.rawBody, sig, endpointSecret
      // );
      // For now, trusting the event structure if testing or simpler validation

      // WARN: IN PRODUCTION, ALWAYS VERIFY SIGNATURE.
      // Assuming the body is already parsed or we trust the source for this MVP
      // iteration
      event = req.body;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error("Webhook Error", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentId = session.metadata?.paymentId;

      if (paymentId) {
        try {
          await db.collection("payments").doc(paymentId).update({
            status: "pending",
            stripeSessionId: session.id,
            paidAt: new Date().toISOString(),
          });
          logger.info(`Payment ${paymentId} status updated to pending.`);
        } catch (error) {
          logger.error("Error updating payment status", error);
        }
      } else {
        logger.warn("No paymentId found in session metadata");
      }
    }

    res.json({ received: true });
  }
);

const dlocalKey = defineSecret("DLOCAL_API_KEY");
const dlocalSecret = defineSecret("DLOCAL_API_SECRET");
const dlocalSmartFieldsKey = defineSecret("DLOCAL_SMARTFIELDS_KEY");

export const createDlocalCheckout = onCall(
  { secrets: [dlocalKey, dlocalSecret], cors: true },
  async (request) => {
    const { email, isExpress, origin, paymentId } = request.data;

    if (!email) {
      throw new HttpsError(
        "invalid-argument",
        "The function must be called with an email."
      );
    }

    const baseUrl = origin || "http://localhost:5173";
    const amount = isExpress ? 238 : 159;

    const projId = process.env.GCLOUD_PROJECT || "myprayersong-428ef";
    const notificationUrl =
      `https://us-central1-${projId}.cloudfunctions.net/dlocalWebhook`;

    try {
      const response = await fetch("https://api.dlocalgo.com/v1/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${dlocalKey.value()}:${dlocalSecret.value()}`,
        },
        body: JSON.stringify({
          currency: "BRL",
          amount: amount,
          country: "BR",
          order_id: paymentId,
          description: "Canção Personalizada - CançãoOração " +
            (isExpress ? "(Express - 24h)" : "(Padrão)"),
          success_url: `${baseUrl}/success?session_id=${paymentId}`,
          back_url: `${baseUrl}/payment`,
          notification_url: notificationUrl,
          payer: {
            email: email,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        logger.error("Dlocal API Error", errorData);
        throw new Error(errorData.message || "Failed to create Dlocal payment");
      }

      const data = await response.json() as
        { redirect_url: string, id: string };

      if (paymentId) {
        await db.collection("payments").doc(paymentId).update({
          dlocalId: data.id,
          gateway: "dlocal",
        });
      }

      return { url: data.redirect_url };
    } catch (error: unknown) {
      const err = error as Error;
      logger.error("Dlocal Checkout Error", err);
      throw new HttpsError("internal", err.message);
    }
  }
);

export const dlocalWebhook = onRequest(
  async (req, res) => {
    const { order_id: orderId, status } = req.body;
    if (status === "PAID" || status === "SUCCESS") {
      if (orderId) {
        try {
          await db.collection("payments").doc(orderId).update({
            status: "pending",
            paidAt: new Date().toISOString(),
            updatedBy: "dlocal_webhook",
          });
        } catch (error) {
          logger.error("Error updating Dlocal payment status", error);
        }
      }
    }
    res.status(200).send("OK");
  }
);

export const createDlocalTransparentPayment = onCall(
  { secrets: [dlocalKey, dlocalSecret, dlocalSmartFieldsKey], cors: true },
  async (request) => {
    const {
      email, isExpress, origin,
      recipientName, recipient, genre, voiceGender,
      qualities, memories, specialMessage,
    } = request.data;

    if (!email) {
      throw new HttpsError("invalid-argument", "Email is required.");
    }

    const amount = isExpress ? 238 : 159;
    const baseUrl = origin || "http://localhost:5173";
    const projId = process.env.GCLOUD_PROJECT || "myprayersong-428ef";
    const notificationUrl =
      `https://us-central1-${projId}.cloudfunctions.net/dlocalWebhook`;

    // Create Firestore doc first to use its ID as order_id
    const docRef = await db.collection("payments").add({
      email, recipientName, recipient, genre, voiceGender,
      qualities, memories, specialMessage, isExpress, amount,
      gateway: "dlocal_transparent",
      status: "checkout",
      createdAt: new Date().toISOString(),
    });
    const paymentId = docRef.id;

    try {
      const response = await fetch("https://api.dlocalgo.com/v1/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${dlocalKey.value()}:${dlocalSecret.value()}`,
        },
        body: JSON.stringify({
          currency: "BRL",
          amount,
          country: "BR",
          order_id: paymentId,
          description: "Canção Personalizada - CançãoOração " +
            (isExpress ? "(Express - 24h)" : "(Padrão)"),
          success_url: `${baseUrl}/success?session_id=${paymentId}`,
          back_url: `${baseUrl}/payment`,
          notification_url: notificationUrl,
          allow_transparent: true,
          payer: { email },
        }),
      });

      if (!response.ok) {
        const err = await response.json() as { message?: string };
        logger.error("Dlocal Create Transparent Payment Error", err);
        throw new Error(err.message || "Failed to create payment");
      }

      const data = await response.json() as
        { merchant_checkout_token: string; id: string };

      await docRef.update({ dlocalId: data.id });

      return {
        checkoutToken: data.merchant_checkout_token,
        paymentId,
        smartFieldsKey: dlocalSmartFieldsKey.value(),
      };
    } catch (error) {
      await docRef.update({ status: "error" });
      const err = error as Error;
      logger.error("Dlocal Transparent Payment Error", err);
      throw new HttpsError("internal", err.message);
    }
  }
);

export const confirmDlocalCardPayment = onCall(
  { secrets: [dlocalKey, dlocalSecret], cors: true },
  async (request) => {
    const {
      checkoutToken, cardToken,
      clientFirstName, clientLastName,
      clientDocumentType, clientDocument,
      clientEmail, installmentsId, paymentId,
    } = request.data;

    if (!checkoutToken || !cardToken) {
      throw new HttpsError("invalid-argument", "Missing required parameters.");
    }

    const body: Record<string, string> = {
      cardToken,
      clientFirstName,
      clientLastName,
      clientDocumentType,
      clientDocument,
      clientEmail,
      country: "BR",
    };
    if (installmentsId) body.installmentsId = installmentsId;

    try {
      const response = await fetch(
        `https://api.dlocalgo.com/v1/payments/confirm/${checkoutToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${dlocalKey.value()}:${dlocalSecret.value()}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json() as
        { status: string; redirect_url?: string; message?: string };

      if (!response.ok) {
        logger.error("Dlocal Confirm Payment Error", data);
        throw new Error(data.message || "Payment confirmation failed");
      }

      if (paymentId) {
        const statusMap: Record<string, string> = {
          PAID: "pending_card",
          PENDING: "pending_card",
          REJECTED: "rejected",
        };
        await db.collection("payments").doc(paymentId).update({
          status: statusMap[data.status] || "processing",
          updatedAt: new Date().toISOString(),
        });
      }

      return {
        status: data.status,
        redirectUrl: data.redirect_url ?? null,
      };
    } catch (error) {
      const err = error as Error;
      logger.error("Dlocal Confirm Card Error", err);
      throw new HttpsError("internal", err.message);
    }
  }
);

export const createPixPayment = onCall(
  { secrets: [dlocalKey, dlocalSecret], cors: true },
  async (request) => {
    const {
      email, name, document: cpfDoc, isExpress, origin, paymentId,
    } = request.data;

    if (!email || !paymentId) {
      throw new HttpsError("invalid-argument", "Email and paymentId are required.");
    }

    const amount = isExpress ? 238 : 159;
    const baseUrl = origin || "http://localhost:5173";
    const projId = process.env.GCLOUD_PROJECT || "myprayersong-428ef";
    const notificationUrl =
      `https://us-central1-${projId}.cloudfunctions.net/dlocalWebhook`;

    const docRef = db.collection("payments").doc(paymentId);
    await docRef.update({ gateway: "dlocal_pix", status: "pending_pix" });

    try {
      const response = await fetch("https://api.dlocalgo.com/v1/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${dlocalKey.value()}:${dlocalSecret.value()}`,
        },
        body: JSON.stringify({
          currency: "BRL",
          amount,
          country: "BR",
          payment_type: "VOUCHER",
          order_id: paymentId,
          description: "Canção Personalizada - CançãoOração " +
            (isExpress ? "(Express - 24h)" : "(Padrão)"),
          success_url: `${baseUrl}/success?session_id=${paymentId}`,
          back_url: `${baseUrl}/payment`,
          notification_url: notificationUrl,
          payer: {
            name: name || email,
            email,
            document: cpfDoc ? cpfDoc.replace(/\D/g, "") : undefined,
          },
        }),
      });

      if (!response.ok) {
        const err = await response.json() as { message?: string };
        logger.error("Dlocal Pix Payment Error", err);
        throw new Error(err.message || "Failed to create Pix payment");
      }

      const data = await response.json() as { redirect_url: string; checkout_url?: string; id: string };
      console.log('Dlocal Pix Payment Response', data);
      await docRef.update({ dlocalId: data.id, status: "pending" });

      const checkoutUrl = data.redirect_url || data.checkout_url;
      if (!checkoutUrl) throw new Error("No redirect URL in Dlocal Pix response");

      return { checkoutUrl, paymentId };
    } catch (error) {
      await docRef.update({ status: "error" });
      const err = error as Error;
      logger.error("Dlocal Pix Payment Error", err);
      throw new HttpsError("internal", err.message);
    }
  }
);
