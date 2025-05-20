import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new NextResponse("WEBHOOK ERROR", { status: 400 });
  } 

  console.log(event.type)

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;
    const coursePrice = session?.metadata?.price;
    console.log("🧾 METADATOS:", { userId, courseId, coursePrice });
    if (!userId || !courseId || !coursePrice) {
      return new NextResponse("WEBHOOK ERROR MISSING METADATA", {
        status: 400,
      });
    }

    const price = Number(coursePrice.replace(",", ".")) || 0;

    try {
      const existingPurchase = await prisma.purchase.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });

      if (!existingPurchase) {
        await prisma.purchase.create({
          data: {
            userId,
            courseId,
            price,
          },
        });
        console.log("✅ COMPRA CREADA:", { userId, courseId, price });

      }else{
        console.log("📦 COMPRA YA EXISTE");
      }
    } catch (err) {
      console.error("❌ Error guardando en la base de datos:", err);
      return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
    }
  }
  return new NextResponse("OK", { status: 200 });
}