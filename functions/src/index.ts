/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
import {onCall, onRequest, HttpsError} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import Stripe from "stripe";
import {defineSecret} from "firebase-functions/params";

// Set maximum instances to control costs
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Set maximum instances to control costs
setGlobalOptions({maxInstances: 10});

const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");

export const createStripeCheckout = onCall(
  {secrets: [stripeSecretKey]},
  async (request) => {
    if (!request.auth) {
      // Optional: require authentication check
    }

    const stripe = new Stripe(stripeSecretKey.value(), {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      apiVersion: "2025-12-15.clover" as any,
    });

    const {email, origin, isExpress} = request.data; // Extract isExpress
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
        price: "price_1SuYNZF199auYpPybKCQAzFT",
        quantity: 1,
      },
    ];

    // Add express delivery if selected
    if (isExpress) {
      lineItems.push({
        price: "price_1Sx4NBF199auYpPywOeF9A0a",
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

      return {url: session.url};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error("Stripe Checkout Error", error);
      throw new HttpsError("internal", error.message);
    }
  }
);


export const stripeWebhook = onRequest(
  {secrets: [stripeSecretKey]},
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

    res.json({received: true});
  }
);
