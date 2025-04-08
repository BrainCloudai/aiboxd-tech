import Stripe from "stripe";

const stripe = new Stripe("sk_test_YOUR_SECRET_KEY");

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Aiboxd Full Access",
          },
          unit_amount: 2900,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://www.aiboxd.tech?success=true",
    cancel_url: "https://www.aiboxd.tech?canceled=true",
  });

  res.status(200).json({ id: session.id });
}
