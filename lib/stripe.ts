import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("No se definio stripe secret key");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
  typescript: true,
});
