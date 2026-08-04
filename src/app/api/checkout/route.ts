import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, items, customer } = body;

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (stripeSecretKey) {
      // In production with Stripe installed & key provided
      const stripe = require("stripe")(stripeSecretKey);
      
      const lineItems = items.map((item: any) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: item.title,
            description: `Categoria: ${item.category}`,
          },
          unit_amount: Math.round(item.unitPrice * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "pix"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${req.headers.get("origin")}/admin?order=${orderId}&success=true`,
        cancel_url: `${req.headers.get("origin")}/?canceled=true`,
        metadata: {
          orderId,
          customerName: customer.name,
          customerPhone: customer.phone,
        },
      });

      return NextResponse.json({ url: session.url });
    } else {
      // Prototype mode: Simulated checkout confirmation
      return NextResponse.json({
        url: null,
        success: true,
        message: `Pedido ${orderId} registrado no sistema! Configure a chave STRIPE_SECRET_KEY no .env.local para ativar o checkout real.`,
      });
    }
  } catch (error: any) {
    console.error("Erro no Stripe Checkout:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
